export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4338ca" />
            <stop offset="0.55" stopColor="#047857" />
            <stop offset="1" stopColor="#a16207" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#logo-g)" />
        {/* a balance scale: A = OE + L */}
        <path d="M16 7v17M9 24h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 11h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 11l-3 6h6zM25 11l-3 6h6z" fill="none" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="16" cy="7" r="2" fill="#fbbf24" />
      </svg>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight">
          Accounting<span className="bg-gradient-to-r from-brand to-book bg-clip-text text-transparent">Mzansi</span>
        </span>
      )}
    </span>
  );
}
