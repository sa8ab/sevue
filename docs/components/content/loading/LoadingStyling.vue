<template>
  <div class="container">

    <div class="doc-items">
      <RButton @click="load({ color: '#fff', background: '#EE5A24' })" color="#EE5A24" fill>#EE5A24 Backround</RButton>
      <RButton @click="load({ color: '#fff', background: '#B53471' })" color="#B53471" fill>
        #B53471 Loading
      </RButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoadingOptions, useLoading } from 'sevue'

const loading = useLoading()
const load = ({ color, background }: Partial<LoadingOptions>) => {
  const instance = loading({
    text: `Nothing is being loaded`,
    color,
    background
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
  align-items: center;
  max-width: 400px;
  margin: auto;
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
