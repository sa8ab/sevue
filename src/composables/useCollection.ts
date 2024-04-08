import { unrefElement } from "@vueuse/core";
import { type Ref, inject, onBeforeUpdate, onMounted, onUpdated, provide, ref, watch } from "vue";

type ContextValue = Ref<HTMLElement[]>;

export function useCollection(injectionKey: string, name = "data-sevue-collection-item") {
  const COLLECTION_SYMBOL = injectionKey;

  const createCollection = (sourceRef?: Ref<HTMLElement | undefined>) => {
    const items = ref<HTMLElement[]>([]);

    function updateItems() {
      const sourceEl = unrefElement(sourceRef);
      if (!sourceEl) {
        items.value = [];
        return;
      }

      items.value = Array.from(sourceEl.querySelectorAll(`[${name}]:not([data-disabled])`)) as HTMLElement[];
    }

    onBeforeUpdate(() => {
      items.value = [];
    });

    onMounted(updateItems);
    onUpdated(updateItems);

    watch(() => sourceRef?.value, updateItems, { immediate: true });

    provide(COLLECTION_SYMBOL, items);

    return items;
  };

  const injectCollection = () => {
    return inject<ContextValue>(COLLECTION_SYMBOL, ref([]));
  };

  return { createCollection, injectCollection };
}
