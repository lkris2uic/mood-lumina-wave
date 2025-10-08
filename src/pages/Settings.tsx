import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Bell, Palette, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { MoodSphere } from "@/components/MoodSphere";
import usePreferences from "@/hooks/usePreferences";

export default function Settings() {
  const prefs = usePreferences();
  const { ambientSounds, setAmbientSounds } = prefs;
  const [animations, setAnimations] = useState(true);
  const [previewMood, setPreviewMood] = useState<"calm"|"joyful"|"reflective"|"energy"|"peaceful">("calm");
  const handleExportData = () => {
    toast.success("Data export started", {
      description: "Your journal entries will be downloaded shortly",
    });
  };

  const handleDeleteData = () => {
    toast.error("All data deleted", {
      description: "Your journal has been cleared",
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pt-20 md:pt-24 pb-24 bg-ambient-gradient">
      <div className="container mx-auto max-w-3xl space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="bg-clip-text text-transparent bg-joyful-gradient">
              Settings
            </span>
          </h1>
          <p className="text-muted-foreground">
            Customize your mindful experience
          </p>
        </div>

        {/* Privacy Settings */}
        <Card className="glass border-2 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Privacy & Data</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="local-storage">Local Storage Only</Label>
                <p className="text-sm text-muted-foreground">
                  All data stays on your device
                </p>
              </div>
              <Switch id="local-storage" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-delete">Auto-delete Old Entries</Label>
                <p className="text-sm text-muted-foreground">
                  Remove entries older than 90 days
                </p>
              </div>
              <Switch id="auto-delete" />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="glass border-2 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="daily-reminder">Daily Reflection Reminder</Label>
                <p className="text-sm text-muted-foreground">
                  Gentle prompt to journal each day
                </p>
              </div>
              <Switch id="daily-reminder" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="breathing-breaks">Breathing Break Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Periodic reminders to pause and breathe
                </p>
              </div>
              <Switch id="breathing-breaks" />
            </div>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card className="glass border-2 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ambient-sounds">Ambient Sounds by Default</Label>
                <p className="text-sm text-muted-foreground">
                  Start with gentle background sounds
                </p>
              </div>
              <Switch id="ambient-sounds" checked={ambientSounds} onCheckedChange={(v) => setAmbientSounds(Boolean(v))} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="animations">Smooth Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Enable breathing and floating effects
                </p>
              </div>
              <Switch id="animations" checked={animations} onCheckedChange={(v) => setAnimations(Boolean(v))} />
            </div>
          </div>
        </Card>

        {/* MoodSphere preview */}
        <Card className="glass border-2 p-6 flex items-center gap-6">
          <div>
            <h3 className="font-semibold mb-2">Mood Preview</h3>
            <p className="text-sm text-muted-foreground">Select a mood to preview the MoodSphere.</p>
            <div className="flex gap-2 mt-3">
              {(["calm","joyful","reflective","energy","peaceful"] as const).map((m) => (
                <Button key={m} variant={previewMood===m?undefined:'outline'} onClick={() => setPreviewMood(m)} className="rounded-full">{m}</Button>
              ))}
            </div>
          </div>
          <div className="ml-auto">
            <MoodSphere mood={previewMood} autoCycle={animations} />
          </div>
        </Card>

        {/* Data Management */}
        <Card className="glass border-2 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Download className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Data Management</h2>
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="w-full rounded-full glass"
            >
              <Download className="mr-2 h-4 w-4" />
              Export All Data
            </Button>

            <Button
              onClick={handleDeleteData}
              variant="destructive"
              className="w-full rounded-full"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete All Data
            </Button>
          </div>
        </Card>

        {/* Privacy reminder */}
        <Card className="glass border-2 p-6 bg-primary/5">
          <p className="text-sm text-center text-muted-foreground leading-relaxed">
            <Shield className="inline h-4 w-4 mr-1" />
            Your privacy is sacred. All data remains on your device unless you choose to export it.
          </p>
        </Card>
      </div>
    </div>
  );
}
