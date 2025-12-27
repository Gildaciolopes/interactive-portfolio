"use client";

import { useLanguage } from "@/contexts/language-context";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Day = { date: string; contributionCount: number };

export function GitHubActivity() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [weeks, setWeeks] = useState<Day[][] | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const load = async () => {
      try {
        const res = await fetch("/api/github-contributions");
        if (!res.ok) {
          const j = await res.json().catch(() => null);
          setError(j?.error || "Failed to fetch contributions");
          return;
        }
        const json = await res.json();
        const weeksData =
          json?.data?.user?.contributionsCollection?.contributionCalendar
            ?.weeks || [];

        const mapped: Day[][] = weeksData.map((w: any) =>
          w.contributionDays.map((d: any) => ({
            date: d.date,
            contributionCount: d.contributionCount,
          }))
        );
        setWeeks(mapped.slice(-20));
        setUsername(json?.data?.user?.login || null);
      } catch (err: any) {
        setError(err.message || String(err));
      }
    };

    load();
  }, []);

  const getColor = (count: number) => {
    if (count <= 0) return "bg-[#1a1a24]";
    if (count === 1) return "bg-purple-900/40";
    if (count < 4) return "bg-purple-700/50";
    if (count < 8) return "bg-purple-500/60";
    return "bg-purple-400/80";
  };

  if (!mounted) {
    return (
      <div className="bg-[#12121a] rounded-2xl overflow-hidden border border-white/5">
        <div className="p-6 pb-0">
          <div className="skeleton h-8 w-48 rounded mb-6" />
        </div>
        <div className="relative h-80 mt-4">
          <div className="skeleton h-full rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#12121a] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300">
      <div className="flex items-center gap-3 p-6 pb-0">
        <Github className="w-6 h-6 text-white" />
        <h3 className="text-lg font-semibold text-white">
          {t.sections.githubActivity}
        </h3>
      </div>

      <div className="relative h-80 mt-4 px-6">
        {error && <div className="text-sm text-destructive mb-4">{error}</div>}

        <div className="flex gap-2 overflow-x-auto pt-8 pb-2 justify-center items-center">
          {weeks ? (
            weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-2">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    title={`${day.date}: ${day.contributionCount} contribution(s)`}
                    className={`${getColor(
                      day.contributionCount
                    )} w-4 h-4 rounded-xs transition-all duration-200 hover:scale-110`}
                  />
                ))}
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">
              Carregando contribuições...
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 mt-4 text-sm text-muted-foreground">
          <span>{t.common.less}</span>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-4 h-4 rounded-xs ${
                  [
                    "bg-[#1a1a24]",
                    "bg-purple-900/40",
                    "bg-purple-700/50",
                    "bg-purple-500/60",
                    "bg-purple-400/80",
                  ][level]
                }`}
              />
            ))}
          </div>
          <span>{t.common.more}</span>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Button
            variant="outline"
            asChild
            className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-purple-500 transition-colors rounded-full px-4 py-2"
          >
            <a
              href={
                username
                  ? `https://github.com/${username}`
                  : "https://github.com"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              {"Entrar no GitHub"}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
