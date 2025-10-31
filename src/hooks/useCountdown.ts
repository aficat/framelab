import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (
  initialSeconds: number = 3,
  onComplete?: () => void
) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            setIsActive(false);
            // Call onComplete immediately when reaching 0
            setTimeout(() => {
              onComplete?.();
            }, 0);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, onComplete]);

  const start = useCallback(() => {
    setSeconds(initialSeconds);
    setIsActive(true);
  }, [initialSeconds]);

  const stop = useCallback(() => {
    setIsActive(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const reset = useCallback(() => {
    setIsActive(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return { seconds, isActive, start, stop, reset };
};

