import { getColor, getForegroundColor } from "@/utils";
import { computed } from "vue";
import type { Ref } from "vue";

const useColor = (color: Ref<string | undefined>, foregroundColor?: Ref<string | undefined>) => {
  const c = computed(() => getColor(color.value));

  const f = computed(() => {
    if (foregroundColor?.value) return getColor(foregroundColor.value);
    return getForegroundColor(color.value);
  });

  return { color: c, foreground: f };
};

export default useColor;
