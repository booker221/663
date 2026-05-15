<template>
  <PcSectionPanel section-id="service" title="服务体系" desc="全程跟进对接，沟通无障碍">
    <div class="specialist-card">
      <DynamicImage
        :remote-src="serviceCardImage"
        alt="服务体系整图"
        label="请在后台上传服务体系整图"
        img-class="specialist-card-image"
        height="300px"
        border-radius="20px"
      />
    </div>
  </PcSectionPanel>
</template>

<script setup>
import { computed } from 'vue'
import PcSectionPanel from '@/components/pc/PcSectionPanel.vue'
import DynamicImage from '@/components/common/DynamicImage.vue'
import { images } from '@/stores/siteConfig.js'

const serviceCardImage = computed(() => (images.service_card_bg_pc || '').trim())
</script>

<style scoped lang="scss">
.specialist-card {
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  border: 1px solid #fbe59a;
  border-radius: 20px;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 220, 105, 0.18) 0, rgba(255, 220, 105, 0) 24%),
    linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 220, 105, 0.08);
}

:deep(.image-placeholder) {
  width: 100%;
  height: 100%;
  border: 0;
  background: transparent;
  box-shadow: none;
}

:deep(.placeholder-icon) {
  color: rgba(255, 220, 105, 0.38);
}

:deep(.placeholder-label) {
  color: rgba(255, 220, 105, 0.85);
  font-size: 16px;
}

:deep(.specialist-card-image) {
  width: 100%;
  height: 300px;
  display: block;
}
</style>
