"use client";

import { useLanguage } from "@/contexts/language-context";
import { ExternalLink } from "lucide-react";
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
    tags: [
      "TypeScript",
      "Next.js",
      "React.js",
      "Node.js",
      "PostgreSQL",
      "Drizzle",
    ],
    category: "web",
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
          <a
            key={project.title.en}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
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

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description[language]}
              </p>

              <div className="flex items-center gap-2 text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">
                {t.common.viewProject}
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
