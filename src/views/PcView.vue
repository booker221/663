<template>
  <div class="pc-page">
    <PcTopbar />
    <PcHero />
    <PcValues />
    <PcBusiness />
    <PcActivity />
    <PcService />
    <PcComplaint />
    <!-- 可拖拽浮球 -->
    <DraggableFab :href="CUSTOMER_SERVICE.url">
      <img class="fab-icon" :src="complaintIcon" alt="" />
      <span class="fab-label">投诉建议</span>
    </DraggableFab>
  </div>
</template>

<script setup>
import complaintIcon from '../assets/img/icon-complaint.webp'
import { BUSINESS_CONTACT, CUSTOMER_SERVICE } from '../config/contacts.js'
import DraggableFab from '../components/common/DraggableFab.vue'
import PcTopbar from '../components/pc/PcTopbar.vue'
import PcHero from '../components/pc/PcHero.vue'
import PcValues from '../components/pc/PcValues.vue'
import PcBusiness from '../components/pc/PcBusiness.vue'
import PcActivity from '../components/pc/PcActivity.vue'
import PcService from '../components/pc/PcService.vue'
import PcComplaint from '../components/pc/PcComplaint.vue'
</script>

<style scoped>
.pc-page {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  padding: 55px 0 40px;
}

.fab-icon {
  width: 34px;
  height: 32px;
  aspect-ratio: 17 / 16;
  object-fit: contain;
  pointer-events: none;
}

.fab-label {
  font-family: "PingFang SC", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #fff;
  letter-spacing: 0.5px;
  white-space: nowrap;
  pointer-events: none;
}
</style>
