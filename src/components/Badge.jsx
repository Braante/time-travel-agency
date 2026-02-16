export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-200/15 bg-amber-200/10 px-3 py-1 text-xs font-medium text-amber-100">
      {children}
    </span>
  )
}
