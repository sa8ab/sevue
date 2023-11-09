import type { App } from "vue";
import type { SevueOptions, ArrayElement } from "../types";

export const setOptions = (options: SevueOptions) => {
  const colors = options.colors || {};
  const dark = options.dark;
  setDark(dark);
  const colorKeys = Object.keys(colors);
  colorKeys.forEach((key) => {
    const color = getColor(colors[key] as string);
    if (typeof document !== "undefined" && color) {
      document.documentElement.style.setProperty(`--r-${key}`, color);
    }
  });
};

export const setDark = (dark: boolean = false) => {
  if (typeof document === "undefined") return;
  if (dark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
};

export const hexToRgb = (hex: string) =>
  hex!
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => "#" + r + r + g + g + b + b)!
    .substring(1)!
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16));

const foreColors = ["prm", "alternative", "red", "yellow", "green"];

export const getColor = (color: string = ""): string | undefined => {
  const presetColors = ["red", "yellow", "prm", "green", "text", "disabled"];
  const isRGB = /^(rgb|rgba)/.test(color);
  const isHEX = color.startsWith("#");
  const isPreset = presetColors.includes(color);
  const isCSSVar = color.startsWith("var");
  if (isRGB) {
    const [r, g, b] = color.replace(/[rgba()]/g, "").split(",");
    return `${r}, ${g}, ${b}`;
  } else if (isHEX) {
    const [r, g, b] = hexToRgb(color);
    return `${r}, ${g}, ${b}`;
  } else if (isPreset) {
    return `var(--r-${color})`;
  } else if (isCSSVar) {
    return color;
  } else {
    return undefined;
  }
};

export const getForegroundColor = (color: string = "") => {
  if (color === "prm") return "var(--r-primary-foreground)";
  const isForeColor = foreColors.includes(color);
  if (isForeColor) return `var(--r-${color}-foreground)`;
  return "var(--r-text)";
};

export const uniqueArray = <T>(
  array: Array<T>,
  key: (parameter: Array<T>[0]) => keyof ArrayElement<T> | null | undefined
) => {
  let seen = new Set();
  return array.filter((item) => {
    let k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
};
