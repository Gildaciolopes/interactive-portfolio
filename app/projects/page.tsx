"use client";

import React, { useEffect, useState } from "react";
import { DynamicIsland } from "@/components/dynamic-island";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useLanguage } from "@/contexts/language-context";
import {
  projects as homeProjects,
  Project,
} from "@/components/projects-section";
import { PhoneMockupModal } from "@/components/phone-mockup-modal";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mergedProjects = homeProjects.map((hp) => ({
    title:
      typeof hp.title === "object"
        ? (hp.title[language] ?? hp.title.en)
        : hp.title,
    description:
      typeof hp.description === "object"
        ? (hp.description[language] ?? hp.description.en)
        : hp.description,
    image: hp.image,
    link: hp.link,
    repo: hp.repo,
    team: (hp as any).team ?? 1,
    key: typeof hp.title === "object" ? hp.title.en : hp.title,
  }));

  const [contributorsMap, setContributorsMap] = useState<Record<string, any[]>>(
    {},
  );

  useEffect(() => {
    const controllers: AbortController[] = [];

    homeProjects.forEach((hp) => {
      const key = typeof hp.title === "object" ? hp.title.en : hp.title;
      const repoCandidate = hp.repo || hp.link;

      const parseRepo = (input?: string) => {
        if (!input) return null;
        try {
          const match = input.match(
            /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i,
          );
          if (match) return `${match[1]}/${match[2].replace(/\.git$/i, "")}`;
          if (input.split("/").length === 2) return input;
        } catch (e) {
          return null;
        }
        return null;
      };

      const repo = parseRepo(repoCandidate);
      if (!repo) return;

      const controller = new AbortController();
      controllers.push(controller);

      fetch(`https://api.github.com/repos/${repo}/contributors?per_page=6`, {
        signal: controller.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch contributors");
          return res.json();
        })
        .then((data) => {
          if (!Array.isArray(data)) return;
          const filtered = data.filter((d: any) => {
            const login = (d.login || "").toLowerCase();
            if (login.includes("vercel")) return false;
            if (login.includes("copilot")) return false;
            if ((d.type || "").toLowerCase() === "bot") return false;
            return true;
          });
          setContributorsMap((prev) => ({
            ...prev,
            [key]: filtered.slice(0, 6),
          }));
        })
        .catch(() => {});
    });

    return () => controllers.forEach((c) => c.abort());
  }, []);

  return (
    <main className="min-h-screen">
      <DynamicIsland />

      <section className="pt-24 px-4 md:px-8 lg:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <h1 className="text-4xl font-bold text-white">
                {t.sections.myProjects}
              </h1>
              <div className="w-12 h-1 bg-purple-500 rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {mergedProjects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 100}>
                <div
                  className="group bg-[#12121a] rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-500 h-full cursor-pointer"
                  onClick={() => {
                    setSelectedProject(homeProjects[index]);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#12121a] via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-cyan-400">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        {contributorsMap[project.key]
                          ? contributorsMap[project.key].map((contributor) => (
                              <a
                                key={contributor.id || contributor.login}
                                href={contributor.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-[#0f1724] border border-white/10"
                                title={contributor.login}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <img
                                  src={contributor.avatar_url}
                                  alt={contributor.login}
                                  className="w-full h-full object-cover"
                                />
                              </a>
                            ))
                          : Array.from({
                              length: Math.min(project.team, 4),
                            }).map((_, i) => (
                              <div
                                key={i}
                                className="w-7 h-7 rounded-full bg-linear-to-br from-purple-500 to-cyan-500 border-2 border-[#12121a]"
                              />
                            ))}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-6">
                      {project.repo && (
                        <a
                          href={
                            project.repo.startsWith("http")
                              ? project.repo
                              : `https://github.com/${project.repo}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t.common.readCaseStudy}
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      )}

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t.common.viewProject}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {selectedProject && (
            <PhoneMockupModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedProject(null);
              }}
              project={{
                title: selectedProject.title[language],
                description: selectedProject.description[language],
                screenshots: selectedProject.screenshots,
                image: selectedProject.image,
                link: selectedProject.link,
                repo: selectedProject.repo,
                tags: selectedProject.tags,
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
}
