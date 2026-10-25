import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDecipheriv, pbkdf2Sync } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd());
const envelope = readFileSync('public/atlas/collection.enc');
const salt = envelope.subarray(1, 17);
const key = pbkdf2Sync(process.env.ATLAS_PASSWORD, salt, 310000, 32, 'sha256');
function decrypt(bytes, secret = key) {
  const cipher = createDecipheriv('aes-256-gcm', secret, bytes.subarray(0, 12));
  cipher.setAuthTag(bytes.subarray(-16));
  return Buffer.concat([cipher.update(bytes.subarray(12, -16)), cipher.final()]);
}
test('correct password decrypts collection and every media file losslessly', () => {
  const entries = JSON.parse(decrypt(envelope.subarray(17)));
  const originals = JSON.parse(readFileSync('private/atlas/entries.json', 'utf8'));
  assert.equal(entries.length, originals.length);
  for (const [i, entry] of entries.entries()) {
    assert.equal(entry.title, originals[i].title);
    for (const field of ['audio', 'image']) {
      if (!entry[field]) continue;
      const filename = entry[field].path.split('/').at(-1);
      const original = originals[i][field].split('/').at(-1);
      const extension = original.split('.').at(-1).toLowerCase();
      const expectedMime = { m4a: 'audio/mp4', mp3: 'audio/mpeg', png: 'image/png', webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg' }[extension];
      assert.equal(entry[field].mime, expectedMime);
      assert.deepEqual(decrypt(readFileSync('public/atlas/' + filename)), readFileSync('private/atlas/' + original));
    }
  }
});
test('wrong passwords and modified ciphertext are rejected', () => {
  const wrong = pbkdf2Sync('incorrect password', salt, 310000, 32, 'sha256');
  assert.throws(() => decrypt(envelope.subarray(17), wrong));
  const changed = Buffer.from(envelope.subarray(17)); changed[20] ^= 1;
  assert.throws(() => decrypt(changed));
});
test('public atlas directory contains only encrypted files and no entry titles', () => {
  const originals = JSON.parse(readFileSync('private/atlas/entries.json', 'utf8'));
  for (const file of readdirSync('public/atlas')) {
    assert.ok(file.endsWith('.enc'));
    const bytes = readFileSync('public/atlas/' + file);
    for (const entry of originals) assert.equal(bytes.includes(Buffer.from(entry.title)), false);
  }
});
