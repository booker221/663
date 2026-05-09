<template>
  <H5SectionPanel section-id="activity" title="活动专栏">
    <div class="activity-card">
      <!-- 内容 -->
      <div class="card-content">
        <!-- 合作奖励标签 - 左上角 -->
        <img class="coin-icon-h5" src="@/assets/images/icon/coin-left-h5.webp" alt="" />

        <div class="activity-group-label">
          <div class="activity-group-label-text">活动奖励</div>
        </div>

        <div class="activity-grid">
          <div v-for="card in activityCards" :key="card.label" class="activity-item" role="button" tabindex="0"
            @click="openActivity(card)" @keydown.enter.prevent="openActivity(card)"
            @keydown.space.prevent="openActivity(card)">
            <div class="activity-label">
              <div class="activity-label-text">{{ card.label }}</div>
            </div>
            <div class="visual-card" :class="{ 'has-card-image': !!card.h5Image }">
              <img v-if="card.h5Image" class="activity-visual-img" :src="card.h5Image" alt="" loading="lazy" />
            </div>
          </div>
        </div>

        <!-- 底部人物 + 联系方式 -->
        <div class="contact-row">
          <div class="contact-info">
            <div v-if="officialChannelUrl" class="tg-button-link" role="button" tabindex="0"
              @click="openOfficialChannel" @keydown.enter.prevent="openOfficialChannel"
              @keydown.space.prevent="openOfficialChannel">
              <img class="tg-button-img" src="@/assets/images/webp/activity-tg-button-pc.webp" alt="TG官方频道" />
            </div>
            <div class="act-contact">
              <div class="contact-label">商务合作：</div>
              <div class="contact-handle" role="button" tabindex="0" @click="copyToClipboard(BUSINESS_CONTACT.handle)"
                @keydown.enter.prevent="copyToClipboard(BUSINESS_CONTACT.handle)"
                @keydown.space.prevent="copyToClipboard(BUSINESS_CONTACT.handle)">
                {{ BUSINESS_CONTACT.handle }}
                <img class="copy-icon" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="复制" width="44"
                  height="44" />
              </div>
            </div>
            <div class="act-contact">
              <div class="contact-label">TG招商群：</div>
              <div class="contact-handle" role="button" tabindex="0" @click="copyToClipboard(TG_RECRUIT_GROUP.url)"
                @keydown.enter.prevent="copyToClipboard(TG_RECRUIT_GROUP.url)"
                @keydown.space.prevent="copyToClipboard(TG_RECRUIT_GROUP.url)">
                {{ TG_RECRUIT_GROUP.url }}
                <img class="copy-icon" src="@/assets/images/webp/icon-copy-gold-pc.webp" alt="复制" width="44"
                  height="44" />
              </div>
            </div>
          </div>
        </div>
      </div>
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
  </H5SectionPanel>
</template>

<script setup>
import { ref, computed } from 'vue'
import H5SectionPanel from '@/components/h5/H5SectionPanel.vue'
import defaultActPerson from '@/assets/images/webp/activity-person-h5-new.webp'
import { BUSINESS_CONTACT, TG_RECRUIT_GROUP, TG_OFFICIAL_CHANNEL } from '@/config/contacts.js'
import { activities, images, activityToHtml } from '@/stores/siteConfig.js'
import { copyToClipboard } from '@/utils/copy.js'
import cardBg from '@/assets/images/webp/activity-card-bg-pc.webp'
import prize1 from '@/assets/images/webp/activity-card-prize-pc-1.webp'
import prize2 from '@/assets/images/webp/activity-card-prize-pc-2.webp'
import prize3 from '@/assets/images/webp/activity-card-prize-pc-3.webp'
import prize4 from '@/assets/images/webp/activity-card-prize-pc-4.webp'
import prize5 from '@/assets/images/webp/activity-card-prize-pc-5.webp'
import prize6 from '@/assets/images/webp/activity-card-prize-pc-6.webp'

const MAX_ACTIVITY_CARDS = 6

const activityPersonImage = computed(() => images.activity_person_h5 || defaultActPerson)
const officialChannelUrl = computed(() => (TG_OFFICIAL_CHANNEL.url || '').trim())
const selectedActivity = ref(null)

const activityCards = computed(() => activities
  .slice(0, MAX_ACTIVITY_CARDS)
  .map((item, index) => ({
    index,
    label: `活动${index + 1}`,
    title: (item.title || '').trim(),
    summary: (item.summary || item.subtitle || '').trim(),
    h5Image: (item.h5Image || '').trim(),
    sections: Array.isArray(item.sections) ? item.sections : [],
    content: item.content || '',
  }))
  .filter(hasActivityData)
)

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
  if (card.title || card.summary || card.h5Image || (card.content || '').trim()) return true
  return card.sections.some(section => {
    if ((section.value || '').trim()) return true
    return Array.isArray(section.items) && section.items.some(item =>
      (item.label || '').trim() || (item.amount || '').trim()
    )
  })
}

const openOfficialChannel = () => {
  if (!officialChannelUrl.value) return
  window.open(officialChannelUrl.value, '_blank', 'noopener,noreferrer')
}
</script>


<style scoped lang="scss">
/* 活动卡片 */
.activity-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(45, 45, 45, 0.52) 0%, rgba(0, 0, 0, 0.96) 49.9%, rgba(45, 45, 45, 0.46) 100%);
  border: 1px solid rgba(251, 229, 154, 0.45);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 58px 4px 8px;
}

/* 合作奖励标签 - 左上角 */
.reward-title-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 88px;
  height: 34px;
  object-fit: fill;
  pointer-events: none;
  z-index: 10;
}

.coin-icon-h5 {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 60px;
  object-fit: contain;
  pointer-events: none;
  z-index: 10;
}

.activity-group-label {
  position: absolute;
  top: 0;
  left: 50%;
  width: 256px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  overflow: visible;
  isolation: isolate;
  z-index: 4;
  background: url("@/assets/images/svg/dept-label-center-pc.svg") center / 255.2px 44px no-repeat;
}

.activity-group-label::before,
.activity-group-label::after {
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

.activity-group-label::before {
  left: -1px;
  background-image: url("@/assets/images/svg/dept-label-left-pc.svg");
}

.activity-group-label::after {
  right: -3px;
  background-image: url("@/assets/images/svg/dept-label-right-pc.svg");
}

.activity-group-label-text {
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

.activity-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-bottom: 16px;
}

.activity-item {
  position: relative;
  min-width: 0;
  height: 150px;
  padding-top: 8px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.activity-label {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 85px;
  height: 28px;
  background: url("@/assets/images/webp/activity-label-bg-pc.webp") left top / 85px 28px no-repeat;
}

.activity-label-text {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  color: #000;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

.visual-card {
  position: relative;
  width: 100%;
  height: 142px;
  border: 1px solid #fbe59a;
  border-radius: 8px;
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

/* ====== 内容排版 ====== */
:deep(.act-line) {
  font-family: "PingFang SC", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #d6c28a;
  line-height: 16px;
  margin: 0 0 8px 0;
  letter-spacing: 0;
}

:deep(.act-line.bold) {
  font-weight: 600;
}

:deep(.act-line.red),
:deep(.red-text) {
  font-family: "PingFang SC", sans-serif;
  color: #ffdc69;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.1em;
}

:deep(.amount) {
  font-family: "PingFang SC", sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1em;
  color: #ffdc69;
}

/* 左右两端对齐布局 */
:deep(.act-flex-between) {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-family: "PingFang SC", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #d6c28a;
  line-height: 16px;
  margin-bottom: 8px;
  letter-spacing: 0;
  width: 70%;
}

/* 普通 flex 布局（非两端对齐） */
:deep(.act-flex) {
  display: flex;
  align-items: baseline;
  font-family: "PingFang SC", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #d6c28a;
  line-height: 16px;
  margin-bottom: 8px;
  letter-spacing: 0;
}

:deep(.act-flex .label),
:deep(.act-flex-between .label) {
  color: #f4e4ad;
  flex-shrink: 0;
}

/* 三列布局：标签 | 额外 | 金额 */
:deep(.act-flex-three) {
  display: flex;
  align-items: baseline;
  font-family: "PingFang SC", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #d6c28a;
  line-height: 16px;
  margin-bottom: 8px;
  letter-spacing: 0;
  width: 70%;
}

:deep(.act-flex-three .col-left) {
  width: 80px;
  flex-shrink: 0;
}

:deep(.act-flex-three .col-mid) {
  flex: 1;
  text-align: center;
}

:deep(.act-flex-three .amount) {
  text-align: right;
}

:deep(.mt-2) {
  margin-top: 8px;
}

:deep(.inline-dot) {
  width: 7px;
  height: 7px;
  margin-right: 4px;
  object-fit: contain;
}

:deep(.flex-center-y) {
  display: flex;
  align-items: center;
}

.activity-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.72);
}

.activity-modal {
  position: relative;
  width: min(100%, 340px);
  max-height: 78vh;
  padding: 24px 18px 18px;
  overflow-y: auto;
  border: 1px solid #fbe59a;
  border-radius: 16px;
  background:
    radial-gradient(circle at 14% 0%, rgba(255, 220, 105, 0.2), transparent 26%),
    linear-gradient(180deg, #2d2d2d 0%, #000 49.9%, #2d2d2d 100%);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.48);
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  color: #ffdc69;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.modal-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.modal-num {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffdc69 0%, #b48735 100%);
  color: #100900;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}

.modal-title-row h3 {
  margin: 0;
  background: linear-gradient(180deg, #fff 12%, #fde420 56%, #ffc800 86%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.2;
}

.modal-content {
  color: #d6c28a;
}

.contact-row {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  position: relative;
  min-height: 130px;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.act-contact {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 8px;
  line-height: 22px;
  word-break: break-all;
}

.contact-label {
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
}

.contact-handle {
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #FFDC69;
  display: flex;
  align-items: center;
}

.copy-icon {
  width: 22px;
  height: 22px;
  margin-left: 4px;
  -webkit-tap-highlight-color: transparent;
}

.copy-icon:active {
  opacity: 0.4;
}

.tg-button-link {
  display: inline-flex;
  align-items: center;
  margin-bottom: 8px;
  -webkit-tap-highlight-color: transparent;
}

.tg-button-link:active {
  opacity: 0.7;
}

.tg-button-img {
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 800;
  animation: tgButtonBreath 1.8s ease-in-out infinite;
}

@keyframes tgButtonBreath {

  0%,
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(255, 220, 105, 0));
  }

  50% {
    transform: scale(1.045);
    filter: drop-shadow(0 0 10px rgba(255, 220, 105, 0.42));
  }
}
</style>
