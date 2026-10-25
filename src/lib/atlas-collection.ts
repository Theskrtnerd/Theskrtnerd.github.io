import { createDecipheriv, pbkdf2Sync } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { AtlasAudience, Entry } from "@/components/atlas/data";

type Media = { path: string; mime: string };
type SealedEntry = Omit<Entry, "audio" | "image"> & { audio?: Media; image?: Media };
const directory = path.join(process.cwd(), "public", "atlas");
function decrypt(bytes: Buffer, key: Buffer) {
  const decipher = createDecipheriv("aes-256-gcm", key, bytes.subarray(0, 12));
  decipher.setAuthTag(bytes.subarray(-16));
  return Buffer.concat([decipher.update(bytes.subarray(12, -16)), decipher.final()]);
}
function openCollection() {
  const password = process.env.ATLAS_PASSWORD;
  if (!password) throw new Error("Atlas is not configured.");
  const envelope = readFileSync(path.join(directory, "collection.enc"));
  if (envelope[0] !== 1) throw new Error("Unsupported collection.");
  const key = pbkdf2Sync(password, envelope.subarray(1, 17), 310000, 32, "sha256");
  const entries: SealedEntry[] = JSON.parse(decrypt(envelope.subarray(17), key).toString("utf8"));
  return { entries, key };
}
function visibleEntries(entries: SealedEntry[], audience: AtlasAudience) {
  return audience === "private" ? entries : entries.filter(entry => entry.kind !== "recording" && entry.kind !== "leetcode" && !entry.audio);
}
export function atlasEntries(audience: AtlasAudience = "public"): Entry[] {
  const mediaBase = audience === "private" ? "/api/atlas/private/media" : "/api/atlas/media";
  return visibleEntries(openCollection().entries, audience).map(({ audio, image, ...fields }) => ({
    ...fields,
    ...(audio ? { audio: `${mediaBase}/${path.basename(audio.path)}/` } : {}),
    ...(image ? { image: `${mediaBase}/${path.basename(image.path)}/` } : {}),
  }));
}
export function atlasMedia(filename: string, audience: AtlasAudience = "public") {
  if (!/^[a-f0-9]{24}\.enc$/.test(filename)) return null;
  const { entries, key } = openCollection();
  const asset = visibleEntries(entries, audience).flatMap(entry => [entry.audio, entry.image]).find(media => media && path.basename(media.path) === filename);
  if (!asset) return null;
  return { bytes: decrypt(readFileSync(path.join(directory, filename)), key), mime: asset.mime };
}
