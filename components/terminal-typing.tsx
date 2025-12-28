"use client";

import { useEffect, useState } from "react";

interface TerminalLine {
  type: "comment" | "keyword" | "interface" | "property" | "cursor";
  content: string;
  delay?: number;
}

const codeLines: TerminalLine[] = [
  {
    type: "comment",
    content: "// Gildácio Lopes - Full Stack Developer Profile",
    delay: 50,
  },
  { type: "keyword", content: "", delay: 100 },
  { type: "interface", content: "interface FullStackDeveloper {", delay: 30 },
  { type: "property", content: '  name: "Gildácio Lopes";', delay: 40 },
  { type: "property", content: '  role: "Full Stack Developer";', delay: 40 },
  { type: "property", content: '  company: "Medsafe Brasil";', delay: 40 },
  { type: "property", content: '  experience: "3+ years";', delay: 40 },
  { type: "property", content: '  location: "Teresina, PI";', delay: 40 },
  { type: "property", content: '  birth: "25 de Dezembro, 2006";', delay: 40 },
  { type: "cursor", content: "}", delay: 0 },
];

export function TerminalTyping() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = codeLines[currentLineIndex];
    const lineContent = currentLine.content;

    if (currentCharIndex < lineContent.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = lineContent.slice(
            0,
            currentCharIndex + 1
          );
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, currentLine.delay || 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
        setDisplayedLines((prev) => [...prev, ""]);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  function renderLine(line: string, index: number) {
    const originalLine = codeLines[index];
    if (!originalLine) return line;

    if (originalLine.type === "comment") {
      return <span className="text-emerald-400/70 italic">{line}</span>;
    }

    if (originalLine.type === "interface") {
      const match = line.match(/^(interface)\s+(\w+)\s*(\{?)$/);
      if (match) {
        return (
          <>
            <span className="text-purple-400">{match[1]}</span>
            <span className="text-cyan-300"> {match[2]}</span>
            <span className="text-white"> {match[3]}</span>
          </>
        );
      }
      return <span className="text-white">{line}</span>;
    }

    if (originalLine.type === "property") {
      const match = line.match(/^(\s*)(\w+):\s*"([^"]+)"(;?)$/);
      if (match) {
        return (
          <>
            <span className="text-white">{match[1]}</span>
            <span className="text-blue-300">{match[2]}</span>
            <span className="text-white">: </span>
            <span className="text-green-400">"{match[3]}"</span>
            <span className="text-white">{match[4]}</span>
          </>
        );
      }
      return <span className="text-white">{line}</span>;
    }

    if (originalLine.type === "cursor") {
      return <span className="text-white">{line}</span>;
    }

    return line;
  }

  return (
    <div className="bg-[#1e1e2e] rounded-xl overflow-hidden border border-white/10 shadow-2xl w-full max-w-xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d3d] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-sm text-muted-foreground font-mono">
          developer.ts
        </span>
        <span className="text-xs text-muted-foreground">TypeScript</span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm min-h-70">
        {displayedLines.map((line, index) => (
          <div key={index} className="flex">
            <span className="text-muted-foreground w-8 text-right mr-4 select-none">
              {index + 1}
            </span>
            <span className="flex-1 whitespace-pre">
              {renderLine(line, index)}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex">
            <span className="text-muted-foreground w-8 text-right mr-4 select-none">
              {displayedLines.length + 1}
            </span>
            <span className="flex-1 whitespace-pre">
              <span className="typing-cursor text-white">|</span>
            </span>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d3d] border-t border-white/5 text-xs text-muted-foreground">
        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>Ln {codeLines.length}, Col 2</span>
      </div>
    </div>
  );
}
