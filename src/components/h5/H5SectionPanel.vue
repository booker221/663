<template>
  <section class="h5-section-panel" :id="sectionId || undefined">
    <div class="h5-section-header">
      <div class="h5-section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot-l.webp" alt="" />
        <div class="title-text">{{ title }}</div>
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot-r.webp" alt="" />
      </div>
      <p v-if="desc" class="h5-section-desc">{{ desc }}</p>
    </div>

    <div class="h5-section-content">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  sectionId: { type: String, default: '' },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
})
</script>

<style scoped>
.h5-section-panel {
  width: calc(100% - 24px);
  margin: 0 auto 12px;
  padding: 8px;
  border-radius: 10px;
  background: radial-gradient(100% 213.42% at 0% 0%, #eca366 0%, #4f3320 14.25%, #4f3320 84.44%, #eca366 100%);
}

.h5-section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0 8px;
}

.h5-section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 0;
}

.title-dot {
  width: 30px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
}

.title-text {
  background: linear-gradient(180deg, #ffdc69 0%, #ffe280 13.47%, #b48735 50.12%, #ffe280 86.98%, #ffd466 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "PingFang SC", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0;
  white-space: nowrap;
  margin: 0 8px;
}

.h5-section-desc {
  margin: 4px 0 0;
  color: #b48735;
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
}

.h5-section-content {
  width: 100%;
}
</style>
