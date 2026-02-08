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
    image: "public/images/javascriptHeader.jpg",
    link: "https://web.dio.me/articles/como-usar-o-javascript-para-ajudar-no-dia-a-dia-2eac9c6eac42?back=/articles",
  },
  {
    title: "Boas práticas e Padrões de Commit no Git/Github",
    description:
      "Aqui estão algumas boas práticas essenciais para manter seu repositório profissional e organizado.",
    category: "Github",
    date: "12 de Abril, 2025",
    image: "public/images/githubHeader.png",
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <ScrollReveal key={article.title} delay={index * 100}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-[#12121a] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-500">
                    <div className="relative h-72 overflow-hidden bg-linear-to-br from-yellow-500/20 to-orange-500/20">
                      <img
                        src={
                          article.image.startsWith("public/")
                            ? article.image.slice(6)
                            : article.image
                        }
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
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
