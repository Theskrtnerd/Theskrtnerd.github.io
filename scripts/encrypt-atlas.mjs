import { createCipheriv, pbkdf2Sync, randomBytes, createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import nextEnv from '@next/env';

nextEnv.loadEnvConfig(process.cwd());
const source = path.resolve('private/atlas');
const destination = path.resolve('public/atlas');
// CI can publish the already encrypted collection without possessing plaintext or a password.
if (!existsSync(path.join(source, 'entries.json'))) {
  if (!existsSync(path.join(destination, 'collection.enc'))) throw new Error('Missing encrypted atlas. Run npm run atlas:encrypt locally first.');
  process.exit(0);
}
const password = process.env.ATLAS_PASSWORD;
if (!password) throw new Error('Set ATLAS_PASSWORD in .env.local before building.');
const salt = randomBytes(16);
const key = pbkdf2Sync(password, salt, 310000, 32, 'sha256');
function encrypt(bytes) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(bytes), cipher.final(), cipher.getAuthTag()]);
  return Buffer.concat([iv, encrypted]);
}
const entries = JSON.parse(readFileSync(path.join(source, 'entries.json'), 'utf8'));
const outputs = new Map();
for (const entry of entries) {
  for (const field of ['audio', 'image']) {
    if (!entry[field]) continue;
    if (!entry[field].startsWith('/atlas/')) throw new Error('Uploaded atlas media must be local before encryption.');
    const filename = path.basename(entry[field]);
    const encryptedName = createHash('sha256').update(filename).digest('hex').slice(0, 24) + '.enc';
    outputs.set(encryptedName, encrypt(readFileSync(path.join(source, filename))));
    const imageMime = { '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };
    const audioMime = { '.m4a': 'audio/mp4', '.mp3': 'audio/mpeg' };
    const extension = path.extname(filename).toLowerCase();
    const mime = (field === 'audio' ? audioMime : imageMime)[extension];
    if (!mime) throw new Error('Unsupported atlas media format.');
    entry[field] = { path: '/atlas/' + encryptedName, mime };
  }
}
outputs.set('collection.enc', Buffer.concat([Buffer.from([1]), salt, encrypt(Buffer.from(JSON.stringify(entries)))]));
// Replace rather than leave old plaintext or obsolete ciphertext in the publish directory.
rmSync(destination, { recursive: true, force: true });
mkdirSync(destination, { recursive: true });
for (const [name, bytes] of outputs) writeFileSync(path.join(destination, name), bytes);
console.log('Atlas collection and uploaded media encrypted.');
