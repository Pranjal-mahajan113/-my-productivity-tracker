import { CalendarDays, Sun } from 'lucide-react'

export default function Header() {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="mb-1 text-sm font-medium text-indigo-600">
          YOUR PERSONAL WORKSPACE
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          My Progress
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Small steps, consistent progress.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Sun size={18} className="text-amber-500" />
        <div>
          <p className="text-xs text-slate-500">Today</p>
          <p className="text-sm font-semibold text-slate-800">{today}</p>
        </div>
        <CalendarDays size={18} className="ml-2 text-slate-400" />
      </div>
    </header>
  )
}