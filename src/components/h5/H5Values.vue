<template>
  <section class="section">
    <DynamicImage
      :remote-src="images.values_h5"
      :fallback-src="defaultValuesImg"
      alt="核心价值观展示图"
      img-class="values-img"
      label="核心价值观图片"
      aspect-ratio="729 / 328"
    />
  </section>
</template>

<script setup>
import DynamicImage from '@/components/common/DynamicImage.vue'
import defaultValuesImg from '@/assets/images/webp/values-h5.webp'
import { images } from '@/stores/siteConfig.js'
</script>

<style scoped>
.section {
  margin-bottom: 12px;
}

.values-img {
  width: 100%;
  display: block;
}
</style>
