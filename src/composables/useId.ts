let count = 0;

export function useId(manual?: string, prefix = "sevue") {
  if (manual) return manual;

  return `${prefix}-${++count}`;
}
