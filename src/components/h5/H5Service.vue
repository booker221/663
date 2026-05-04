<template>
  <div id="service">
    <!-- 服务体系 -->
    <H5SectionPanel title="服务体系" desc="全程跟进对接，沟通无障碍">
      <!-- 一对一专员卡片 -->
      <div class="specialist-card">
        <div class="specialist-left">
          <h3 class="specialist-name">{{ serviceInfo.title }}</h3>
          <p class="specialist-sub">{{ serviceInfo.desc }}</p>
        </div>
        <div class="specialist-right">
          <img class="specialist-photo" :src="servicePersonImage" alt="一对一服务专员形象展示" loading="lazy"/>
        </div>
      </div>
    </H5SectionPanel>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import H5SectionPanel from '@/components/h5/H5SectionPanel.vue'
import defaultServicePerson from '@/assets/images/webp/service-person-pc-ui.webp'
import { serviceInfo, images } from '@/stores/siteConfig.js'

const servicePersonImage = computed(() => images.service_person_h5 || defaultServicePerson)
</script>

<style scoped>
/* 专员卡片 */
.specialist-card {
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  overflow: hidden;
  background:
    radial-gradient(circle at left top, rgba(255, 220, 105, 0.1), transparent 35%),
    linear-gradient(180deg, rgba(20, 16, 9, 0.98) 0%, rgba(8, 7, 5, 0.98) 100%);
  border: 1px solid #fbe59a;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  min-height: 126px;
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
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: rgba(255, 220, 105, 0.72);
  margin: 0;
}

.specialist-right {
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
}

.specialist-photo {
  width: 100%;
  height: 140px;
  display: block;
  object-fit: contain;
  object-position: bottom;
}
</style>
