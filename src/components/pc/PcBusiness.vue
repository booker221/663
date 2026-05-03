<template>
  <PcSectionPanel section-id="business" title="官方商务" desc="只认准以下商务人员，其他勿信，谨防被骗">
    <!-- 主卡片：两个部门同时显示 -->
    <div class="section-card">
      <!-- 推广招商部 -->
      <div class="dept-block">
        <div class="dept-label">{{ promoteDeptLabel }}</div>
        <div class="partner-list">
          <div v-for="p in promotePartners" :key="p.handle" class="partner-card">
            <div class="partner-profile">
              <a :href="p.url" target="_blank" rel="noopener noreferrer" class="avatar-link">
                <img class="partner-avatar" :src="p.avatar" :alt="p.name" loading="lazy" width="88" height="88" />
              </a>
              <div class="partner-name">{{ p.name }}</div>
            </div>
            <div class="partner-handle-row">
              <div class="partner-handle">
                <img class="icon-tg" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram" loading="lazy" width="34" height="32" />
                <div>{{ p.handle }}</div>
              </div>
              <div
                class="partner-copy"
                role="button"
                tabindex="0"
                title="复制"
                @click="copy(p.handle)"
                @keydown.enter.prevent="copy(p.handle)"
                @keydown.space.prevent="copy(p.handle)"
              >
                <img class="icon-copy" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="点击复制" loading="lazy" width="50" height="50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 支付通道招商部 -->
      <div class="dept-block">
        <div class="dept-label">{{ thirdDeptLabel }}</div>
        <div class="partner-list">
          <div v-for="p in thirdPartners" :key="p.handle" class="partner-card">
            <div class="partner-profile">
              <a :href="p.url" target="_blank" rel="noopener noreferrer" class="avatar-link">
                <img class="partner-avatar" :src="p.avatar" :alt="p.name" loading="lazy" width="88" height="88" />
              </a>
              <div class="partner-name">{{ p.name }}</div>
            </div>
            <div class="partner-handle-row">
              <div class="partner-handle">
                <img class="icon-tg" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram" loading="lazy" width="34" height="32" />
                <div>{{ p.handle }}</div>
              </div>
              <div
                class="partner-copy"
                role="button"
                tabindex="0"
                title="复制"
                @click="copy(p.handle)"
                @keydown.enter.prevent="copy(p.handle)"
                @keydown.space.prevent="copy(p.handle)"
              >
                <img class="icon-copy" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="点击复制" loading="lazy" width="50" height="50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PcGuarantee embedded />

      <div class="collab-banner-wrap">
        <img class="collab-banner" src="@/assets/images/webp/collab-banner-pc-ui.webp" alt="寻求代投资源合作背景" loading="lazy" width="1024" height="90" />
      </div>
    </div>
  </PcSectionPanel>
</template>

<script setup>
import PcSectionPanel from '@/components/pc/PcSectionPanel.vue'
import PcGuarantee from '@/components/pc/PcGuarantee.vue'
import { PROMOTE_PARTNERS, THIRD_PARTNERS } from '@/config/contacts.js'
import { copyToClipboard } from '@/utils/copy.js'

const promotePartners = PROMOTE_PARTNERS
const thirdPartners = THIRD_PARTNERS

// 部门标签固定文案，不走后台动态配置
const promoteDeptLabel = '推广招商部'
const thirdDeptLabel = '支付通道招商部'

function copy(text) {
  copyToClipboard(text)
}
</script>

<style scoped lang="scss">
/* 主卡片 */
.section-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  background: #0e0c0b;
  overflow: visible;
}

/* 部门块 */
.dept-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  padding: 0 20px 20px;
  border: 1px solid rgba(255, 220, 105, 0.2);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 220, 105, 0.16) 0%, rgba(255, 220, 105, 0) 49.7%, rgba(255, 220, 105, 0.16) 100%);
}

.dept-label {
  display: flex;
  position: relative;
  width: 290px;
  height: 48px;
  margin-top: 0;
  padding: 0 44px;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 22px 22px;
  background: linear-gradient(180deg, rgba(255, 220, 105, 0.85) 0%, rgba(50, 35, 16, 0.95) 20%, rgba(24, 19, 12, 0.98) 74%, rgba(255, 220, 105, 0.9) 100%);
  color: transparent;
  background-clip: padding-box;
  font-size: 20px;
  font-weight: 600;
  font-family: "PingFang SC", sans-serif;
  line-height: 1;
  letter-spacing: 0;
  text-shadow: 0 1px 8px rgba(255, 220, 105, 0.2);
  overflow: hidden;
}

.dept-label::before,
.dept-label::after {
  content: "";
  position: absolute;
  top: 0;
  width: 56px;
  height: 100%;
  background: #12100c;
  border-bottom: 4px solid #ffdc69;
}

.dept-label::before {
  left: -34px;
  border-bottom-right-radius: 22px;
}

.dept-label::after {
  right: -34px;
  border-bottom-left-radius: 22px;
}

.dept-label {
  -webkit-text-fill-color: transparent;
  background-image:
    linear-gradient(180deg, #ffdc69 15.07%, #b48735 49.83%, #ffd466 84.42%),
    linear-gradient(180deg, rgba(255, 220, 105, 0.85) 0%, rgba(50, 35, 16, 0.95) 20%, rgba(24, 19, 12, 0.98) 74%, rgba(255, 220, 105, 0.9) 100%);
  background-clip: text, padding-box;
  -webkit-background-clip: text, padding-box;
}

/* 联系人横向列表 */
.partner-list {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
}

.partner-card {
  flex: 0 0 calc((100% - 32px) / 3);
  display: flex;
  min-width: 0;
  height: 286px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 8px 30px;
  border: 1px solid #fbe59a;
  border-radius: 10px;
  background: linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
}

.partner-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.avatar-link {
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s;
}

.avatar-link:hover {
  transform: scale(1.08);
}

.partner-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.partner-name {
  width: 100%;
  color: #ffdc69;
  font-family: "PingFang SC", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.partner-handle-row {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.partner-handle {
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 0;
  padding: 8px 20px;
  border: 1px solid #fbe59a;
  border-radius: 10px;
  background: linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
}

.icon-tg {
  width: 34px;
  height: 32px;
  flex-shrink: 0;
}

.partner-handle span {
  color: #ffdc69;
  font-family: "PingFang SC", sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.partner-copy {
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s, background 0.2s;
}

.partner-copy:hover {
  background: transparent;
  transform: translateY(-1px);
}

.icon-copy {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

/* 合作横幅 */
.collab-banner-wrap {
  width: 100%;
  height: 96px;
  border-radius: 20px;
  background: transparent;
  overflow: hidden;
}

.collab-banner {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 20px;
  object-fit: fill;
}
</style>
