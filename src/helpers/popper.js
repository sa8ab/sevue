import { createPopper } from '@popperjs/core'

const sameWidth = {
    name: "sameWidth",
    enabled: true,
    phase: "beforeWrite",
    requires: ["computeStyles"],
    fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    effect: ({ state }) => {
        state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
    },
};

export const createSameWidthPopper = (el, popperEl, options = {}) => {
    const optionModifiers = options.modifiers || []
    return createPopper(el, popperEl, {
        ...options,
        modifiers: [...optionModifiers, sameWidth]
    })
}