"use client";

import { DynamicIsland } from "@/components/dynamic-island";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useLanguage } from "@/contexts/language-context";
import { projects as homeProjects } from "@/components/projects-section";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const { t, language } = useLanguage();

  const mergedProjects = homeProjects.map((hp) => ({
    title:
      typeof hp.title === "object"
        ? hp.title[language] ?? hp.title.en
        : hp.title,
    description:
      typeof hp.description === "object"
        ? hp.description[language] ?? hp.description.en
        : hp.description,
    image: hp.image,
    link: hp.link,
    team: hp.team ?? 1,
  }));

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mergedProjects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 100}>
                <div className="group bg-[#12121a] rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-500 h-full">
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
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        {Array.from({ length: Math.min(project.team, 4) }).map(
                          (_, i) => (
                            <div
                              key={i}
                              className="w-7 h-7 rounded-full bg-linear-to-br from-purple-500 to-cyan-500 border-2 border-[#12121a]"
                            />
                          )
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-6">
                      <Link
                        href={project.link}
                        className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {t.common.readCaseStudy}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href={project.link}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
                      >
                        {t.common.viewProject}
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
