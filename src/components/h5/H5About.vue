<template>
  <section class="section" id="about">
    <div class="section-header">
      <h2 class="section-title"><span class="dot">◆</span> {{ aboutTitle }}</h2>
    </div>

    <div class="video-shell">
      <DynamicImage
        :remote-src="images.about_cover_h5"
        alt="关于站点展示图"
        img-class="video-card about-image"
        label="关于站点图片 (待上传)"
        aspect-ratio="351 / 172"
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
  margin-bottom: 14px;
}

.section-header {
  margin-bottom: 10px;
}

.section-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 0 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  color: var(--primary);
  font-size: 13px;
}

.video-shell {
  margin: 0 12px;
  padding: 4px;
  border-radius: 24px;
  background: #EEF4FF;
  box-shadow: 0 8px 16px rgba(163, 191, 222, 0.24);
}

.video-card {
  width: 100%;
  aspect-ratio: 351 / 172;
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
