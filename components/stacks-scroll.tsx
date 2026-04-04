"use client";

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
  return (
    <div className="overflow-hidden w-full" aria-label="Tech stack">
      <div
        className="flex gap-4 py-4 w-max"
        style={{
          animation: "stack-scroll 35s linear infinite",
          willChange: "transform",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState =
            "running";
        }}
      >
        {[...stacks, ...stacks].map((stack, index) => (
          <div
            key={`${stack.name}-${index}`}
            className="shrink-0 flex items-center gap-3 px-6 py-3 bg-[#1a1a24] rounded-full border border-white/10 hover:border-purple-500/50 transition-colors duration-300 cursor-pointer hover:scale-105"
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
    </div>
  );
}
