<template>
  <div class="notification-default">
    <div class="buttons">
      <RButton
        @click="notification('bottom-right', 'prm')"
        icon="bx-border-radius"
        class="r-br"
        iconOnlyAlt
        iconLarge
      >
      </RButton>
      <RButton
        @click="notification('bottom-left', 'red')"
        icon="bx-border-radius"
        class="r-bl"
        iconOnlyAlt
        iconLarge
        color="red"
      >
      </RButton>
      <RButton
        @click="notification('top-right', 'green')"
        icon="bx-border-radius"
        class="r-tr"
        iconOnlyAlt
        iconLarge
        color="green"
      >
      </RButton>
      <RButton
        @click="notification('top-left', 'yellow')"
        icon="bx-border-radius"
        class="r-tl"
        iconOnlyAlt
        iconLarge
        color="yellow"
      >
      </RButton>
      <RButton
        @click="notification('top', '#d35400')"
        icon="bx-border-top"
        iconOnlyAlt
        iconLarge
        color="#d35400"
      >
      </RButton>
      <RButton
        @click="notification('bottom', 'rgba(52, 73, 94, 1.0)')"
        icon="bx-border-bottom"
        iconOnlyAlt
        iconLarge
        color="rgba(52, 73, 94, 1.0)"
      >
      </RButton>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    notification(placement, color) {
      this.$r.notification({
        title: color,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, adipisci!a",
        placement,
        color,
      });
    },
  },
};
</script>

<style scoped lang="scss">
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
  gap: 8px;
}
</style>