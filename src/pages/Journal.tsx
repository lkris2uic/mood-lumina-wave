"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Save, Sparkles, Wind } from "lucide-react";
import { toast } from "sonner";
import BreathGuide from "@/components/BreathGuide";

const prompts = [
  "How are you feeling right now?",
  "What brought you peace today?",
  "What emotion needs your attention?",
  "What are you grateful for?",
  "What would you like to release?",
];

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [currentPrompt] = useState(
    prompts[Math.floor(Math.random() * prompts.length)]
  );
  const [showGuide, setShowGuide] = useState(false);

  // lightweight sentiment heuristic (placeholder for AI)
  const sentiment = useMemo(() => {
    const text = entry.toLowerCase();
    if (!text.trim()) return "neutral";
    const positive = ["good", "calm", "happy", "peace", "love", "grateful", "joy"];
    const negative = ["sad", "angry", "anxious", "worried", "hurt", "lonely", "stressed"];
    const p = positive.filter((w) => text.includes(w)).length;
    const n = negative.filter((w) => text.includes(w)).length;
    if (p > n) return "positive";
    if (n > p) return "negative";
    return "neutral";
  }, [entry]);

  const handleSave = () => {
    if (entry.trim()) {
      toast.success("Journal entry saved", {
        description: "Your thoughts are safely stored",
      });
      setEntry("");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pt-20 md:pt-24 pb-24 bg-ambient-gradient">
      <div className="container mx-auto max-w-4xl space-y-6 animate-fade-in">
        {/* Optional breathing guide (toggle) */}
        {showGuide && (
          <BreathGuide
            cycles={2}
            onComplete={() => setShowGuide(false)}
            allowSound={false}
          />
        )}

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="bg-clip-text text-transparent bg-reflective-gradient">
              Your Journal
            </span>
          </h1>
          <p className="text-muted-foreground">
            A safe space for your thoughts
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGuide(!showGuide)}
              className="rounded-full flex items-center gap-2"
            >
              <Wind className="w-4 h-4" />
              {showGuide ? "Stop Breathing" : "Begin Breathing"}
            </Button>
          </div>
        </div>

        {/* Adaptive prompt */}
        <Card className="glass border-2 p-6 animate-breathe">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary mt-1 animate-pulse" />
            <div>
              <h3 className="font-semibold mb-1">Gentle Prompt</h3>
              <p className="text-muted-foreground italic">{currentPrompt}</p>
            </div>
          </div>
        </Card>

        {/* Journal textarea */}
        <Card className="glass border-2 p-6 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <Textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Begin writing... let your thoughts flow freely"
              className="min-h-[320px] md:min-h-[420px] text-lg leading-relaxed resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{
                animation: "breathe 4s ease-in-out infinite",
              }}
              aria-label="Journal entry"
            />
            <div className="flex justify-end mt-4 gap-3">
              <Button variant="outline" onClick={() => setEntry("")}>
                Clear
              </Button>
              <Button onClick={handleSave} disabled={!entry.trim()}>
                <Save className="mr-2 h-4 w-4" /> Save Entry
              </Button>
            </div>
          </div>

          {/* EmotionCloud preview + affirmations */}
          <aside className="w-full md:w-72 space-y-4">
            <div className={`rounded-2xl p-4 glass text-center`} aria-live="polite">
              <div className="text-sm text-muted-foreground">Live Emotion</div>
              <div className="mt-2 text-lg font-semibold">
                {sentiment === "positive"
                  ? "Hopeful"
                  : sentiment === "negative"
                  ? "Vulnerable"
                  : "Balanced"}
              </div>
              <div className="mt-3 h-28 relative">
                <div
                  className={`absolute inset-0 rounded-lg ${
                    sentiment === "positive"
                      ? "bg-gradient-to-tr from-rose-200 to-yellow-200"
                      : sentiment === "negative"
                      ? "bg-gradient-to-tr from-slate-300 to-slate-400"
                      : "bg-gradient-to-tr from-cyan-200 to-indigo-200"
                  } opacity-70 animate-cloud`}
                ></div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                "You are growing through this.",
                "Breathe — you're doing your best.",
                "Small steps are still progress.",
              ].map((a) => (
                <div key={a} className="glass p-3 rounded-lg text-sm">
                  {a}
                </div>
              ))}
            </div>
          </aside>
        </Card>

        {/* Reflection card */}
        {entry.length > 120 && (
          <Card
            className="glass border-2 p-6 animate-slide-up glow-reflective"
            role="status"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-accent mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Mirror Moment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your words carry weight and wisdom. Thank you for taking time
                  to reflect and honor your emotions.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
