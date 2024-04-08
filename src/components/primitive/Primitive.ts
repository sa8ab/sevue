import { type Component, type PropType, defineComponent, h } from "vue";
import { Slot } from "./Slot";

export interface PrimitiveProps {
  asChild?: boolean;
  as?: string | Component;
}

export const Primitive = defineComponent({
  name: "Primitive",
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false,
    },
    as: {
      type: [String, Object] as PropType<string | Component>,
      default: "div",
    },
  },
  setup(props, { attrs, slots }) {
    const asTag = props.asChild ? "template" : props.as;

    // For self closing tags, don't provide default slots because of hydration issue
    const SELT_CLOSING_TAGS = ["area", "img", "input"];
    if (typeof asTag === "string" && SELT_CLOSING_TAGS.includes(asTag)) return () => h(asTag, attrs);

    if (asTag !== "template") return () => h(props.as, attrs, { default: slots.default });

    return () => h(Slot, attrs, { default: slots.default });
  },
});
