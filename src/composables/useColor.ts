import { onBeforeMount, ref, watch, type Ref } from "vue";
import { getColor } from "@/utils";

const useColor = (color: Ref<string | undefined>) => {

  const result = ref<string | undefined>()

  watch(color, (newColor) => {
    result.value = getColor(newColor)
  }, {
    immediate: true
  })

  return result
};

export default useColor;
