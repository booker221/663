<template>
  <section class="section" id="activity">
    <div class="section-header">
      <h2 class="section-title">
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" />
        活动专栏
        <img class="title-dot" src="@/assets/images/webp/icon-title-dot.webp" alt="" />
      </h2>
    </div>

    <div class="activity-card">
      <!-- 内容区（背景图通过 :style 设置）-->
      <div class="card-content" :style="{ backgroundImage: `url(${actBg})` }">
        <div class="content-left">
          <h3 class="reward-title">合作奖励</h3>

          <div class="act-block">
            <p class="act-label">【活动一】每月发量：</p>
            <p class="act-line">提供&gt; <span class="red">500</span>万量的机房，奖励：<span class="red">1888$</span></p>
            <p class="act-line">提供&gt; <span class="red">1000</span>万量的机房，奖励：<span class="red">2888$</span></p>
            <p class="act-line">提供&gt; <span class="red">1500</span>万量的机房，奖励：<span class="red">5888$</span></p>
            <p class="act-line">提供&gt; <span class="red">3000</span>万量的机房，奖励：<span class="red">8888$</span></p>
          </div>

          <div class="act-block">
            <p class="act-label">【活动二】优质机房搭建深度合作</p>
            <p class="act-line ">第一名奖励：<span class="red">3888$</span></p>
            <p class="act-line ">第二名奖励：<span class="red">2888$</span></p>
            <p class="act-line red">第三名奖励：1888$</p>
          </div>

          <div class="act-block">
            <p class="act-label">【活动三】引荐资源红包</p>
            <p class="act-line">1，合作伙伴推荐靠谱机房</p>
            <p class="act-line">2，机房头像、名称改为：<span class="highlight">【合兴】XXX</span></p>
            <p class="act-line">3，频道发布信息成功引荐真实机房</p>
          </div>

          <div class="act-block">
            <p class="act-label">【活动四】资源扶持计划</p>
            <p class="act-line">给予任何想要与合兴一起攀登顶峰的伙伴帮助及支持，符合以下规则</p>
            <p class="act-line">1，符合以上条件均可联系合兴工作人员申领，经审核通过直接发放</p>
            <p class="act-line">2，每一位机房通道，仅能享受一次奖励若有违规者，将不享受此优惠</p>
            <p class="act-line">3，任何违反活动规则可能被取消资格，连带引荐人的相关利益</p>
            <p class="act-line">4，本公司保留随时以任何理由结束或修改任何活动的权利，恕不另行通知</p>
          </div>

          <p class="act-footer">其他投流方式的合作伙伴均会出台相对应的活动及奖励，欢迎业界顶尖合作伙伴前来合作。</p>
          <p class="act-contact"><span class="contact-label">商务合作：</span><span class="contact-handle">{{ BUSINESS_CONTACT.handle }}</span>
          </p>
        </div>

        <!-- 右侧人物图 -->
        <div class="content-right">
          <img class="person-img" src="@/assets/images/webp/activity-person-pc.webp" alt="活动商务" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import actBg from '@/assets/images/webp/activity-content-bg-pc.webp'
import { BUSINESS_CONTACT } from '@/config/contacts.js'
</script>

<style scoped>
.section {
   
}

.section-header {
  text-align: center;
 margin-bottom: 40px;
  margin-top: 60px;
}

.section-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
  margin: 0;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-dot {
  width: 12px;
  height: 12px;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  vertical-align: middle;
  margin: 0 8px;
}

/* 活动卡片 */
.activity-card {
  border-radius: 16px;
  overflow: hidden;
}

.card-content {
  display: flex;
  align-items: flex-start;
  padding: 40px;
  gap: 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 16px;
}

.content-left {
  flex: 1;
  /* padding: 40px; */
}

.content-right {
  width: 400px;
  height: 400px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  align-self: stretch;
  margin-top: 120px;
}

.person-img {
  width: 400px;
  height: 400px;
  object-fit: contain;
  object-position: bottom;
}

/* 内容文字 */
.reward-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 14px;
}

.act-block {
  margin-bottom: 12px;
}

.act-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 4px;
}

.act-line {
  font-size: 12px;
  color: var(--text);
  line-height: 1.8;
  margin: 0;
}
.red {
  color: #FF5E5E;
  font-weight: 600;
}

.highlight {
  color: var(--primary);
  font-weight: 700;
}

.act-footer {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 12px 0 10px;
}

.act-contact {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
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
}
</style>
