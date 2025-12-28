"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, User, Briefcase, FileText, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", icon: Home, labelKey: "home" as const },
  { href: "/about", icon: User, labelKey: "about" as const },
  { href: "/projects", icon: Briefcase, labelKey: "projects" as const },
  { href: "/articles", icon: FileText, labelKey: "articles" as const },
  { href: "/contact", icon: Mail, labelKey: "contact" as const },
];

export function DynamicIsland() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "America/Sao_Paulo",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4">
      <Link
        href="/"
        className="flex items-center hover:opacity-80 transition-opacity"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="border-3 border-black rounded-full"
        />
      </Link>

      <nav className="bg-[#1a1a24]/80 backdrop-blur-xl rounded-full px-2 py-2 border border-white/10 shadow-lg">
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">
                    {t.nav[item.labelKey]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="text-sm text-muted-foreground font-mono">
        {mounted ? time : "00:00:00"}
      </div>
    </header>
  );
}
