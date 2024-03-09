<script setup>
  import PaginationDemo from '../../components/pagination/PaginationDemo.vue'
  import PaginationCount from '../../components/pagination/PaginationCount.vue'
  import PaginationRanges from '../../components/pagination/PaginationRanges.vue'
  import PaginationCompact from '../../components/pagination/PaginationCompact.vue'
</script>

# Popup

<p></p>

<PaginationDemo />


## Count

`count` is a number prop that specifies count of pages.

<Demo>

:::code-group
<<< ../../components/pagination/PaginationCount.vue#template [template]
:::

<template #demo>
<PaginationCount />
</template>

</Demo>


## Ranges

`mainRange` specifies how many pages to be visible after and before active page. `sideRange` specifies how many pages to be visible from start and end.


<Demo>

:::code-group
<<< ../../components/pagination/PaginationRanges.vue#template [template]
:::

<template #demo>
<PaginationRanges />
</template>

</Demo>

## compact

Puts navigation buttons bellow pages

<Demo>

:::code-group
<<< ../../components/pagination/PaginationCompact.vue#template [template]
:::

<template #demo>
<PaginationCompact />
</template>

</Demo>