"use client";

import { useEffect, useRef, useState } from "react";

interface BackgroundVideoProps {
  src: string;
  overlay?: boolean;
  className?: string;
  /** How many seconds before end to start crossfade (default 1.5s) */
  crossfadeDuration?: number;
}

export default function BackgroundVideo({
  src,
  overlay = true,
  className = "",
  crossfadeDuration = 1.5,
}: BackgroundVideoProps) {
  // Two video refs — A and B alternate as "active"
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);

  // activeSlot: which video is currently fully visible
  const [activeSlot, setActiveSlot] = useState<"A" | "B">("A");
  // opacities driven by state for React-controlled transitions
  const [opacityA, setOpacityA] = useState(1);
  const [opacityB, setOpacityB] = useState(0);

  const crossfading = useRef(false);

  useEffect(() => {
    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b) return;

    // Both videos load the same src — B starts paused at 0
    // We'll manually seek & play B right before A ends

    const handleTimeUpdate = () => {
      const active = activeSlot === "A" ? a : b;
      const standby = activeSlot === "A" ? b : a;

      if (!active.duration) return;
      const remaining = active.duration - active.currentTime;

      if (remaining <= crossfadeDuration && !crossfading.current) {
        crossfading.current = true;

        // Reset & play standby from the top
        standby.currentTime = 0;
        standby.play().catch(() => {});

        // Crossfade: fade active out, standby in
        if (activeSlot === "A") {
          setOpacityA(0);
          setOpacityB(1);
        } else {
          setOpacityB(0);
          setOpacityA(1);
        }

        // After transition completes, swap active slot and pause the old one
        setTimeout(() => {
          active.pause();
          active.currentTime = 0;
          setActiveSlot((prev) => (prev === "A" ? "B" : "A"));
          crossfading.current = false;
        }, crossfadeDuration * 1000);
      }
    };

    // Attach timeupdate to both videos so whichever is active triggers the fade
    a.addEventListener("timeupdate", handleTimeUpdate);
    b.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      a.removeEventListener("timeupdate", handleTimeUpdate);
      b.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [activeSlot, crossfadeDuration]);

  const sharedVideoProps = {
    src,
    muted: true as const,
    playsInline: true as const,
    preload: "auto" as const,
    className: "absolute inset-0 w-full h-full object-cover",
  };

  const transitionStyle = `opacity ${crossfadeDuration}s ease-in-out`;

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Video A */}
      <video
        ref={videoA}
        {...sharedVideoProps}
        autoPlay
        style={{ opacity: opacityA, transition: transitionStyle }}
      />

      {/* Video B — starts invisible, plays when A nears its end */}
      <video
        ref={videoB}
        {...sharedVideoProps}
        style={{ opacity: opacityB, transition: transitionStyle }}
      />

      {/* Optional dark overlay */}
      {overlay && <div className="absolute inset-0 bg-black/40" />}
    </div>
  );
}
