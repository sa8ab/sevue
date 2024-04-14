<script setup lang="ts">
import { computed } from "vue";
import { Primitive, type PrimitiveProps } from "@/components/primitive";
import { useForwardRef } from "@/composables/useForwardRef";
import { useVModel } from "@vueuse/core";

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

const model = useVModel(props, "modelValue", emit);

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
    <slot :isChecked="isChecked" />
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
        width: '1px',
        height: '1px',
      }"
      v-bind="$attrs"
    />
  </Primitive>
</template>
