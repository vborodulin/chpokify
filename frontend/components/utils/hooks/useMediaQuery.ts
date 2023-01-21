import { useEffect, useRef, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const getMatches = (q: string) => window.matchMedia(q);

  const matchMediaRef = useRef<MediaQueryList | null>();

  const [matches, setMatches] = useState<boolean>();

  useEffect(() => {
    matchMediaRef.current = getMatches(query);
  }, [query]);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    const matchMedia = matchMediaRef.current;

    if (matchMedia) {
      setMatches(matchMedia.matches);
      matchMedia.addListener(handler);
      return () => matchMedia.removeListener(handler);
    }
  }, [query]);

  return !!matches;
};
