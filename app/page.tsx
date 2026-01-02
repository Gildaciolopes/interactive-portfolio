"use client";

import { DynamicIsland } from "@/components/dynamic-island";
import { TerminalTyping } from "@/components/terminal-typing";
import { GitHubActivity } from "@/components/github-activity";
import { DevCommunity } from "@/components/dev-community";
import { StacksScroll } from "@/components/stacks-scroll";
import { ProjectsSection } from "@/components/projects-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <DynamicIsland />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 md:px-8 lg:px-16 pt-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t.hero.titleMain}{" "}
                <span className="text-muted-foreground">
                  {t.hero.titleSmall}
                </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
                  {t.hero.titleHighlight}
                </span>
                <span className="text-cyan-400">.</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
                {t.hero.role}{" "}
                <a
                  href="https://medsafebrasil.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <code className="px-2 py-1 bg-white/10 rounded text-sm text-white hover:text-purple-400 transition-colors">
                    Medsafe Brasil
                  </code>
                </a>
              </p>
              <p className="text-muted-foreground">{t.hero.experience}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-white text-black hover:bg-white/90 rounded-full px-6"
              >
                <Link href="/projects">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.hero.cta.projects}
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="text-white border border-transparent rounded-full px-6 cursor-pointer transition-colors hover:text-white hover:bg-transparent! hover:border hover:border-white/70"
              >
                <Download className="w-4 h-4 mr-2" />
                {t.hero.cta.cv}
              </Button>
              <Button
                variant="ghost"
                asChild
                className="text-white border border-transparent rounded-full px-6 cursor-pointer transition-colors hover:text-white hover:bg-transparent! hover:border hover:border-white/70"
              >
                <Link href="/about">
                  <Image
                    src="/images/professional-image.png"
                    alt="Gildácio Lopes"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                  {t.hero.cta.about}
                </Link>
              </Button>
            </div>

            {/* Stack Icons */}
            <div className="flex items-center gap-4 pt-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Image
                  src="/images/typescript.svg"
                  alt="TypeScript"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Image
                  src="/images/react.svg"
                  alt="React"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Image
                  src="/images/nextjs2.svg"
                  alt="Next.js"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>

              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Image
                  src="/images/nodejs.svg"
                  alt="Node.js"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Image
                  src="/images/postgresql.svg"
                  alt="PostgreSQL"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Content - Terminal */}
          <div className="flex justify-center lg:justify-end">
            <TerminalTyping />
          </div>
        </div>
      </section>

      {/* GitHub & Community Section */}
      <ScrollReveal>
        <section className="px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <GitHubActivity />
            <DevCommunity />
          </div>
        </section>
      </ScrollReveal>

      {/* Stacks Section */}
      <ScrollReveal delay={100}>
        <section className="px-4 md:px-8 lg:px-16 py-8">
          <div className="max-w-7xl mx-auto">
            <StacksScroll />
          </div>
        </section>
      </ScrollReveal>

      {/* Projects Section */}
      <ScrollReveal delay={200}>
        <section className="px-4 md:px-8 lg:px-16 pb-24">
          <div className="max-w-7xl mx-auto">
            <ProjectsSection />
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
