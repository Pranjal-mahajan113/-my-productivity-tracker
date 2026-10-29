import { CheckCircle2, Circle } from 'lucide-react'

export default function TaskList({ tasks, onToggle }) {
  const completed = tasks.filter((task) => task.completed).length

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Daily Tasks</h2>
          <p className="mt-1 text-sm text-slate-500">
            One task at a time. Keep showing up.
          </p>
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
          {completed}/{tasks.length}
        </span>
      </div>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{
            width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%`,
          }}
        />
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => onToggle(task.id)}
            className="flex w-full items-start gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:bg-slate-50"
          >
            {task.completed ? (
              <CheckCircle2
                size={21}
                className="mt-0.5 shrink-0 text-emerald-500"
              />
            ) : (
              <Circle size={21} className="mt-0.5 shrink-0 text-slate-300" />
            )}

            <div className="min-w-0 flex-1">
              <p
                className={`font-medium ${
                  task.completed
                    ? 'text-slate-400 line-through'
                    : 'text-slate-800'
                }`}
              >
                {task.title}
              </p>
              <p className="mt-1 text-sm text-slate-500">{task.detail}</p>
            </div>

            <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600">
              {task.category}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}