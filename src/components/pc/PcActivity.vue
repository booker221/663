<template>
  <section class="section" id="activity">
    <div class="section-header">
      <h2 class="section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" loading="lazy" width="28"
          height="28" />
        活动专栏
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" loading="lazy" />
      </h2>
    </div>

    <div class="activity-card">
      <!-- 内容区（背景图通过 :style 设置）-->
      <div class="card-content" :style="{ backgroundImage: `url(${actBg})` }">
        <!-- 绝对定位的装饰图 -->
        <img class="reward-title-img absolute-top-left" src="@/assets/images/icon/reward-label.webp" alt="合作奖励" />
        <img class="coin-icon absolute-bottom-left" src="@/assets/images/icon/coin-left.webp" alt="coin" />

        <div class="content-left">

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
          <a :href="TG_OFFICIAL_CHANNEL.url" target="_blank" rel="noopener noreferrer" class="tg-button-link">
            <img class="tg-button-img" src="@/assets/images/webp/tg-button.webp" alt="TG官方频道" width="192" height="48" />
          </a>
          <p class="act-contact">
            <span class="contact-label">商务合作：</span>
            <span class="contact-handle" @click="copyToClipboard(BUSINESS_CONTACT.handle)" title="点击复制">
              {{ BUSINESS_CONTACT.handle }}
            </span>
            <img class="copy-icon" src="@/assets/images/webp/icon-copy.webp" alt="复制"
              @click="copyToClipboard(BUSINESS_CONTACT.handle)" width="20" height="20" />
          </p>
          <p class="act-contact" style="margin-bottom: 20px;">
            <span class="contact-label">TG招商群：</span>
            <span class="contact-handle" @click="copyToClipboard(TG_RECRUIT_GROUP.url)" title="点击复制">
              {{ TG_RECRUIT_GROUP.url }}
            </span>
            <img class="copy-icon" src="@/assets/images/webp/icon-copy.webp" alt="复制"
              @click="copyToClipboard(TG_RECRUIT_GROUP.url)" width="20" height="20" />
          </p>
        </div>

        <!-- 右侧人物图 -->
        <div class="content-right">
          <img class="person-img" src="@/assets/images/webp/activity-person-new-pc.png" alt="活动商务负责人" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import actBg from '@/assets/images/webp/activity-content-bg-pc.webp'
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
      <p class="act-line">新、老合作方每月完成首次真实跑量（量+成本）</p>
      <p class="act-line">三网实卡/虚卡/IM首单奖励:</p>
      <div class="act-flex"><span class="label">5W:</span> <span class="amount">188$</span></div>
      <div class="act-flex"><span class="label">10W:</span> <span class="amount">288$</span></div>
      <div class="act-flex"><span class="label">20W:</span> <span class="amount">388$</span></div>
      <div class="act-flex"><span class="label">50W:</span> <span class="amount">688$</span></div>
      <div class="act-flex"><span class="label">100W:</span> <span class="amount">1888$</span></div>
      <p class="act-line mt-2">达标奖励:</p>
      <p class="act-line">满足条件，奖金翻倍！！</p>
    `
  },
  {
    title: '拉新奖励',
    content: `
      <p class="act-line">成功引入有效合作渠道并完成对接</p>
      <div class="act-flex mt-2"><span class="label lg">首个有效渠道奖励:</span> <span class="amount">188$</span></div>
      <p class="act-line mt-2">连续拉新奖励:</p>
      <div class="act-flex"><span class="label">3个渠道:</span> <span class="value">额外 <span class="amount">588$</span></span></div>
      <div class="act-flex"><span class="label">5个渠道:</span> <span class="value">额外 <span class="amount">688$</span></span></div>
      <div class="act-flex"><span class="label">10个渠道:</span> <span class="value">额外 <span class="amount">1888$</span></span></div>
      <p class="act-line mt-2">高质量实卡渠道:</p>
      <p class="act-line">额外加奖 <span class="amount">888$-1888$</span></p>
    `
  },
  {
    title: '冲刺奖励',
    content: `
      <p class="act-line">短周期爆发（3天/7天）</p>
      <p class="act-line red mt-2 flex-center-y"><img src="${titleDotIcon}" class="inline-dot" alt="" /> 3天冲刺</p>
      <div class="act-flex"><span class="label">100W:</span> <span class="amount">1888$</span></div>
      <div class="act-flex"><span class="label">300W:</span> <span class="amount">3888$</span></div>
      <div class="act-flex"><span class="label">超额冲刺:</span> <span class="amount">888$</span></div>
      <p class="act-line red mt-2 flex-center-y"><img src="${titleDotIcon}" class="inline-dot" alt="" /> 7天冲刺:</p>
      <div class="act-flex"><span class="label">800W:</span> <span class="amount">1888$</span></div>
      <div class="act-flex"><span class="label">1000W:</span> <span class="amount">18888$</span></div>
      <p class="act-line red mt-2 flex-center-y"><img src="${titleDotIcon}" class="inline-dot" alt="" /> 106渠道高质量冲刺:</p>
      <div class="act-flex"><span class="label lg">3天300W:</span> <span class="amount">888$</span></div>
      <div class="act-flex"><span class="label lg">7天800W:</span> <span class="amount">1888$</span></div>
      <p class="act-line mt-2">计算方式:</p>
      <p class="act-line">实卡/虚卡/106/IM/通道</p>
      <p class="act-line">量+成本+稳定性</p>
    `
  },
  {
    title: '流水提成奖励',
    content: `
      <p class="act-line">按打款流水阶梯提成</p>
      <div class="act-flex mt-2"><span class="label">10万:</span> <span class="amount">1888$</span></div>
      <div class="act-flex"><span class="label">30万:</span> <span class="amount">3888$</span></div>
      <div class="act-flex"><span class="label">50万:</span> <span class="amount">6888$</span></div>
      <div class="act-flex"><span class="label">100万:</span> <span class="amount">18888$</span></div>
      <div class="act-flex"><span class="label">200万+:</span> <span class="red-text">额外返点+高额奖金！</span></div>
      <p class="act-line mt-2">附加奖励:</p>
      <div class="act-flex"><span class="label">稳定流水:</span> <span class="red-text">+10%奖励</span></div>
    `
  },
  {
    title: '排行榜奖励',
    content: `
      <p class="act-line">拉新/流水/投量排名</p>
      <div class="act-flex mt-2"><span class="label rank-label">第1名:</span> <span class="amount rank-amount">3888$</span></div>
      <div class="act-flex"><span class="label rank-label">第2名:</span> <span class="amount rank-amount">2888$</span></div>
      <div class="act-flex"><span class="label rank-label">第3名:</span> <span class="amount rank-amount">1888$</span></div>
      <div class="act-flex"><span class="label rank-label">第4-10名:</span> <span class="amount rank-amount">588$-888$</span></div>
      <div class="act-flex"><span class="label rank-label">额外奖励:</span> <span class="red-text rank-amount rank-amount2">全球空降嫩模3天</span></div>
      <div class="act-flex"><span class="label rank-label">连续上榜:</span> <span class="amount rank-amount">18888$</span></div>
      <div class="act-flex"><span class="label rank-label">黑马奖:</span> <span class="amount rank-amount">6888$</span></div>
    `
  },
  {
    title: '优质通道每月奖励',
    content: `
      <p class="act-line">提供稳定高质量通道资源</p>
      <div class="act-flex mt-2"><span class="label lg">稳定奖励:</span> <span class="amount">888$</span></div>
      <div class="act-flex"><span class="label lg">高质量稳定通道:</span> <span class="amount">8888$</span></div>
      <p class="act-line red mt-2">长期收益·分红机制·持续提成（躺赚）</p>
      <div class="act-flex"><span class="label lg red-text">第4-10名:</span> <span class="amount">588$-888$</span></div>
      <p class="act-line mt-2">附加奖励:</p>
      <div class="act-flex"><span class="label lg">独家资源:</span> <span class="amount">1288$</span></div>
      <div class="act-flex"><span class="label lg">稀缺通道:</span> <span class="red-text">专项高额奖励！</span></div>
    `
  }
])
</script>

<style scoped>
.section {}

.section-header {
  text-align: center;
  margin-bottom: 40px;
  margin-top: 60px;
}



/* 活动卡片 */
.activity-card {
  border-radius: 16px;
  overflow: hidden;
}

.card-content {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 80px 40px 40px;
  gap: 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 16px;
}

.content-left {
  flex: 1;
  max-width: 660px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  /* padding: 40px; */
}

.content-right {
  width: 400px;
  height: 400px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  align-self: stretch;
}

.person-img {
  width: 400px;
  height: 400px;
  object-fit: contain;
  object-position: bottom;
}

/* 内容文字 */
.absolute-top-left {
  position: absolute;
  top: -1px;
  left: -1px;
  height: 52px;
  object-fit: contain;
  pointer-events: none;
  z-index: 10;
}

.absolute-bottom-left {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 90px;
  object-fit: contain;
  pointer-events: none;
  z-index: 10;
}

.act-block {
  margin-bottom: 12px;
  letter-spacing: 1.6px;
}

.act-label {
  font-family: "PingFang SC", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #414A65;
  margin: 0;
}

.accordion-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  background: #FFF;
  border-radius: 12px;
  padding: 0 20px;
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
  padding: 20px 0;
  transition: opacity 0.3s;
}

.accordion-header:hover {
  opacity: 0.8;
}

.title-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.num-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.accordion-content {
  padding: 16px;
  background: #FFF0F2;
  border-radius: 8px;
  margin-bottom: 20px;
}

.arrow-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  transition: transform 0.3s;
}

:deep(.act-line) {
  font-family: "PingFang SC", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #414A65;
  line-height: 1.4;
  margin: 0 0 10px 0;
  letter-spacing: 0;
}

:deep(.act-line.red),
:deep(.red-text) {
  font-family: "PingFang SC", sans-serif;
  color: #FF4A4A;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.1em;
}

:deep(.amount) {
  font-family: "PingFang SC", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.1em;
  color: #FF4A4A;
}

:deep(.act-flex) {
  display: flex;
  align-items: baseline;
  font-family: "PingFang SC", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #414A65;
  line-height: 1.4;
  margin-bottom: 10px;
  letter-spacing: 0;
}

:deep(.act-flex .label) {
  min-width: 60px;
  color: #414A65;
  flex-shrink: 0;
}

:deep(.act-flex .label.rank-label) {
  width: 90px;
}

:deep(.rank-amount) {
  width: 130px;
  text-align: right;
}

:deep(.rank-amount2) {
  /* width: 160px; */
  text-align: left;
  font-family: "PingFang SC", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.1em;
  color: #FF4A4A;
}

:deep(.act-flex .label.lg) {
  min-width: 120px;
}

:deep(.act-flex .label.red) {
  color: #FF1F1F;
}

:deep(.mt-2) {
  margin-top: 8px;
}

:deep(.inline-dot) {
  width: 8px;
  height: 8px;
  margin-right: 6px;
  object-fit: contain;
}

:deep(.flex-center-y) {
  display: flex;
  align-items: center;
}

.highlight {
  color: var(--primary);
  font-weight: 700;
}

.act-footer {
  font-family: "PingFang SC";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 8px;
}

.act-contact {
  font-size: 14px;
  font-weight: 700;
  margin-top: 10px;
  display: flex;
}

.contact-label {
  font-family: "PingFang SC", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: #8826FF;
}

.contact-handle {
  font-family: "PingFang SC", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: #4676FF;
  cursor: pointer;
  transition: opacity 0.2s;


}

.contact-handle:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.copy-icon {
  width: 20px;
  height: 20px;
  margin-left: 6px;
  margin-top: 3px;
  cursor: pointer;
  vertical-align: middle;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.copy-icon:hover {
  opacity: 1;
}

.tg-button-link {
  display: inline-block;
  margin-bottom: 10px;
  transition: opacity 0.2s;
}

.tg-button-link:hover {
  opacity: 0.85;
}

.tg-button-img {
  width: 192px;
  height: 48px;
  display: block;
  object-fit: contain;
}
</style>
