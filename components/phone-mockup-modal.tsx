"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

interface ProjectScreenshot {
  src: string;
  alt?: string;
}

interface PhoneMockupModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    screenshots?: ProjectScreenshot[];
    image?: string;
    link?: string;
    repo?: string;
    tags?: string[];
  };
}

function PhoneSVG({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: "300px", height: "620px" }}
    >
      {/* Phone Frame Background SVG */}
      <svg
        viewBox="0 0 320 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      >
        {/* Phone outer body */}
        <rect
          x="2"
          y="2"
          width="316"
          height="656"
          rx="44"
          fill="#1a1a1a"
          stroke="#2a2a2a"
          strokeWidth="2"
        />

        {/* Phone inner bezel */}
        <rect
          x="10"
          y="10"
          width="300"
          height="640"
          rx="38"
          fill="#0a0a0a"
          stroke="#333"
          strokeWidth="1"
        />

        {/* Side buttons - Volume */}
        <rect x="-2" y="120" width="4" height="35" rx="2" fill="#2a2a2a" />
        <rect x="-2" y="165" width="4" height="35" rx="2" fill="#2a2a2a" />

        {/* Side button - Power */}
        <rect x="318" y="140" width="4" height="50" rx="2" fill="#2a2a2a" />

        {/* Bottom indicator line */}
        <rect x="120" y="625" width="80" height="5" rx="2.5" fill="#333" />
      </svg>

      {/* Screen content area */}
      <div
        className="absolute overflow-hidden bg-black"
        style={{
          top: "47px",
          left: "15px",
          width: "270px",
          height: "526px",
          zIndex: 2,
          borderRadius: "4px",
        }}
      >
        {children}
      </div>

      {/* Phone Frame Overlay (notch and reflection) */}
      <svg
        viewBox="0 0 320 660"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 3 }}
      >
        {/* Dynamic Island / Notch */}
        <rect
          x="110"
          y="18"
          width="100"
          height="28"
          rx="14"
          fill="#0a0a0a"
          stroke="#222"
          strokeWidth="1"
        />

        {/* Camera dot */}
        <circle
          cx="145"
          cy="32"
          r="6"
          fill="#1a1a1a"
          stroke="#333"
          strokeWidth="1"
        />
        <circle cx="145" cy="32" r="3" fill="#1f3a5f" />

        {/* Speaker grill */}
        <rect x="165" y="28" width="30" height="4" rx="2" fill="#222" />

        {/* Subtle phone reflection */}
        <defs>
          <linearGradient
            id="phoneGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
          </linearGradient>
        </defs>
        <rect
          x="10"
          y="10"
          width="300"
          height="640"
          rx="38"
          fill="url(#phoneGradient)"
        />
      </svg>
    </div>
  );
}

export function PhoneMockupModal({
  isOpen,
  onClose,
  project,
}: PhoneMockupModalProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Only use screenshots, not the main project image
  const allImages: ProjectScreenshot[] = project.screenshots || [];

  const hasMultipleImages = allImages.length > 1;

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, allImages.length]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="bg-[#0a0a12] border-white/10 w-full max-w-[95vw] lg:max-w-250 max-h-[95vh] overflow-y-auto overflow-x-hidden p-6 md:p-12"
        showCloseButton={true}
      >
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-white text-center">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* Phone Mockup */}
          <div className="relative shrink-0">
            <PhoneSVG>
              {allImages.length > 0 ? (
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={allImages[currentIndex]?.src}
                    alt={allImages[currentIndex]?.alt || project.title}
                    className="w-full h-full object-cover object-top"
                    style={{ minHeight: "100%", minWidth: "100%" }}
                  />

                  {/* Image navigation overlay */}
                  {hasMultipleImages && (
                    <>
                      {/* Previous button */}
                      <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors z-20"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {/* Next button */}
                      <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors z-20"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Dots indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-300",
                              index === currentIndex
                                ? "bg-cyan-400 w-4"
                                : "bg-white/40 hover:bg-white/60",
                            )}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <span className="text-muted-foreground text-sm">
                    No preview
                  </span>
                </div>
              )}
            </PhoneSVG>

            {/* Image counter */}
            {hasMultipleImages && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                {currentIndex + 1} / {allImages.length}
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="flex-1 max-w-lg space-y-6 text-center lg:text-left">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-4 py-1.5 bg-white/5 text-muted-foreground rounded-full border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 hover:text-cyan-400 transition-colors"
                >
                  {t.common.viewProject}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.repo && (
                <a
                  href={
                    project.repo.startsWith("http")
                      ? project.repo
                      : `https://github.com/${project.repo}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 hover:text-purple-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
