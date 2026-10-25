import type { Metadata } from "next";
import AtlasCollection from "@/components/atlas/collection";
import "../atlas.css";

export const metadata: Metadata = {
  title: "Private Atlas - Bach Tran",
  description: "A private collection.",
  robots: { index: false, follow: false },
};

export default function PrivateAtlasPage() {
  return <AtlasCollection audience="private" />;
}
