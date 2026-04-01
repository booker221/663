<template>
  <section class="section" id="business">
    <div class="section-header">
      <img class="section-title-img" src="@/assets/images/webp/biz-title-h5.webp" alt="合兴集团业务商务合作" loading="lazy" />
    </div>
    <div class="section-card">
      <!-- Tab 切换：点击切换不同背景图 -->
      <div class="biz-tabs">
        <div class="biz-tabs-bg">
          <img
            :class="['tabs-bg-img', { 'tab-hidden': activeTab !== 'promote' }]"
            src="@/assets/images/webp/biz-tab-left-active.webp"
            alt=""
          />
          <img
            :class="['tabs-bg-img', { 'tab-hidden': activeTab !== 'third' }]"
            src="@/assets/images/webp/biz-tab-right-active.webp"
            alt=""
          />
        </div>
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['biz-tab', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >{{ tab.label }}</button>
      </div>
      <!-- 推广招商部 -->
      <div v-show="activeTab === 'promote'" class="partner-list">
        <div v-for="p in promotePartners" :key="p.handle" class="partner-card">
          <div class="partner-left">
            <a :href="p.url" target="_blank" rel="noopener noreferrer" class="avatar-link">
              <img class="partner-avatar" :src="p.avatar" :alt="p.name" />
            </a>
            <span class="partner-name">{{ p.name }}</span>
            <span class="divider">丨</span>
            <div class="partner-handle">
              <img class="icon-tg" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram" />
              <span>{{ p.handle }}</span>
            </div>
          </div>
          <button class="partner-copy" title="复制" @click="copy(p.handle)">
            <img class="icon-copy" src="@/assets/images/webp/icon-copy.webp" alt="复制" />
          </button>
        </div>
      </div>
      <!-- 三方招商部 -->
      <div v-show="activeTab === 'third'" class="partner-list">
        <div v-for="p in thirdPartners" :key="p.handle" class="partner-card">
          <div class="partner-left">
            <a :href="p.url" target="_blank" rel="noopener noreferrer" class="avatar-link">
              <img class="partner-avatar" :src="p.avatar" :alt="p.name" />
            </a>
            <span class="partner-name">{{ p.name }}</span>
            <span class="divider">丨</span>
            <div class="partner-handle">
              <img class="icon-tg" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram" />
              <span>{{ p.handle }}</span>
            </div>
          </div>
          <button class="partner-copy" title="复制" @click="copy(p.handle)">
            <img class="icon-copy" src="@/assets/images/webp/icon-copy.webp" alt="复制" />
          </button>
        </div>
      </div>
    </div>
    <!-- 合作横幅 -->
    <img class="collab-banner" src="@/assets/images/webp/collab-banner-h5.webp" alt="寻求代投资源" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { PROMOTE_PARTNERS, THIRD_PARTNERS } from '@/config/contacts.js'

const promotePartners = PROMOTE_PARTNERS
const thirdPartners = THIRD_PARTNERS

const activeTab = ref('promote')
const tabs = [
  { key: 'promote', label: '推广招商部' },
  { key: 'third', label: '三方招商部' },
]

function copy(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制: ' + text)
  })
}
</script>

<style scoped>
.section {
  margin-bottom: 12px;
}

.section-header {
  margin-bottom: 10px;
}

.section-title-img {
  display: block;
  width: 92%;
  height: 24px;
  margin-left: 12px;
}

.section-card {
  background: #fff;
  border-radius: 14px;
  margin: 0 12px;
  overflow: hidden;
}

/* Tab 切换 */
.biz-tabs {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 44px;
}

.biz-tabs-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
}

.tabs-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  opacity: 1;
  transition: opacity 0.2s;
}

.tab-hidden {
  opacity: 0;
}

.biz-tab {
  position: relative;
  z-index: 1;
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: var(--text-muted);
  /* 消除所有 hover/tap 效果 */
  -webkit-tap-highlight-color: transparent;
  outline: none;
  user-select: none;
}

.biz-tab:hover,
.biz-tab:focus,
.biz-tab:active {
  background: transparent;
  outline: none;
  box-shadow: none;
}

.biz-tab.active {
  color: var(--text);
}

/* 联系人列表 */
.partner-list {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 0;
}

.partner-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.partner-card:last-child {
  border-bottom: none;
}

.partner-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-link {
  display: flex;
  flex-shrink: 0;
  cursor: pointer;
}

.avatar-link:active {
  transform: scale(0.94);
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
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}

.divider {
  color: #ddd;
  font-size: 14px;
}

.partner-handle {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-tg {
  width: 18px;
  height: 18px;
}

.partner-handle span {
  color: var(--blue);
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
}

.partner-copy {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid rgba(124, 152, 255, 0.25);
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

.icon-copy {
  width: 16px;
  height: 16px;
}

/* 合作横幅 */
.collab-banner {
  width: 95%;
  display: block;
  margin: 12px auto;
}
</style>
