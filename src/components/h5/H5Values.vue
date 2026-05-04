<template>
  <section class="section">
     <div class="section-header">
      <div class="section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot-l.webp" alt="" />
        <div class="title-text">核心价值观</div>
      </div>
    </div>
    <DynamicImage
      :remote-src="images.values_h5"
      alt="核心价值观展示图"
      img-class="values-img"
      label="核心价值观配置效果图 (待上传)"
      aspect-ratio="729 / 328"
    />
  </section>
</template>

<script setup>
import DynamicImage from '@/components/common/DynamicImage.vue'
import { images } from '@/stores/siteConfig.js'
</script>

<style scoped>
.section {
  margin-bottom: 12px;
}
.section-header {
  margin-bottom: 12px;
}

.section-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
}
.title-dot {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
}
.title-text {
  background: linear-gradient(180deg, #FFDC69 0%, #FFE280 13.47%, #B48735 50.12%, #FFE280 86.98%, #FFD466 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0;
}
.values-img {
  width: 100%;
  display: block;
}
</style>
