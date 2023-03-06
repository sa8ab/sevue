import type { App } from "vue";
import type { SevueOptions } from "../types";

export const setOptions = (vue: App, options: SevueOptions) => {
  const colors = options.colors || {};
  const dark = options.dark;
  setDark(dark);
  const colorKeys = Object.keys(colors);
  colorKeys.forEach((key) => {
    const color = getColor(colors[key] as string);
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty(`--rgb-${key}`, color);
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

const hexToRgb = (hex: string) =>
  hex!
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )!
    .substring(1)!
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16));

export const getColor = (color: string = ""): string => {
  const presetColors = ["red", "yellow", "prm", "green"];
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
    if (typeof window === "undefined") return "";
    const style = window.getComputedStyle(document.body);
    return style.getPropertyValue("--r-" + color);
  } else if (isCSSVar) {
    return color;
  } else {
    return "";
  }
};
