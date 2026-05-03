<template>
  <PcSectionPanel section-id="service" title="服务体系" desc="全程跟进对接，沟通无障碍">
    <div class="specialist-card">
      <div class="specialist-left">
        <div class="specialist-name">{{ serviceInfo.title }}</div>
        <div class="specialist-desc">{{ serviceInfo.desc }}</div>
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
import defaultServicePerson from '@/assets/images/webp/service-person-pc-ui.webp'
import { serviceInfo, images } from '@/stores/siteConfig.js'

const servicePersonImage = computed(() => images.service_person_pc || defaultServicePerson)
</script>

<style scoped lang="scss">
.specialist-card {
  display: flex;
  width: 100%;
  min-height: 300px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 38px 0 0 40px;
  border: 1px solid #fbe59a;
  border-radius: 20px;
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 220, 105, 0.18) 0, rgba(255, 220, 105, 0) 24%),
    linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(255, 220, 105, 0.08);
}

.specialist-left {
  flex: 1;
  min-width: 0;
  max-width: 650px;
}

.specialist-name {
  color: #ffdc69;
  font-family: "PingFang SC", sans-serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.specialist-desc {
  margin-top: 10px;
  color: rgba(255, 220, 105, 0.7);
  font-family: "PingFang SC", sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.specialist-right {
  flex-shrink: 0;
  width: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.specialist-photo {
  width: 300px;
  display: block;
  object-fit: contain;
  object-position: bottom;
}
</style>
