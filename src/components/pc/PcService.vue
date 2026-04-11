<template>
  <div id="service">
    <!-- 服务体系 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">
          <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" loading="lazy" width="28" height="28" />
          服务体系
          <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" loading="lazy" width="28" height="28" />
        </h2>
        <p class="section-sub">全程跟进对接，沟通无障碍</p>
      </div>

      <!-- 一对一专员卡片 -->
      <div class="specialist-card" :style="{ backgroundImage: `url(${cardBg})` }">
        <div class="specialist-left">
          <h3 class="specialist-name">{{ serviceInfo.title }}</h3>
          <p class="specialist-desc">{{ serviceInfo.desc }}</p>
        </div>
        <div class="specialist-right">
          <img class="specialist-photo" src="@/assets/images/webp/service-person-pc.webp" alt="服务专员负责人肖像" loading="lazy" width="240" height="240" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import cardBg from '@/assets/images/webp/service-card-bg-pc.webp'
import { serviceInfo } from '@/stores/siteConfig.js'
</script>

<style scoped>
.section {
  margin-bottom: 24px;
}

.section-header {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 40px;
}



.section-sub {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
}

/* 专员卡片 */
.specialist-card {
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  overflow: hidden;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  padding: 32px 0 0 40px;
  gap: 20px;
}

.specialist-left {
  flex: 1;
  min-width: 0;
  /* padding-bottom: 32px; */
}

.specialist-name {
  color: #414A65;
  font-family: "PingFang SC";
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.specialist-desc {
  color: #6C7BA8;
  font-family: "PingFang SC";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  /* 155.556% */
}

.specialist-right {
  flex-shrink: 0;
  width: 240px;
  display: flex;
  align-items: flex-end;
}

.specialist-photo {
  width: 100%;
  display: block;
  object-fit: contain;
  object-position: bottom;
}
</style>
