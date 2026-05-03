<template>
  <section class="pc-section-panel" :id="sectionId || undefined">
    <div class="pc-section-header">
      <div class="pc-section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot-l.webp" alt="" />
        <div class="title-text">{{ title }}</div>
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot-r.webp" alt="" />
      </div>
      <p v-if="desc" class="pc-section-desc">{{ desc }}</p>
    </div>

    <div class="pc-section-content">
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

<style scoped lang="scss">
.pc-section-panel {
  margin: 40px 0 24px;
  padding: 0 16px 18px;
  border-radius: 20px;
  background: radial-gradient(100% 213.42% at 0% 0%, #ECA366 0%, #4F3320 14.25%, #4F3320 84.44%, #ECA366 100%);
}

.pc-section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
}

.pc-section-title {
  display: flex;
  align-items: center;
  justify-content: center;

  .title-text {
    background: linear-gradient(180deg, #FFDC69 0%, #FFE280 13.47%, #B48735 50.12%, #FFE280 86.98%, #FFD466 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "PingFang SC", sans-serif;
    font-size: 26px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0;
    white-space: nowrap;
  }

  .title-dot {
    width: 88px;
    height: 48px;
    object-fit: contain;
    flex-shrink: 0;
  }
}

.pc-section-desc {
  margin: -6px 0 12px;
  color: #B48735;
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
}

.pc-section-content {
  width: 100%;
}
</style>
