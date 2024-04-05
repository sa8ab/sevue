import type { Direction, FocusDirection, Orientation } from "../../types";

export const MAP_KEY_TO_FOCUS_DIRECTION: Record<string, FocusDirection> = {
  ArrowLeft: "backward",
  ArrowUp: "backward",
  ArrowRight: "forward",
  ArrowDown: "forward",
};

export function getDirectionAwareKey(key: string, dir?: Direction) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}

export function getFocusDirection(event: KeyboardEvent, orientation?: Orientation, dir?: Direction) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return undefined;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return undefined;
  return MAP_KEY_TO_FOCUS_DIRECTION[key];
}

export function wrapArray<T>(array: T[], startIndex: number) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
