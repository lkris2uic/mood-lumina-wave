import { useEffect, useRef } from "react";

interface MoodSphereProps {
  mood?: "calm" | "joyful" | "reflective" | "energized" | "peaceful";
}

export const MoodSphere = ({ mood = "calm" }: MoodSphereProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    let animationFrame: number;
    let time = 0;

    const moodColors: Record<string, { start: string; end: string }> = {
      calm: { start: "rgba(96, 165, 250, 0.8)", end: "rgba(147, 197, 253, 0.4)" },
      joyful: { start: "rgba(244, 114, 182, 0.8)", end: "rgba(251, 207, 232, 0.4)" },
      reflective: { start: "rgba(167, 139, 250, 0.8)", end: "rgba(196, 181, 253, 0.4)" },
      energized: { start: "rgba(251, 146, 60, 0.8)", end: "rgba(253, 186, 116, 0.4)" },
      peaceful: { start: "rgba(52, 211, 153, 0.8)", end: "rgba(110, 231, 183, 0.4)" },
    };

    const colors = moodColors[mood] || moodColors.calm;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Breathing effect
      const breathe = Math.sin(time * 0.02) * 0.1 + 1;
      const currentRadius = radius * breathe;

      // Create gradient
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        currentRadius
      );
      gradient.addColorStop(0, colors.start);
      gradient.addColorStop(1, colors.end);

      // Draw sphere with glow
      ctx.shadowBlur = 40 + Math.sin(time * 0.03) * 20;
      ctx.shadowColor = colors.start;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw inner glow
      ctx.shadowBlur = 0;
      const innerGradient = ctx.createRadialGradient(
        centerX - currentRadius * 0.3,
        centerY - currentRadius * 0.3,
        0,
        centerX,
        centerY,
        currentRadius * 0.7
      );
      innerGradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
      innerGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = innerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 0.7, 0, Math.PI * 2);
      ctx.fill();

      time++;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [mood]);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <canvas
        ref={canvasRef}
        width={320}
        height={320}
        className="w-full h-full animate-float"
      />
    </div>
  );
};
