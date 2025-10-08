"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BreathGuideProps {
  cycles?: number;
  onComplete?: () => void;
  allowSound?: boolean;
  onToggle?: (active: boolean) => void;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const BreathGuide: React.FC<BreathGuideProps> = ({
  cycles = 3,
  onComplete,
  allowSound = false,
  onToggle,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<
    "idle" | "inhale" | "hold" | "exhale" | "pause" | "done"
  >("idle");
  const [count, setCount] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const startAudio = () => {
    if (!allowSound) return;
    try {
      if (!audioCtxRef.current)
        audioCtxRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current!;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 200;
      gain.gain.value = 0.0001;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
    } catch (e) {
      console.warn("breath audio failed", e);
    }
  };

  const stopAudio = () => {
    try {
      const ctx = audioCtxRef.current;
      const osc = oscRef.current;
      const gain = gainRef.current;
      if (gain && ctx)
        gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      if (osc) {
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        }, 700);
      }
    } catch (e) {}
  };

  const runCycle = async () => {
    startAudio();
    for (let i = 0; i < cycles; i++) {
      if (!isActive) return;
      setCount(i + 1);

      setPhase("inhale");
      if (allowSound && audioCtxRef.current && gainRef.current) {
        const ctx = audioCtxRef.current;
        gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainRef.current.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 4);
      }
      await wait(4000);
      if (!isActive) return;

      setPhase("hold");
      await wait(2000);
      if (!isActive) return;

      setPhase("exhale");
      if (allowSound && audioCtxRef.current && gainRef.current) {
        const ctx = audioCtxRef.current;
        gainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 4);
      }
      await wait(4000);
      if (!isActive) return;

      setPhase("pause");
      await wait(1000);
    }

    stopAudio();
    setPhase("done");
    onComplete?.();
  };

  useEffect(() => {
    if (isActive) {
      onToggle?.(true);
      runCycle();
    } else {
      onToggle?.(false);
      stopAudio();
      setPhase("idle");
    }

    return () => stopAudio();
  }, [isActive]);

  const textForPhase = () => {
    switch (phase) {
      case "inhale":
        return "Inhale...";
      case "hold":
        return "Hold...";
      case "exhale":
        return "Exhale...";
      case "pause":
        return "";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence>
        {isActive && phase !== "done" && (
          <motion.div
            key="breath"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              aria-hidden
              className="rounded-full shadow-2xl"
              style={{
                width: 220,
                height: 220,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              animate={{
                scale: phase === "inhale" ? 1.2 : phase === "exhale" ? 1.0 : 1.2,
                boxShadow:
                  phase === "hold"
                    ? "0 0 60px rgba(255,255,255,0.35)"
                    : "0 20px 60px rgba(0,0,0,0.12)",
              }}
              transition={{
                duration:
                  phase === "inhale" || phase === "exhale" ? 4 : 0.6,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-[180px] h-[180px] rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,255,255,0.7), rgba(200,220,255,0.15))",
                  backdropFilter: "blur(8px)",
                }}
                animate={{
                  filter:
                    phase === "inhale"
                      ? "brightness(1.12) drop-shadow(0 8px 30px rgba(96,165,250,0.45))"
                      : phase === "exhale"
                      ? "brightness(0.98) drop-shadow(0 6px 18px rgba(96,165,250,0.18))"
                      : "brightness(1.06)",
                }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>

            <div className="text-center">
              <div className="text-2xl font-medium text-primary">
                {textForPhase()}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {`Cycle ${count} of ${cycles}`}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsActive((v) => !v)}
        className="px-6 py-2 mt-4 rounded-full bg-primary text-white font-semibold hover:bg-primary/80 transition-all"
      >
        {isActive ? "Stop Breathing" : "Start Breathing"}
      </button>
    </div>
  );
};

export default BreathGuide;
