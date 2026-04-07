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
        <h3 class="reward-title">合作奖励</h3>

        <div class="act-block">
          <p class="act-label">【活动一】<span class="label-desc">每月发量：</span></p>
          <p class="act-line">提供&gt; <span class="red">500万</span>量的机房，奖励：<span class="red">1888$</span></p>
          <p class="act-line">提供&gt; <span class="red">1000万</span>量的机房，奖励：<span class="red">2888$</span></p>
          <p class="act-line">提供&gt; <span class="red">1500万</span>量的机房，奖励：<span class="red">5888$</span></p>
          <p class="act-line">提供&gt; <span class="red">3000万</span>量的机房，奖励：<span class="red">8888$</span></p>
          <p class="act-line">各个渠道的品质制定分类以（量+价格+成本）后计算奖励，联系663客服登记、查询</p>
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
          <p class="act-line">2，深度合作机房，TG签名添加：<span class="highlight red">【合兴】优秀合作伙伴，指定官网：663.com</span></p>
          <p class="act-line">3，频道发布信息成功引荐真实机房</p>
        </div>

        <div class="act-block">
          <p class="act-label"><span class="label-desc">【活动四】资源扶持计划</span></p>
          <p class="act-line"> <span class="label-desc">给予任何想要与合兴一起攀登顶峰的伙伴帮助及支持，符合以下规则</span></p>
          <p class="act-line">1，符合以上条件均可联系合兴工作人员申领，经审核通过直接发放</p>
          <p class="act-line">2，每一位机房通道，仅能享受一次奖励若有违规者，将不享受此优惠</p>
          <p class="act-line">3，任何违反活动规则可能被取消资格，连带引荐人的相关利益</p>
          <p class="act-line">4，本公司保留随时以任何理由结束或修改任何活动的权利，恕不另行通知</p>
        </div>

        <p class="act-footer">其他投流方式的合作伙伴均会出台相对应的活动及奖励，欢迎业界顶尖合作伙伴前来合作。</p>

        <!-- 底部人物 + 联系方式 -->
        <div class="contact-row">
          <div class="contact-info">
            <p class="act-contact">
              <span class="contact-label">商务合作：</span>
              <br>
              <span class="contact-handle" @click="copyToClipboard(BUSINESS_CONTACT.handle)">
                {{ BUSINESS_CONTACT.handle }}
                <img class="copy-icon" src="@/assets/images/webp/icon-copy.webp" alt="复制"
                  @click="copyToClipboard(BUSINESS_CONTACT.handle)" width="16" height="16" />

              </span>
            </p>
            <p class="act-contact">
              <span class="contact-label">TG招商群：</span>
              <br>
              <span class="contact-handle" @click="copyToClipboard(TG_RECRUIT_GROUP.url)">
                {{ TG_RECRUIT_GROUP.url }}
                <img class="copy-icon" src="@/assets/images/webp/icon-copy.webp" alt="复制"
                  @click="copyToClipboard(TG_RECRUIT_GROUP.url)" width="16" height="16" />
              </span>
            </p>
          </div>
          <img class="person-img" src="@/assets/images/webp/activity-person-h5.webp" alt="活动商务专员" loading="lazy"
            width="312" height="312" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BUSINESS_CONTACT, TG_RECRUIT_GROUP } from '@/config/contacts.js'
import { copyToClipboard } from '@/utils/copy.js'
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
  font-family: "PingFang SC";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  /* 133.333% */
  letter-spacing: 1.2px;
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
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 6px;
  position: relative;
  height: 120px;
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
  font-style: Medium;
  font-size: 14px;
  leading-trim: NONE;
  line-height: 20px;
  letter-spacing: 0%;

  color: #8826FF;
}

.contact-handle {
  font-family: PingFang SC;
  font-weight: 500;
  font-style: Medium;
  font-size: 14px;
  leading-trim: NONE;
  line-height: 20px;
  letter-spacing: 0%;
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
  right: -15px;
  bottom: -15px;
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
</style>
