export default function Footer() {
  return (
    <footer className="px-6 max-w-[1100px] mx-auto w-full py-10 mt-24">
      <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-xs text-muted">
        <span>
          bach tran &copy; {new Date().getFullYear()}
        </span>
        <span className="text-muted/60">
          built quietly in adelaide <span className="blink">_</span>
        </span>
      </div>
    </footer>
  );
}
