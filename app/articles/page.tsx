"use client";

import { DynamicIsland } from "@/components/dynamic-island";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useLanguage } from "@/contexts/language-context";
import { ExternalLink } from "lucide-react";

const articles = [
  {
    title: "Como Usar o JavaScript para Ajudar no Dia a Dia",
    description:
      "Eu vou te mostrar algumas formas de como utilizar o JavaScript, na prática, para resolver problemas do dia a dia.",
    category: "JavaScript",
    date: "14 de Abril, 2025",
    image: "/images/image.png",
    link: "https://web.dio.me/articles/como-usar-o-javascript-para-ajudar-no-dia-a-dia-2eac9c6eac42?back=/articles",
  },
  {
    title: "Boas práticas e Padrões de Commit no Git/Github",
    description:
      "Aqui estão algumas boas práticas essenciais para manter seu repositório profissional e organizado.",
    category: "Github",
    date: "12 de Abril, 2025",
    image: "/images/image.png",
    link: "https://www.dio.me/articles/boas-praticas-e-padroes-de-commit-no-gitgithub-b0531b990a81",
  },
];

export default function ArticlesPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <DynamicIsland />

      <section className="pt-24 px-4 md:px-8 lg:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <h1 className="text-4xl font-bold text-white">
                {t.sections.myArticles}
              </h1>
              <div className="w-12 h-1 bg-purple-500 rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <ScrollReveal key={article.title} delay={index * 100}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-[#12121a] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-500">
                    <div className="relative h-48 overflow-hidden bg-linear-to-br from-yellow-500/20 to-orange-500/20">
                      {/* Article Preview Image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {article.category === "JavaScript" ? (
                          <div className="flex items-center gap-4">
                            <span className="text-yellow-400 text-6xl font-bold">
                              {"<"}
                            </span>
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center">
                                <span className="text-black font-bold text-2xl">
                                  JS
                                </span>
                              </div>
                            </div>
                            <span className="text-yellow-400 text-6xl font-bold">
                              {">"}
                            </span>
                          </div>
                        ) : (
                          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span className="text-purple-400">
                          {article.category}
                        </span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-muted-foreground line-clamp-2">
                        {article.description}
                      </p>

                      <div className="flex items-center gap-2 mt-4 text-sm text-purple-400 group-hover:text-purple-300 transition-colors">
                        Ler artigo
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
