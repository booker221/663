<template>
  <H5SectionPanel section-id="complaint" title="投诉接受" desc="全程跟进对接，沟通无障碍">
    <!-- 投诉联系卡片 -->
    <div class="complaint-card">
      <!-- 左：头像 + 名字 -->
      <div class="partner-left">
        <img class="partner-avatar" :src="COMPLAINT_CONTACT.avatar" :alt="COMPLAINT_CONTACT.name + ' 头像'" loading="lazy"
          width="88" height="88" />
        <div class="partner-name">{{ COMPLAINT_CONTACT.name }}</div>
      </div>

      <!-- 右：Telegram + handle + 复制 -->
      <div class="partner-right">
        <img class="tg-icon" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram 图标" loading="lazy" width="64"
          height="64" />
        <div class="partner-handle">{{ COMPLAINT_CONTACT.handle }}</div>
        <div class="btn-copy" role="button" tabindex="0" title="复制" @click="copy(COMPLAINT_CONTACT.handle)"
          @keydown.enter.prevent="copy(COMPLAINT_CONTACT.handle)"
          @keydown.space.prevent="copy(COMPLAINT_CONTACT.handle)">
          <img class="copy-icon" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="点击复制联系方式" loading="lazy"
            width="44" height="44" />
        </div>
      </div>
    </div>
  </H5SectionPanel>
</template>

<script setup>
import H5SectionPanel from '@/components/h5/H5SectionPanel.vue'
import { COMPLAINT_CONTACT } from '@/config/contacts.js'
import { copyToClipboard } from '@/utils/copy.js'

function copy(text) {
  copyToClipboard(text)
}
</script>

<style scoped>
/* 卡片 */
.complaint-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 8px;
  background: linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
  border: 1px solid #fbe59a;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
}

/* 左侧 */
.partner-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.partner-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.partner-name {
  font-size: 14px;
  font-weight: 700;
  color: #f4e4ad;
}

/* 右侧 */
.partner-right {
  display: flex;
  align-items: center;
  gap: 5px;
}

.tg-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.partner-handle {
  font-size: 13px;
  font-weight: 600;
  color: #FFDC69;
}

.btn-copy {
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
}

.copy-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
}
</style>
