<template>
  <div id="service">
    <!-- 服务体系 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title"><span class="dot">◆</span> 服务体系</h2>
      </div>

      <p class="intro-text">
        除指派专员进行日常业务对接外，另委派项目负责人履行监督职能。该负责人统筹项目全局，具备快速决策与纠偏响应能力，
        旨在最大限度降低沟通成本，保障项目高质量交付，共创双赢局面。
      </p>

      <!-- 一对一专员卡片 -->
      <div class="specialist-card" :style="{ backgroundImage: `url(${cardBg})` }">
        <div class="specialist-left">
          <h3 class="specialist-name">一对一专员</h3>
          <p class="specialist-sub">全程跟进对接，沟通无障碍</p>
        </div>
        <div class="specialist-right">
          <img class="specialist-photo" src="@/assets/img/service-person-h5.webp" alt="专员" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import cardBg from '@/assets/img/service-card-bg-h5.webp'
</script>

<style scoped>
.section {
  margin-bottom: 12px;
  margin-left: 12px;
  margin-right: 12px;
}

.section-header {
  margin-bottom: 10px;
}

.section-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  color: var(--primary);
  font-size: 13px;
}

/* 简介文字 */
.intro-text {
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: #6C7BA8;
  margin: 0 0 14px;
}

/* 专员卡片 */
.specialist-card {
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  overflow: hidden;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 16px 0 0 16px;
}

.specialist-left {
  
  flex: 1;
  min-width: 0;
  padding-bottom: 16px;
}

.specialist-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 6px;
}

.specialist-sub {
  display: inline-flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 32px;
  background: linear-gradient(180deg, #FFF 0%, #E9F7FF 49.81%, #FFF 100%);
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: #6C7BA8;
  margin: 0;
}

.specialist-right {
  flex-shrink: 0;
  width: 45%;
  max-width: 160px;
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
