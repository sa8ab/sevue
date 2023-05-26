import { onMounted, useSlots, watch, ref, type VNode } from "vue";
const useDynamicSlots = () => {
  const data = ref<VNode[]>([]);

  const { default: defaultSlot } = useSlots();

  onMounted(() => {
    data.value = defaultSlot!();
  });

  watch(
    () => defaultSlot!(),
    (defSlot) => (data.value = defSlot),
    { immediate: true }
  );

  return data;
};
export default useDynamicSlots;
