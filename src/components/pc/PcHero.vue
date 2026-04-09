<template>
  <section class="hero">
    <div class="hero-banner-wrap" :style="{ backgroundImage: `url(${bannerUrl})` }">
      <div class="about-overlay">
        <div class="about-inner">
          <h3 class="about-title">关于合兴：</h3>
          <p class="about-text">
            合兴集团自成立以来，秉承"<span class="hl">合于信，兴于行</span>"的理念，我们始终坚信，信任是合作关系的基石，卓越的执行力则是可持续发展的引擎。在过去的发展历程中，我们始终坚守"<span
              class="hl">诚信为本、合作共赢、追求卓越</span>"三大核心价值观，将其作为企业立身与发展的根本。合兴的使命：持续创造价值，驱动行业变革。合兴的愿景：铸就百年品牌，成为您"<span
              class="hl">百年大业</span>"最信赖的合作伙伴。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import bannerUrl from '@/assets/images/webp/hero-banner-pc.webp'
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
