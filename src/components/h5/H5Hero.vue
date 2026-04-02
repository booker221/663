<template>
  <section class="hero">
    <!-- Banner 图 -->
    <div class="hero-banner-wrap">
      <img class="hero-banner" src="@/assets/images/webp/hero-banner-h5.webp" alt="合兴集团 - 合于信 兴于行" fetchpriority="high" loading="eager" width="750" height="420" />
    </div>
    <!-- 关于文字（负 margin 上移叠加到 banner 上） -->
    <div class="about-section">
      <h3 class="about-title">关于合兴</h3>
      <p class="about-text">
        合兴集团自成立以来，秉承"<span class="hl">合于信，兴于行</span>"的理念，我们始终坚信，信任是合作关系的基石，卓越的执行力则是可持续发展的引擎。在过去的发展历程中，我们始终坚守"<span class="hl">诚信为本、合作共赢、追求卓越</span>"三大核心价值观，将其作为企业立身与发展的根本。合兴的使命：持续创造价值，驱动行业变革。合兴的愿景：铸就百年品牌，成为您"<span class="hl">百年大业</span>"最信赖的合作伙伴。
      </p>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  margin-bottom: 12px;
}

.hero-banner-wrap {
  width: 100%;
  overflow: hidden;
}

.hero-banner {
  width: 100%;
  display: block;
}

/* 负 margin 上移，叠加在 banner 图下半部分 */
.about-section {
  position: relative;
  margin-top: -80px;
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


