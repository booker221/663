<template>
  <H5Topbar />
  <div class="h5-page">
    <H5Hero />
    <H5Values />
    <H5Business />
    <H5Guarantee />
    <img class="collab-banner-h5" src="@/assets/images/webp/collab-banner-h5.webp" alt="寻求代投资源" loading="lazy"
      width="646" height="176" />
    <H5Activity />
    <H5Service />
    <H5Complaint />
  </div>
  <!-- 可拖拽浮球 -->
  <DraggableFab :href="CUSTOMER_SERVICE.url" :default-right="16" :default-bottom="80" :fab-width="48"
    :fab-height="46.4">
    <img class="fab-icon" :src="complaintIcon" alt="" />
    <span class="fab-label">福利客服</span>
  </DraggableFab>
</template>

<script setup>
import complaintIcon from '../assets/images/webp/icon-complaint.webp'
import { BUSINESS_CONTACT, CUSTOMER_SERVICE } from '../config/contacts.js'
import DraggableFab from '../components/common/DraggableFab.vue'
import H5Topbar from '../components/h5/H5Topbar.vue'
import H5Hero from '../components/h5/H5Hero.vue'
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
  color: #fff;
  letter-spacing: 0.3px;
  white-space: nowrap;
  pointer-events: none;
}

.collab-banner-h5 {
  width: 95%;
  display: block;
  margin: 12px auto;
}
</style>
