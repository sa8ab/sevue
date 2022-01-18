<template>
  <div class="home-page">
    <RButton @click="onClick">
      Toggle Dark
      <template #icon>
        <i class="bx bx-user"> </i>
      </template>
    </RButton>
    <RButton icon="bx-user" to="/second">Second Page</RButton>
    <div class="" style="height: 40px"></div>
    <div class="select-container">
      <RSelect v-model="select" placeholder="Select An Option" color="red">
        <ROption :value="2" text="test 1" />
        <ROption :value="3" text="test 2" />
      </RSelect>
    </div>
    <div class="" style="height: 40px"></div>
    <div class="tabs-container">
      <RTab bordered ref="tabs" color="yellow">
        <template #icon-0> <i class="bx bx-star"></i></template>
        <RTabItem title="Tab One" icon="bx-user">item1</RTabItem>
        <RTabItem title="Tab 3" icon="bx-user"
          >item3 <template #icon> <i class="bx bx-star"></i></template
        ></RTabItem>
        <RTabItem title="Tab 4" icon="bx-user">item4</RTabItem>
        <RTabItem title="Tab Two Longer" icon="bx-heart">
          <div v-for="z in x" :key="z">item2</div>
        </RTabItem>
      </RTab>
    </div>
    <div class="" style="height: 30px"></div>
    <div class="buttons">
      <RButton
        @click="notify('bottom-right', 'red')"
        icon="bx-border-radius"
        class="r-br"
        iconOnlyAlt
        iconLarge
        color="red"
      >
      </RButton>
      <RButton
        @click="notify('bottom-left', 'yellow')"
        icon="bx-border-radius"
        class="r-bl"
        iconOnlyAlt
        iconLarge
        color="yellow"
      >
      </RButton>
      <RButton
        @click="notify('top-right')"
        icon="bx-border-radius"
        class="r-tr"
        iconOnlyAlt
        iconLarge
      >
      </RButton>
      <RButton
        @click="notify('top-left', 'green')"
        icon="bx-border-radius"
        class="r-tl"
        iconOnlyAlt
        iconLarge
        color="green"
      >
      </RButton>
      <RButton
        @click="notify('top', '#cd6133')"
        icon="bx-border-top"
        iconOnlyAlt
        iconLarge
        color="#cd6133"
      >
      </RButton>
      <RButton
        @click="notify('bottom', '#b33939')"
        icon="bx-border-bottom"
        iconOnlyAlt
        iconLarge
        color="#b33939"
      >
      </RButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data: () => ({
    select: 0,
    x: 4,
    dark: false,
  }),
  methods: {
    onClick() {
      this.dark = !this.dark;
    },
    moveTabs() {
      this.$refs.tabs.setActiveTab("Tab 4");
    },
    notify(placement, color) {
      this.$r.notify({
        title: placement,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, iusto!",
        color,
        placement,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.select-container {
  width: 400px;
  background: $b2;
  padding: $p4;
  border-radius: $radius2;
}
.tabs-container {
  display: flex;
}
.r-tl {
  &::v-deep {
    .bx {
      transform: rotate(-90deg) !important;
    }
  }
}
.r-bl {
  &::v-deep {
    .bx {
      transform: rotate(180deg) !important;
    }
  }
}
.r-br {
  &::v-deep {
    .bx {
      transform: rotate(90deg) !important;
    }
  }
}
.buttons {
  display: flex;
  gap: $p2;
  padding: $p2;
}
</style>
