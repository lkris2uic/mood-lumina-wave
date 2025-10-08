"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface MoodSphereProps {
  mood?: "calm" | "focus" | "energy" | "sad" | "custom" 
        | "joyful" | "reflective" | "peaceful";
  interactive?: boolean;
  allowSound?: boolean;
  autoCycle?: boolean;
}

export const MoodSphere: React.FC<MoodSphereProps> = ({
  mood = "calm",
  interactive = true,
  allowSound = false,
  autoCycle = false,
}) => {
  const controls = useAnimation();
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "pause">(
    "inhale"
  );
  const requestRef = useRef<number | null>(null);
  const cycleRef = useRef<boolean>(false);

  const colors = {
    calm: "radial-gradient(circle, rgba(147,197,253,1) 0%, rgba(59,130,246,0.4) 60%, rgba(29,78,216,0.2) 100%)",
    focus: "radial-gradient(circle, rgba(191,219,254,1) 0%, rgba(59,130,246,0.4) 60%, rgba(30,64,175,0.3) 100%)",
    energy: "radial-gradient(circle, rgba(253,186,116,1) 0%, rgba(251,146,60,0.5) 60%, rgba(194,65,12,0.25) 100%)",
    sad: "radial-gradient(circle, rgba(165,180,252,1) 0%, rgba(99,102,241,0.4) 60%, rgba(67,56,202,0.2) 100%)",
    custom:
      "radial-gradient(circle, rgba(248,113,113,1) 0%, rgba(239,68,68,0.4) 60%, rgba(220,38,38,0.2) 100%)",
  };

  // Smooth auto breathing cycle
  useEffect(() => {
    if (!autoCycle) {
      cycleRef.current = false;
      controls.stop();
      controls.start({ scale: 1, opacity: 1 });
      return;
    }

    cycleRef.current = true;

    const runCycle = async () => {
      while (cycleRef.current) {
        setPhase("inhale");
        await controls.start({
          scale: 1.25,
          opacity: 1,
          transition: { duration: 4, ease: "easeInOut" },
        });

        setPhase("hold");
        await new Promise((r) => setTimeout(r, 2000));

        setPhase("exhale");
        await controls.start({
          scale: 1.0,
          opacity: 0.95,
          transition: { duration: 4, ease: "easeInOut" },
        });

        setPhase("pause");
        await new Promise((r) => setTimeout(r, 1500));
      }
    };

    runCycle();

    return () => {
      cycleRef.current = false;
    };
  }, [autoCycle, controls]);

  const handleClick = () => {
    if (!interactive) return;
    if (!cycleRef.current) {
      cycleRef.current = true;
      controls.start({
        scale: [1, 1.25, 1],
        transition: { duration: 3.5, ease: "easeInOut" },
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <motion.div
        onClick={handleClick}
        animate={controls}
        initial={{ scale: 1, opacity: 1 }}
        className="w-48 h-48 md:w-64 md:h-64 rounded-full cursor-pointer shadow-2xl backdrop-blur-3xl transition-all duration-500"
        style={{
          background: colors[mood],
          boxShadow:
            phase === "inhale"
              ? "0 0 80px rgba(147,197,253,0.6)"
              : phase === "exhale"
              ? "0 0 40px rgba(147,197,253,0.3)"
              : "0 0 60px rgba(147,197,253,0.4)",
        }}
      />

      {/* breathing text hint */}
      {autoCycle && (
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-full mt-6 text-lg text-muted-foreground font-medium tracking-wide select-none"
        >
          {phase === "inhale"
            ? "Inhale..."
            : phase === "hold"
            ? "Hold..."
            : phase === "exhale"
            ? "Exhale..."
            : ""}
        </motion.div>
      )}
    </div>
  );
};
