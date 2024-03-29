<template>
  <label
    :class="['r-radio', containerClass, { 'r-radio-disabled': disabled }]"
    :style="{
      '--r-color': color || 'var(--r-prm)',
    }"
  >
    <input type="radio" :value="value" v-model="model" :disabled="disabled" v-bind="$attrs" ref="inputRef" />
    <div class="r-radio-dot-container">
      <div class="r-radio-dot-circle"></div>
    </div>
    <div class="r-radio-slot">
      <slot />
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, toRef, ref, onMounted } from "vue";
import useColor from "@/composables/useColor";

export interface Props {
  modelValue?: string | number | boolean | null;
  value?: string | number;
  color?: string;
  containerClass?: string;
  disabled?: boolean;
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(["update:modelValue"]);

const { color } = useColor(toRef(props, "color"));

const inputRef = ref<HTMLInputElement | undefined>();

const model = computed({
  set(e) {
    emit("update:modelValue", e);
  },
  get() {
    return props.modelValue;
  },
});

onMounted(() => {
  // @ts-ignore
  if (props.tag) {
    console.warn("Tag prop is depricated on RRadio");
  }
});

defineExpose({
  inputRef,
});
</script>

<style lang="scss">
.r-radio {
  user-select: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--r-space-1);
  color: color(text-color);

  &:hover {
    .r-radio-dot-container {
      background: color(hover, var(--r-hover-alpha));
    }
  }

  input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    z-index: 0;
  }

  &-dot-container {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid color(hover, var(--r-hover-alpha));
    transition: all var(--r-duration);
  }

  &-dot-circle {
    position: relative;
    top: 4px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: color();
    transition: all var(--r-duration);
    border-radius: 50%;
    opacity: 0;
  }

  &-slot {
    flex: 1;
  }

  input:checked ~ .r-radio-dot-container {
    border-color: color();
  }
  input:checked ~ .r-radio-dot-container .r-radio-dot-circle {
    top: 0;
    opacity: 1;
  }

  &-disabled {
    pointer-events: none;
    opacity: var(--r-disabled-alpha);
  }

  input:focus-visible ~ .r-radio-dot-container {
    box-shadow: var(--r-focused-box-shadow-specs) color();
  }
}
</style>
