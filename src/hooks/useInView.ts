import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the element first enters the viewport.
 * Disconnects the observer after the first intersection to avoid repeated updates.
 */
export function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}
