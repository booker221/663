<template>
  <section class="section" id="business">
    <!-- 标题 -->
    <div class="section-header">
      <h2 class="section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" loading="lazy" />
        官方商务
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" loading="lazy" />
      </h2>
      <p class="section-subtitle">只认准以下商务人员，其他勿信，谨防被骗</p>
    </div>

    <!-- 主卡片：两个部门同时显示 -->
    <div class="section-card">
      <!-- 推广招商部 -->
      <div class="dept-block">
        <div class="dept-label">推广招商部</div>
        <div class="partner-list">
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
                <img class="icon-copy" src="@/assets/images/webp/icon-copy.webp" alt="点击复制" loading="lazy" />
              </button>
          </div>
        </div>
      </div>

      

      <!-- 三方招商部 -->
      <div class="dept-block">
        <div class="dept-label">三方招商部</div>
        <div class="partner-list">
          <div v-for="p in thirdPartners" :key="p.handle" class="partner-card">
            <div class="partner-left">
              <a :href="p.url" target="_blank" class="avatar-link">
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
                <img class="icon-copy" src="@/assets/images/webp/icon-copy.webp" alt="点击复制" loading="lazy" />
              </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 合作横幅 -->
    <img class="collab-banner" src="@/assets/images/webp/collab-banner-pc.webp" alt="寻求代投资源合作背景" loading="lazy" />
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
  margin-bottom: 24px;
}

/* 标题区 */
.section-header {
  text-align: center;
  margin-bottom: 20px;
}



.section-subtitle {
  color: #6C7BA8;
  text-align: center;
  font-family: "PingFang SC";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/* 主卡片 */
.section-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(100, 130, 180, 0.08);
}

/* 部门块 */
.dept-block {
  padding: 16px 24px 20px;
}

.dept-label {
  display: flex;
  height: 48px;
  padding: 10px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px 20px 0 0;
  border: 1px solid #FFF;
  background: linear-gradient(180deg, #F4F7FF 0%, #FFF 96%);
  box-shadow: 0 1px 1px 0 #FFF inset;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0;
}

 

/* 联系人横向列表 */
.partner-list {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 0;
}

.partner-card {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
}

.partner-card:last-child {
  border-right: none;
}

.partner-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.avatar-link {
  display: flex;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s;
}

.avatar-link:hover {
  transform: scale(1.08);
}

.partner-avatar {
  width: 44px;
  height: 44px;
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
  font-size: 16px;
  flex-shrink: 0;
}

.partner-handle {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}

.icon-tg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.partner-handle span {
  color: var(--blue);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.partner-copy {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid rgba(124, 152, 255, 0.25);
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s;
}

.partner-copy:hover {
  background: rgba(61, 124, 255, 0.06);
}

.icon-copy {
  width: 16px;
  height: 16px;
}

/* 合作横幅 */
.collab-banner {
  width: 100%;
  display: block;
  margin-top: 16px;
}
</style>
