<template>
  <div class="doc-item">
    <RTab v-model="active" moverFull>
      <RTabItem value="tab1"> Tab 1 </RTabItem>
      <RTabItem value="tab2"> Tab 2 </RTabItem>
      <RTabItem value="tab3"> Tab 3 </RTabItem>
    </RTab>
    <div class="spacer"></div>
    <RPanel v-model="active">
      <RPanelItem value="tab1">
        <div class="image-text">
          <img
            src="https://images.unsplash.com/photo-1613552465135-e5bdaada10bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            class="img-1"
          />
          <img
            src="https://images.unsplash.com/photo-1621515506232-b811cfd6d81f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            class="img-2"
          />
          <img
            src="https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            alt=""
            class="img-3"
          /></div
      ></RPanelItem>
      <RPanelItem value="tab2">
        Tab 2 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut eveniet maiores magnam? Officia amet quod
        nulla provident esse, assumenda suscipit voluptate repellat facilis fugit praesentium magni, quidem illo nemo at
        minus autem et recusandae perspiciatis eligendi corrupti accusantium illum cumque!
      </RPanelItem>
      <RPanelItem value="tab3">
        <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="" />
        <div class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellat eum laudantium nemo nulla et illum
          esse. Soluta, provident adipisci.
        </div>
      </RPanelItem>
    </RPanel>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const active = ref("tab1");
</script>

<style scoped lang="scss">
.spacer {
  margin-bottom: 4px;
}
.doc-item {
  max-width: 800px;
}
img {
  object-fit: cover;
  border-radius: 8px;
}
.content {
  margin-top: 8px;
}
.image-text {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "img1 img2 img2"
    "img1 img3 img3";
  gap: 8px;
  .img-1 {
    grid-area: img1;
    height: 100%;
  }
  .img-2 {
    grid-area: img2;
    height: 180px;
    width: 100%;
  }
  .img-3 {
    grid-area: img3;
    height: 180px;
    width: 100%;
  }
}
.r-panel {
  border-radius: 6px;
}
</style>
