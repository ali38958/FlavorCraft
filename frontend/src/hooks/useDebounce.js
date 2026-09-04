import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces any rapidly changing value.
 * @param {any} value The input value to debounce
 * @param {number} delay Milliseconds to delay updating the debounced value (default: 300ms)
 * @returns {any} The debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
