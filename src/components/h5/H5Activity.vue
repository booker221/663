<template>
  <section class="section">
    <div class="section-header">
      <h2 class="section-title"><span class="dot">◆</span> 活动专栏</h2>
    </div>

    <div class="activity-card">
      <!-- 背景图 -->
      <img class="card-bg" :src="actBgImage" alt="" loading="lazy" width="734" height="1444" />

      <!-- 内容 -->
      <div class="card-content">
        <!-- 合作奖励标签 - 左上角 -->
        <img class="reward-title-img" src="@/assets/images/icon/reward-label.webp" alt="合作奖励" />
        <img class="coin-icon-h5" src="@/assets/images/icon/coin-left-h5.webp" alt="" />

        <!-- 手风琴面板 -->
        <div class="accordion-container">
          <div class="accordion-item" v-for="(item, index) in activities" :key="index">
            <div class="accordion-header" @click="toggleActivity(index)">
              <div class="title-left">
                <img :src="numIcons[index]" alt="index" class="num-icon" />
                <p class="act-label">{{ item.title }}</p>
              </div>
              <img class="arrow-img" :src="activeIndex === index ? arrowUpIcon : arrowDownIcon" alt="toggle" />
            </div>
            <div class="accordion-content" v-show="activeIndex === index" v-html="getActivityContent(item)"></div>
          </div>
        </div>

        <!-- 底部人物 + 联系方式 -->
        <div class="contact-row">
          <div class="contact-info">
            <a :href="TG_OFFICIAL_CHANNEL.url" target="_blank" rel="noopener noreferrer" class="tg-button-link">
              <img class="tg-button-img" src="@/assets/images/webp/tg-button.webp" alt="TG官方频道" width="128"
                height="32" />
            </a>
            <p class="act-contact">
              <span class="contact-label">商务合作：</span>
              <br>
              <span class="contact-handle" @click="copyToClipboard(BUSINESS_CONTACT.handle)">
                {{ BUSINESS_CONTACT.handle }}
                <img class="copy-icon" src="@/assets/images/webp/icon-copy.webp" alt="复制" width="16" height="16" />
              </span>
            </p>
            <p class="act-contact">
              <span class="contact-label">TG招商群：</span>
              <br>
              <span class="contact-handle" @click="copyToClipboard(TG_RECRUIT_GROUP.url)">
                {{ TG_RECRUIT_GROUP.url }}
                <img class="copy-icon" src="@/assets/images/webp/icon-copy.webp" alt="复制" width="16" height="16" />
              </span>
            </p>
          </div>
          <img class="person-img" :src="activityPersonImage" alt="活动商务专员" loading="lazy" width="312" height="312" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import defaultActBg from '@/assets/images/webp/activity-bg-h5.webp'
import defaultActPerson from '@/assets/images/webp/activity-person-h5-new.webp'
import { BUSINESS_CONTACT, TG_RECRUIT_GROUP, TG_OFFICIAL_CHANNEL } from '@/config/contacts.js'
import { activities, images, activityToHtml } from '@/stores/siteConfig.js'
import { copyToClipboard } from '@/utils/copy.js'
import arrowUpIcon from '@/assets/images/icon/arrow-up.webp'
import arrowDownIcon from '@/assets/images/icon/arrow-down.webp'
import num1 from '@/assets/images/icon/num-1.webp'
import num2 from '@/assets/images/icon/num-2.webp'
import num3 from '@/assets/images/icon/num-3.webp'
import num4 from '@/assets/images/icon/num-4.webp'
import num5 from '@/assets/images/icon/num-5.webp'
import num6 from '@/assets/images/icon/num-6.webp'
import titleDotIcon from '@/assets/images/webp/icon-title-dot.webp'

const numIcons = [num1, num2, num3, num4, num5, num6]

const actBgImage = computed(() => images.activity_bg_h5 || defaultActBg)
const activityPersonImage = computed(() => images.activity_person_h5 || defaultActPerson)

// 兼容旧数据（content 字符串）和新数据（sections 结构化）
function getActivityContent(item) {
  if (item.content && typeof item.content === 'string') return item.content
  if (item.sections) return activityToHtml(item.sections)
  return ''
}

const activeIndex = ref(-1)
const toggleActivity = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index
}
</script>


<style scoped>
.section {
  margin-bottom: 12px;
}

.section-header {
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 12px;
}

.dot {
  color: var(--primary);
  font-size: 13px;
}

/* 活动卡片 */
.activity-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  z-index: 0;
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 50px 16px 16px;
}

/* 合作奖励标签 - 左上角 */
.reward-title-img {
  position: absolute;
  top: 5px;
  left: 9px;
  height: 32px;
  object-fit: contain;
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

/* 手风琴容器 */
.accordion-container {
  display: flex;
  flex-direction: column;
  background: #FFF;
  border-radius: 10px;
  padding: 0 16px;
  margin-bottom: 16px;
}

.accordion-item {
  background: transparent;
  border-bottom: 1px solid #EEF3FF;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 18px 0;
  transition: opacity 0.3s;
  -webkit-tap-highlight-color: transparent;
}

.accordion-header:active {
  opacity: 0.7;
}

.title-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.num-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.act-label {
  font-family: "PingFang SC", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0;
  color: #414A65;
  margin: 0;
}

.arrow-img {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

/* 展开的内容区 - 无背景色 */
.accordion-content {
  padding: 0 0 16px;
}

/* ====== 内容排版 ====== */
:deep(.act-line) {
  font-family: "PingFang SC", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #414A65;
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
  color: #FF4A4A;
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
  color: #FF4A4A;
}

/* 左右两端对齐布局 */
:deep(.act-flex-between) {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-family: "PingFang SC", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #414A65;
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
  color: #414A65;
  line-height: 16px;
  margin-bottom: 8px;
  letter-spacing: 0;
}

:deep(.act-flex .label),
:deep(.act-flex-between .label) {
  color: #414A65;
  flex-shrink: 0;
}

/* 三列布局：标签 | 额外 | 金额 */
:deep(.act-flex-three) {
  display: flex;
  align-items: baseline;
  font-family: "PingFang SC", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #414A65;
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

.contact-row {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  position: relative;
  min-height: 150px;
  padding-bottom: 20px;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.act-contact {
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
  color: #8826FF;
}

.contact-handle {
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #4676FF;
  display: flex;
}

.contact-handle:active {
  opacity: 0.6;
}

.person-img {
  width: 148px;
  height: 148px;
  opacity: 1;
  position: absolute;
  right: 0px;
  bottom: 0px;
}

.copy-icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
  margin-top: 2px;
  vertical-align: middle;
  opacity: 0.7;
  -webkit-tap-highlight-color: transparent;
}

.copy-icon:active {
  opacity: 0.4;
}

.tg-button-link {
  display: inline-block;
  margin-bottom: 8px;
  -webkit-tap-highlight-color: transparent;
}

.tg-button-link:active {
  opacity: 0.7;
}

.tg-button-img {
  width: 128px;
  height: 32px;
  display: block;
  object-fit: contain;
}
</style>
