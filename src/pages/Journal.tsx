import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Save, Sparkles } from "lucide-react";
import { toast } from "sonner";

const prompts = [
  "How are you feeling right now?",
  "What brought you peace today?",
  "What emotion needs your attention?",
  "What are you grateful for?",
  "What would you like to release?",
];

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [currentPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);

  const handleSave = () => {
    if (entry.trim()) {
      // In a real app, this would save to a database
      toast.success("Journal entry saved", {
        description: "Your thoughts are safely stored",
      });
      setEntry("");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pt-20 md:pt-24 pb-24 bg-ambient-gradient">
      <div className="container mx-auto max-w-4xl space-y-6 animate-fade-in">
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

        {/* Journal textarea with breathing effect */}
        <Card className="glass border-2 p-6">
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Begin writing... let your thoughts flow freely"
            className="min-h-[400px] text-lg leading-relaxed resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{
              animation: "breathe 4s ease-in-out infinite",
            }}
          />
        </Card>

        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setEntry("")}
            className="rounded-full glass"
          >
            Clear
          </Button>
          <Button
            onClick={handleSave}
            disabled={!entry.trim()}
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Entry
          </Button>
        </div>

        {/* Reflection card (shown after saving) */}
        {entry.length > 50 && (
          <Card className="glass border-2 p-6 animate-slide-up glow-reflective">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-accent mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Mirror Moment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your words carry weight and wisdom. Thank you for taking time to reflect and honor your emotions.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
