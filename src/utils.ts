// Helper function to get value from URL params
export function getQueryParam(param: string, defaultValue: string): string {
  if (typeof window === "undefined") return defaultValue;
  const params = new URLSearchParams(window.location.search);
  return params.get(param) || defaultValue;
}
