<template>
  <div :class="['r-slider', { tickLabels: showTickLabels }]" :style="{ '--r-color': color || 'var(--r-prm)' }">
    <div class="bar" ref="slider" @click="onSliderClick">
      <div class="progress" :style="progressStyle"></div>
      <div class="ticks" v-if="ticks || customTicks">
        <RSliderTick class="tick" v-for="tick in ticksList" v-bind="tick">
          <slot name="tick" v-bind="tick" />
        </RSliderTick>
      </div>
      <Dot
        ref="dotOne"
        :dotVal="state.value1"
        v-bind="$props"
        @update="onValueOneUpdate"
        @setIsDragging="setIsDragging"
        class="dot-1"
      >
        <slot name="tooltip" :value="state.value1"></slot>
      </Dot>
      <Dot
        v-if="isRange"
        ref="dotTwo"
        :dotVal="state.value2"
        v-bind="$props"
        @update="onValueTwoUpdate"
        @setIsDragging="setIsDragging"
        class="dot-2"
      >
        <slot name="tooltip" :value="state.value2"></slot>
      </Dot>
    </div>
  </div>
</template>

<script setup lang="ts">
import useColor from "@/composables/useColor";
import { computed, provide, reactive, watch, ref, type StyleValue, toRef } from "vue";
import Dot from "./RSliderDot.vue";
import RSliderTick from "./RSliderTick.vue";
import { sliderKey } from "@/injectionKeys";
export interface Props {
  modelValue?: number | Array<number>;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  tooltip?: boolean;
  alwaysTooltip?: boolean;
  color?: string;
  ticks?: boolean;
  tickLabels?: boolean;
  customTicks?: Array<{ text: string; value: number }>;
  hideFirstAndLastTickLabel?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  precision: 0,
  tooltip: false,
  alwaysTooltip: false,
  ticks: false,
  tickLabels: false,
  hideFirstAndLastTickLabel: true,
});
const emit = defineEmits<{
  (e: "update:modelValue", arg0: number | Array<number>): void;
  (e: "change", arg0: number | Array<number>): void;
}>();
const color = useColor(toRef(props, "color"));

const state = reactive({
  value1: 0,
  value2: 0,
  isDragging: false,
  transition: `all 0.3s`,
});
const slider = ref<HTMLDivElement | undefined>();

const setValues = () => {
  if (isRange.value) {
    const [one, two] = <number[]>props.modelValue;
    const LOWER = Math.min(Math.max(one, props.min), props.max);
    const UPPER = Math.max(Math.min(two, props.max), props.min);

    state.value2 = areDotsReversed.value ? LOWER : UPPER;
    state.value1 = areDotsReversed.value ? UPPER : LOWER;
  } else {
    state.value1 = <number>props.modelValue;
  }
};

const emitInput = () => {
  emit("update:modelValue", isRange.value ? [minValue.value, maxValue.value] : state.value1);
};
const emitChange = () => {
  emit("change", isRange.value ? [minValue.value, maxValue.value] : state.value1);
};

const onSliderClick = ({ clientX }: MouseEvent) => {
  const value = getValueFromPosition({ position: clientX });
  if (isRange.value) {
    const diffFirst = Math.abs(value - (<number[]>props.modelValue)[0]);
    const diffSecond = Math.abs(value - (<number[]>props.modelValue)[1]);
    if (diffFirst < diffSecond) {
      areDotsReversed.value ? onValueTwoUpdate({ clientX }) : onValueOneUpdate({ clientX });
    } else {
      areDotsReversed.value ? onValueOneUpdate({ clientX }) : onValueTwoUpdate({ clientX });
    }
    emitChange();
  } else {
    onValueOneUpdate({ clientX });
    emitChange();
  }
};

const onValueOneUpdate = (e: Pick<MouseEvent, "clientX">) => {
  state.value1 = getValueFromPosition({ position: e.clientX });
  emitInput();
};
const onValueTwoUpdate = (e: Pick<MouseEvent, "clientX">) => {
  state.value2 = getValueFromPosition({ position: e.clientX });
  emitInput();
};

const getValueFromPosition = ({ position }: { position: number }) => {
  const { min, max, step } = props;
  const sliderOffsetLeft = slider.value?.getBoundingClientRect().left || 0;
  const percent = ((position - sliderOffsetLeft) / sliderWidth()) * 100;
  const raw = percent / step / (100 / (max - min));
  const rounded = props.precision ? raw : Math.round(raw);
  const value = parseFloat((rounded * step + min).toFixed(props.precision));
  if (value > max) return max;
  if (value < min) return min;
  return value;
};

const getPositionFromValue = ({ value }: { value: number }) => {
  return ((value - props.min) / (props.max - props.min)) * 100;
};
const sliderWidth = () => {
  return slider.value?.getBoundingClientRect().width || 0;
};

const setIsDragging = (e: boolean) => {
  state.isDragging = e;
  if (!e) emitChange();
};
const isRange = computed(() => {
  return Array.isArray(props.modelValue);
});
const minValue = computed(() => {
  return Math.min(state.value1, state.value2);
});
const maxValue = computed(() => {
  return Math.max(state.value1, state.value2);
});
const areDotsReversed = computed(() => {
  if (isRange.value) {
    return state.value1 > state.value2;
  }
  return false;
});
const ticksList = computed(() => {
  if (props.customTicks) return props.customTicks;
  const list = [];
  const count = (props.max - props.min) / props.step;

  for (let x = 0; x <= count; x++) {
    list.push({
      value: x * props.step + props.min,
    });
  }
  return list;
});
const progressStyle = computed(() => {
  const { min, max } = props;
  const { value1, value2 } = state;
  const _isRange = isRange.value;
  return (
    _isRange
      ? {
          width: `${(Math.abs(value1 - value2) / (max - min)) * 100}%`,
          left: `${((Math.min(value1, value2) - min) / (max - min)) * 100}%`,
          transition: !state.isDragging && state.transition,
        }
      : {
          width: `${((value1 - min) / (max - min)) * 100}%`,
          transition: !state.isDragging && state.transition,
        }
  ) as StyleValue;
});

watch([() => props.modelValue, () => props.max, () => props.min], setValues, { immediate: true, deep: true });

const showTickLabels = computed(() => props.tickLabels || !!props.customTicks);

provide(sliderKey, {
  transition: toRef(state, "transition"),
  showTickLabels: showTickLabels,
  min: toRef(props, "min"),
  max: toRef(props, "max"),
  hideFirstAndLastTickLabel: toRef(props, "hideFirstAndLastTickLabel"),
  getPositionFromValue,
});
</script>

<style lang="scss">
.r-slider {
  width: 100%;
  user-select: none;
  padding: var(--r-space-2) 0;

  .bar {
    // background: color("b2");
    background: color(hover);
    height: 8px;
    width: 100%;
    position: relative;
    cursor: pointer;
    border-radius: 8px;
  }

  .progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 20px;
    background: color();
    pointer-events: none;
    border-radius: 8px;
    z-index: 2;
  }

  .ticks {
    pointer-events: none;
  }

  &.tickLabels {
    padding-bottom: 24px;
  }
}
</style>
