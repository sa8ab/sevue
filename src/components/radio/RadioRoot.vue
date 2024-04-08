<script setup lang="ts">
import { computed } from "vue";
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { useForwardRef } from "@/composables/useForwardRef";

export interface RadioRootProps extends PrimitiveProps {
  modelValue?: string | number | boolean | null;
  value?: string | number | Record<string, any>;
  disabled?: boolean;
  containerAttrs?: any;
}

export type RadioRootEmits = {
  "update:modelValue": [RadioRootProps["modelValue"]];
};

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<RadioRootProps>(), {
  as: "label",
});

const emit = defineEmits<RadioRootEmits>();

const model = computed({
  set(e: RadioRootProps["modelValue"]) {
    emit("update:modelValue", e);
  },
  get() {
    return props.modelValue;
  },
});

const isChecked = computed(() => {
  return model.value === props.value;
});

const { forwardRef } = useForwardRef();
</script>

<template>
  <Primitive :as="as" :asChild="asChild" v-bind="containerAttrs">
    <slot :isChecked="isChecked" />
    <input
      :ref="forwardRef"
      type="radio"
      v-model="model"
      :value="value"
      :disabled="disabled"
      :data-disabled="disabled ? '' : undefined"
      :style="{
        opacity: 0,
        position: 'absolute',
        width: '1px',
        height: '1px',
      }"
      v-bind="$attrs"
    />
  </Primitive>
</template>
