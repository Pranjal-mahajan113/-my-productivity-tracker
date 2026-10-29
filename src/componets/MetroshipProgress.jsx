import { Check, Circle } from 'lucide-react'

export default function MentorshipProgress({ stages, completed, onToggle }) {
  const percentage = Math.round((completed.length / stages.length) * 100)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            AI Engineering
          </h2>
          <p className="mt-1 text-sm text-slate-500">12-week roadmap</p>
        </div>

        <span className="text-lg font-bold text-indigo-600">
          {percentage}%
        </span>
      </div>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="space-y-3">
        {stages.map((stage) => {
          const isDone = completed.includes(stage.id)

          return (
            <button
              key={stage.id}
              onClick={() => onToggle(stage.id)}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left hover:bg-slate-50"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone ? <Check size={17} /> : <Circle size={17} />}
              </span>

              <div>
                <p
                  className={`text-sm font-semibold ${
                    isDone ? 'text-slate-400 line-through' : 'text-slate-800'
                  }`}
                >
                  {stage.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">{stage.weeks}</p>
              </div>
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Mark a stage complete only when you have finished its learning work.
        These are broad milestones, not a substitute for tracking individual
        lessons and projects.
      </p>
    </section>
  )
}