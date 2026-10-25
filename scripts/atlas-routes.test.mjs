import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import nextEnv from '@next/env';

nextEnv.loadEnvConfig(process.cwd(), true, { info() {}, error() {} });
const origin = process.env.ATLAS_TEST_URL || 'http://localhost:3667';
const originals = JSON.parse(readFileSync('private/atlas/entries.json', 'utf8'));
const publicEntries = originals.filter(entry => entry.kind !== 'recording' && entry.kind !== 'leetcode' && !entry.audio);
const privateEntries = originals.filter(entry => !publicEntries.includes(entry));
function mediaName(source) {
  return createHash('sha256').update(path.basename(source)).digest('hex').slice(0, 24) + '.enc';
}
function excludedMedia() {
  const publicNames = new Set(publicEntries.flatMap(entry => [entry.image, entry.audio]).filter(Boolean).map(mediaName));
  return privateEntries.flatMap(entry => [entry.image, entry.audio]).filter(Boolean).map(mediaName).filter(name => !publicNames.has(name));
}
function noIndex(response) { assert.ok(response.headers.get('x-robots-tag')?.includes('noindex')); }
async function login() {
  const response = await fetch(`${origin}/api/atlas/access/`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify({ password: process.env.ATLAS_PASSWORD }),
  });
  assert.equal(response.status, 200);
  noIndex(response);
  const cookie = response.headers.get('set-cookie');
  assert.ok(cookie?.includes('HttpOnly') && cookie.includes('SameSite=strict'));
  return { Cookie: cookie.split(';')[0] };
}

test('both atlas pages are unlisted and private HTML contains no collection data', async () => {
  for (const route of ['/atlas/', '/atlas/private/']) {
    const page = await fetch(origin + route);
    assert.equal(page.status, 200);
    noIndex(page);
    const html = await page.text();
    assert.ok(html.includes('noindex, nofollow'));
    assert.ok(privateEntries.every(entry => !html.includes(entry.id)));
  }
});

test('public data contains exactly the original collection minus music and LeetCode', async () => {
  const response = await fetch(`${origin}/api/atlas/collection/`);
  assert.equal(response.status, 200);
  noIndex(response);
  assert.equal(response.headers.get('set-cookie'), null);
  const entries = await response.json();
  assert.ok(Array.isArray(entries) && entries.length === publicEntries.length);
  assert.ok(publicEntries.every((entry, index) => entries[index].id === entry.id && entries[index].title === entry.title));
  assert.ok(entries.every(entry => !entry.audio && entry.kind !== 'recording' && entry.kind !== 'leetcode'));
  assert.ok(privateEntries.every(entry => !entries.some(item => item.id === entry.id)));
});

test('private data and media reject anonymous and forged sessions', async () => {
  const media = excludedMedia()[0];
  assert.ok(media);
  for (const route of ['/api/atlas/private/collection/', `/api/atlas/private/media/${media}/`]) {
    for (const headers of [{}, { Cookie: 'atlas_access=invalid-session' }]) {
      const response = await fetch(origin + route, { headers });
      assert.equal(response.status, 401);
      noIndex(response);
    }
  }
});

test('public media cannot expose excluded uploads or raw encrypted storage', async () => {
  for (const name of excludedMedia()) {
    const response = await fetch(`${origin}/api/atlas/media/${name}/`);
    assert.equal(response.status, 404);
    noIndex(response);
  }
  for (const name of ['collection.enc', ...excludedMedia()]) {
    const response = await fetch(`${origin}/atlas/${name}`);
    assert.equal(response.status, 404);
    noIndex(response);
  }
});

test('public photos retain lossless decryption, range support and search exclusion', async () => {
  const entry = publicEntries.find(item => item.image);
  assert.ok(entry);
  const original = readFileSync(path.join('private/atlas', path.basename(entry.image)));
  const url = `${origin}/api/atlas/media/${mediaName(entry.image)}/`;
  const full = await fetch(url);
  assert.equal(full.status, 200);
  noIndex(full);
  assert.ok(Buffer.from(await full.arrayBuffer()).equals(original));
  const partial = await fetch(url, { headers: { Range: 'bytes=0-9' } });
  assert.equal(partial.status, 206);
  noIndex(partial);
  assert.ok(Buffer.from(await partial.arrayBuffer()).equals(original.subarray(0, 10)));
  const invalid = await fetch(url, { headers: { Range: `bytes=${original.length}-` } });
  assert.equal(invalid.status, 416);
});

test('wrong passwords and cross-origin login requests are rejected', async () => {
  const denied = await fetch(`${origin}/api/atlas/access/`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify({ password: 'deliberately-wrong' }),
  });
  assert.equal(denied.status, 401);
  const crossOrigin = await fetch(`${origin}/api/atlas/access/`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://invalid.example' }, body: '{}',
  });
  assert.equal(crossOrigin.status, 403);
});

test('private login restores every original entry and recording without changing public access', async () => {
  const headers = await login();
  const response = await fetch(`${origin}/api/atlas/private/collection/`, { headers });
  assert.equal(response.status, 200);
  assert.ok(response.headers.get('cache-control').includes('no-store'));
  noIndex(response);
  const entries = await response.json();
  assert.ok(entries.length === originals.length && originals.every((entry, index) => entries[index].id === entry.id && entries[index].title === entry.title));
  const audio = entries.find(entry => entry.audio);
  assert.ok(audio?.audio.startsWith('/api/atlas/private/media/'));
  const media = await fetch(origin + audio.audio, { headers: { ...headers, Range: 'bytes=0-9' } });
  assert.equal(media.status, 206);
  noIndex(media);
  assert.equal((await media.arrayBuffer()).byteLength, 10);
  const publicResponse = await fetch(`${origin}/api/atlas/collection/`, { headers });
  const visible = await publicResponse.json();
  assert.ok(visible.length === publicEntries.length && visible.every(entry => entry.kind !== 'recording' && entry.kind !== 'leetcode' && !entry.audio));
  for (const name of excludedMedia()) {
    assert.equal((await fetch(`${origin}/api/atlas/media/${name}/`, { headers })).status, 404);
  }
  const logout = await fetch(`${origin}/api/atlas/access/`, { method: 'DELETE', headers: { ...headers, Origin: origin } });
  assert.equal(logout.status, 200);
  assert.ok(logout.headers.get('set-cookie').includes('Max-Age=0'));
});
