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
        <Teleport to="body">
          <Transition name="fade">
            <div class="popup-container" v-if="popupActive">
              <PopupOverlay
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
              <PopupContent v-if="popupActive" class="popup-content">
                <section>
                  <PopupClose class="popup-close">Close Component</PopupClose>
                  <PopupTitle>Some Title</PopupTitle>
                  <PopupDescription>Are you sure to close it?</PopupDescription>
                  <div>Some test component</div>
                </section>
              </PopupContent>
            </div>
          </Transition>
        </Teleport>
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

.popup-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.popup-content {
  background-color: #fafafa;
  padding: 10px;
  color: black;
  border-radius: 10px;
  overflow: hidden;

  top: 0;
  left: 0;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-close {
  border-radius: 4px;
  background: #1f1f1f;
  color: white;
  padding: 4px;
  &:focus-visible {
    box-shadow: 0 0 0 2px #09c709;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
