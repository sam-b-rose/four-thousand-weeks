import { useState } from "preact/hooks";

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
