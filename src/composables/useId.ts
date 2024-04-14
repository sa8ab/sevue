import { injectProviderContext } from "@/components/provider/Provider.vue";

let count = 0;

export function useId(manual?: string, prefix = "sevue") {
  if (manual) return manual;

  const providerContext = injectProviderContext();

  if (providerContext.useId) return providerContext.useId();
  return `${prefix}-${++count}`;
}
