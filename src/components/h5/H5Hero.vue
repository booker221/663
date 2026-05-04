<template>
  <section class="hero">
    <!-- Banner 背景图 -->
    <div class="hero-banner-wrap">
      <img :src="bannerImage" alt="Banner">
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import bannerUrl from '@/assets/images/webp/hero-banner-h5.webp'
import { siteInfo, images } from '@/stores/siteConfig.js'

const bannerImage = computed(() => images.hero_banner_h5 || bannerUrl)
</script>

<style scoped>
.hero {
  margin-bottom: 12px;
  padding: 8px 12px 0;
}

.hero-banner-wrap {
  width: 100%;
  height: 210px;
  overflow: hidden;
  border: 1px solid rgba(255, 216, 106, 0.18);
  border-radius: 16px;
  background: #060606;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
}

.hero-banner-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
