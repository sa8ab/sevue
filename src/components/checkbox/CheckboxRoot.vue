<script setup lang="ts">
import { computed } from "vue";
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { useForwardRef } from "@/composables/useForwardRef";

export interface CheckboxRootProps extends PrimitiveProps {
  modelValue?: string | number | boolean | null | any[];
  value?: string | number | Record<string, any>;
  disabled?: boolean;
  containerAttrs?: any;
}

export type CheckboxRootEmits = {
  "update:modelValue": [CheckboxRootProps["modelValue"]];
};
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<CheckboxRootProps>(), {
  as: "label",
});

const emit = defineEmits<CheckboxRootEmits>();

const model = computed({
  set(e: CheckboxRootProps["modelValue"]) {
    emit("update:modelValue", e);
  },
  get() {
    return props.modelValue;
  },
});

const isChecked = computed(() => {
  if (Array.isArray(model.value)) {
    return model.value.includes(props.value);
  }
  return !!model.value;
});

const { forwardRef } = useForwardRef();
</script>

<template>
  <Primitive :as="as" :asChild="asChild" v-bind="containerAttrs">
    <input
      :ref="forwardRef"
      type="checkbox"
      v-model="model"
      :value="value"
      :disabled="disabled"
      :data-disabled="disabled ? '' : undefined"
      :style="{
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1px',
        height: '1px',
        'z-index': 0,
      }"
      v-bind="$attrs"
    />
    <slot :isChecked="isChecked" />
  </Primitive>
</template>
