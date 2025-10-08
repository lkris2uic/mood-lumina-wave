import { Button } from "@/components/ui/button";
import { MoodSphere } from "@/components/MoodSphere";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import ambientBg from "@/assets/ambient-bg.jpg";
import usePreferences from "@/hooks/usePreferences";

export default function Home() {
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  
  const getGreeting = () => {
    if (currentHour < 12) return "Good Morning";
    if (currentHour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-20 md:py-24 p-4 relative overflow-hidden">
      {/* Ambient background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${ambientBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-ambient-gradient opacity-80" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

  {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 max-w-4xl mx-auto text-center animate-fade-in">
        {/* Greeting */}
        <div className="space-y-2 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-calm-gradient">
              {getGreeting()}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Welcome to your emotional sanctuary
          </p>
        </div>

        {/* MoodSphere */}
        <div className="py-8">
          {(() => {
            const prefs = usePreferences();
            return <MoodSphere mood="calm" interactive={true} allowSound={prefs.ambientSounds} autoCycle={true} />;
          })()}
          <div className="text-sm text-muted-foreground mt-3">Tip: click the orb or press Enter/Space when focused to deepen the breathing.</div>
        </div>
        {/* Today's emotion summary */}
        <div className="glass rounded-3xl p-6 md:p-8 max-w-lg backdrop-blur-xl animate-breathe" role="region" aria-label="Today's emotional tone">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Today's Reflection</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Your emotional journey begins with a single breath. Take a moment to connect with yourself.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            size="lg"
            onClick={() => navigate("/journal")}
            className="group bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Journaling
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/soundscape")}
            className="rounded-full px-8 py-6 text-lg glass border-2 hover:bg-background/50 transition-all duration-300 hover:scale-105"
          >
            Explore Sounds
          </Button>
        </div>

        {/* Ambient message */}
        <p className="text-sm text-muted-foreground pt-8 animate-pulse">
          Your data stays private. Always.
        </p>
      </div>

      {/* Feature highlights (below fold) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-16 px-6 md:px-0">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {[
            { title: "Reflect Deeply", emoji: "🪞", desc: "Adaptive AI-guided journaling that listens and evolves with you." },
            { title: "Visualize Emotions", emoji: "🌈", desc: "Watch your feelings transform into glowing patterns and light." },
            { title: "Find Your Sound", emoji: "🎧", desc: "Ambient soundscapes that mirror your emotional rhythm." },
            { title: "Track Gently", emoji: "📊", desc: "Your emotional trends, visualized as living art." },
          ].map((f) => (
            <div key={f.title} className="flex-1 glass p-6 rounded-2xl backdrop-blur-lg hover:scale-[1.02] transform transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-3xl" aria-hidden>
                  {f.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
