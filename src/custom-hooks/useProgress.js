import { useState, useMemo } from 'react';

export default function useProgress() {
  const [progress, setProgress] = useState({ isLoading: false, error: false });

  const handleProgress = useMemo(
    () => ({
      start: () => setProgress({ isLoading: true, error: false }),
      end: () => setProgress({ isLoading: false, error: false }),
      error: () => setProgress({ isLoading: false, error: true }),
    }),
    []
  );

  return { progress, handleProgress };
}
