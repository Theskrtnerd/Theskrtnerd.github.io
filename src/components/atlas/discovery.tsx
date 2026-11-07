export default function AtlasDiscovery() {
  return (
    <div id="secret" role="group" aria-labelledby="secret-heading" className="mt-8 grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-7 scroll-mt-24">
      <h3 id="secret-heading" className="font-mono text-xs leading-7 text-muted">secret</h3>
      <p id="atlas-discovery-prompt" className="max-w-[72ch] text-[0.9375rem] leading-7 text-muted">
        there’s a hidden word on this page. add it after / in this site’s address
        to discover a little more about me.
      </p>
    </div>
  );
}
