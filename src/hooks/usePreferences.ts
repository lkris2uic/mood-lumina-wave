import { useEffect, useState } from 'react';

export function usePreferences() {
  const [ambientSounds, setAmbientSounds] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem('mm:ambientSounds');
      if (v === null) return true;
      return v === 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mm:ambientSounds', String(ambientSounds));
    } catch {}
  }, [ambientSounds]);

  return { ambientSounds, setAmbientSounds } as const;
}

export default usePreferences;
