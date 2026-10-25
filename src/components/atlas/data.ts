export type Kind = "recording" | "photo" | "post" | "article" | "book" | "video" | "leetcode" | "quote" | "learning";
export type AtlasAudience = "public" | "private";
export type Entry = {
  id: string;
  kind: Kind;
  title: string;
  subtitle?: string;
  byline: string;
  date?: string;
  note?: string;
  text?: string;
  url?: string;
  image?: string;
  videoId?: string;
  audio?: string;
  recordingType?: "demo" | "fingerstyle" | "cover";
  completed?: boolean;
  difficulty?: "Easy" | "Medium" | "Hard";
  color?: string;
};

export const categories: { kind: Kind; label: string; verb: string }[] = [
  { kind: "recording", label: "music", verb: "recorded" },
  { kind: "photo", label: "photos", verb: "photographed" },
  { kind: "post", label: "posts", verb: "posted" },
  { kind: "article", label: "articles", verb: "read" },
  { kind: "book", label: "books", verb: "read" },
  { kind: "video", label: "videos", verb: "watched" },
  { kind: "leetcode", label: "leetcode", verb: "solved" },
  { kind: "quote", label: "quotes", verb: "saved" },
  { kind: "learning", label: "learning", verb: "learned" },
];

export function monthKey(entry: Entry) { return entry.date?.slice(0, 7) || "undated"; }
export function monthLabel(key: string) {
  return key === "undated" ? "undated" : new Date(`${key}-15T12:00:00`).toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}
export function dateLabel(date?: string) {
  return date ? new Date(`${date}T12:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "undated";
}

export function entryLabel(entry: Entry) {
  return entry.completed === false ? "in progress" : dateLabel(entry.date);
}
