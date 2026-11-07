const key = "atlas_visitor";
const valid = (id: string | null): id is string => !!id && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

/** Persist before sending a request, so a refresh during the request reuses the ID. */
export function savedVisitor(): string | null {
  const cookie = () => {
    try { return document.cookie.split("; ").find(value => value.startsWith(`${key}=`))?.slice(key.length + 1) || null; }
    catch { return null; }
  };
  let id = cookie();
  try { if (!valid(id)) id = localStorage.getItem(key); } catch { /* Cookies can still persist the ID. */ }
  if (!valid(id)) id = crypto.randomUUID();
  let persisted = false;
  try { localStorage.setItem(key, id); persisted = localStorage.getItem(key) === id; } catch { /* Storage may be disabled. */ }
  try {
    document.cookie = `${key}=${id}; Path=/; Max-Age=34560000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  } catch { /* Local storage can still persist the ID. */ }
  // If neither mechanism works, only read the total; do not count every reload.
  return persisted || cookie() === id ? id : null;
}
