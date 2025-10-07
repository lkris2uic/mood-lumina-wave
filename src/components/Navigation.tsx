import { Home, BookOpen, Activity, Music, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/journal", icon: BookOpen, label: "Journal" },
  { path: "/tracker", icon: Activity, label: "Tracker" },
  { path: "/soundscape", icon: Music, label: "Soundscape" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-around py-3 md:justify-center md:gap-8 md:py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 md:flex-row md:gap-2 ${
                    isActive
                      ? "text-primary scale-110"
                      : "text-muted-foreground hover:text-foreground hover:scale-105"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "animate-pulse" : ""}`} />
                  <span className="text-xs md:text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
