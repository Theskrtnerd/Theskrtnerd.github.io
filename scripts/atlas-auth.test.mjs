import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkPassword, createSession, validSession, sessionSeconds } from '../src/lib/atlas-auth.ts';

process.env.ATLAS_PASSWORD = 'unit-test-password';
process.env.ATLAS_SESSION_SECRET = 'unit-test-signing-secret';

test('password verification rejects incorrect values and missing configuration', () => {
  assert.equal(checkPassword('unit-test-password'), true);
  assert.equal(checkPassword('incorrect'), false);
  const secret = process.env.ATLAS_SESSION_SECRET;
  delete process.env.ATLAS_SESSION_SECRET;
  assert.equal(checkPassword('unit-test-password'), false);
  process.env.ATLAS_SESSION_SECRET = secret;
});

test('signed sessions reject tampering and credential rotation', () => {
  const session = createSession();
  assert.equal(validSession(session), true);
  assert.equal(validSession(session + 'x'), false);
  assert.equal(validSession('invalid'), false);
  assert.equal(validSession(), false);
  process.env.ATLAS_PASSWORD = 'rotated-test-password';
  assert.equal(validSession(session), false);
  process.env.ATLAS_PASSWORD = 'unit-test-password';
});

test('sessions expire after 24 hours', t => {
  const now = Date.now();
  const session = createSession();
  t.mock.method(Date, 'now', () => now + (sessionSeconds + 1) * 1000);
  assert.equal(validSession(session), false);
});
