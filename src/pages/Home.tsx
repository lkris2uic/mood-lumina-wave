import { Button } from "@/components/ui/button";
import { MoodSphere } from "@/components/MoodSphere";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import ambientBg from "@/assets/ambient-bg.jpg";

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
          <MoodSphere mood="calm" />
        </div>

        {/* Today's emotion summary */}
        <div className="glass rounded-3xl p-6 md:p-8 max-w-lg backdrop-blur-xl animate-breathe">
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
    </div>
  );
}
