"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={mapRef}
      className={`relative transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute -inset-1 rounded-3xl blur-xl transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-50"
        }`}
      />

      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a12]">
        {/* Map area - Google Maps Embed */}
        <div className="relative h-100 md:h-125 lg:h-137.5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254339.95197248994!2d-42.90588791426988!3d-5.09371863782656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x78e32519a8599c7%3A0xd4483d47c29fd9c6!2sTeresina%2C%20PI!5e0!3m2!1spt-BR!2sbr!4v1744596347192!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) invert(1)", zIndex: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />

          <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#0a0a12] via-transparent to-transparent opacity-50 z-1" />
          <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-[#0a0a12] via-transparent to-transparent opacity-40 z-1" />

          <div className="absolute inset-0 pointer-events-none z-2 overflow-hidden">
            <div className="absolute w-full h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent animate-scan-line" />
          </div>
        </div>
      </div>
    </div>
  );
}
