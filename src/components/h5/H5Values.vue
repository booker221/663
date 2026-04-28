<template>
  <section class="section">
     <div class="section-header">
      <h2 class="section-title"><span class="dot">◆</span> 核心价值观</h2>
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
  font-size: 16px;
  font-weight: 800;
  color: var(--text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 12px;
}
.dot {
  color: var(--primary);
  font-size: 13px;
}
.values-img {
  width: 100%;
  display: block;
}
</style>
