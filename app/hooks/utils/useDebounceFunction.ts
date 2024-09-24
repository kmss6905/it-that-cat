import { useRef, useCallback } from 'react';

function useDebounceFunction<F extends (...args: any[]) => any>(
  callback: F,
  delay: number,
): (...args: Parameters<F>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<F>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}

export default useDebounceFunction;
