<template>
  <section class="hero">
    <div class="hero-banner-wrap">
      <DynamicImage
        :remote-src="bannerImage"
        alt="Banner"
        :label="configLoaded ? '请在后台上传 Banner 图' : ''"
        img-class="hero-banner-image"
        height="100%"
        border-radius="0"
        fetch-priority="high"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import DynamicImage from '@/components/common/DynamicImage.vue'
import { configLoaded, images } from '@/stores/siteConfig.js'

const bannerImage = computed(() => (images.hero_banner_h5 || '').trim())
</script>

<style scoped>
.hero {
}

.hero-banner-wrap {
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: #060606;
  margin-bottom: 20px;
}

:deep(.hero-banner-image) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

:deep(.image-placeholder) {
  height: 100%;
  border: 1px dashed rgba(255, 220, 105, 0.28);
  background: linear-gradient(180deg, rgba(36, 31, 18, 0.92) 0%, rgba(8, 8, 8, 0.96) 100%);
}

:deep(.placeholder-icon) {
  color: rgba(255, 220, 105, 0.38);
}

:deep(.placeholder-label) {
  color: rgba(255, 220, 105, 0.85);
  font-size: 14px;
}
</style>
