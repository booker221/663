<template>
  <section class="hero">
    <div class="hero-banner-wrap" >
      <img :src="bannerImage" alt="Banner">
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import bannerUrl from '@/assets/images/webp/hero-banner-pc.webp'
import { siteInfo, images } from '@/stores/siteConfig.js'

// 优先使用后台上传的图片，否则使用默认打包图片
const bannerImage = computed(() => images.hero_banner_pc || bannerUrl)
</script>

<style scoped>
.hero {
  margin-bottom: 8px;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.hero-banner-wrap {
  position: relative;
  width: 100%;
  height: 880px;
}
.hero-banner-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
