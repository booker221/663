<template>
  <section class="section" id="business">
    <div class="section-header">
      <div class="section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot-l.webp" alt="" />
        <div class="title-text">官方商务</div>
      </div>
      <div class="section-desc">只认准以下商务人员，其他勿信，谨防被骗</div>
    </div>
    <div class="section-card">
      <!-- Tab 切换：点击切换不同背景图 -->
      <div class="biz-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['biz-tab', { active: activeTab === tab.key }]"
          role="button"
          tabindex="0"
          @click="activeTab = tab.key"
          @keydown.enter.prevent="activeTab = tab.key"
          @keydown.space.prevent="activeTab = tab.key"
        >{{ tab.label }}</div>
      </div>
      <!-- 推广招商部 -->
      <div v-show="activeTab === 'promote'" class="partner-list">
        <div v-for="p in promotePartners" :key="p.handle" class="partner-card">
          <div class="partner-left">
            <a :href="p.url" target="_blank" rel="noopener noreferrer" class="avatar-link">
              <img class="partner-avatar" :src="p.avatar" :alt="p.name" loading="lazy" width="80" height="80" />
            </a>
            <div class="partner-name">{{ p.name }}</div>
            <div class="divider">丨</div>
            <div class="partner-handle">
              <img class="icon-tg" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram" loading="lazy" width="36" height="36" />
              <div>{{ p.handle }}</div>
            </div>
          </div>
          <div class="partner-copy" role="button" tabindex="0" title="复制" @click="copy(p.handle)" @keydown.enter.prevent="copy(p.handle)" @keydown.space.prevent="copy(p.handle)">
            <img class="icon-copy" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="复制" loading="lazy" width="44" height="44" />
          </div>
        </div>
      </div>
      <!-- 支付通道招商部 -->
      <div v-show="activeTab === 'third'" class="partner-list">
        <div v-for="p in thirdPartners" :key="p.handle" class="partner-card">
          <div class="partner-left">
            <a :href="p.url" target="_blank" rel="noopener noreferrer" class="avatar-link">
              <img class="partner-avatar" :src="p.avatar" :alt="p.name" />
            </a>
            <div class="partner-name">{{ p.name }}</div>
            <div class="divider">丨</div>
            <div class="partner-handle">
              <img class="icon-tg" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram" />
              <div>{{ p.handle }}</div>
            </div>
          </div>
          <div class="partner-copy" role="button" tabindex="0" title="复制" @click="copy(p.handle)" @keydown.enter.prevent="copy(p.handle)" @keydown.space.prevent="copy(p.handle)">
            <img class="icon-copy" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="复制" loading="lazy" width="44" height="44" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { PROMOTE_PARTNERS, THIRD_PARTNERS } from '@/config/contacts.js'
import { copyToClipboard } from '@/utils/copy.js'

const promotePartners = PROMOTE_PARTNERS
const thirdPartners = THIRD_PARTNERS

const activeTab = ref('promote')
const tabs = [
  { key: 'promote', label: '推广招商部' },
  { key: 'third', label: '支付通道招商部' },
]

function copy(text) {
  copyToClipboard(text)
}
</script>

<style scoped>
.section {
  margin-bottom: 12px;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  margin-bottom: 10px;
  padding: 0 12px;
}

.section-title {
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

.section-desc {
  color: #b48735;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: 0;
}

.section-card {
  background:
    linear-gradient(180deg, rgba(255, 220, 105, 0.12) 0%, rgba(255, 220, 105, 0) 48%, rgba(255, 220, 105, 0.1) 100%),
    #0e0c0b;
  border-radius: 14px;
  margin: 0 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 220, 105, 0.24);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
}

/* Tab 切换 */
.biz-tabs {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  min-height: 52px;
  padding: 0 14px 8px;
  background: transparent;
  border-bottom: 1px solid rgba(255, 216, 106, 0.14);
}

.biz-tab {
  position: relative;
  z-index: 1;
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: #8f7636;
  /* 消除所有 hover/tap 效果 */
  -webkit-tap-highlight-color: transparent;
  outline: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  border-radius: 0 0 18px 18px;
  background: rgba(18, 16, 12, 0.88);
  box-shadow: inset 0 -2px 0 rgba(255, 220, 105, 0.24);
  transition: color 0.2s, background 0.2s;
  overflow: hidden;
}

.biz-tab::before,
.biz-tab::after {
  content: "";
  position: absolute;
  top: 0;
  width: 30px;
  height: 100%;
  background: #0e0c0b;
  border-bottom: 2px solid rgba(255, 220, 105, 0.68);
}

.biz-tab::before {
  left: -20px;
  border-bottom-right-radius: 16px;
}

.biz-tab::after {
  right: -20px;
  border-bottom-left-radius: 16px;
}

.biz-tab:hover,
.biz-tab:focus,
.biz-tab:active {
  background: transparent;
  outline: none;
  box-shadow: none;
}

.biz-tab.active {
  background:
    linear-gradient(180deg, rgba(255, 220, 105, 0.82) 0%, rgba(50, 35, 16, 0.95) 22%, rgba(24, 19, 12, 0.98) 74%, rgba(255, 220, 105, 0.86) 100%);
  box-shadow: none;
  color: transparent;
  -webkit-text-fill-color: transparent;
  background-clip: padding-box;
}

.biz-tab.active {
  background-image:
    linear-gradient(180deg, #ffdc69 15.07%, #b48735 49.83%, #ffd466 84.42%),
    linear-gradient(180deg, rgba(255, 220, 105, 0.82) 0%, rgba(50, 35, 16, 0.95) 22%, rgba(24, 19, 12, 0.98) 74%, rgba(255, 220, 105, 0.86) 100%);
  background-clip: text, padding-box;
  -webkit-background-clip: text, padding-box;
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
  border-bottom: 1px solid rgba(255, 216, 106, 0.12);
}

.partner-card:last-child {
  border-bottom: none;
}

.partner-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
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
  color: #f4e4ad;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50px;
}

.divider {
  color: rgba(255, 216, 106, 0.42);
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

.partner-handle div {
  color: #d4b258;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.partner-copy {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  display: grid;
  place-items: center;
}

.icon-copy {
  width: 24px;
  height: 24px;
}

/* 合作横幅 */
.collab-banner {
  width: 95%;
  display: block;
  margin: 12px auto;
}
</style>
