<template>
  <H5SectionPanel title="核心价值观">
    <DynamicImage
      :remote-src="images.values_h5"
      alt="核心价值观展示图"
      img-class="values-img"
      label="核心价值观配置效果图 (待上传)"
      aspect-ratio="334 / 96"
    />
  </H5SectionPanel>
</template>

<script setup>
import DynamicImage from '@/components/common/DynamicImage.vue'
import H5SectionPanel from '@/components/h5/H5SectionPanel.vue'
import { images } from '@/stores/siteConfig.js'
</script>

<style scoped>
.values-img {
  width: 100%;
  display: block;
  border-radius: 6px;
}
</style>
