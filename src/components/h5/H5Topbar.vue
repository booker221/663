<template>
  <header class="h5-topbar">
    <div class="brand">
      <img class="brand-logo" src="@/assets/images/webp/logo-hx.webp" alt="HX" width="96" height="96" />
      <img class="brand-text" src="@/assets/images/webp/logo-text-hexing.webp" alt="合兴" width="141" height="56" />
      <img class="brand-domain" src="@/assets/images/webp/logo-text-663.webp" alt="663.com" width="209" height="36" />
    </div>

    <div class="search-pill">
      <input
        type="text"
        v-model="searchHandle"
        class="search-input"
        :placeholder="SEARCH_CONFIG.placeholder"
        @input="onInput"
        @keyup.enter="handleSearch"
      />
      <svg
        class="search-icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        @click="handleSearch"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>

    <div class="topbar-actions">
      <img class="flag-icon" src="@/assets/images/webp/icon-flag-cn.webp" alt="中文" width="64" height="64" />
      <div class="menu-icon-wrap">
        <svg class="menu-icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor"/>
          <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
          <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor"/>
        </svg>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { SEARCH_CONFIG } from '@/config/contacts.js'
import { verifyOfficialHandle } from '@/utils/verify.js'
import { showToast } from '@/utils/toast.js'

const searchHandle = ref(SEARCH_CONFIG.defaultValue || '')

const onInput = (e) => {
  searchHandle.value = searchHandle.value.replace(/[^a-zA-Z0-9@]/g, '')
}

const handleSearch = () => {
  if (!searchHandle.value.trim()) return

  const isOfficial = verifyOfficialHandle(searchHandle.value)
  if (isOfficial) {
    showToast(SEARCH_CONFIG.successText, 'success')
  } else {
    showToast(SEARCH_CONFIG.failText, 'warning', 3500)
  }
}
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
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.brand {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.brand-logo {
  height: 24px;
  width: auto;
}

.brand-text {
  height: 14px;
  width: auto;
}

.brand-domain {
  display: none;
}

@media (min-width: 360px) {
  .brand-domain {
    display: block;
    height: 11px;
    width: auto;
  }
  .brand { gap: 6px; }
}

.search-pill {
  flex: none;
  margin-left: auto;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  height: 32px;
  background: #EEF6FF;
  border: 1px solid #D8E7FF;
  border-radius: 99px;
  color: #A3B5D0;
  font-size: 11px;
  padding: 0 10px;
  cursor: pointer;
  width: 130px;
  transition: all 0.2s;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 11px;
  color: #2c3e50;
  width: 100%;
  padding: 0;
}

.search-input::placeholder {
  color: #A3B5D0;
}

.search-pill:active {
  background: #e1efff;
}

.search-icon {
  color: #A3B5D0;
  flex-shrink: 0;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.flag-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.menu-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #414A65;
  cursor: pointer;
}

.menu-icon-svg {
  width: 22px;
  height: 22px;
}
</style>
