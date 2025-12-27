"use client";

import { DynamicIsland } from "@/components/dynamic-island";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Calendar,
  ChevronRight,
  MapPin,
  Award,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Image from "next/image";

const experiencesData = {
  en: [
    {
      company: "Medsafe Brasil",
      role: "Full Stack Developer",
      period: "Oct 2025 - Present",
      achievements: [
        "Created SQL policies to enable new features",
        "Implemented secure authentication integrated with Google OAuth",
        "Structured and implemented reusable components in React and React Native, reducing rework and accelerating the development of new features",
        "Designed and developed REST routes in the backend for the notifications module, ensuring secure and scalable communication",
        "Integrated the mobile app with these APIs, implementing the complete flow of sending, receiving and displaying real-time notifications",
        "Optimized the architecture between frontend and backend, increasing the reliability of the alert system and reducing communication failures",
      ],
    },
    {
      company: "The Grife",
      role: "Full Stack Developer",
      period: "Apr 2025 - Oct 2025",
      achievements: [
        "Created and maintained attractive Landing Page, optimized for SEO and performance",
        "Developed custom E-commerce platform with order flow integrated with WhatsApp",
        "Implemented server-side rendering architecture (Next.js) and RESTful APIs (Node.js)",
        "Modeled relational database in PostgreSQL and configured production environment",
        "Applied TailwindCSS for modern, scalable and responsive interfaces",
      ],
    },
    {
      company: "Freelancer",
      role: "Full Stack Developer",
      period: "Jan 2025 - Present",
      achievements: [
        "Created custom web solutions for 10+ clients, including SaaS systems, Landing Pages and responsive E-commerces",
        "Delivered projects with 100% on-time approval, using technologies like TypeScript, Node.js, React.js and Next.js",
        "Implemented automated deploy pipelines with GitHub Actions, accelerating publication time by up to 50%",
        "Developed admin dashboards with secure authentication (OAuth2) and analytical reports with interactive charts",
      ],
    },
    {
      company: "LABIRAS - IFPI",
      role: "Full Stack Developer",
      period: "Mar 2023 - Apr 2024",
      achievements: [
        "Developed and maintained responsive web applications with React.js, Next.js and Node.js, reducing average page load time by 30%",
        "Implemented REST API integration and JWT authentication",
        "Collaborated with UI/UX designers to ensure Figma adherence, increasing end-user satisfaction by 25%",
        "Participated in code reviews and adoption of best practices (SOLID, Clean Code), reducing production bugs by 40%",
      ],
    },
  ],
  pt: [
    {
      company: "Medsafe Brasil",
      role: "Desenvolvedor Full Stack",
      period: "Out 2025 - Presente",
      achievements: [
        "Criei políticas em SQL para habilitar novas features",
        "Implementei autenticação segura integrada ao Google OAuth",
        "Estruturei e implementei componentes reutilizáveis em React e React Native, reduzindo retrabalho e acelerando o desenvolvimento de novas funcionalidades",
        "Projetei e desenvolvi rotas REST no backend para o módulo de notificações, garantindo comunicação segura e escalável",
        "Integrei o app mobile com essas APIs, implementando o fluxo completo de envio, recebimento e exibição de notificações em tempo real",
        "Otimizei a arquitetura entre frontend e backend, aumentando a confiabilidade do sistema de alertas e reduzindo falhas de comunicação",
      ],
    },
    {
      company: "The Grife",
      role: "Desenvolvedor Full Stack",
      period: "Abr 2025 - Out 2025",
      achievements: [
        "Criação e manutenção de Landing Page atrativa, otimizada para SEO e performance",
        "Desenvolvimento de plataforma de E-commerce customizada, com fluxo de pedido integrado ao WhatsApp",
        "Implementação de arquitetura server-side rendering (Next.js) e APIs RESTful (Node.js)",
        "Modelagem de banco de dados relacional em PostgreSQL e configuração de ambiente de produção",
        "Aplicação de TailwindCSS para interfaces modernas, escaláveis e responsivas",
      ],
    },
    {
      company: "Freelancer",
      role: "Desenvolvedor Full Stack",
      period: "Jan 2025 - Presente",
      achievements: [
        "Criei soluções web personalizadas para mais de 10 clientes, incluindo sistemas SaaS, Landing Pages e Ecommerces responsivos",
        "Entreguei projetos com 100% de aprovação no prazo, utilizando tecnologias como TypeScript, Node.js, React.js e Next.js",
        "Implementei pipelines de deploy automatizado com GitHub Actions, acelerando o tempo de publicação em até 50%",
        "Desenvolvi dashboards administrativos com autenticação segura (OAuth2) e relatórios analíticos com gráficos interativos",
      ],
    },
    {
      company: "LABIRAS - IFPI",
      role: "Desenvolvedor Full Stack",
      period: "Mar 2023 - Abr 2024",
      achievements: [
        "Desenvolvi e mantive aplicações web responsivas com React.js, Next.js e Node.js, reduzindo em 30% o tempo médio de carregamento das páginas",
        "Implementei integração com APIs REST e autenticação JWT",
        "Colaborei com UI/UX designers para garantir aderência ao Figma, aumentando a satisfação do usuário final em 25%",
        "Participei de code reviews e adoção de boas práticas (SOLID, Clean Code), reduzindo bugs em produção em 40%",
      ],
    },
  ],
};

const educationData = {
  en: [
    {
      institution: "Estácio University",
      degree: "Associate Degree in Systems Analysis and Development",
      period: "Jul 2025 - Dec 2027",
    },
    {
      institution: "IFPI - Federal Institute of Piauí",
      degree: "Technical High School - Electronics Technician",
      period: "Feb 2022 - Jan 2025",
    },
  ],
  pt: [
    {
      institution: "Universidade Estácio",
      degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      period: "Jul 2025 - Dez 2027",
    },
    {
      institution: "IFPI - Instituto Federal do Piauí",
      degree: "Técnico em Eletrônica integrado ao Ensino Médio",
      period: "Fev 2022 - Jan 2025",
    },
  ],
};

const certifications = [
  "HTTP e Performance",
  "Fundamentos do Next.js",
  "Formação em Lógica de Programação",
  "Full Stack Week",
  "Aprofundando em Hooks",
  "Back-end Oracle (Java & Spring Boot)",
];

const sidebarLinks = {
  en: [
    { label: "Introduction", href: "#introduction" },
    { label: "Current Role", href: "#current-role" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Technical Expertise", href: "#expertise" },
  ],
  pt: [
    { label: "Introdução", href: "#introduction" },
    { label: "Função Atual", href: "#current-role" },
    { label: "Experiência", href: "#experience" },
    { label: "Formação", href: "#education" },
    { label: "Certificações", href: "#certifications" },
    { label: "Expertise Técnica", href: "#expertise" },
  ],
};

export default function AboutPage() {
  const { language, setLanguage, t } = useLanguage();
  const experiences = experiencesData[language];
  const education = educationData[language];
  const links = sidebarLinks[language];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen">
      <DynamicIsland />

      <section className="pt-24 px-4 md:px-8 lg:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-500/30 mb-4">
                  <Image
                    src="/images/professional-image.png"
                    alt="Gildácio Lopes"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-mono">
                    Teresina, PI - Brasil
                  </span>
                </div>

                {/* Language Toggle */}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("en")}
                    className={`rounded-full ${
                      language === "en"
                        ? "bg-white/10 text-white"
                        : "border-white/20 text-muted-foreground hover:text-white"
                    }`}
                  >
                    English
                  </Button>
                  <Button
                    variant={language === "pt" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("pt")}
                    className={`rounded-full ${
                      language === "pt"
                        ? "bg-white/10 text-white"
                        : "border-white/20 text-muted-foreground hover:text-white"
                    }`}
                  >
                    Português
                  </Button>
                </div>
              </div>

              {/* Navigation - Fixed with proper onClick handlers */}
              <nav className="space-y-2">
                {links.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors py-2 w-full text-left"
                  >
                    <span className="w-4 h-px bg-muted-foreground" />
                    {link.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="space-y-12">
              {/* Header */}
              <ScrollReveal>
                <div id="introduction" className="space-y-6 scroll-mt-24">
                  <Button
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-full bg-transparent"
                    asChild
                  >
                    <a href="mailto:contato.gildaciolopes@gmail.com">
                      <Calendar className="w-4 h-4 mr-2" />
                      {t.about.scheduleCall}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>

                  <div>
                    <h1 className="text-5xl font-bold text-white mb-2">
                      {t.about.title}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      {t.about.role}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 rounded-full bg-transparent"
                      asChild
                    >
                      <a
                        href="https://github.com/gildaciolopes"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 rounded-full bg-transparent"
                      asChild
                    >
                      <a
                        href="https://linkedin.com/in/gildaciolopes"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 rounded-full bg-transparent"
                      asChild
                    >
                      <a href="mailto:contato.gildaciolopes@gmail.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  </div>

                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {t.about.bio}
                  </p>
                </div>
              </ScrollReveal>

              {/* Current Role */}
              <ScrollReveal delay={100}>
                <div id="current-role" className="space-y-6 scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                    <h2 className="text-3xl font-bold text-white">
                      {t.about.currentRole}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {experiences[0].company}
                        </h3>
                        <p className="text-purple-400">{experiences[0].role}</p>
                      </div>
                      <span className="text-muted-foreground">
                        {experiences[0].period}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {experiences[0].achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                          <span className="text-muted-foreground">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>

              {/* Experience History */}
              <ScrollReveal delay={150}>
                <div id="experience" className="space-y-6 scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-3xl font-bold text-white">
                      {language === "pt"
                        ? "Experiência Profissional"
                        : "Professional Experience"}
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {experiences.slice(1).map((exp, idx) => (
                      <div
                        key={idx}
                        className="relative pl-6 border-l-2 border-white/10"
                      >
                        <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-[#12121a] border-2 border-cyan-500" />
                        <div className="space-y-4">
                          <div className="flex items-start justify-between flex-wrap gap-2">
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {exp.company}
                              </h3>
                              <p className="text-cyan-400 text-sm">
                                {exp.role}
                              </p>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {exp.period}
                            </span>
                          </div>

                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <span className="w-1 h-1 rounded-full bg-cyan-500 mt-2 shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Education */}
              <ScrollReveal delay={200}>
                <div id="education" className="space-y-6 scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-green-400" />
                    <h2 className="text-3xl font-bold text-white">
                      {language === "pt" ? "Formação Acadêmica" : "Education"}
                    </h2>
                  </div>

                  <div className="grid gap-4">
                    {education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-green-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {edu.institution}
                            </h3>
                            <p className="text-green-400 text-sm">
                              {edu.degree}
                            </p>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Certifications */}
              <ScrollReveal delay={250}>
                <div id="certifications" className="space-y-6 scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-3xl font-bold text-white">
                      {language === "pt" ? "Certificações" : "Certifications"}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {certifications.map((cert) => (
                      <div
                        key={cert}
                        className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-sm text-yellow-300 hover:bg-yellow-500/20 transition-colors"
                      >
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Tech Tags */}
              <ScrollReveal delay={300}>
                <div id="expertise" className="space-y-6 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-white">
                    {language === "pt"
                      ? "Expertise Técnica"
                      : "Technical Expertise"}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">
                        {language === "pt"
                          ? "Linguagens e Tecnologias"
                          : "Languages & Technologies"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript", "TypeScript", "Go"].map((tech) => (
                          <code
                            key={tech}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-muted-foreground hover:border-purple-500/50 hover:text-purple-300 transition-colors"
                          >
                            {tech}
                          </code>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">
                        Frameworks/Bibliotecas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "React",
                          "React Native",
                          "Node.js",
                          "Express",
                          "Next.js",
                          "TailwindCSS",
                          "Shadcn",
                        ].map((tech) => (
                          <code
                            key={tech}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-muted-foreground hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                          >
                            {tech}
                          </code>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">
                        {language === "pt"
                          ? "Bancos de dados e ORM"
                          : "Databases & ORM"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["PostgreSQL", "Prisma", "Drizzle", "MongoDB"].map(
                          (tech) => (
                            <code
                              key={tech}
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-muted-foreground hover:border-green-500/50 hover:text-green-300 transition-colors"
                            >
                              {tech}
                            </code>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">
                        {language === "pt"
                          ? "Testes & Qualidade"
                          : "Testing & Quality"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Jest", "Testing Library", "ESLint", "Prettier"].map(
                          (tech) => (
                            <code
                              key={tech}
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-muted-foreground hover:border-yellow-500/50 hover:text-yellow-300 transition-colors"
                            >
                              {tech}
                            </code>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">
                        CI/CD & DevOps
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "GitHub Actions",
                          "Docker",
                          "Netlify",
                          "Vercel",
                          "AWS",
                        ].map((tech) => (
                          <code
                            key={tech}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-muted-foreground hover:border-orange-500/50 hover:text-orange-300 transition-colors"
                          >
                            {tech}
                          </code>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">
                        {language === "pt" ? "Integrações" : "Integrations"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "API REST",
                          "Webhooks",
                          "OAuth2",
                          "JWT",
                          "Stripe",
                          "Swagger",
                        ].map((tech) => (
                          <code
                            key={tech}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-muted-foreground hover:border-pink-500/50 hover:text-pink-300 transition-colors"
                          >
                            {tech}
                          </code>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
