<template>
  <section class="section" id="complaint">
    <!-- 标题 -->
    <div class="section-header">
      <h2 class="section-title"><span class="dot">◆</span> 投诉接受</h2>
    </div>

    <!-- 投诉联系卡片 -->
    <div class="complaint-card">
      <!-- 左：头像 + 名字 -->
      <div class="partner-left">
        <img class="partner-avatar" :src="COMPLAINT_CONTACT.avatar" :alt="COMPLAINT_CONTACT.name + ' 头像'" loading="lazy" />
        <span class="partner-name">{{ COMPLAINT_CONTACT.name }}</span>
      </div>

      <!-- 右：Telegram + handle + 复制 -->
      <div class="partner-right">
        <img class="tg-icon" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram 图标" loading="lazy" />
        <span class="partner-handle">{{ COMPLAINT_CONTACT.handle }}</span>
        <button class="btn-copy" title="复制" @click="copy(COMPLAINT_CONTACT.handle)">
          <img class="copy-icon" src="@/assets/images/webp/icon-copy.webp" alt="点击复制联系方式" loading="lazy" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { COMPLAINT_CONTACT } from '@/config/contacts.js'

function copy(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制: ' + text)
  })
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
  font-size: 16px;
  font-weight: 800;
  color: var(--text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  color: var(--primary);
  font-size: 13px;
}

/* 卡片 */
.complaint-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow);
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
  color: var(--text);
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
  color: var(--blue);
}

.btn-copy {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.copy-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.7;
}
</style>
