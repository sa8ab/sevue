import { createPopper, type ModifierArguments, type Options, type VirtualElement } from "@popperjs/core";

const sameWidth = {
  name: "sameWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }: ModifierArguments<Options>) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }: ModifierArguments<Options>) => {
    state.elements.popper.style.width = `${(state.elements.reference as HTMLElement).offsetWidth}px`;
  },
};

export const createSameWidthPopper = (
  el: Element | VirtualElement,
  popperEl: HTMLElement,
  options: any = {}
) => {
  const optionModifiers = options.modifiers || [];
  return createPopper(el, popperEl, {
    ...options,
    modifiers: [...optionModifiers, sameWidth],
  });
};
