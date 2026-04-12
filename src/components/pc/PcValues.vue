<template>
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" loading="lazy" width="28" height="28" />
        核心价值观
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" loading="lazy" width="28" height="28" />
      </h2>
    </div>
    <DynamicImage
      :remote-src="images.values_pc"
      :fallback-src="defaultValuesImg"
      alt="核心价值观"
      img-class="values-img"
      label="核心价值观图片"
      aspect-ratio="2449 / 564"
    />
  </section>
</template>

<script setup>
import DynamicImage from '@/components/common/DynamicImage.vue'
import defaultValuesImg from '@/assets/images/webp/values-pc.webp'
import { images } from '@/stores/siteConfig.js'
</script>

<style scoped>
.section {
  margin-bottom: 24px;
  margin-top: 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 20px;
}



.values-img {
  width: 100%;
  display: block;
}
</style>
