<!-- #region template -->
<template>
  <div class="input-items">
    <RInput label="My label" hint="Optional Field" />
    <RInput>
      <template #label>
        <div class="color-red">Label Slot</div>
      </template>
      <template #hint>
        <div class="color-yellow">Hint Slot</div>
      </template>
    </RInput>
  </div>
</template>
<!-- #endregion template -->

<script lang="ts" setup></script>
