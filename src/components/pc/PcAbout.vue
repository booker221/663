<template>
  <section class="section" id="about">
    <div class="section-header">
      <h2 class="section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" loading="lazy" width="28" height="28" />
        {{ aboutTitle }}
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" loading="lazy" width="28" height="28" />
      </h2>
    </div>

    <div class="video-shell">
      <DynamicImage
        :remote-src="images.about_cover_pc"
        alt="关于站点展示图"
        img-class="video-card about-image"
        label="关于站点图片 (待上传)"
        aspect-ratio="2 / 1"
        border-radius="20px"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import DynamicImage from '@/components/common/DynamicImage.vue'
import { images, remoteSiteMeta } from '@/stores/siteConfig.js'

const aboutTitle = computed(() => {
  const siteName = (remoteSiteMeta.value?.name || '').trim()
  const brand = Array.from(siteName).slice(0, 2).join('') || '合兴'
  return `关于${brand}`
})
</script>

<style scoped>
.section {
  margin: 40px 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 20px;
}

.video-shell {
  width: min(100%, 920px);
  margin: 0 auto;
  padding: 4px;
  border-radius: 24px;
  background: #EEF4FF;
  box-shadow: 0 8px 16px rgba(163, 191, 222, 0.24);
}

.video-card {
  width: 100%;
  aspect-ratio: 2 / 1;
  border: 4px solid #FFFFFF;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 252, 255, 0.96) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

:deep(.about-image) {
  display: block;
  object-fit: cover;
}

:deep(.image-placeholder) {
  width: 100%;
  border: 4px solid #FFFFFF;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 252, 255, 0.96) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
}
 
</style>
