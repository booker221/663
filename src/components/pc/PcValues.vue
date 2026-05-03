<template>
  <PcSectionPanel title="核心价值观">
    <DynamicImage
      :remote-src="images.values_pc"
      alt="核心价值观"
      img-class="values-img"
      label="核心价值观配置效果图 (待上传)"
      aspect-ratio="2449 / 564"
    />
  </PcSectionPanel>
</template>

<script setup>
import DynamicImage from '@/components/common/DynamicImage.vue'
import PcSectionPanel from '@/components/pc/PcSectionPanel.vue'
import { images } from '@/stores/siteConfig.js'
</script>

<style scoped>
.values-img {
  width: 100%;
  display: block;
}
</style>
