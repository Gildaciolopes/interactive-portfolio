"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

export function AnimatedMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Map Container with Animation */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Grayscale Map Image */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          style={{
            backgroundImage: `url("/images/image.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Animated Overlay Effect */}
        <div
          className={`absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-60" : "opacity-80"
          }`}
        />

        {/* Scan Line Animation */}
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute w-full h-1 bg-linear-to-r from-transparent via-purple-500/50 to-transparent animate-scan-line"
            style={{
              animation: "scanLine 3s linear infinite",
            }}
          />
        </div>

        {/* Grid Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isHovered ? "opacity-30" : "opacity-10"
          }`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Pulsing Location Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Pulse Rings */}
            <div className="absolute inset-0 -m-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 animate-ping" />
            </div>
            <div
              className="absolute inset-0 -m-6 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-16 h-16 rounded-full border border-purple-500/30" />
            </div>
            <div
              className="absolute inset-0 -m-8 animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-20 h-20 rounded-full border border-purple-500/20" />
            </div>

            {/* Center Marker */}
            <div className="relative w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-purple-500/50" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-500/50" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-500/50" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-purple-500/50" />
      </div>

      {/* Location Info Card */}
      <div
        className={`absolute top-4 left-4 bg-[#12121a]/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-white font-semibold">Teresina</p>
            <p className="text-sm text-muted-foreground">
              Teresina - PI, Brasil
            </p>
          </div>
        </div>
      </div>

      {/* Coordinates Display */}
      <div
        className={`absolute bottom-4 right-4 bg-[#12121a]/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 font-mono text-xs text-muted-foreground transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <span className="text-purple-400">LAT:</span> -5.0892{" "}
        <span className="text-purple-400 ml-2">LONG:</span> -42.8019
      </div>

      {/* Hover Effect Glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* CSS for scan line animation */}
      <style jsx>{`
        @keyframes scanLine {
          0% {
            top: -4px;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </div>
  );
}
