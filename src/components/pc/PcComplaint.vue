<template>
  <section class="section" id="complaint">
    <!-- 标题 -->
    <div class="section-header">
      <h2 class="section-title">
        <img class="title-dot" src="@/assets/img/icon-title-dot.webp" alt="" />
        投诉接受
        <img class="title-dot" src="@/assets/img/icon-title-dot.webp" alt="" />
      </h2>
      <p class="section-sub">全程跟进对接，沟通无障碍</p>
    </div>

    <!-- 投诉联系卡片 -->
    <div class="complaint-card">
      <!-- 左：头像 + 名字 -->
      <div class="partner-left">
        <img class="partner-avatar" src="@/assets/img/avatar-dimao.webp" :alt="COMPLAINT_CONTACT.name" />
        <span class="partner-name">{{ COMPLAINT_CONTACT.name }}</span>
      </div>

      <!-- 右：Telegram + handle + 复制 -->
      <div class="partner-right">
        <img class="tg-icon" src="@/assets/img/icon-telegram.webp" alt="TG" />
        <span class="partner-handle">{{ COMPLAINT_CONTACT.handle }}</span>
        <button class="btn-copy" title="复制" @click="copy(COMPLAINT_CONTACT.handle)">
          <img class="copy-icon" src="@/assets/img/icon-copy.webp" alt="复制" />
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
  margin-bottom: 16px;
}

.section-header {
  margin-top: 60px;
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
  margin: 0 0 6px;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-dot {
  width: 12px;
  height: 12px;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  vertical-align: middle;
  margin: 0 8px;
}

.section-sub {
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
}

/* 卡片 */
.complaint-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow);
}

/* 左侧 */
.partner-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.partner-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.partner-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
}

/* 右侧 */
.partner-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tg-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.partner-handle {
  font-size: 15px;
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
  width: 16px;
  height: 16px;
  object-fit: contain;
  opacity: 0.7;
}
</style>
