<template>
  <PcSectionPanel section-id="business" title="官方商务" desc="只认准以下商务人员，其他勿信，谨防被骗">
    <!-- 主卡片：两个部门同时显示 -->
    <div class="section-card">
      <!-- 推广招商部 -->
      <div class="dept-block">
        <div class="dept-header">
          <div class="dept-label">
            <div class="dept-label-text">{{ promoteDeptLabel }}</div>
          </div>
          <div class="dept-label-hint-wrap">
            <img
              class="dept-label-hint"
              :src="deptHintPc"
              alt="点击头像获取 TG 联系方式"
              loading="lazy"
              width="464"
              height="53"
            />
          </div>
        </div>
        <div class="partner-list">
          <div v-for="p in promotePartners" :key="p.handle" class="partner-card">
            <div class="partner-profile">
              <a :href="p.url" target="_blank" rel="noopener noreferrer" class="avatar-link live-avatar-link">
                <img class="partner-avatar" :src="p.avatar" :alt="p.name" loading="lazy" width="88" height="88" />
              </a>
              <div class="partner-name">{{ p.name }}</div>
            </div>
            <div class="partner-handle-row">
              <div class="partner-handle">
                <img class="icon-tg" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram" loading="lazy"
                  width="34" height="32" />
                <div class="tg-content">{{ p.handle }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 支付通道招商部 -->
      <div class="dept-block">
        <div class="dept-header">
          <div class="dept-label">
            <div class="dept-label-text">{{ thirdDeptLabel }}</div>
          </div>
          <div class="dept-label-hint-wrap">
            <img
              class="dept-label-hint"
              :src="deptHintPc"
              alt="点击头像获取 TG 联系方式"
              loading="lazy"
              width="464"
              height="53"
            />
          </div>
        </div>
        <div class="partner-list">
          <div v-for="p in thirdPartners" :key="p.handle" class="partner-card">
            <div class="partner-profile">
              <a :href="p.url" target="_blank" rel="noopener noreferrer" class="avatar-link live-avatar-link">
                <img class="partner-avatar" :src="p.avatar" :alt="p.name" loading="lazy" width="88" height="88" />
              </a>
              <div class="partner-name">{{ p.name }}</div>
            </div>
            <div class="partner-handle-row">
              <div class="partner-handle">
                <img class="icon-tg" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram" loading="lazy"
                  width="34" height="32" />
                <div class="tg-content">{{ p.handle }}</div>
              </div>
            
            </div>
          </div>
        </div>
      </div>

      <section id="guarantee">
        <PcGuarantee embedded />
      </section>

      <div class="collab-banner-wrap">
        <img class="collab-banner" src="@/assets/images/webp/collab-banner-pc-ui.webp" alt="寻求代投资源合作背景" loading="lazy"
          width="1024" height="90" />
      </div>
    </div>
  </PcSectionPanel>
</template>

<script setup>
import PcSectionPanel from '@/components/pc/PcSectionPanel.vue'
import PcGuarantee from '@/components/pc/PcGuarantee.vue'
import { PROMOTE_PARTNERS, THIRD_PARTNERS } from '@/config/contacts.js'
import { copyToClipboard } from '@/utils/copy.js'
import deptHintPc from '@/assets/images/png/dept-hint-pc.png'

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
  gap: 20px;
  width: 100%;
  padding: 0 20px 20px;
  border: 1px solid rgba(255, 220, 105, 0.2);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 220, 105, 0.16) 0%, rgba(255, 220, 105, 0) 49.7%, rgba(255, 220, 105, 0.16) 100%);
}

.dept-header {
  display: grid;
  width: 100%;
  justify-items: center;
}

.dept-header > * {
  grid-area: 1 / 1;
}

.dept-label {
  position: relative;
  width: 290px;
  height: 50px;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: linear-gradient(180deg, #2D2D2D 0%, #1F1F1F 50.31%, #393939 100%);
  overflow: visible;
  z-index: 1;
}

.dept-label::before,
.dept-label::after {
  content: "";
  position: absolute;
  top: 0;
  width: 45px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: 45px 50px;
  pointer-events: none;
  z-index: 0;
}

.dept-label::before {
  left: -1px;
  background-image: url("@/assets/images/svg/dept-label-left-pc.svg");
}

.dept-label::after {
  right: -3px;
  background-image: url("@/assets/images/svg/dept-label-right-pc.svg");
}

.dept-label-text {
  position: relative;
  z-index: 1;
  font-family: "PingFang SC", sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0;
  white-space: nowrap;
  text-shadow: 0 1px 8px rgba(255, 220, 105, 0.2);
  color: transparent;
  -webkit-text-fill-color: transparent;
  background: linear-gradient(180deg, #ffdc69 15.07%, #b48735 49.83%, #ffd466 84.42%);
  background-clip: text;
  -webkit-background-clip: text;
}

.dept-label-hint-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 34px;
  z-index: 1;
}

.dept-label-hint {
margin-top: 34px;
  width: 232px;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  flex: 0 0 auto;
}

/* 联系人横向列表 */
.partner-list {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  flex-wrap: wrap;
}

.partner-card {
  flex: 0 0 calc((100% - 32px) / 3);
  display: flex;
  min-width: 0;
  height: 230px;
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

  .tg-content {
    color: #FFDC69;
  }
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
