<template>
  <div class="notification-default">
    <div class="buttons">
      <RButton
        @click="notification('bottom-right')"
        icon="bx-border-radius"
        class="r-br"
        iconOnlyAlt
        iconLarge
      >
      </RButton>
      <RButton
        @click="notification('bottom-left')"
        icon="bx-border-radius"
        class="r-bl"
        iconOnlyAlt
        iconLarge
      >
      </RButton>
      <RButton
        @click="notification('top-right')"
        icon="bx-border-radius"
        class="r-tr"
        iconOnlyAlt
        iconLarge
      >
      </RButton>
      <RButton
        @click="notification('top-left')"
        icon="bx-border-radius"
        class="r-tl"
        iconOnlyAlt
        iconLarge
      >
      </RButton>
      <RButton
        @click="notification('top')"
        icon="bx-border-top"
        iconOnlyAlt
        iconLarge
      >
      </RButton>
      <RButton
        @click="notification('bottom')"
        icon="bx-border-bottom"
        iconOnlyAlt
        iconLarge
      >
      </RButton>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    notification(placement) {
      this.$r.notification({
        title: placement,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, adipisci!a",
        placement,
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