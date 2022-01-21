<template>
  <div class="second-page">
    <div class="checkboxes">
      <RCheckbox v-model="x" :val="'some name'">Default</RCheckbox>
      <RCheckbox v-model="x" :val="'some name 2'" color="yellow">
        Yellow checkbox
      </RCheckbox>
      <RCheckbox v-model="x" :val="'some name 3'" color="red">
        Red checkbox
      </RCheckbox>
      <RCheckbox v-model="c" color="#C4E538"> Custom Color </RCheckbox>
    </div>
    <div style="height: 40px"></div>
    <RButton @click="active = true">Open Popup</RButton>
    <RPopup :active.sync="active" title="popup title">
      popup content
      <template #footer> something </template>
    </RPopup>
    <div style="height: 40px"></div>
    <RSelect
      v-model="selected"
      placeholder="Select An Option"
      label="Grouped Options"
      searchable
      isNested
    >
      <RSelectGroup v-for="{ cities, name } in items" :key="name" :title="name">
        <ROption
          v-for="city in cities"
          :key="city.id"
          :text="city.name"
          :value="city.id"
        />
      </RSelectGroup>
    </RSelect>
    <div style="height: 40px"></div>
    <RButton @click="changeMessage">Change Input Message</RButton>
    <RCheckbox color="red" v-model="inputRed">input red</RCheckbox>
    <div class="input">
      <RInput
        placeholder="input"
        label="input label"
        icon="bx-user"
        iconAfter
        color="yellow"
        :message="message"
        :red="inputRed"
      >
        <template #icon>
          <i class="bx bx-user"></i>
        </template>
      </RInput>
    </div>
  </div>
</template>

<script>
export default {
  name: "SecondPage",
  data: () => ({
    x: [],
    c: false,
    active: false,
    selected: null,
    message: "",
    inputRed: false,
    items: [
      {
        name: "Greece",
        cities: [
          { name: "Athens", id: 1 },
          { name: "Patras", id: 2 },
          { name: "Larissa", id: 3 },
        ],
      },
      {
        name: "Russia",
        cities: [
          { name: "Moscow", id: 4 },
          { name: "Yekaterinburg", id: 5 },
          { name: "Kazan", id: 6 },
          { name: "Samara", id: 7 },
        ],
      },
      {
        name: "UAE",
        cities: [
          { name: "Dubai", id: 8 },
          { name: "Abu Dhabi", id: 9 },
        ],
      },
    ],
  }),
  methods: {
    changeMessage() {
      this.message = this.message ? "" : "some message";
    },
  },
};
</script>

<style scoped lang="scss">
.checkboxes {
  display: flex;
  gap: 10px;
}
.input {
  padding: 10px;
  background: color("b2");
}
</style>