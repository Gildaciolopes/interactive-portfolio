"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "pt";

interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    articles: string;
    contact: string;
  };
  hero: {
    titleMain?: string;
    titleSmall?: string;
    titleHighlight?: string;
    greeting: string;
    role: string;
    experience: string;
    cta: {
      projects: string;
      cv: string;
      about: string;
    };
  };
  sections: {
    githubActivity: string;
    devCommunity: string;
    joinServer: string;
    myStacks: string;
    myProjects: string;
    myArticles: string;
  };
  about: {
    title: string;
    role: string;
    bio: string;
    currentRole: string;
    introduction: string;
    studies: string;
    expertise: string;
    scheduleCall: string;
    certifications: string;
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
  };
  common: {
    less: string;
    more: string;
    readCaseStudy: string;
    viewProject: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      articles: "Articles",
      contact: "Contact",
    },
    hero: {
      titleMain: "Gildácio",
      titleSmall: "",
      titleHighlight: "Lopes",
      greeting: "I'm",
      role: "Mid-Level Full Stack Developer at",
      experience:
        "With 3+ years of experience, building high-performance web and mobile solutions for SaaS & General Softwares.",
      cta: {
        projects: "View Projects",
        cv: "Download CV",
        about: "About me",
      },
    },
    sections: {
      githubActivity: "My GitHub Activity",
      devCommunity: "My Dev Community",
      joinServer: "Join the server",
      myStacks: "My Stacks",
      myProjects: "My Projects",
      myArticles: "My Articles",
    },
    about: {
      title: "Gildácio Lopes",
      role: "Full Stack Developer",
      bio: "I'm a Full-Stack Developer with 3 years of experience, specialized in creating solutions that simplify processes and maximize results, solving problems in an intuitive and impactful way for companies and users. Currently working at Medsafe Brasil, creating solutions for company websites and apps, using React and React Native, with a collaborative and problem-solving approach.",
      currentRole: "Current Role",
      introduction: "Introduction",
      studies: "Education & Certifications",
      expertise: "Technical Expertise",
      scheduleCall: "Schedule a call",
      certifications: "Certifications",
    },
    contact: {
      title: "Contact",
      name: "Full name",
      email: "E-mail",
      message: "Write your message here...",
      send: "Send Message",
    },
    common: {
      less: "less",
      more: "more",
      readCaseStudy: "Github Repository",
      viewProject: "View project",
    },
  },
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      articles: "Artigos",
      contact: "Contato",
    },
    hero: {
      titleMain: "Gildácio",
      titleSmall: "",
      titleHighlight: "Lopes",
      greeting: "Eu sou",
      role: "Desenvolvedor Full Stack Pleno na",
      experience:
        "Com 3+ anos de experiência, construindo soluções web e mobile de alta performance para SaaS & Softwares em geral.",
      cta: {
        projects: "Ver Projetos",
        cv: "Baixar CV",
        about: "Sobre mim",
      },
    },
    sections: {
      githubActivity: "Minha atividade no GitHub",
      devCommunity: "Minha comunidade Dev",
      joinServer: "Entrar no servidor",
      myStacks: "Minhas Stacks",
      myProjects: "Meus Projetos",
      myArticles: "Meus Artigos",
    },
    about: {
      title: "Gildácio Lopes",
      role: "Desenvolvedor Full Stack",
      bio: "Sou um Desenvolvedor Full-Stack com 3 anos de experiência, especializado em criar soluções que simplificam processos e maximizam resultados, solucionando problemas de forma intuitiva e impactante para empresas e usuários. Atualmente estou trabalhando na Medsafe Brasil e meu trabalho é criar soluções para sites e apps da empresa, utilizando React e React Native, com uma abordagem colaborativa e orientada à resolução de problemas.",
      currentRole: "Função Atual",
      introduction: "Introdução",
      studies: "Formação & Certificações",
      expertise: "Expertise Técnica",
      scheduleCall: "Agendar uma chamada",
      certifications: "Certificações",
    },
    contact: {
      title: "Contato",
      name: "Nome completo",
      email: "E-mail",
      message: "Escreva seu texto aqui...",
      send: "Enviar Mensagem",
    },
    common: {
      less: "menos",
      more: "mais",
      readCaseStudy: "Repositório Github",
      viewProject: "Ver projeto",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
