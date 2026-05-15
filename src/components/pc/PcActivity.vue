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
          <div class="visual-card" :class="{ 'has-card-image': !!card.pcImage }">
            <img v-if="card.pcImage" class="activity-visual-img" :src="card.pcImage" alt="" loading="lazy" />
          </div>
        </div>
      </div>

      <div class="contact-row">
        <a v-if="officialChannelUrl" :href="officialChannelUrl" target="_blank" rel="noopener noreferrer"
          class="contact-button-link">
          <img class="contact-button-img" :src="officialButtonImage" alt="TG官方频道" width="384" height="96" />
        </a>
        <a v-if="businessContactUrl" :href="businessContactUrl" target="_blank" rel="noopener noreferrer"
          class="contact-button-link">
          <img class="contact-button-img" :src="businessButtonImage" alt="TG商务合作" width="384" height="96" />
        </a>
        <a v-if="recruitGroupUrl" :href="recruitGroupUrl" target="_blank" rel="noopener noreferrer"
          class="contact-button-link">
          <img class="contact-button-img" :src="recruitButtonImage" alt="TG招商群" width="384" height="96" />
        </a>
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
import officialButtonImage from '@/assets/images/gif/activity-button-official.gif'
import businessButtonImage from '@/assets/images/gif/activity-button-business.gif'
import recruitButtonImage from '@/assets/images/gif/activity-button-recruit.gif'


const MAX_ACTIVITY_CARDS = 6

const selectedActivity = ref(null)

const activityCards = computed(() => activities
  .slice(0, MAX_ACTIVITY_CARDS)
  .map((item, index) => ({
    index,
    label: `活动${index + 1}`,
    title: (item.title || '').trim(),
    summary: (item.summary || item.subtitle || '').trim(),
    pcImage: (item.pcImage || '').trim(),
    sections: Array.isArray(item.sections) ? item.sections : [],
    content: item.content || '',
  }))
  .filter(hasActivityData)
)

const officialChannelUrl = computed(() => (TG_OFFICIAL_CHANNEL.url || '').trim())
const businessContactUrl = computed(() => (BUSINESS_CONTACT.url || '').trim())
const recruitGroupUrl = computed(() => (TG_RECRUIT_GROUP.url || '').trim())

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

function hasActivityData(card) {
  if (card.title || card.summary || card.pcImage || (card.content || '').trim()) return true
  return card.sections.some(section => {
    if ((section.value || '').trim()) return true
    return Array.isArray(section.items) && section.items.some(item =>
      (item.label || '').trim() || (item.amount || '').trim()
    )
  })
}
</script>

<style scoped lang="scss">
.activity-card {
  position: relative;
  width: min(100%, 1140px);
  margin: 0 auto;
  padding: 73px  17px 34px;
  padding-bottom: 100px;
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

.activity-visual-img {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.visual-card::before {
  content: none;
}

.activity-prize-img {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 154px;
  height: 154px;
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

.contact-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 28px;
}

.contact-button-link {
  display: block;
  width: 192px;
  transition: opacity 0.2s, transform 0.2s;
}

.contact-button-link:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.contact-button-img {
  display: block;
  width: 100%;
  height: auto;
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
