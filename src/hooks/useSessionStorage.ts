import { useState } from "preact/hooks";

// NOTE: We use to use this in place of the useQueryParam hook

// Custom hook to manage state with sessionStorage
export function useSessionStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    }
    return initial;
  });

  function set(newValue: T) {
    setValue(newValue);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    }
  }

  return [value, set];
}
