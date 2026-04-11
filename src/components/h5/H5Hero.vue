<template>
  <section class="hero">
    <!-- Banner 背景图 -->
    <div class="hero-banner-wrap" :style="{ backgroundImage: `url(${bannerImage})` }"></div>
    <!-- 关于文字（负 margin 上移叠加到 banner 上） -->
    <div class="about-section">
      <h3 class="about-title">{{ siteInfo.aboutTitle }}</h3>
      <p class="about-text" v-html="siteInfo.aboutText"></p>
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
  /* 保持原始宽高比 750:680 */
  aspect-ratio: 750 / 680;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 负 margin 上移，叠加在 banner 图下半部分 */
.about-section {
  position: relative;
  margin-top: -150px;
  padding: 16px 16px 20px;
  margin-left: 12px;
  margin-right: 12px;
}

.about-title {
  font-family: "PingFang SC", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #1a2233;
  margin: 0 0 10px;
}

.about-text {
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.8;
  color: #333;
  margin: 0;
}

.hl {
  color: var(--primary);
  font-weight: 700;
}
</style>
