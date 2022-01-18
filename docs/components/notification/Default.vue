<template>
  <div class="notification-default">
    <RButton @click="onClick">Notification</RButton>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$r.notification({
        title: "Title for notification",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, adipisci!a",
      });
    },
  },
};
</script>

<style>
</style>