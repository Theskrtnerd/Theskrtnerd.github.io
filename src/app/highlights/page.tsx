import { redirect } from "next/navigation";

// Preserve bookmarks to the former standalone page.
export default function HighlightsPage() {
  redirect("/#highlights");
}
