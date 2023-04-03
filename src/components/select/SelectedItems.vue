<template>
  <div class="r-selected-items" v-if="items?.length">
    <!-- TODO: replace with tag component -->
    <RButton class="r-selected-item" v-for="item in items" :key="item.value" @click="onItemClick(item)" iconAfter
      textStyle>
      <slot v-bind="item">
        <div class="r-selected-item-text">{{ item.text }}</div>
      </slot>
      <template #icon>
        <IconClose class="r-selected-item-close" />
      </template>
    </RButton>
  </div>
</template>

<script setup lang="ts">
import { Close as IconClose } from '../icons'
import type { Props as Option } from './ROption.vue'
export interface Props {
  items?: Option[]
}
const props = withDefaults(
  defineProps<Props>(),
  {}
)
const emit = defineEmits(['itemClick'])
const onItemClick = (item: Option) => {
  emit('itemClick', item)
}
</script>

<style scoped lang="scss">
.r-selected-items {
  display: flex;
  flex-wrap: wrap;
  margin-top: var(--r-space-1);
  gap: var(--r-space-1);
}

.r-selected-item {
  gap: var(--r-space-1);
  background: color(b2) !important;
  padding: calc(var(--r-space-1) / 2) var(--r-space-1);
  box-shadow: 0 0 0 1px color(border-color, var(--border-alpha));
  font-size: var(--r-font-xsmall);

  &:hover {
    background: color(hover, var(--hover-alpha)) !important;
  }

  &-close {
    width: 18px;
    height: 18px;
  }
}
</style>