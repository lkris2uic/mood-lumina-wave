import { Card } from "@/components/ui/card";
import { Activity, TrendingUp, Heart, Brain, Play, Clock } from "lucide-react";
import { useState } from "react";

const emotionData = [
  { emotion: "Calm", count: 12, color: "bg-calm-primary", intensity: 70 },
  { emotion: "Joyful", count: 8, color: "bg-joyful-primary", intensity: 55 },
  { emotion: "Reflective", count: 15, color: "bg-reflective-primary", intensity: 85 },
  { emotion: "Energized", count: 6, color: "bg-energized-primary", intensity: 40 },
  { emotion: "Peaceful", count: 10, color: "bg-peaceful-primary", intensity: 60 },
];

const insights = [
  {
    icon: TrendingUp,
    title: "Growth Pattern",
    description: "You've been more reflective this week, showing deep emotional awareness.",
  },
  {
    icon: Heart,
    title: "Emotional Balance",
    description: "Your emotions flow naturally between calm and energized states.",
  },
  {
    icon: Brain,
    title: "Mindful Moments",
    description: "15 journal entries this month. Your commitment to self-reflection is beautiful.",
  },
];

export default function Tracker() {
  const [replaying, setReplaying] = useState(false);
  const [replayIndex, setReplayIndex] = useState(0);

  const handleReplay = () => {
    setReplaying(true);
    setReplayIndex(0);
    const interval = setInterval(() => {
      setReplayIndex((i) => {
        if (i >= 34) {
          clearInterval(interval);
          setReplaying(false);
          return 34;
        }
        return i + 1;
      });
    }, 120);
  };
  return (
    <div className="min-h-screen p-4 md:p-8 pt-20 md:pt-24 pb-24 bg-ambient-gradient">
      <div className="container mx-auto max-w-6xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="bg-clip-text text-transparent bg-peaceful-gradient">
              Emotion Tracker
            </span>
          </h1>
          <p className="text-muted-foreground">
            Your emotional landscape visualized
          </p>
        </div>

        {/* Emotion waves visualization */}
        <Card className="glass border-2 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Emotional Waves</h2>
            <div className="ml-auto flex items-center gap-3">
              <button onClick={handleReplay} className="glass p-2 rounded-md" aria-pressed={replaying} title="Replay emotion timeline">
                <Play className="h-4 w-4" /> Replay
              </button>
              <div className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-4 w-4"/> {replaying ? 'Playing' : 'Idle'}</div>
            </div>
          </div>
          
          <div className="space-y-6">
            {emotionData.map((item, index) => (
              <div
                key={item.emotion}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.emotion}</span>
                  <span className="text-sm text-muted-foreground">{item.count} entries</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out animate-shimmer`}
                    style={{
                      width: `${item.intensity}%`,
                      background: `linear-gradient(90deg, transparent, currentColor, transparent)`,
                      backgroundSize: "1000px 100%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Insights grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <Card
                key={insight.title}
                className="glass border-2 p-6 hover:scale-105 transition-transform duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <Icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{insight.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Emotional calendar placeholder */}
        <Card className="glass border-2 p-8">
          <h2 className="text-2xl font-semibold mb-6">Emotional Calendar</h2>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => {
              const intensity = Math.random();
              const colors = ["bg-calm-primary", "bg-joyful-primary", "bg-reflective-primary", "bg-peaceful-primary"];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg ${randomColor} hover:scale-110 transition-transform cursor-pointer animate-fade-in`}
                  style={{
                    opacity: intensity * 0.7 + 0.3,
                    animationDelay: `${i * 0.02}s`,
                  }}
                  title={`Day ${i + 1}`}
                />
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
