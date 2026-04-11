<template>
  <section class="hero">
    <div class="hero-banner-wrap" :style="{ backgroundImage: `url(${bannerImage})` }">
      <div class="about-overlay">
        <div class="about-inner">
          <h3 class="about-title">{{ siteInfo.aboutTitle }}</h3>
          <p class="about-text" v-html="siteInfo.aboutText"></p>
        </div>
      </div>
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
  /* 保持原始宽高比 3840:1560 */
  aspect-ratio: 3840 / 1560;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.about-overlay {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
}

.about-inner {
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
}

.about-title {
  color: #414A65;

  font-family: Alibaba PuHuiTi 3.0;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0%;
}

.about-text {
  color: #414A65;
  font-family: Alibaba PuHuiTi 3.0;
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0%;
}

.hl {
  color: var(--primary);
  font-weight: 700;
}
</style>
