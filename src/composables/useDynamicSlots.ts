import { onMounted, useSlots, watch, ref, type VNode} from "vue";
// FIXME: gives vite error ( related to ts2 plugin )
const useDynamicSlots = () => {
  const data = ref<VNode[]>([]);

  const { default: defaultSlot } = useSlots();

  onMounted(() => {
    data.value = defaultSlot!();
  });
  watch(
    () => defaultSlot!(),
    (defSlot) => (data.value = defSlot)
  );
  return data;
};
export default useDynamicSlots;
