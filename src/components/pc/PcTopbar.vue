<template>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <img class="brand-logo" src="@/assets/images/webp/logo-hx.webp" alt="HX" width="96" height="96" />
        <img class="brand-text" src="@/assets/images/webp/logo-text-hexing.webp" alt="合兴" width="141" height="56" />
        <img class="brand-domain" src="@/assets/images/webp/logo-text-663.webp" alt="663.com" width="209" height="36" />
      </div>
      <div class="topbar-actions">
        <div class="search-pill">
          <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span>合兴搜索</span>
        </div>
        <img class="flag-icon" src="@/assets/images/webp/icon-flag-cn.webp" alt="中文" width="64" height="64" />
        <img class="menu-icon" src="@/assets/images/webp/icon-menu.webp" alt="菜单" width="64" height="64" />
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.topbar {
  background: #fff;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
}

.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
  padding: 12px 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-logo {
  height: 32px;
  width: auto;
}

.brand-text {
  height: 18px;
  width: auto;
}

.brand-domain {
  height: 14px;
  width: auto;
  margin-left: 2px;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 999px;
  background: #f5f7fa;
  border: 1px solid #e8ecf2;
  font-size: 13px;
  color: #a0a8b4;
  cursor: pointer;
  transition: all 0.2s;
}

.search-pill:hover {
  border-color: #c8cdd5;
  background: #eef1f6;
}

.search-icon {
  color: #a0a8b4;
  flex-shrink: 0;
}

.flag-icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;
}

.flag-icon:hover {
  transform: scale(1.08);
}

.menu-icon {
  width: 26px;
  height: 26px;
  cursor: pointer;
  transition: transform 0.2s;
}

.menu-icon:hover {
  transform: scale(1.08);
}
</style>
