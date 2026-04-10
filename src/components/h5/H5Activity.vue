<template>
  <section class="section">
    <div class="section-header">
      <h2 class="section-title"><span class="dot">◆</span> 活动专栏</h2>
    </div>

    <div class="activity-card">
      <!-- 背景图 -->
      <img class="card-bg" src="@/assets/images/webp/activity-bg-h5.webp" alt="" loading="lazy" width="734"
        height="1444" />

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
            <div class="accordion-content" v-show="activeIndex === index" v-html="item.content"></div>
          </div>
        </div>

        <!-- 底部人物 + 联系方式 -->
        <div class="contact-row">
          <div class="contact-info">
            <a :href="TG_OFFICIAL_CHANNEL.url" target="_blank" rel="noopener noreferrer" class="tg-button-link">
              <img class="tg-button-img" src="@/assets/images/webp/tg-button.webp" alt="TG官方频道" width="128" height="32" />
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
          <img class="person-img" src="@/assets/images/webp/activity-person-h5-new.webp" alt="活动商务专员" loading="lazy"
            width="312" height="312" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { BUSINESS_CONTACT, TG_RECRUIT_GROUP, TG_OFFICIAL_CHANNEL } from '@/config/contacts.js'
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

const activeIndex = ref(-1)
const toggleActivity = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index
}

const activities = ref([
  {
    title: '首单奖励',
    content: `
      <p class="act-line bold">新、老合作方每月完成首次真实跑量（量+成本）</p>
      <p class="act-line bold">三网实卡/虚卡/IM首单奖励:</p>
      <div class="act-flex-between"><span class="label">5W:</span> <span class="amount">188$</span></div>
      <div class="act-flex-between"><span class="label">10W:</span> <span class="amount">288$</span></div>
      <div class="act-flex-between"><span class="label">20W:</span> <span class="amount">388$</span></div>
      <div class="act-flex-between"><span class="label">50W:</span> <span class="amount">688$</span></div>
      <div class="act-flex-between"><span class="label">100W:</span> <span class="amount">1888$</span></div>
      <p class="act-line red mt-2">达标奖励:</p>
      <p class="act-line red">满足条件，奖金翻倍！！</p>
    `
  },
  {
    title: '拉新奖励',
    content: `
      <p class="act-line bold">成功引入有效合作渠道并完成对接</p>
      <div class="act-flex-between mt-2"><span class="label">首个有效渠道奖励:</span> <span class="amount">188$</span></div>
      <p class="act-line bold mt-2">连续拉新奖励:</p>
      <div class="act-flex-three"><span class="col-left">3个渠道:</span><span class="col-mid">额外</span><span class="amount">588$</span></div>
      <div class="act-flex-three"><span class="col-left">5个渠道:</span><span class="col-mid">额外</span><span class="amount">688$</span></div>
      <div class="act-flex-three"><span class="col-left">10个渠道:</span><span class="col-mid">额外</span><span class="amount">1888$</span></div>
      <p class="act-line bold mt-2">高质量实卡渠道:</p>
      <p class="act-line">额外加奖 <span class="amount">888$-1888$</span></p>
    `
  },
  {
    title: '冲刺奖励',
    content: `
      <p class="act-line bold">短周期爆发（3天/7天）</p>
      <p class="act-line red mt-2 flex-center-y"><img src="${titleDotIcon}" class="inline-dot" alt="" /> 3天冲刺</p>
      <div class="act-flex-between"><span class="label">100W:</span> <span class="amount">1888$</span></div>
      <div class="act-flex-between"><span class="label">300W:</span> <span class="amount">3888$</span></div>
      <div class="act-flex-between"><span class="label">超额冲刺:</span> <span class="amount">888$</span></div>
      <p class="act-line red mt-2 flex-center-y"><img src="${titleDotIcon}" class="inline-dot" alt="" /> 7天冲刺:</p>
      <div class="act-flex-between"><span class="label">800W:</span> <span class="amount">1888$</span></div>
      <div class="act-flex-between"><span class="label">1000W:</span> <span class="amount">18888$</span></div>
      <p class="act-line red mt-2 flex-center-y"><img src="${titleDotIcon}" class="inline-dot" alt="" /> 106渠道高质量冲刺:</p>
      <div class="act-flex-between"><span class="label">3天300W:</span> <span class="amount">888$</span></div>
      <div class="act-flex-between"><span class="label">7天800W:</span> <span class="amount">1888$</span></div>
      <p class="act-line mt-2">计算方式:</p>
      <p class="act-line">实卡/虚卡/106/IM/通道</p>
      <p class="act-line">量+成本+稳定性</p>
    `
  },
  {
    title: '流水提成奖励',
    content: `
      <p class="act-line bold">按打款流水阶梯提成</p>
      <div class="act-flex-between mt-2"><span class="label">10万:</span> <span class="amount">1888$</span></div>
      <div class="act-flex-between"><span class="label">30万:</span> <span class="amount">3888$</span></div>
      <div class="act-flex-between"><span class="label">50万:</span> <span class="amount">6888$</span></div>
      <div class="act-flex-between"><span class="label">100万:</span> <span class="amount">18888$</span></div>
      <div class="act-flex-between"><span class="label">200万+:</span> <span class="red-text">额外返点+高额奖金！</span></div>
      <p class="act-line mt-2">附加奖励:</p>
      <div class="act-flex"><span class="label">稳定流水:</span> <span class="red-text">+10%奖励</span></div>
    `
  },
  {
    title: '排行榜奖励',
    content: `
      <p class="act-line bold">拉新/流水/投量排名</p>
      <div class="act-flex-between mt-2"><span class="label">第1名:</span> <span class="amount">3888$</span></div>
      <div class="act-flex-between"><span class="label">第2名:</span> <span class="amount">2888$</span></div>
      <div class="act-flex-between"><span class="label">第3名:</span> <span class="amount">1888$</span></div>
      <div class="act-flex-between"><span class="label">第4-10名:</span> <span class="amount">588$-888$</span></div>
      <div class="act-flex-between"><span class="label">额外奖励:</span> <span class="red-text">全球空降嫩模3天</span></div>
      <div class="act-flex-between"><span class="label">连续上榜:</span> <span class="amount">18888$</span></div>
      <div class="act-flex-between"><span class="label">黑马奖:</span> <span class="amount">6888$</span></div>
    `
  },
  {
    title: '优质通道每月奖励',
    content: `
      <p class="act-line bold">提供稳定高质量通道资源</p>
      <div class="act-flex-between mt-2"><span class="label">稳定奖励:</span> <span class="amount">888$</span></div>
      <div class="act-flex-between"><span class="label">高质量稳定通道:</span> <span class="amount">8888$</span></div>
      <p class="act-line red mt-2">长期收益·分红机制·持续提成（躺赚）</p>
      <div class="act-flex-between"><span class="label red-text">第4-10名:</span> <span class="amount">588$-888$</span></div>
      <p class="act-line mt-2">附加奖励:</p>
      <div class="act-flex-between"><span class="label">独家资源:</span> <span class="amount">1288$</span></div>
      <div class="act-flex-between"><span class="label">稀缺通道:</span> <span class="red-text">专项高额奖励！</span></div>
    `
  }
])
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
  padding-bottom: 10px;
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
