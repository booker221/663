<template>
  <div class="pc-shell" :style="{ backgroundImage: `url(${pageBg})` }">
    <div class="pc-page">
      <PcTopbar />
      <PcHero />
      <PcAbout />
      <PcValues />
      <PcBusiness />
      <PcActivity />
      <PcService />
      <PcComplaint />
      <!-- 投诉建议浮球 -->
      <DraggableFab
        :href="COMPLAINT_CONTACT.url"
        :default-bottom="170"
        :fab-width="80"
        :fab-height="77.333"
        :border-radius="40"
        bg="linear-gradient(180deg, #FFDC69 0%, #FFE280 13.473%, #B48735 50.124%, #FFE280 86.984%, #FFD466 100%)"
        shadow-color="rgba(220, 18, 14, 0.24)"
        active-shadow-color="rgba(220, 18, 14, 0.32)"
        shadow-style="0 4px 4px rgba(220, 18, 14, 0.24)"
        active-shadow-style="0 8px 16px rgba(220, 18, 14, 0.32)"
      >
        <img class="fab-icon" :src="complaintFabIcon" alt="" />
        <div class="fab-label">投诉建议</div>
      </DraggableFab>
      <!-- 福利客服浮球 -->
      <DraggableFab
        :href="CUSTOMER_SERVICE.url"
        :fab-width="80"
        :fab-height="78"
        :border-radius="40"
        bg="linear-gradient(180deg, #F3C182 0%, #F3C182 13.473%, #BC8130 59.669%, #F3C182 86.984%, #F3C182 100%)"
        shadow-color="rgba(255, 94, 0, 0.24)"
        active-shadow-color="rgba(255, 94, 0, 0.32)"
        shadow-style="0 4px 4px rgba(255, 94, 0, 0.24)"
        active-shadow-style="0 8px 16px rgba(255, 94, 0, 0.32)"
      >
        <img class="fab-icon" :src="complaintIcon" alt="" />
        <div class="fab-label">福利客服</div>
      </DraggableFab>
    </div>
  </div>
</template>

<script setup>
import complaintIcon from '../assets/images/svg/icon-customer-fab-pc.svg'
import complaintFabIcon from '../assets/images/svg/icon-complaint-fab-pc.svg'
import pageBg from '../assets/images/webp/pc-page-bg.webp'
import { CUSTOMER_SERVICE, COMPLAINT_CONTACT } from '../config/contacts.js'
import DraggableFab from '../components/common/DraggableFab.vue'
import PcTopbar from '../components/pc/PcTopbar.vue'
import PcHero from '../components/pc/PcHero.vue'
import PcAbout from '../components/pc/PcAbout.vue'
import PcValues from '../components/pc/PcValues.vue'
import PcBusiness from '../components/pc/PcBusiness.vue'
import PcActivity from '../components/pc/PcActivity.vue'
import PcService from '../components/pc/PcService.vue'
import PcComplaint from '../components/pc/PcComplaint.vue'
</script>

<style scoped>
.pc-shell {
  min-height: 100vh;
  background-size: 100% auto;
}

.pc-page {
  position: relative;
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  padding: 55px 0 40px;
  background: transparent;
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
  color: #000;
  letter-spacing: 0;
  white-space: nowrap;
  pointer-events: none;
}

</style>
