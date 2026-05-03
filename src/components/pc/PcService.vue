<template>
  <PcSectionPanel section-id="service" title="服务体系" desc="全程跟进对接，沟通无障碍">
    <!-- 一对一专员卡片 -->
    <div class="specialist-card" :style="{ backgroundImage: `url(${cardBgImage})` }">
      <div class="specialist-left">
        <h3 class="specialist-name">{{ serviceInfo.title }}</h3>
        <p class="specialist-desc">{{ serviceInfo.desc }}</p>
      </div>
      <div class="specialist-right">
        <img class="specialist-photo" :src="servicePersonImage" alt="服务专员负责人肖像" loading="lazy" width="240" height="240" />
      </div>
    </div>
  </PcSectionPanel>
</template>

<script setup>
import { computed } from 'vue'
import PcSectionPanel from '@/components/pc/PcSectionPanel.vue'
import defaultCardBg from '@/assets/images/webp/service-card-bg-pc.webp'
import defaultServicePerson from '@/assets/images/webp/service-person-pc.webp'
import { serviceInfo, images } from '@/stores/siteConfig.js'

const cardBgImage = computed(() => images.service_card_bg_pc || defaultCardBg)
const servicePersonImage = computed(() => images.service_person_pc || defaultServicePerson)
</script>

<style scoped>
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.specialist-desc {
  color: #6C7BA8;
  font-family: "PingFang SC";
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
