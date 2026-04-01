<template>
  <section class="section" id="business">
    <!-- 标题 -->
    <div class="section-header">
      <h2 class="section-title">
        <img class="title-dot" src="@/assets/img/icon-title-dot.png" alt="" />
        官方商务
        <img class="title-dot" src="@/assets/img/icon-title-dot.png" alt="" />
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
              <a :href="p.url" target="_blank" class="avatar-link">
                <img class="partner-avatar" :src="p.avatar" :alt="p.name" />
              </a>
              <span class="partner-name">{{ p.name }}</span>
              <span class="divider">丨</span>
              <div class="partner-handle">
                <img class="icon-tg" src="@/assets/img/icon-telegram.png" alt="Telegram" />
                <span>{{ p.handle }}</span>
              </div>
            </div>
            <button class="partner-copy" title="复制" @click="copy(p.handle)">
              <img class="icon-copy" src="@/assets/img/icon-copy.png" alt="复制" />
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
                <img class="icon-tg" src="@/assets/img/icon-telegram.png" alt="Telegram" />
                <span>{{ p.handle }}</span>
              </div>
            </div>
            <button class="partner-copy" title="复制" @click="copy(p.handle)">
              <img class="icon-copy" src="@/assets/img/icon-copy.png" alt="复制" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 合作横幅 -->
    <img class="collab-banner" src="@/assets/img/collab-banner-pc.png" alt="寻求代投资源" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import avatarDimao from '@/assets/img/avatar-dimao.png'
import avatarTaiyang from '@/assets/img/avatar-taiyang.png'
import avatarHema from '@/assets/img/avatar-hema.png'
import { PROMOTE_PARTNERS, THIRD_PARTNERS } from '@/config/contacts.js'

// 为每个联系人添加头像资源
const avatarMap = { '迪猫': avatarDimao, '太阳': avatarTaiyang, '河马': avatarHema }
const promotePartners = PROMOTE_PARTNERS.map(p => ({ ...p, avatar: avatarMap[p.name] }))
const thirdPartners = THIRD_PARTNERS.map(p => ({ ...p, avatar: avatarMap[p.name] }))

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
