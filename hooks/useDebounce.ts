import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour debouncer une valeur
 * @param value - La valeur à debouncer
 * @param delay - Le délai en millisecondes
 * @returns La valeur debouncée
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

