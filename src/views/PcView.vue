<template>
  <div class="pc-page">
    <PcTopbar />
    <PcHero />
    <PcAbout />
    <PcValues />
    <PcBusiness />
    <PcGuarantee />
    <img class="collab-banner" src="@/assets/images/webp/collab-banner-pc.webp" alt="寻求代投资源合作背景" loading="lazy"
      width="2320" height="192" />
    <PcActivity />
    <PcService />
    <PcComplaint />
    <!-- 投诉建议浮球 - 红色 -->
    <DraggableFab :href="COMPLAINT_CONTACT.url" :default-bottom="170"
      bg="linear-gradient(180deg, #FA4F24 0%, #D90D0D 50%, #FA4F24 100%)" shadow-color="rgba(217, 13, 13, 0.4)">
      <img class="fab-icon" :src="complaintFabIcon" alt="" />
      <span class="fab-label">投诉建议</span>
    </DraggableFab>
    <!-- 福利客服浮球 - 橙色 -->
    <DraggableFab :href="CUSTOMER_SERVICE.url">
      <img class="fab-icon" :src="complaintIcon" alt="" />
      <span class="fab-label">福利客服</span>
    </DraggableFab>
  </div>
</template>

<script setup>
import complaintIcon from '../assets/images/webp/icon-complaint.webp'
import complaintFabIcon from '../assets/images/webp/icon-complaint-fab.webp'
import { BUSINESS_CONTACT, CUSTOMER_SERVICE, COMPLAINT_CONTACT } from '../config/contacts.js'
import DraggableFab from '../components/common/DraggableFab.vue'
import PcTopbar from '../components/pc/PcTopbar.vue'
import PcHero from '../components/pc/PcHero.vue'
import PcAbout from '../components/pc/PcAbout.vue'
import PcValues from '../components/pc/PcValues.vue'
import PcBusiness from '../components/pc/PcBusiness.vue'
import PcGuarantee from '../components/pc/PcGuarantee.vue'
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

.collab-banner {
  width: 100%;
  display: block;
  margin-top: 16px;
}
</style>
