import {
  CheckCheck,
  Brain,
  BookOpen,
  BriefcaseBusiness,
  Code2,
} from 'lucide-react'

import Header from './componets/Header'
import StatCard from './componets/StatCard'
import TaskList from './componets/TaskLIst'
import WeeklyPlan from './componets/WeeklyPlan'
import MentorshipProgress from './componets/MetroshipProgress'

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

export default function App() {
  const today = getTodayKey()

  const [tasks, setTasks] = useLocalStorage(
    `daily-tasks-${today}`,
    initialTasks.map((task) => ({ ...task, completed: false })),
  )

  const [completedStages, setCompletedStages] = useLocalStorage(
    'ai-mentorship-stages',
    [],
  )

  const completedTasks = tasks.filter((task) => task.completed).length
  const progress = Math.round(
    (completedTasks / Math.max(tasks.length, 1)) * 100,
  )

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
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
          <p className="text-sm font-medium text-indigo-100">
            YOUR DAILY RESET
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Progress, not perfection.
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">
            Focus on today's work. You don't need a perfect day; you need a
            consistent next step.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="min-w-40 flex-1">
              <div className="mb-2 flex justify-between text-sm">
                <span>Today's completion</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl bg-white/15 px-4 py-3">
              <p className="text-2xl font-bold">
                {completedTasks}/{tasks.length}
              </p>
              <p className="text-xs text-indigo-100">Tasks complete</p>
            </div>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Daily tasks"
            value={`${completedTasks}/${tasks.length}`}
            subtitle="Your checklist"
            icon={CheckCheck}
            color="indigo"
          />

          <StatCard
            title="DSA"
            value={tasks.find((task) => task.category === 'DSA')?.completed
              ? 'Done'
              : 'Pending'}
            subtitle="JavaScript practice"
            icon={Code2}
            color="emerald"
          />

          <StatCard
            title="College prep"
            value={tasks.find((task) => task.category === 'College')?.completed
              ? 'Done'
              : 'Pending'}
            subtitle="Today's study block"
            icon={BookOpen}
            color="amber"
          />

          <StatCard
            title="AI mentorship"
            value={`${completedStages.length}/${mentorshipStages.length}`}
            subtitle="Stages marked complete"
            icon={Brain}
            color="rose"
          />
        </section>

        <section className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <TaskList tasks={tasks} onToggle={toggleTask} />

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <BriefcaseBusiness size={21} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Career focus</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Improve Job Seed and practice interview communication.
                  </p>
                </div>
              </div>
            </div>
          </div>

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
          Your progress is saved in this browser.
        </footer>
      </div>
    </main>
  )
}