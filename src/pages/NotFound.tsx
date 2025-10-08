import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ambient-gradient p-6">
      <div className="text-center glass p-8 rounded-2xl">
        <h1 className="mb-2 text-6xl font-bold">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">This page seems to be elsewhere — take a breath and return home.</p>
        <a href="/" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full hover:scale-105 transition-transform">Return to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
