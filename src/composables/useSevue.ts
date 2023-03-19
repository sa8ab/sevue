import { sevueKey } from "@/injectionKeys"
import type { Sevue } from "@/types"
import { inject } from "vue"

const useSevue = () => {
  const sevue = inject(sevueKey) as Sevue
  return sevue
}

export default useSevue