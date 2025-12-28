"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const stacks = [
  { name: "HTML", icon: "/images/html5.svg" },
  { name: "CSS", icon: "/images/css3.svg" },
  { name: "JavaScript", icon: "/images/js.svg" },
  { name: "TypeScript", icon: "/images/typescript.svg" },
  { name: "React.js", icon: "/images/react.svg" },
  { name: "Next.js", icon: "/images/nextjs2.svg" },
  { name: "TailwindCSS", icon: "/images/tailwindcss.svg" },
  { name: "Shadcn", icon: "/images/shadcnui.svg" },
  { name: "Node.js", icon: "/images/nodejs.svg" },
  { name: "PostgreSQL", icon: "/images/postgresql.svg" },
  { name: "Prisma", icon: "/images/prisma.svg" },
  { name: "MongoDB", icon: "/images/mongodb.svg" },
  { name: "Docker", icon: "/images/docker.svg" },
  { name: "AWS", icon: "/images/aws.svg" },
  { name: "Git", icon: "/images/git.svg" },
  { name: "GitHub", icon: "/images/github.svg" },
  { name: "Linux", icon: "/images/linux.svg" },
];

export function StacksScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 0.5;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div
      ref={scrollRef}
      className="horizontal-scroll flex gap-4 overflow-x-auto py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {[...stacks, ...stacks].map((stack, index) => (
        <div
          key={`${stack.name}-${index}`}
          className="shrink-0 flex items-center gap-3 px-6 py-3 bg-[#1a1a24] rounded-full border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
        >
          <div className="w-6 h-6 relative">
            <Image
              src={stack.icon}
              alt={stack.name}
              fill
              className="object-contain rounded-xs"
            />
          </div>
          <span className="text-white font-medium whitespace-nowrap">
            {stack.name}
          </span>
        </div>
      ))}
    </div>
  );
}
