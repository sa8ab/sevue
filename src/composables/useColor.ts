import { nextTick, ref, watch, type Ref } from "vue";
import { getColor } from "@/utils";

const useColor = (color: Ref<string | undefined>) => {

  const result = ref<string | undefined>()

  nextTick(() => {
    result.value = getColor(color.value)
  })

  watch(color, (newColor) => {
    result.value = getColor(newColor)
  })

  return result

};

export default useColor;
