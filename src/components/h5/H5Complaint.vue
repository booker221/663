<template>
  <section class="section" id="complaint">
    <!-- 标题 -->
    <div class="section-header">
      <div class="section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot-l.webp" alt="" />
        <div class="title-text">投诉接受</div>
      </div>
    </div>

    <!-- 投诉联系卡片 -->
    <div class="complaint-card">
      <!-- 左：头像 + 名字 -->
      <div class="partner-left">
        <img class="partner-avatar" :src="COMPLAINT_CONTACT.avatar" :alt="COMPLAINT_CONTACT.name + ' 头像'" loading="lazy" width="88" height="88" />
        <div class="partner-name">{{ COMPLAINT_CONTACT.name }}</div>
      </div>

      <!-- 右：Telegram + handle + 复制 -->
      <div class="partner-right">
        <img class="tg-icon" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram 图标" loading="lazy" width="64" height="64" />
        <div class="partner-handle">{{ COMPLAINT_CONTACT.handle }}</div>
        <div class="btn-copy" role="button" tabindex="0" title="复制" @click="copy(COMPLAINT_CONTACT.handle)" @keydown.enter.prevent="copy(COMPLAINT_CONTACT.handle)" @keydown.space.prevent="copy(COMPLAINT_CONTACT.handle)">
          <img class="copy-icon" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="点击复制联系方式" loading="lazy" width="44" height="44" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { COMPLAINT_CONTACT } from '@/config/contacts.js'
import { copyToClipboard } from '@/utils/copy.js'

function copy(text) {
  copyToClipboard(text)
}
</script>

<style scoped>
.section {
  margin-bottom: 12px;
  margin-left: 12px;
  margin-right: 12px;
}

.section-header {
  margin-bottom: 10px;
}

.section-title {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.title-dot {
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
}

.title-text {
  background: linear-gradient(180deg, #FFDC69 0%, #FFE280 13.47%, #B48735 50.12%, #FFE280 86.98%, #FFD466 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0;
}

/* 卡片 */
.complaint-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(17, 14, 7, 0.98) 0%, rgba(6, 5, 3, 0.98) 100%);
  border: 1px solid rgba(255, 216, 106, 0.18);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
}

/* 左侧 */
.partner-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.partner-avatar {
  width: 40px;
  height: 40px;
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
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.partner-handle {
  font-size: 13px;
  font-weight: 600;
  color: #d4b258;
}

.btn-copy {
  width: 22px;
  height: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
}

.copy-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
}
</style>
