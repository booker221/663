<template>
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">
        <img class="title-dot" src="@/assets/img/icon-title-dot.png" alt="" />
        核心价值观
        <img class="title-dot" src="@/assets/img/icon-title-dot.png" alt="" />
      </h2>
    </div>
    <img class="values-img" src="@/assets/img/values-pc.png" alt="核心价值观 - 诚信为本 合作共赢 追求卓越" />
  </section>
</template>

<script setup>
</script>

<style scoped>
.section {
  margin-bottom: 24px;
  margin-top: 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 20px;
}

.section-title {
  color: #414A65;
  font-family: "PingFang SC";
  font-size: 44px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
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

.values-img {
  width: 100%;
  display: block;
}
</style>
