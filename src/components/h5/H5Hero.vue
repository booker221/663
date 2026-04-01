<template>
  <section class="hero">
    <div class="hero-banner-wrap">
      <!-- Banner 图作为背景 -->
      <img class="hero-banner" src="@/assets/images/webp/hero-banner-h5.webp" alt="合兴集团 - 合于信 兴于行" />
      <!-- 文字叠加在 banner 下半部分 -->
      <div class="about-overlay">
        <h3 class="about-title">关于合兴</h3>
        <p class="about-text">
          合兴集团自成立以来，秉承"<span class="hl">合于信，兴于行</span>"的理念，我们始终坚信，信任是合作关系的基石，卓越的执行力则是可持续发展的引擎。在过去的发展历程中，我们始终坚守"<span class="hl">诚信为本、合作共赢、追求卓越</span>"三大核心价值观，将其作为企业立身与发展的根本。合兴的使命：持续创造价值，驱动行业变革。合兴的愿景：铸就百年品牌，成为您"<span class="hl">百年大业</span>"最信赖的合作伙伴。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  /* 突破父容器 16px 左右 padding，实现全宽 */
  margin-left: -16px;
  margin-right: -16px;
  margin-bottom: 12px;
}

.hero-banner-wrap {
  position: relative;
  width: 100%;
  height: 265px;
}

/* Banner 图 100% 宽 */
.hero-banner {
  width: 100%;
  display: block;
}

/* 文字叠加在 banner 内部靠下 */
.about-overlay {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  padding: 16px 16px 20px;margin-left: 12px; margin-right: 12px;
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
