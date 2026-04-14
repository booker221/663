<template>
  <section class="section">
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

.values-img {
  width: 100%;
  display: block;
}
</style>
