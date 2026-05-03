<template>
  <PcSectionPanel section-id="complaint" title="投诉接受" desc="全程跟进对接，沟通无障碍">
    <div class="complaint-card">
      <div class="partner-left">
        <div class="partner-avatar-wrap">
          <img class="partner-avatar" :src="COMPLAINT_CONTACT.avatar" :alt="COMPLAINT_CONTACT.name" width="88" height="88" />
        </div>
        <div class="partner-name">{{ COMPLAINT_CONTACT.name }}</div>
      </div>

      <div class="partner-right">
        <img class="tg-icon" src="@/assets/images/webp/icon-telegram.webp" alt="TG" width="64" height="64" />
        <div class="partner-handle">{{ COMPLAINT_CONTACT.handle }}</div>
        <div
          class="btn-copy"
          role="button"
          tabindex="0"
          title="复制"
          @click="copy(COMPLAINT_CONTACT.handle)"
          @keydown.enter.prevent="copy(COMPLAINT_CONTACT.handle)"
          @keydown.space.prevent="copy(COMPLAINT_CONTACT.handle)"
        >
          <img class="copy-icon" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="点击复制" loading="lazy" width="44" height="44" />
        </div>
      </div>
    </div>
  </PcSectionPanel>
</template>

<script setup>
import PcSectionPanel from '@/components/pc/PcSectionPanel.vue'
import { COMPLAINT_CONTACT } from '@/config/contacts.js'
import { copyToClipboard } from '@/utils/copy.js'

function copy(text) {
  copyToClipboard(text)
}
</script>

<style scoped lang="scss">
.complaint-card {
  display: flex;
  width: 100%;
  min-height: 96px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #fbe59a;
  background:
    radial-gradient(circle at 16% 0%, rgba(255, 220, 105, 0.18) 0, rgba(255, 220, 105, 0) 24%),
    linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 220, 105, 0.08);
}

.partner-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.partner-avatar-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.partner-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.partner-name {
  color: #ffdc69;
  font-family: "PingFang SC", sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
}

.partner-right {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.tg-icon {
  width: 34px;
  height: 32px;
  object-fit: contain;
}

.partner-handle {
  color: #ffdc69;
  font-family: "PingFang SC", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}

.btn-copy {
  display: grid;
  width: 44px;
  height: 44px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.copy-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.partner-avatar-frame {
  position: absolute;
  inset: 0;
  width: 80px;
  height: 80px;
  object-fit: contain;
  pointer-events: none;
}
</style>
