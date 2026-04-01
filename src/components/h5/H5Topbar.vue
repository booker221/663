<template>
  <header class="h5-topbar">
    <div class="brand">
      <img class="brand-logo" src="@/assets/images/webp/logo-hx.webp" alt="HX" />
      <img class="brand-text" src="@/assets/images/webp/logo-text-hexing.webp" alt="合兴" />
      <img class="brand-domain" src="@/assets/images/webp/logo-text-663.webp" alt="663.com" />
    </div>
    <div class="topbar-actions">
      <img class="flag-icon" src="@/assets/images/webp/icon-flag-cn.webp" alt="中文" />
      <img class="menu-icon" src="@/assets/images/webp/icon-menu.webp" alt="菜单" />
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.h5-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #fff;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
}

.brand {
  display: flex;
  align-items: center;
  gap: 6px;
}

.brand-logo {
  height: 28px;
  width: auto;
}

.brand-text {
  height: 16px;
  width: auto;
}

.brand-domain {
  height: 13px;
  width: auto;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.flag-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.menu-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
