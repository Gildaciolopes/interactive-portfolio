"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, ExternalLink, Navigation } from "lucide-react"

export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || mapLoaded) return

    const linkEl = document.createElement("link")
    linkEl.rel = "stylesheet"
    linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(linkEl)

    const scriptEl = document.createElement("script")
    scriptEl.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    scriptEl.async = true
    scriptEl.onload = () => {
      initMap()
    }
    document.body.appendChild(scriptEl)

    return () => {
      if (linkEl.parentNode) linkEl.parentNode.removeChild(linkEl)
      if (scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl)
    }
  }, [isVisible, mapLoaded])

  const initMap = () => {
    if (typeof window === "undefined" || !(window as any).L) return

    const L = (window as any).L
    const mapContainer = document.getElementById("leaflet-map")

    if (!mapContainer || mapContainer.hasChildNodes()) return

    const lat = -5.0892
    const lng = -42.8019

    const map = L.map("leaflet-map", {
      center: [lat, lng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true,
    })

    L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
      maxZoom: 20,
    }).addTo(map)

    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `
        <div class="marker-wrapper">
          <div class="marker-glow"></div>
          <div class="marker-ring ring-1"></div>
          <div class="marker-ring ring-2"></div>
          <div class="marker-ring ring-3"></div>
          <div class="marker-pin">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#a855f7"/>
              <circle cx="12" cy="9" r="2.5" fill="#1a1a2e"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [80, 80],
      iconAnchor: [40, 40],
    })

    L.marker([lat, lng], { icon: customIcon }).addTo(map)

    L.control.zoom({ position: "bottomright" }).addTo(map)

    setMapLoaded(true)
  }

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
        className={`absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-50"}`}
      />

      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a12]">
        {/* Map area - much larger now */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[550px]">
          <div id="leaflet-map" className="absolute inset-0 z-0" />

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a12] via-transparent to-transparent opacity-40 z-[1]" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a0a12] via-transparent to-transparent opacity-30 z-[1]" />

          {/* Loading State */}
          {!mapLoaded && isVisible && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a12] z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-purple-500/30 rounded-full" />
                  <div className="absolute inset-0 w-16 h-16 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <span className="text-muted-foreground text-sm">Carregando mapa...</span>
              </div>
            </div>
          )}

          <div
            className={`absolute top-6 left-6 z-10 transition-all duration-700 ${
              mapLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="bg-[#12121a]/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-purple-500/10">
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Teresina</h3>
                    <p className="text-sm text-muted-foreground mb-3">Piauí, Brasil</p>
                    <a
                      href="https://maps.google.com/?q=-5.0892,-42.8019"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="group-hover:underline">Ver no Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-white/5 border-t border-white/5">
                <div className="flex items-center gap-4 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-3 h-3 text-purple-400" />
                    <span className="text-muted-foreground">LAT</span>
                    <span className="text-white">-5.0892</span>
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">LONG</span>
                    <span className="text-white">-42.8019</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute top-0 right-0 z-[2] transition-all duration-500 ${mapLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-purple-500/40">
              <path d="M80 0 L80 30 L75 30 L75 5 L50 5 L50 0 Z" fill="currentColor" />
            </svg>
          </div>
          <div
            className={`absolute bottom-0 left-0 z-[2] transition-all duration-500 ${mapLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-cyan-500/40">
              <path d="M0 80 L0 50 L5 50 L5 75 L30 75 L30 80 Z" fill="currentColor" />
            </svg>
          </div>
          <div
            className={`absolute bottom-0 right-0 z-[2] transition-all duration-500 ${mapLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-purple-500/40">
              <path d="M80 80 L80 50 L75 50 L75 75 L50 75 L50 80 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-scan-line" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .marker-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .marker-glow {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%);
          animation: glow-pulse 2s ease-in-out infinite;
        }
        .marker-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(168, 85, 247, 0.5);
          animation: ring-expand 3s ease-out infinite;
        }
        .marker-ring.ring-1 {
          width: 30px;
          height: 30px;
          animation-delay: 0s;
        }
        .marker-ring.ring-2 {
          width: 30px;
          height: 30px;
          animation-delay: 1s;
        }
        .marker-ring.ring-3 {
          width: 30px;
          height: 30px;
          animation-delay: 2s;
        }
        .marker-pin {
          position: relative;
          width: 36px;
          height: 36px;
          z-index: 2;
          filter: drop-shadow(0 4px 12px rgba(168, 85, 247, 0.5));
          animation: pin-bounce 2s ease-in-out infinite;
        }
        .marker-pin svg {
          width: 100%;
          height: 100%;
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes ring-expand {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pin-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes scan-line {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 4s linear infinite;
        }
        .leaflet-container {
          background: #0a0a12 !important;
          font-family: inherit !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          border-radius: 16px !important;
          overflow: hidden;
          background: rgba(18, 18, 26, 0.9) !important;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important;
          margin-right: 20px !important;
          margin-bottom: 20px !important;
        }
        .leaflet-control-zoom a {
          background: transparent !important;
          color: #a1a1aa !important;
          border: none !important;
          width: 44px !important;
          height: 44px !important;
          line-height: 44px !important;
          font-size: 20px !important;
          font-weight: 300 !important;
          transition: all 0.2s ease;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(168, 85, 247, 0.2) !important;
          color: #a855f7 !important;
        }
        .leaflet-control-zoom-in {
          border-bottom: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 16px 16px 0 0 !important;
        }
        .leaflet-control-zoom-out {
          border-radius: 0 0 16px 16px !important;
        }
        .leaflet-tile {
          filter: saturate(0.8) brightness(0.9);
        }
      `}</style>
    </div>
  )
}
