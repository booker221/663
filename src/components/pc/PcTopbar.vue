<template>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <img class="brand-logo" :src="images.logo_main" alt="Logo" width="96" height="96" />
        <img class="brand-text" :src="images.logo_text" alt="Brand" height="56" />
        <img class="brand-domain" :src="images.logo_domain" alt="Domain" height="36" />
      </div>
      <div class="topbar-actions">
        <div class="search-pill">
          <input type="text" v-model="searchHandle" class="search-input" :placeholder="SEARCH_CONFIG.placeholder"
            @input="onInput" @keyup.enter="handleSearch" />
          <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" @click="handleSearch">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <img class="flag-icon" src="@/assets/images/webp/icon-flag-cn.webp" alt="中文" width="64" height="64" />
        <div class="menu-icon-wrap" ref="menuWrapRef">
          <img class="menu-icon" src="@/assets/images/webp/icon-menu.webp" alt="菜单" width="64" height="64" @click="toggleMenu" />
          <div v-if="isMenuOpen" class="menu-drawer">
            <button v-for="item in menuItems" :key="item.key" type="button" class="menu-item" @click="handleMenuClick(item)">
              {{ item.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { images } from '@/stores/siteConfig.js'
import { SEARCH_CONFIG, TG_OFFICIAL_CHANNEL, CUSTOMER_SERVICE, COMPLAINT_CONTACT } from '@/config/contacts.js'
import { verifyOfficialHandle } from '@/utils/verify.js'
import { showToast } from '@/utils/toast.js'

const searchHandle = ref(SEARCH_CONFIG.defaultValue || '')
const isMenuOpen = ref(false)
const menuWrapRef = ref(null)

const menuItems = [
  { key: 'promote-business', label: '推广招商部', targetId: 'business' },
  { key: 'payment-business', label: '支付通道招商部', targetId: 'business' },
  { key: 'guarantee', label: '担保验证', targetId: 'guarantee' },
  { key: 'activity', label: '活动专栏', targetId: 'activity' },
  { key: 'tg-channel', label: 'TG官方频道', externalUrl: TG_OFFICIAL_CHANNEL.url },
  { key: 'customer', label: '福利客服', externalUrl: CUSTOMER_SERVICE.url },
  { key: 'complaint', label: '投诉建议', externalUrl: COMPLAINT_CONTACT.url },
]

// API 数据加载后自动更新搜索框默认值
watchEffect(() => {
  if (SEARCH_CONFIG.defaultValue) {
    searchHandle.value = SEARCH_CONFIG.defaultValue
  }
})

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

const HEADER_OFFSET = 76

const scrollToSection = (targetId) => {
  const target = document.getElementById(targetId)
  if (!target) return
  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
}

const openExternal = (url) => {
  const href = (url || '').trim()
  if (!href) {
    showToast('链接暂未配置', 'warning')
    return
  }
  window.open(href, '_blank', 'noopener,noreferrer')
}

const handleMenuClick = (item) => {
  isMenuOpen.value = false
  if (item.targetId) {
    scrollToSection(item.targetId)
    return
  }
  openExternal(item.externalUrl)
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleClickOutside = (event) => {
  if (!isMenuOpen.value) return
  if (!menuWrapRef.value?.contains(event.target)) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
  color: #a0a8b4;
  cursor: pointer;
  width: 200px;
  transition: all 0.2s;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #2c3e50;
  width: 100%;
}

.search-input::placeholder {
  color: #a0a8b4;
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

.menu-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-drawer {
  position: absolute;
  top: calc(100% + 14px);
  right: 0;
  width: 128px;
  padding: 8px 0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 14px 32px rgba(44, 62, 80, 0.18);
  border: 1px solid #EEF3FF;
  z-index: 120;
}

.menu-item {
  width: 100%;
  padding: 10px;
  border: none;
  background: transparent;
  text-align: left;
  font-family: "PingFang SC", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0;
  color: #414A65;
  cursor: pointer;
}

.menu-item:hover {
  background: #F4F8FF;
}
</style>
