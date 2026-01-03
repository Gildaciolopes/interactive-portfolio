"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export const projects = [
  {
    title: {
      pt: "SaaS de Agendamento para Clínicas Médicas",
      en: "Clinic Scheduling SaaS",
    },
    description: {
      pt: "Sistema completo de agendamentos, com dashboard administrativo e gestão de pacientes.",
      en: "Complete scheduling system for medical clinics with administrative dashboard and patient management.",
    },
    image: "/images/drSchedule.svg",
    link: "https://doctor-schedule-oz7u.vercel.app/",
    repo: "Gildaciolopes/doctor-schedule",
    tags: [
      "TypeScript",
      "Next.js",
      "React.js",
      "Node.js",
      "PostgreSQL",
      "Drizzle",
    ],
    category: "web",
    // repo do github é opcional, quando mostrado os contribuidores são buscados via API.
    // repo: "owner/repo",
  },
  {
    title: {
      pt: "SaaS de Agendamento para Barbearias",
      en: "Barber Shop Scheduling SaaS",
    },
    description: {
      pt: "Plataforma de agendamento online para barbearias com sistema de reservas e gestão de serviços.",
      en: "Online scheduling platform for barber shops with booking system and service management.",
    },
    image: "/images/FSW-Barber.png",
    link: "https://fsw-barber-gules-five.vercel.app/",
    repo: "Gildaciolopes/fsw-barber",
    tags: [
      "TypeScript",
      "Next.js",
      "React.js",
      "Node.js",
      "PostgreSQL",
      "Prisma",
    ],
    category: "web",
  },
  {
    title: {
      pt: "Self Checkout para Lanchonetes e Pagamentos com Stripe",
      en: "Self Checkout for Fast Food",
    },
    description: {
      pt: "Sistema com foco em diminuir filas em lanchonetes, automatizando pedidos e pagamentos.",
      en: "Self-service system for fast food restaurants with Stripe payment integration.",
    },
    image: "/images/FSW-Donalds.png",
    link: "https://fullstackweek-donalds-eight.vercel.app/fsw-donalds",
    repo: "Gildaciolopes/fullstackweek-donalds",
    tags: [
      "TypeScript",
      "Next.js",
      "React.js",
      "Node.js",
      "PostgreSQL",
      "Prisma",
    ],
    category: "web",
  },
];

export function ProjectsSection() {
  const { language, t } = useLanguage();
  const [contributorsMap, setContributorsMap] = useState<
    Record<string, Array<any>>
  >({});

  useEffect(() => {
    const controllers: AbortController[] = [];

    projects.forEach((project) => {
      const key = project.title.en;
      const repoCandidate = project.repo || project.link;

      const parseRepo = (input?: string) => {
        if (!input) return null;
        try {
          const match = input.match(
            /github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/i
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
    <section className="py-16">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-white">
          {t.sections.myProjects}
        </h2>
        <div className="w-12 h-1 bg-purple-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.title.en}
            className="group bg-[#12121a] rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title[language]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#12121a] via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                {project.title[language]}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-white/5 text-muted-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="text-xs px-2 py-1 bg-white/5 text-muted-foreground rounded-full">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>

              {contributorsMap[project.title.en] && (
                <div className="flex items-center -space-x-2 mb-3">
                  {contributorsMap[project.title.en].map((contributor: any) => (
                    <a
                      key={contributor.id || contributor.login}
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-8 h-8 rounded-full ring-2 ring-[#0f1724] overflow-hidden border border-white/10"
                      title={contributor.login}
                    >
                      <img
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  ))}
                </div>
              )}

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description[language]}
              </p>

              <div className="flex items-center gap-2 mt-4 text-sm">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors"
                >
                  {t.common.viewProject}
                  <ExternalLink className="w-4 h-4" />
                </a>

                {project.repo && (
                  <a
                    href={
                      project.repo.startsWith("http")
                        ? project.repo
                        : `https://github.com/${project.repo}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-muted-foreground hover:text-white transition-colors"
                    title="Repositório GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
