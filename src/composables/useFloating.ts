import {
  useFloating as useBaseFloating,
  flip,
  offset,
  shift,
  size,
  autoUpdate,
  type UseFloatingReturn,
  type UseFloatingOptions,
  type OffsetOptions,
  type DetectOverflowOptions,
  type Placement,
} from "@floating-ui/vue";
import { computed, type Ref } from "vue";

export { Placement };

export interface Options {
  offset?: OffsetOptions;
  boundry?: DetectOverflowOptions["boundary"];
  rootBoundry?: DetectOverflowOptions["rootBoundary"];
  open?: Ref<boolean | undefined>;
  placement?: Placement;
}

export const useFloating = (
  reference: Parameters<typeof useBaseFloating>[0],
  floating: Parameters<typeof useBaseFloating>[1],
  options?: Ref<Options | undefined>
): UseFloatingReturn => {
  const detectOverflowOptions = computed<DetectOverflowOptions>(() => {
    return {
      boundary: options?.value?.boundry,
      rootBoundary: options?.value?.rootBoundry,
    };
  });

  const middleware = computed(() => [
    offset(options?.value?.offset || 4),
    flip({
      ...detectOverflowOptions.value,
      crossAxis: false,
    }),
    shift({
      ...detectOverflowOptions.value,
    }),
    size({
      ...detectOverflowOptions.value,
      apply: ({ availableHeight, availableWidth, elements }) => {
        Object.assign(elements.floating.style, { maxWidth: `${availableWidth}px`, maxHeight: `${availableHeight}px` });
      },
    }),
  ]);

  const result = useBaseFloating(reference, floating, {
    whileElementsMounted: autoUpdate,
    open: options?.value?.open,
    placement: options?.value?.placement,
    middleware,
  });

  return result;
};

export { autoUpdate };
