<template>
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">核心价值观</h2>
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
}

.section-title::before,
.section-title::after {
  content: "•";
  color: var(--primary);
  margin: 0 10px;
}

.values-img {
  width: 100%;
  display: block;
}
</style>
