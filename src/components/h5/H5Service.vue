<template>
  <div id="service">
    <!-- 服务体系 -->
    <section class="section">
      <div class="section-header">
        <div class="section-title">
          <img class="title-dot" src="@/assets/images/webp/icon-title-dot-l.webp" alt="" />
          <div class="title-text">服务体系</div>
        </div>
      </div>

      <p class="intro-text">{{ serviceInfo.desc }}</p>

      <!-- 一对一专员卡片 -->
      <div class="specialist-card">
        <div class="specialist-left">
          <h3 class="specialist-name">{{ serviceInfo.title }}</h3>
          <p class="specialist-sub">全程跟进对接，沟通无障碍</p>
        </div>
        <div class="specialist-right">
          <img class="specialist-photo" :src="servicePersonImage" alt="一对一服务专员形象展示" loading="lazy" width="520" height="520" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import defaultServicePerson from '@/assets/images/webp/service-person-h5.webp'
import { serviceInfo, images } from '@/stores/siteConfig.js'

const servicePersonImage = computed(() => images.service_person_h5 || defaultServicePerson)
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
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.title-dot {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
}

.title-text {
  background: linear-gradient(180deg, #FFDC69 0%, #FFE280 13.47%, #B48735 50.12%, #FFE280 86.98%, #FFD466 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0;
}

/* 简介文字 */
.intro-text {
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: #d6c28a;
  margin: 0 0 14px;
}

/* 专员卡片 */
.specialist-card {
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  overflow: hidden;
  background:
    radial-gradient(circle at left top, rgba(255, 220, 105, 0.1), transparent 35%),
    linear-gradient(180deg, rgba(20, 16, 9, 0.98) 0%, rgba(8, 7, 5, 0.98) 100%);
  border: 1px solid rgba(255, 216, 106, 0.18);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  min-height: 176px;
  padding: 18px 0 0 16px;
}

.specialist-left {
  
  flex: 1;
  min-width: 0;
  padding-bottom: 16px;
}

.specialist-name {
  font-size: 15px;
  font-weight: 700;
  color: #f4e4ad;
  margin: 0 0 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.specialist-sub {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 4px 12px;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(255, 220, 105, 0.12) 0%, rgba(255, 220, 105, 0.04) 100%);
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: #d6c28a;
  margin: 0;
}

.specialist-right {
  flex-shrink: 0;
  width: 48%;
  max-width: 178px;
  display: flex;
  align-items: flex-end;
}

.specialist-photo {
  width: 100%;
  max-height: 176px;
  display: block;
  object-fit: contain;
  object-position: bottom;
}
</style>
