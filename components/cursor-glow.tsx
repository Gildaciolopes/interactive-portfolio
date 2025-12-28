"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const glowPositions = [
  {
    top: "10%",
    left: "85%",
    color: "rgba(139, 92, 246, 0.12)",
    size: 1000,
    delay: 0,
  },
  {
    top: "60%",
    left: "5%",
    color: "rgba(168, 85, 247, 0.11)",
    size: 1100,
    delay: 4,
  },
  {
    bottom: "15%",
    right: "20%",
    color: "rgba(139, 92, 246, 0.13)",
    size: 1300,
    delay: 1,
  },
];

export function CursorGlow() {
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.inset = "0";
    el.style.pointerEvents = "none";
    el.style.zIndex = String(1);
    el.style.overflow = "hidden";
    document.body.appendChild(el);
    setPortalEl(el);

    return () => {
      if (el.parentNode) el.parentNode.removeChild(el);
      setPortalEl(null);
    };
  }, []);

  if (!portalEl) return null;

  const glows = (
    <>
      {glowPositions.map((glow, index) => (
        <div
          key={index}
          className="glow-orb"
          style={{
            position: "absolute",
            width: glow.size,
            height: glow.size,
            top: glow.top,
            left: glow.left,
            right: glow.right,
            bottom: glow.bottom,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glow.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            opacity: 0.8,
            animation: `float ${8 + index * 2}s ease-in-out infinite`,
            animationDelay: `${glow.delay}s`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0px) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(-50%, -50%) translateY(-20px) translateX(10px)
              scale(1.05);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) translateY(0px) translateX(20px)
              scale(1.1);
            opacity: 0.7;
          }
          75% {
            transform: translate(-50%, -50%) translateY(20px) translateX(10px)
              scale(1.05);
            opacity: 0.8;
          }
        }
      `}</style>
    </>
  );

  return createPortal(glows, portalEl);
}
