import type { Dir } from "@/types";
import { type Ref, computed, ref } from "vue";

export function useDirection(dir?: Ref<Dir | undefined>) {
  return computed(() => dir?.value || "ltr");
}
