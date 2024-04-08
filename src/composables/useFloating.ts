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
} from "@floating-ui/vue";
import { computed, type Ref } from "vue";

interface Options extends UseFloatingOptions {
  offset?: OffsetOptions;
  boundry?: DetectOverflowOptions["boundary"];
  rootBoundry?: DetectOverflowOptions["rootBoundary"];
}

export const useFloating = (
  reference: Parameters<typeof useBaseFloating>[0],
  floating: Parameters<typeof useBaseFloating>[1],
  options: Ref<Options>
): UseFloatingReturn => {
  const detectOverflowOptions = computed<DetectOverflowOptions>(() => {
    return {
      boundary: options.value.boundry,
      rootBoundary: options.value.rootBoundry,
    };
  });

  const middleware = computed(() => [
    offset(4),
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

  const localOptions = computed(() => {
    return {
      ...options.value,
      middleware,
    };
  });

  const result = useBaseFloating(reference, floating, localOptions.value);

  return result;
};

export { autoUpdate };
