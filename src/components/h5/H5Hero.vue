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
}

.hero-banner-wrap {
  width: 100%;
  height: 210px;
}

.hero-banner-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
