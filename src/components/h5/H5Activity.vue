<template>
  <section class="section">
    <div class="section-header">
      <h2 class="section-title"><span class="dot">◆</span> 活动专栏</h2>
    </div>

    <div class="activity-card">
      <!-- 背景图 -->
      <img class="card-bg" src="@/assets/images/webp/activity-bg-h5.webp" alt="" />

      <!-- 内容 -->
      <div class="card-content">
        <h3 class="reward-title">合作奖励</h3>

        <div class="act-block">
          <p class="act-label">【活动一】<span class="label-desc">每月发量：</span></p>
          <p class="act-line">提供&gt; <span class="red">500万</span>量的机房，奖励：<span class="red">1888$</span></p>
          <p class="act-line">提供&gt; <span class="red">1000万</span>量的机房，奖励：<span class="red">2888$</span></p>
          <p class="act-line">提供&gt; <span class="red">1500万</span>量的机房，奖励：<span class="red">5888$</span></p>
          <p class="act-line">提供&gt; <span class="red">3000万</span>量的机房，奖励：<span class="red">8888$</span></p>
        </div>

        <div class="act-block">
          <p class="act-label"><span class="label-desc">【活动二】优质机房搭建深度合作</span></p>
          <p class="act-line">第一名奖励：<span class="red">3888$</span></p>
          <p class="act-line">第二名奖励：<span class="red">2888$</span></p>
          <p class="act-line">第三名奖励：<span class="red">1888$</span></p>
        </div>

        <div class="act-block">
          <p class="act-label"><span class="label-desc">【活动三】引荐资源红包</span></p>
          <p class="act-line">1，合作伙伴推荐靠谱机房</p>
          <p class="act-line">2，机房头像、名称改为：<span class="highlight red">【合兴】XXX</span></p>
          <p class="act-line">3，频道发布信息成功引荐真实机房</p>
        </div>

        <div class="act-block">
          <p class="act-label"><span class="label-desc">【活动四】资源扶持计划</span></p>
          <p class="act-line">给予任何想要与合兴一起攀登顶峰的伙伴帮助及支持，符合以下规则</p>
          <p class="act-line">1，符合以上条件均可联系合兴工作人员申领，经审核通过直接发放</p>
          <p class="act-line">2，每一位机房通道，仅能享受一次奖励若有违规者，将不享受此优惠</p>
          <p class="act-line">3，任何违反活动规则可能被取消资格，连带引荐人的相关利益</p>
          <p class="act-line">4，本公司保留随时以任何理由结束或修改任何活动的权利，恕不另行通知</p>
        </div>

        <p class="act-footer">其他投流方式的合作伙伴均会出台相对应的活动及奖励，欢迎业界顶尖合作伙伴前来合作。</p>

        <!-- 底部人物 + 联系方式 -->
        <div class="contact-row">
          <p class="act-contact"><span class="contact-label">商务合作：</span><span class="contact-handle">{{ BUSINESS_CONTACT.handle }}</span>
          </p>
          <img class="person-img" src="@/assets/images/webp/activity-person-h5.webp" alt="活动商务" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BUSINESS_CONTACT } from '@/config/contacts.js'
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
  padding: 30px 24px 24px 24px;
}

/* 内容文字 */
.reward-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 12px;
}

.act-block {
  margin-bottom: 10px;
}

.act-label {
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  margin: 0 0 4px;
}

/* 【活动X】 括号部分 - 红色 */
.bracket {
  color: var(--primary);
  font-weight: 700;
}

/* 活动标签描述文字 - 深色 */
.label-desc {
  color: #414A65;
}

.act-line {
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: #6C7BA8;
  margin: 0;
}

.red {
  color: red;
  color: #FF5E5E;
  font-family: "PingFang SC";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
}

.highlight {
  color: var(--primary);
  font-weight: 700;
}

.act-footer {
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: #6C7BA8;
  margin: 10px 0 0;
}

/* 底部联系 + 人物 */
.contact-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
}

.act-contact {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 14px;
  line-height: 16px;
}

.contact-label {
  font-family: "PingFang SC", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: #8826FF;
}

.contact-handle {
  font-family: "PingFang SC", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  color: #4676FF;
}

.person-img {
  width: 48%;
  max-width: 200px;
  object-fit: contain;
  object-position: bottom;
  flex-shrink: 0;
}
</style>
