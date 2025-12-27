"use client"

import { useLanguage } from "@/contexts/language-context"
import { Github } from "lucide-react"
import { useEffect, useState } from "react"

export function GitHubActivity() {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate random contribution data
  const generateContributions = () => {
    const weeks = 15
    const days = 7
    const contributions: number[][] = []

    for (let w = 0; w < weeks; w++) {
      const week: number[] = []
      for (let d = 0; d < days; d++) {
        week.push(Math.floor(Math.random() * 5))
      }
      contributions.push(week)
    }
    return contributions
  }

  const contributions = generateContributions()

  const getColor = (level: number) => {
    const colors = ["bg-[#1a1a24]", "bg-purple-900/40", "bg-purple-700/50", "bg-purple-500/60", "bg-purple-400/80"]
    return colors[level] || colors[0]
  }

  if (!mounted) {
    return (
      <div className="bg-[#12121a] rounded-2xl p-6 border border-white/5">
        <div className="skeleton h-8 w-48 rounded mb-6" />
        <div className="skeleton h-32 rounded" />
      </div>
    )
  }

  return (
    <div className="bg-[#12121a] rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <Github className="w-6 h-6 text-white" />
        <h3 className="text-lg font-semibold text-white">{t.sections.githubActivity}</h3>
      </div>

      <div className="flex gap-1 overflow-hidden">
        {contributions.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((level, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`w-3 h-3 rounded-sm ${getColor(level)} transition-all duration-300 hover:scale-125`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
        <span>{t.common.less}</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`w-3 h-3 rounded-sm ${getColor(level)}`} />
          ))}
        </div>
        <span>{t.common.more}</span>
      </div>
    </div>
  )
}
