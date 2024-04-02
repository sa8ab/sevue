<script setup lang="ts">
import { ref } from "vue";
import { users } from "../mock";

import { PopupRoot, PopupContent, PopupOverlay, PopupClose, PopupTitle, PopupDescription } from "../../src/main";

const popupActive = ref(false);

const open = () => {
  active.value = true;
};

const active = ref(false);
const onBeforeClose = (done: any) => {
  done();
};
</script>

<template>
  <div class="container">
    <div class="headless">
      <RButton @click="popupActive = !popupActive">Headless</RButton>
      <PopupRoot v-model:active="popupActive">
        <PopupOverlay
          v-if="popupActive"
          style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10;
          "
        ></PopupOverlay>
        <PopupContent v-if="popupActive" style="position: relative; z-index: 12">
          <section>
            <PopupClose style="background: gray">Click To Close</PopupClose>
            <PopupTitle>Some Title</PopupTitle>
            <PopupDescription>Are you sure to close it?</PopupDescription>
            <div>Some test component</div>
          </section>
        </PopupContent>
      </PopupRoot>
    </div>
    <div class="items">
      <RButton @click="open">Button</RButton>
    </div>

    <RPopup v-model:active="active">
      <template #header> Custom header </template>
      <RSelect :options="users" :getText="(v) => v.name"> </RSelect>
      popup content
    </RPopup>
    <RButton @click="open">Button After</RButton>
  </div>
</template>

<style lang="scss" scoped>
.headless {
  padding: 20px;
}
.container {
  max-width: 400px;
  margin: auto;
}
.items {
  display: flex;
  align-items: center;
}
</style>
