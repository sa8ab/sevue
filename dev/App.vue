<template>
  <div class="app">
    <RButton @click="click" disabled> toggle dark </RButton>
    <RButton @click="click"> toggle dark </RButton>
    <RButton @click="loader" textStyle flat> Loader </RButton>
    <RTab bordered class="tabbar" :initialActiveTab="1">
      <RTabItem title="some title" :disabled="true"> hi </RTabItem>
      <RTabItem title="tab 2"> Tab 2 </RTabItem>
      <RTabItem title="some other title">
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </RTabItem>
    </RTab>
    <RCheckbox v-model="x" :color="checkboxColor">Checkbox</RCheckbox>
    <RButton @click="checkboxColor = 'yellow'">Change Color {{ checkboxColor }}</RButton>
    <div class="select-n-input">
      <RSelect v-model="selected">
        <RSelectGroup title="g title">
          <ROption value="id" text="hey" />
          <ROption value="id4" text="hey4" />
          <ROption value="id6" text="hey6" />
        </RSelectGroup>
        <RSelectGroup title="g title 2">
          <ROption value="id2" text="hey 2" />
        </RSelectGroup>
      </RSelect>
      <RInput v-model="selected" class="someclass" ref="iref" icon="bx-user"></RInput>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { LoadingKey, useLoading } from "../src/main";

const loading = useLoading();

const iref = ref()
const active = ref([0, 50]);
const x = ref(true);
const checkboxColor = ref('green');
const items = ref([
  { value: "10", text: "hey there" },
  { value: "20", text: "some text" },
]);
const selected = ref('')
const click = () => {
  document.body.classList.toggle("dark");
};
const loader = () => {
  const close = loading();
  setTimeout(() => {
    close();
  }, 1000);
};

onMounted(() => {
  setTimeout(() => {
    console.log(iref.value.inputRef);
  }, 1);
  
  document.body.classList.add("dark");
});
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  gap: $p2;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 800px;
  margin: auto;
  padding: 8px;
}
.tabbar {
  width: 100%;
}
body {
  background: color(b1);
  color: color(text);
}

.loader-container {
  position: relative;
}
.select-n-input{
  display: flex;
}
</style>
