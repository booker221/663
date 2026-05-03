<template>
  <PcSectionPanel section-id="activity" title="活动专栏">
    <div class="activity-card">
      <img class="reward-title-img" src="@/assets/images/webp/activity-reward-label-pc.webp" alt="合作奖励" />

      <div class="activity-grid">
        <div v-for="card in activityCards" :key="card.label" class="activity-item" role="button" tabindex="0"
          @click="openActivity(card)" @keydown.enter.prevent="openActivity(card)"
          @keydown.space.prevent="openActivity(card)">
          <div class="activity-label">
            <div class="activity-label-text">{{ card.label }}</div>
          </div>
          <div class="visual-card" :style="{ backgroundImage: `url(${cardBg})` }">
            <div class="brand-pill">
              <img class="brand-pill-img" src="@/assets/images/webp/activity-brand-pill-pc.webp" alt="合兴集团一路向前"
                loading="lazy" />
            </div>
            <div class="activity-title">{{ card.title }}</div>
            <div class="activity-summary">
              <div class="summary-text">{{ card.summary }}</div>
            </div>
            <img class="activity-prize-img" :src="card.prize" alt="" loading="lazy" />
          </div>
        </div>
      </div>

      <a v-if="officialChannelUrl" :href="officialChannelUrl" target="_blank" rel="noopener noreferrer"
        class="tg-button-link">
        <img class="tg-button-img" src="@/assets/images/webp/activity-tg-button-pc.webp" alt="TG官方频道" width="192"
          height="48" />
      </a>

      <div class="contact-row">
        <div class="act-contact">
          <div class="contact-label">商务合作：</div>
          <div class="contact-handle" role="button" tabindex="0" title="点击复制"
            @click="copyToClipboard(BUSINESS_CONTACT.handle)"
            @keydown.enter.prevent="copyToClipboard(BUSINESS_CONTACT.handle)"
            @keydown.space.prevent="copyToClipboard(BUSINESS_CONTACT.handle)">
            {{ BUSINESS_CONTACT.handle }}
          </div>
          <div class="copy-btn" role="button" tabindex="0" title="复制" @click="copyToClipboard(BUSINESS_CONTACT.handle)"
            @keydown.enter.prevent="copyToClipboard(BUSINESS_CONTACT.handle)"
            @keydown.space.prevent="copyToClipboard(BUSINESS_CONTACT.handle)">
            <img class="copy-icon" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="复制" width="44" height="44" />
          </div>
        </div>

        <div class="act-contact">
          <div class="contact-label">TG招商群：</div>
          <div class="contact-handle" role="button" tabindex="0" title="点击复制"
            @click="copyToClipboard(TG_RECRUIT_GROUP.url)"
            @keydown.enter.prevent="copyToClipboard(TG_RECRUIT_GROUP.url)"
            @keydown.space.prevent="copyToClipboard(TG_RECRUIT_GROUP.url)">
            {{ TG_RECRUIT_GROUP.url }}
          </div>
          <div class="copy-btn" role="button" tabindex="0" title="复制" @click="copyToClipboard(TG_RECRUIT_GROUP.url)"
            @keydown.enter.prevent="copyToClipboard(TG_RECRUIT_GROUP.url)"
            @keydown.space.prevent="copyToClipboard(TG_RECRUIT_GROUP.url)">
            <img class="copy-icon" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="复制" width="44" height="44" />
          </div>
        </div>
      </div>

      <img class="coin-icon" src="@/assets/images/webp/activity-coin-pc.webp" alt="" />
    </div>

    <Teleport to="body">
      <div v-if="selectedActivity" class="activity-modal-mask" @click.self="closeActivity">
        <div class="activity-modal" role="dialog" aria-modal="true" :aria-label="selectedActivity.title">
          <div class="modal-close" role="button" tabindex="0" aria-label="关闭" @click="closeActivity"
            @keydown.enter.prevent="closeActivity" @keydown.space.prevent="closeActivity">×</div>
          <div class="modal-title-row">
            <div class="modal-num">{{ selectedActivity.index + 1 }}</div>
            <h3>{{ selectedActivity.title }}</h3>
          </div>
          <div class="modal-content" v-html="selectedActivityContent"></div>
        </div>
      </div>
    </Teleport>
  </PcSectionPanel>
</template>

<script setup>
import { computed, ref } from 'vue'
import PcSectionPanel from '@/components/pc/PcSectionPanel.vue'
import { BUSINESS_CONTACT, TG_RECRUIT_GROUP, TG_OFFICIAL_CHANNEL } from '@/config/contacts.js'
import { activities, activityToHtml } from '@/stores/siteConfig.js'
import { copyToClipboard } from '@/utils/copy.js'
import cardBg from '@/assets/images/webp/activity-card-bg-pc.webp'
import prize1 from '@/assets/images/webp/activity-card-prize-pc-1.webp'
import prize2 from '@/assets/images/webp/activity-card-prize-pc-2.webp'
import prize3 from '@/assets/images/webp/activity-card-prize-pc-3.webp'
import prize4 from '@/assets/images/webp/activity-card-prize-pc-4.webp'
import prize5 from '@/assets/images/webp/activity-card-prize-pc-5.webp'
import prize6 from '@/assets/images/webp/activity-card-prize-pc-6.webp'

const prizeImages = [prize1, prize2, prize3, prize4, prize5, prize6]
const fallbackTitles = ['首单奖励', '拉新奖励', '冲刺奖励', '流水提成奖励', '排行榜奖励', '优质通道每月奖励']
const fallbackSummaries = ['满足条件 奖金翻倍', '连续拉新 额外奖励', '最高可得 18888', '额外返点 高额奖金', '全球空降 嫩模3天', '满足条件 奖金翻倍']

const selectedActivity = ref(null)

const activityCards = computed(() => prizeImages.map((prize, index) => {
  const item = activities[index] || {}
  return {
    index,
    prize,
    label: `活动${index + 1}`,
    title: item.title || fallbackTitles[index],
    summary: item.summary || item.subtitle || fallbackSummaries[index],
    sections: item.sections || [],
    content: item.content || '',
  }
}))

const officialChannelUrl = computed(() => (TG_OFFICIAL_CHANNEL.url || '').trim())

const selectedActivityContent = computed(() => {
  if (!selectedActivity.value) return ''
  if (selectedActivity.value.content) return selectedActivity.value.content
  return activityToHtml(selectedActivity.value.sections)
})

function openActivity(card) {
  selectedActivity.value = card
}

function closeActivity() {
  selectedActivity.value = null
}
</script>

<style scoped lang="scss">
.activity-card {
  position: relative;
  width: min(100%, 1140px);
  min-height: 680px;
  margin: 0 auto;
  padding: 73px 17px 34px;
  border: 1px solid #fbe59a;
  border-radius: 20px;
  background: linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
  overflow: hidden;
}

.reward-title-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 168px;
  height: 64px;
  object-fit: contain;
  pointer-events: none;
  z-index: 2;
}

.activity-grid {
  display: grid;
  grid-template-columns: repeat(3, 355px);
  justify-content: space-between;
  gap: 20px;
  width: 100%;
}

.activity-item {
  position: relative;
  display: block;
  width: 355px;
  height: 160px;
  padding: 10px 0 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.activity-label {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: block;
  width: 91px;
  height: 28px;
  padding: 0;
  background: url("@/assets/images/webp/activity-label-bg-pc.webp") left top / 91px 28px no-repeat;
}

.activity-label-text {
  position: relative;
  z-index: 2;
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 16px;
  color: #000;
  font-family: "PingFang SC", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.activity-label::after {
  content: none;
}

.visual-card {
  position: relative;
  display: block;
  width: 355px;
  height: 150px;
  border: 1px solid #fbe59a;
  border-radius: 20px;
  background-color: #060606;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.visual-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.36) 55%, rgba(0, 0, 0, 0.08) 100%),
    radial-gradient(circle at 44% 26%, rgba(255, 220, 105, 0.56), transparent 34%);
  pointer-events: none;
}

.brand-pill {
  position: absolute;
  top: 19px;
  left: 58px;
  z-index: 2;
  display: block;
  width: 81px;
  height: 28px;
  overflow: hidden;
}

.brand-pill-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.activity-title {
  position: absolute;
  left: 22px;
  top: 58px;
  z-index: 2;
  max-width: 205px;
  font-family: YouSheBiaoTiHei;
  font-size: 31px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0;
  background: linear-gradient(180deg, #FFF 17.8%, #FDE420 56.02%, #FFC800 82.2%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.activity-item:nth-child(6) .activity-title {
  font-size: 24px;
  top: 62px;
}

.activity-summary {
  position: absolute;
  left: 37px;
  bottom: 24px;
  z-index: 2;
  display: flex;
  min-width: 150px;
  height: 25px;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border: 1px solid #fbe59a;
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 45%),
    linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
  box-shadow:
    inset 0 1px 3px rgba(255, 255, 255, 0.32),
    inset 0 -1px 2px rgba(233, 201, 126, 0.7),
    0 0 8px rgba(255, 220, 105, 0.18);
  white-space: nowrap;
}

.summary-text {
  color: #ffd43d;
  font-family: "PingFang SC", sans-serif;
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
  text-shadow: 0 0 0.5px #000;
}

.activity-prize-img {
  position: absolute;
  right: -8px;
  bottom: -8px;
  z-index: 1;
  width: 158px;
  height: 158px;
  object-fit: contain;
  pointer-events: none;
}

.activity-item:nth-child(5) .activity-prize-img {
  width: 168px;
  height: 168px;
}

.activity-item:hover .visual-card {
  box-shadow: 0 0 18px rgba(255, 220, 105, 0.22);
}

.tg-button-link {
  display: block;
  width: 192px;
  height: 48px;
  margin-top: 28px;
  transform-origin: center;
  animation: tgButtonBreath 1.8s ease-in-out infinite;
  transition: opacity 0.2s, transform 0.2s;
}

.tg-button-link:hover {
  opacity: 0.86;
  animation-play-state: paused;
  transform: scale(1.04);
}

.tg-button-img {
  display: block;
  width: 192px;
  height: 48px;
  object-fit: contain;
}

@keyframes tgButtonBreath {
  0%,
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(255, 220, 105, 0));
  }

  50% {
    transform: scale(1.045);
    filter: drop-shadow(0 0 14px rgba(255, 220, 105, 0.45));
  }
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-top: 21px;
}

.act-contact {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  min-width: 0;
  font-family: "PingFang SC", sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;
}

.contact-label {
  color: #fff;
}

.contact-handle {
  color: #ffdc69;
  cursor: pointer;
  transition: opacity 0.2s;
}

.contact-handle:hover {
  opacity: 0.82;
}

.copy-btn {
  display: grid;
  width: 44px;
  height: 44px;
  padding: 0;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: transform 0.2s;
  flex-shrink: 0;
}

.copy-btn:hover {
  transform: translateY(-1px);
}

.copy-icon {
  display: block;
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.coin-icon {
  position: absolute;
  left: -1px;
  bottom: -1px;
  width: 144px;
  height: 90px;
  object-fit: contain;
  pointer-events: none;
}

.activity-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.62);
}

.activity-modal {
  position: relative;
  width: min(680px, calc(100vw - 48px));
  max-height: calc(100vh - 80px);
  padding: 28px 34px 32px;
  border: 1px solid rgba(251, 229, 154, 0.6);
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(255, 220, 105, 0.08) 0%, rgba(0, 0, 0, 0) 18%),
    linear-gradient(180deg, rgba(17, 14, 7, 0.98) 0%, rgba(6, 5, 3, 0.98) 100%);
  box-shadow:
    0 18px 60px rgba(0, 0, 0, 0.48),
    inset 0 1px 0 rgba(255, 220, 105, 0.08);
  overflow: auto;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 18px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255, 220, 105, 0.18) 0%, rgba(255, 220, 105, 0.08) 100%);
  color: #ffdc69;
  display: grid;
  place-items: center;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s, background 0.2s, transform 0.2s;
}

.activity-modal::-webkit-scrollbar {
  width: 8px;
}

.activity-modal::-webkit-scrollbar-track {
  background: rgba(255, 220, 105, 0.05);
}

.activity-modal::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(255, 220, 105, 0.42);
}

.modal-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.modal-title-row h3 {
  margin: 0;
  color: #f6e5aa;
  font-family: "PingFang SC", sans-serif;
  font-size: 20px;
  font-weight: 700;
}

.modal-num {
  display: grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffdc69 0%, #b48735 100%);
  color: #000;
  font-size: 16px;
  font-weight: 800;
}

.modal-content {
  padding: 18px 16px;
  border-radius: 12px;
  background:
    linear-gradient(180deg, rgba(255, 220, 105, 0.08) 0%, rgba(255, 220, 105, 0.02) 100%),
    rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(251, 229, 154, 0.18);
}

.modal-content :deep(.act-line) {
  margin: 0 0 10px;
  color: #d6c28a;
  font-family: "PingFang SC", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.55;
}

.modal-content :deep(.act-line.red),
.modal-content :deep(.red-text) {
  color: #ffdc69;
  font-weight: 700;
}

.modal-content :deep(.act-flex) {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
  color: #d6c28a;
  font-family: "PingFang SC", sans-serif;
  font-size: 16px;
  line-height: 1.45;
}

.modal-content :deep(.act-flex::before) {
  content: "";
  width: 12px;
  height: 12px;
  flex: 0 0 12px;
  transform: rotate(45deg);
  border-radius: 2px;
  background: linear-gradient(180deg, #ffdc69 0%, #b48735 100%);
}

.modal-content :deep(.label) {
  min-width: 48px;
  font-weight: 600;
  color: #f1e2b2;
}

.modal-content :deep(.amount) {
  color: #ffdc69;
  font-size: 22px;
  font-weight: 800;
}
</style>
