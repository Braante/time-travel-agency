export default function Button({ as: As = "button", className = "", variant = "primary", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-amber-300/40"
  const styles =
    variant === "primary"
      ? "bg-amber-300 text-slate-950 hover:bg-amber-200 shadow-glow"
      : variant === "ghost"
      ? "bg-white/5 text-slate-50 hover:bg-white/10 border border-white/10"
      : "bg-emerald-400 text-slate-950 hover:bg-emerald-300 shadow-glow"
  return <As className={`${base} ${styles} ${className}`} {...props} />
}
