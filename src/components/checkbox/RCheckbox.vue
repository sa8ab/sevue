<template>
  <label :class="['r-cb', { isChecked }]" :style="{ '--r-prm': getColor(color) }">
    <input
      type="checkbox"
      :value="val"
      v-model="model"
      :trueValue="trueValue"
      :falseValue="falseValue"
    />
    <div class="check-container">
      <CheckIcon />
      <div class="background"></div>
    </div>
    <slot />
  </label>
</template>

<script setup lang="ts">
import { getColor } from "@/utils";
import { isArray } from "@vue/shared";
import { computed } from "vue";
import CheckIcon from "@/components/icons/Check.vue";

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    val?: string | number | any[];
    color?: string;
    trueValue?: any;
    falseValue?: any;
  }>(),
  {
    trueValue: true,
    falseValue: false,
  }
);
const emit = defineEmits(["update:modelValue"]);

// const onInput = (e: Event) => {
//   emit("update:modelValue", (<HTMLInputElement>e.target).value);
// };
const model = computed({
  set(e) {
    emit("update:modelValue", e);
  },
  get() {
    return props.modelValue;
  },
});
const isChecked = computed(() => {
  if (isArray(props.modelValue)) {
    // if (typeof this.val === "object") {
    //   return !!this.value.find((item) => {
    //     console.log(JSON.stringify(item) == JSON.stringify(this.value));
    //     return JSON.stringify(item) == JSON.stringify(this.value);
    //   });
    // }
    return props.modelValue.includes(props.val);
  }
  return props.modelValue === props.trueValue;
});
</script>

<style lang="scss">
.r-cb {
  user-select: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: $p;
  &:hover {
    .check-container {
      background: color(hover, var(--hover-alpha));
    }
  }
  input {
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    z-index: 0;
    // visibility: hidden;
  }
  .check-container {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: $radius;
    overflow: hidden;
    border: 2px solid color(hover, var(--hover-alpha));
    transition: all $duration;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: color();
    z-index: -1;
    transform: translateY(100%);
    transition: all $duration;
    border-radius: 50%;
  }
  .icon {
    position: relative;
    z-index: 2;
    transform: scale(0);
    transition: transform $duration / 2;
    transition-delay: $duration / 2;
  }
  &.isChecked {
    &:hover {
      .check-container {
        box-shadow: 0 2px 8px color();
      }
    }
    .check-container {
      border-color: color();
    }
    .background {
      transform: translateY(0);
      border-radius: 0;
    }
    .icon {
      transform: scale(1);
    }
  }
}
</style>
