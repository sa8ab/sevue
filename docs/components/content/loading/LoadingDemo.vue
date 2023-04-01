<template>
  <div class="container">

    <div class="doc-items">
      <RButton @click="load()">Show Loading</RButton>
      <RButton @click="load(loadingTarget)">Load On Element</RButton>
    </div>
    <div class="target" ref="loadingTarget">
      LoadingTarget
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLoading } from 'sevue'

const loading = useLoading()
const loadingTarget = ref<HTMLElement | undefined>()

const load = (target?: HTMLElement) => {
  const instance = loading({
    text: `Nothing is being loaded`,
    target,
    color: 'red'
  })
  setTimeout(() => {
    instance.close()
  }, 2800);
}
</script>

<style scoped lang="scss">
.doc-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--r-space-1);
}

.container {
  display: flex;
  flex-direction: column;
}

.target {
  // You need to set relative position on target
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  margin-top: var(--r-space-1);
  padding: var(--r-space-2);
  border-radius: var(--r-radius);
  background: rgba(var(--r-b1), 1);
}
</style>
