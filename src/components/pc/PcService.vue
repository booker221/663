<template>
  <div id="service">
    <!-- 服务体系 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">服务体系</h2>
        <p class="section-sub">全程跟进对接，沟通无障碍</p>
      </div>

      <!-- 一对一专员卡片 -->
      <div class="specialist-card" :style="{ backgroundImage: `url(${cardBg})` }">
        <div class="specialist-left">
          <h3 class="specialist-name">一对一专员</h3>
          <p class="specialist-desc">
            除指派专员进行日常业务对接外，另委派项目负责人履行监督职能。该负责人统筹项目全局，具备快速决策与纠偏响应能力，
            旨在最大限度降低沟通成本，保障项目高质量交付，共创双赢局面。
          </p>
        </div>
        <div class="specialist-right">
          <img class="specialist-photo" src="@/assets/img/service-person-pc.png" alt="专员" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import cardBg from '@/assets/img/service-card-bg-pc.png'
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

.section-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 6px;
  letter-spacing: 0.06em;
}

.section-title::before,
.section-title::after {
  content: "•";
  color: var(--primary);
  margin: 0 10px;
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
