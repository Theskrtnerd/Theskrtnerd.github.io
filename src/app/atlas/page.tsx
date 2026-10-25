import type { Metadata } from "next";
import AtlasCollection from "@/components/atlas/collection";
import "./atlas.css";

export const metadata: Metadata = {
  title: "Atlas - Bach Tran",
  description: "Photos and things I’ve read or watched.",
  robots: { index: false, follow: false },
};

export default function AtlasPage() {
  return <AtlasCollection />;
}
