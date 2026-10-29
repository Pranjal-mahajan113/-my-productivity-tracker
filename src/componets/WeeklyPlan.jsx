export default function WeeklyPlan({ plan }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  })

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">Weekly Study Plan</h2>
        <p className="mt-1 text-sm text-slate-500">
          Main subject + evening revision
        </p>
      </div>

      <div className="space-y-3">
        {plan.map((item) => {
          const isToday = item.day === today

          return (
            <div
              key={item.day}
              className={`rounded-xl border p-4 ${
                isToday
                  ? 'border-indigo-200 bg-indigo-50/60'
                  : 'border-slate-100 bg-white'
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-semibold text-slate-800">{item.day}</p>
                {isToday && (
                  <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
                    Today
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-slate-700">
                Study: {item.subject}
              </p>
              <p className="mt-1 text-sm text-slate-500">{item.task}</p>
              <p className="mt-2 text-sm text-indigo-700">
                Revision: {item.revision}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}