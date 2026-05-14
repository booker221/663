<template>
  <H5SectionPanel section-id="business" title="官方商务" desc="只认准以下商务人员，其他勿信，谨防被骗">
    <div class="section-card">
      <!-- 推广招商部 -->
      <div class="dept-block">
        <div class="dept-label">
          <div class="dept-label-text">推广招商部</div>
        </div>
        <div class="partner-list" :class="{ 'partner-list--featured': shouldFeatureFirstCard(promotePartners) }">
          <div v-for="p in promotePartners" :key="p.handle" class="partner-card">
            <a :href="p.url" target="_blank" rel="noopener noreferrer" class="avatar-link live-avatar-link">
              <img class="partner-avatar" :src="p.avatar" :alt="p.name" loading="lazy" width="80" height="80" />
            </a>
            <div class="partner-name">{{ p.name }}</div>
            <div class="partner-handle">
              <img class="icon-tg" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram" loading="lazy" width="36" height="36" />
              <div>{{ p.handle }}</div>
            </div>
            <div class="partner-copy" role="button" tabindex="0" title="复制" @click="copy(p.handle)" @keydown.enter.prevent="copy(p.handle)" @keydown.space.prevent="copy(p.handle)">
              <img class="icon-copy" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="复制" loading="lazy" width="44" height="44" />
            </div>
          </div>
        </div>
      </div>
      <!-- 支付通道招商部 -->
      <div class="dept-block">
        <div class="dept-label">
          <div class="dept-label-text">支付通道招商部</div>
        </div>
        <div class="partner-list" :class="{ 'partner-list--featured': shouldFeatureFirstCard(thirdPartners) }">
          <div v-for="p in thirdPartners" :key="p.handle" class="partner-card">
            <a :href="p.url" target="_blank" rel="noopener noreferrer" class="avatar-link live-avatar-link">
              <img class="partner-avatar" :src="p.avatar" :alt="p.name" />
            </a>
            <div class="partner-name">{{ p.name }}</div>
            <div class="partner-handle">
              <img class="icon-tg" src="@/assets/images/webp/icon-telegram.webp" alt="Telegram" />
              <div>{{ p.handle }}</div>
            </div>
            <div class="partner-copy" role="button" tabindex="0" title="复制" @click="copy(p.handle)" @keydown.enter.prevent="copy(p.handle)" @keydown.space.prevent="copy(p.handle)">
              <img class="icon-copy" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="复制" loading="lazy" width="44" height="44" />
            </div>
          </div>
        </div>
      </div>

      <section id="guarantee">
        <H5Guarantee embedded />
      </section>

      <div class="collab-banner-wrap">
        <img class="collab-banner" :src="collabBannerH5" alt="寻求代投资源合作" loading="lazy" />
      </div>
    </div>
  </H5SectionPanel>
</template>

<script setup>
import H5SectionPanel from '@/components/h5/H5SectionPanel.vue'
import H5Guarantee from '@/components/h5/H5Guarantee.vue'
import { PROMOTE_PARTNERS, THIRD_PARTNERS } from '@/config/contacts.js'
import { copyToClipboard } from '@/utils/copy.js'
import collabBannerH5 from '@/assets/images/webp/collab-banner-h5-ui.webp'

const promotePartners = PROMOTE_PARTNERS
const thirdPartners = THIRD_PARTNERS

function copy(text) {
  copyToClipboard(text)
}

function shouldFeatureFirstCard(partners) {
  return partners.length % 2 === 1
}
</script>

<style scoped>
.section-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background:
    #0e0c0b;
  border-radius: 8px;
  margin: 0;
  padding: 8px;
  overflow: hidden;
}

.dept-block {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 4px 4px;
  border: 0.5px solid rgba(255, 220, 105, 0.2);
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(255, 220, 105, 0.16) 0%, rgba(255, 220, 105, 0) 49.7%, rgba(255, 220, 105, 0.16) 100%);
}

.dept-label {
  position: relative;
  width: 256px;
  height: 44px;
  margin: -18px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  isolation: isolate;
  z-index: 1;
  background: url("@/assets/images/svg/dept-label-center-pc.svg") center / 255.2px 44px no-repeat;
}

.dept-label::before,
.dept-label::after {
  content: "";
  position: absolute;
  top: 0;
  width: 39.484px;
  height: 44px;
  background-repeat: no-repeat;
  background-size: 39.484px 44px;
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
  z-index: 2;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  text-shadow: 0 1px 8px rgba(255, 220, 105, 0.2);
  background: linear-gradient(180deg, #ffdc69 15.07%, #b48735 49.83%, #ffd466 84.42%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  white-space: nowrap;
}

/* 联系人列表 */
.partner-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px;
}

.partner-list--featured .partner-card:first-child {
  grid-column: 1 / -1;
}

.partner-card {
  display: grid;
  align-items: center;
  justify-items: center;
  gap: 12px;
  min-width: 0;
  min-height: 166px;
  padding: 14px 8px;
  border: 0.5px solid rgba(251, 229, 154, 0.7);
  border-radius: 10px;
  background: linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
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
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.partner-name {
  font-size: 14px;
  font-weight: 700;
  color: #f4e4ad;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.partner-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 48px;
  padding: 0 8px;
  border: 0.5px solid rgba(251, 229, 154, 0.72);
  border-radius: 10px;
  background: linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
}

.icon-tg {
  width: 29px;
  height: 28px;
}

.partner-handle div {
  color: #d4b258;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.partner-copy {
  width: 44px;
  height: 44px;
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
  width: 44px;
  height: 44px;
}

.collab-banner-wrap {
  width: 100%;
}

/* 合作横幅 */
.collab-banner {
  width: 100%;
  display: block;
  height: 88px;
  border-radius: 10px;
}
</style>
