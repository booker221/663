<template>
  <div id="service">
    <H5SectionPanel title="服务体系" desc="全程跟进对接，沟通无障碍">
      <div class="specialist-card">
        <DynamicImage
          :remote-src="serviceCardImage"
          alt="服务体系整图"
          label="请在后台上传服务体系整图"
          img-class="specialist-card-image"
          height="490px"
          border-radius="8px"
        />
      </div>
    </H5SectionPanel>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import H5SectionPanel from '@/components/h5/H5SectionPanel.vue'
import DynamicImage from '@/components/common/DynamicImage.vue'
import { images } from '@/stores/siteConfig.js'

const serviceCardImage = computed(() => (images.service_card_bg_h5 || '').trim())
</script>

<style scoped>
.specialist-card {
  width: 100%;
  height: 490px;
  box-sizing: border-box;
  border: 1px solid #fbe59a;
  border-radius: 8px;
  overflow: hidden;
  background:
    radial-gradient(circle at left top, rgba(255, 220, 105, 0.1), transparent 35%),
    linear-gradient(180deg, rgba(20, 16, 9, 0.98) 0%, rgba(8, 7, 5, 0.98) 100%);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
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
  font-size: 13px;
}

:deep(.specialist-card-image) {
  width: 100%;
  height: 490px;
  display: block;
}
</style>
