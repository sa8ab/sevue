<script setup>
  import TabsDemo from '../../components/tabs/TabsDemo.vue'
  import TabsDefault from '../../components/tabs/TabsDefault.vue'
</script>

# Tabs

<p></p>

<TabsDemo />


## Default

`RTab` is for Tabbar and `RPanel` is for content of the tabbar. you can use them separately as well.

<Demo>

:::code-group
<<< ../../components/tabs/TabsDefault.vue#template [template]
<<< ../../components/tabs/TabsDefault.vue#script{ts} [script]
:::

<template #demo>
<TabsDefault />
</template>

</Demo>
