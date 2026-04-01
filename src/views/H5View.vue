<template>
  <div class="h5-page">
    <H5Topbar />
    <H5Hero />
    <H5Values />
    <H5Business />
    <H5Activity />
    <H5Service />
    <H5Complaint />
    <!-- 可拖拽浮球 -->
    <DraggableFab :href="CUSTOMER_SERVICE.url" :default-right="16" :default-bottom="80">
      <img class="fab-icon" :src="complaintIcon" alt="" />
      <span class="fab-label">投诉建议</span>
    </DraggableFab>
  </div>
</template>

<script setup>
import complaintIcon from '../assets/img/icon-complaint.png'
import { BUSINESS_CONTACT, CUSTOMER_SERVICE } from '../config/contacts.js'
import DraggableFab from '../components/common/DraggableFab.vue'
import H5Topbar from '../components/h5/H5Topbar.vue'
import H5Hero from '../components/h5/H5Hero.vue'
import H5Values from '../components/h5/H5Values.vue'
import H5Business from '../components/h5/H5Business.vue'
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
}

.fab-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  pointer-events: none;
}

.fab-label {
  font-size: 8px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.3px;
  white-space: nowrap;
  pointer-events: none;
}
</style>
