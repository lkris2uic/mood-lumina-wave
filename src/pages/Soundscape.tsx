import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface Sound {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient: string;
}

const sounds: Sound[] = [
  {
    id: "waves",
    name: "Ocean Waves",
    description: "Gentle waves for deep calm",
    color: "bg-calm-primary",
    gradient: "bg-calm-gradient",
  },
  {
    id: "rain",
    name: "Soft Rain",
    description: "Peaceful rainfall for reflection",
    color: "bg-reflective-primary",
    gradient: "bg-reflective-gradient",
  },
  {
    id: "forest",
    name: "Forest Ambience",
    description: "Natural sounds for grounding",
    color: "bg-peaceful-primary",
    gradient: "bg-peaceful-gradient",
  },
  {
    id: "chimes",
    name: "Wind Chimes",
    description: "Delicate tones for mindfulness",
    color: "bg-joyful-primary",
    gradient: "bg-joyful-gradient",
  },
];

export default function Soundscape() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [volume, setVolume] = useState([70]);
  const audioRef = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    // preload audio elements (placeholder silence or sample URLs could be used)
    sounds.forEach((s) => {
      if (!audioRef.current[s.id]) {
        // NOTE: In a real app these would be remote URLs or locally bundled audio files
        const a = new Audio();
        a.loop = true;
        a.volume = volume[0] / 100;
        audioRef.current[s.id] = a;
      }
    });

    return () => {
      Object.values(audioRef.current).forEach((a) => a?.pause());
    };
  }, []);

  useEffect(() => {
    Object.values(audioRef.current).forEach((a) => {
      if (a) a.volume = volume[0] / 100;
    });
  }, [volume]);

  const toggleSound = (soundId: string) => {
    if (playing === soundId) {
      audioRef.current[soundId]?.pause();
      setPlaying(null);
      toast.info("Sound paused");
    } else {
      // pause any other
      Object.entries(audioRef.current).forEach(([id, a]) => {
        if (id !== soundId) a?.pause();
      });
      const a = audioRef.current[soundId];
      if (a) {
        a.play().catch(() => {
          // autoplay might be blocked; inform user
          toast.error("Unable to autoplay; user interaction required to start audio.");
        });
      }
      setPlaying(soundId);
      toast.success("Playing ambient sound");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pt-20 md:pt-24 pb-24 bg-ambient-gradient">
      <div className="container mx-auto max-w-5xl space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="bg-clip-text text-transparent bg-energized-gradient">
              Soundscape
            </span>
          </h1>
          <p className="text-muted-foreground">
            Immerse yourself in calming ambient sounds
          </p>
        </div>

        {/* Volume control */}
        <Card className="glass border-2 p-6">
          <div className="flex items-center gap-4">
            <Volume2 className="h-5 w-5 text-primary" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12 text-right">
              {volume[0]}%
            </span>
          </div>
        </Card>

        {/* Sound cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {sounds.map((sound, index) => (
            <Card
              key={sound.id}
              className={`glass border-2 p-8 transition-all duration-500 hover:scale-105 animate-fade-in ${
                playing === sound.id ? "glow-calm" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Visualizer */}
              <div className="relative h-32 mb-6 rounded-2xl overflow-hidden">
                <div className={`absolute inset-0 ${sound.gradient} opacity-60`} />
                {playing === sound.id && (
                  <div className="absolute inset-0 flex items-end justify-around gap-1 p-4">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-white/60 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: "0.8s",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{sound.name}</h3>
                  <p className="text-sm text-muted-foreground">{sound.description}</p>
                </div>

                {/* Controls */}
                <Button
                  onClick={() => toggleSound(sound.id)}
                  className={`w-full rounded-full ${sound.gradient} text-white hover:opacity-90 transition-all duration-300`}
                  size="lg"
                >
                  {playing === sound.id ? (
                    <>
                      <Pause className="mr-2 h-5 w-5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      Play
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Ambient message */}
        <Card className="glass border-2 p-6 text-center">
          <p className="text-muted-foreground leading-relaxed">
            Close your eyes. Breathe deeply. Let the sounds wash over you like gentle waves.
          </p>
        </Card>
      </div>
    </div>
  );
}
