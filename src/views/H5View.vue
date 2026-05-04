<template>
  <H5Topbar />
  <div class="h5-page">
    <H5Hero />
    <H5About />
    <H5Values />
    <H5Business />
    <H5Guarantee />
    <div class="collab-banner-h5">
      <div>寻求代投资源：每日上亿美金预算，急需大量代投。</div>
      <div>诚邀群发合作：海量短信群发，社交群控，广告位缺口。</div>
    </div>
    <H5Activity />
    <H5Service />
    <H5Complaint />
  </div>
  <!-- 投诉建议浮球 - 红色 -->
  <DraggableFab
    :href="COMPLAINT_CONTACT.url"
    :default-right="16"
  :default-bottom="140"
  :fab-width="48"
  :fab-height="46.4"
  bg="linear-gradient(180deg, #FFDC69 0%, #FFE280 13.473%, #B48735 50.124%, #FFE280 86.984%, #FFD466 100%)"
  shadow-color="rgba(0, 0, 0, 0.26)"
  shadow-style="0 4px 4px rgba(0, 0, 0, 0.26)"
>
  <img class="fab-icon" :src="complaintFabIcon" alt="" />
  <div class="fab-label">投诉建议</div>
</DraggableFab>
  <!-- 福利客服浮球 - 橙色 -->
  <DraggableFab
    :href="CUSTOMER_SERVICE.url"
    :default-right="16"
  :default-bottom="80"
  :fab-width="48"
  :fab-height="46.4"
  bg="linear-gradient(180deg, #F3C182 0%, #F3C182 13.473%, #BC8130 59.669%, #F3C182 86.984%, #F3C182 100%)"
  shadow-color="rgba(0, 0, 0, 0.26)"
  shadow-style="0 4px 4px rgba(0, 0, 0, 0.26)"
>
  <img class="fab-icon" :src="complaintIcon" alt="" />
  <div class="fab-label">福利客服</div>
</DraggableFab>
</template>

<script setup>
import complaintIcon from '../assets/images/svg/icon-customer-fab-pc.svg'
import complaintFabIcon from '../assets/images/svg/icon-complaint-fab-pc.svg'
import { CUSTOMER_SERVICE, COMPLAINT_CONTACT } from '../config/contacts.js'
import DraggableFab from '../components/common/DraggableFab.vue'
import H5Topbar from '../components/h5/H5Topbar.vue'
import H5Hero from '../components/h5/H5Hero.vue'
import H5About from '../components/h5/H5About.vue'
import H5Values from '../components/h5/H5Values.vue'
import H5Business from '../components/h5/H5Business.vue'
import H5Guarantee from '../components/h5/H5Guarantee.vue'
import H5Activity from '../components/h5/H5Activity.vue'
import H5Service from '../components/h5/H5Service.vue'
import H5Complaint from '../components/h5/H5Complaint.vue'
</script>

<style scoped>
.h5-page {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 56px 0px 60px;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
  isolation: isolate;
  background:
    radial-gradient(circle at top, rgba(255, 220, 105, 0.08), transparent 38%),
    linear-gradient(180deg, #140f08 0%, #080605 100%);
}

.fab-icon {
  width: 20.372px;
  height: 19.2px;
  object-fit: contain;
  pointer-events: none;
}

.fab-label {
  font-family: "PingFang SC", sans-serif;
  font-size: 8px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: #000;
  letter-spacing: 0;
  white-space: nowrap;
  pointer-events: none;
}

.collab-banner-h5 {
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  margin: 12px auto;
  min-height: 88px;
  padding: 14px 16px;
  border-radius: 14px;
  background:
    radial-gradient(circle at right bottom, rgba(255, 220, 105, 0.12), transparent 32%),
    linear-gradient(180deg, rgba(20, 16, 9, 0.98) 0%, rgba(8, 7, 5, 0.98) 100%);
  border: 1px solid rgba(255, 216, 106, 0.18);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  color: #ffdc69;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.5;
  letter-spacing: 0;
}
</style>
