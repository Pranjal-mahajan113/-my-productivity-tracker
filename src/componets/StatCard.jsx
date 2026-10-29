export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'indigo',
}) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>

        {Icon && (
          <div className={`rounded-xl p-3 ${colors[color] || colors.indigo}`}>
            <Icon size={21} />
          </div>
        )}
      </div>
    </div>
  )
}