import { useState } from 'react'
import {
  CheckCheck,
  Brain,
  BookOpen,
  Code2,
} from 'lucide-react'

import Header from './componets/Header'
import StatCard from './componets/StatCard'
import TaskList from './componets/TaskLIst'
import WeeklyPlan from './componets/WeeklyPlan'
import MentorshipProgress from './componets/MetroshipProgress'
import ProgressCalendar from './componets/ProgressCalendar'

import {
  initialTasks,
  weeklyPlan,
  mentorshipStages,
} from './data/initialData'

import useLocalStorage from './hooks/useLocalStorage'

function getTodayKey() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getDefaultTasks() {
  return initialTasks.map((task) => ({
    ...task,
    completed: false,
  }))
}

export default function App() {
  const today = getTodayKey()

  const [history, setHistory] = useLocalStorage(
    'daily-progress-history',
    {},
  )

  const [selectedDate, setSelectedDate] = useState(today)

  const [completedStages, setCompletedStages] = useLocalStorage(
    'ai-mentorship-stages',
    [],
  )

  const tasks = history[selectedDate] || getDefaultTasks()

  const completedTasks = tasks.filter(
    (task) => task.completed,
  ).length

  const progress = Math.round(
    (completedTasks / Math.max(tasks.length, 1)) * 100,
  )

  function toggleTask(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task,
    )

    setHistory((current) => ({
      ...current,
      [selectedDate]: updatedTasks,
    }))
  }

  function toggleStage(id) {
    setCompletedStages((current) =>
      current.includes(id)
        ? current.filter((stageId) => stageId !== id)
        : [...current, id],
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <Header />

        <section className="mb-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm text-indigo-100">
            YOUR DAILY RESET
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Progress, not perfection.
          </h2>

          <p className="mt-2 text-sm text-indigo-100">
            Focus on today's work. Keep showing up.
          </p>

          <div className="mt-6 max-w-xl">
            <div className="mb-2 flex justify-between text-sm">
              <span>
                {selectedDate === today
                  ? "Today's progress"
                  : `Progress on ${selectedDate}`}
              </span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Tasks completed"
            value={`${completedTasks}/${tasks.length}`}
            subtitle="Selected date"
            icon={CheckCheck}
            color="indigo"
          />

          <StatCard
            title="DSA"
            value={
              tasks.find((task) => task.category === 'DSA')?.completed
                ? 'Done'
                : 'Pending'
            }
            subtitle="JavaScript practice"
            icon={Code2}
            color="emerald"
          />

          <StatCard
            title="College preparation"
            value={
              tasks.find((task) => task.category === 'College')?.completed
                ? 'Done'
                : 'Pending'
            }
            subtitle="Study progress"
            icon={BookOpen}
            color="amber"
          />

          <StatCard
            title="AI mentorship"
            value={`${completedStages.length}/${mentorshipStages.length}`}
            subtitle="Stages completed"
            icon={Brain}
            color="rose"
          />
        </section>

        {/* Calendar and history */}
        <section className="mb-8">
          <ProgressCalendar
            history={history}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </section>

        <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
          />

          <div className="space-y-6">
            <WeeklyPlan plan={weeklyPlan} />

            <MentorshipProgress
              stages={mentorshipStages}
              completed={completedStages}
              onToggle={toggleStage}
            />
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-400">
          Your daily history is saved in this browser.
        </footer>

      </div>
    </main>
  )
}