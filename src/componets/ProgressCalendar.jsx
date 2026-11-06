import { useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'

function formatKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function ProgressCalendar({
  history,
  selectedDate,
  onSelectDate,
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()

  const monthName = currentMonth.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  })

  const days = Array.from(
    { length: firstDay + totalDays },
    (_, index) => {
      if (index < firstDay) return null
      return index - firstDay + 1
    },
  )

  const monthlyRecords = Object.entries(history).filter(([date]) => {
    const [recordYear, recordMonth] = date.split('-').map(Number)
    return recordYear === year && recordMonth === month + 1
  })

  const monthlyTasks = monthlyRecords.reduce(
    (total, [, tasks]) => total + tasks.length,
    0,
  )

  const monthlyCompleted = monthlyRecords.reduce(
    (total, [, tasks]) =>
      total + tasks.filter((task) => task.completed).length,
    0,
  )

  const monthlyProgress = monthlyTasks
    ? Math.round((monthlyCompleted / monthlyTasks) * 100)
    : 0

  function changeMonth(direction) {
    setCurrentMonth(new Date(year, month + direction, 1))
  }

  function getProgress(date) {
    const record = history[formatKey(year, month, date)]

    if (!record || !record.length) return 0

    const completed = record.filter((task) => task.completed).length

    return Math.round((completed / record.length) * 100)
  }

  function getDayStyle(progress) {
    if (progress === 0) return 'bg-slate-100 text-slate-500'
    if (progress < 40) return 'bg-rose-100 text-rose-700'
    if (progress < 80) return 'bg-amber-100 text-amber-700'
    return 'bg-emerald-100 text-emerald-700'
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="text-indigo-600" size={22} />
            <h2 className="text-xl font-bold text-slate-900">
              Progress Calendar
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Click any date to view your daily history.
          </p>
        </div>

        <div className="rounded-xl bg-indigo-50 px-4 py-3">
          <p className="text-xs text-indigo-600">Monthly progress</p>
          <p className="text-xl font-bold text-indigo-700">
            {monthlyProgress}%
          </p>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>

        <h3 className="font-bold text-slate-800">
          {monthName}
        </h3>

        <button
          onClick={() => changeMonth(1)}
          className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="py-2 text-xs font-semibold text-slate-400"
          >
            {day}
          </div>
        ))}

        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} />
          }

          const key = formatKey(year, month, date)
          const progress = getProgress(date)
          const isSelected = selectedDate === key
          const isToday = key === formatKey(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
          )

          return (
            <button
              key={key}
              onClick={() => onSelectDate(key)}
              className={`relative flex min-h-12 flex-col items-center justify-center rounded-xl border text-sm transition hover:scale-105 ${
                isSelected
                  ? 'border-indigo-500 ring-2 ring-indigo-200'
                  : 'border-transparent'
              } ${getDayStyle(progress)}`}
            >
              <span className="font-semibold">{date}</span>

              {history[key] && (
                <span className="mt-0.5 text-[9px] font-medium">
                  {progress}%
                </span>
              )}

              {isToday && (
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-indigo-600" />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-rose-100" />
          Low progress
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-amber-100" />
          Medium
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-emerald-100" />
          Great progress
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-slate-100" />
          No record
        </span>
      </div>

      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">
          Selected date: {selectedDate}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {history[selectedDate]
            ? `${history[selectedDate].filter((task) => task.completed).length} of ${history[selectedDate].length} tasks completed`
            : 'No saved activity for this date yet.'}
        </p>
      </div>

    </section>
  )
}