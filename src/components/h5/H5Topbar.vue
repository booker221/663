<template>
  <header class="h5-topbar">
    <div class="brand">
      <img class="brand-logo" :src="images.logo_main" alt="Logo" width="96" height="96" />
      <img class="brand-text" :src="images.logo_text" alt="Brand" height="56" />
      <img class="brand-domain" :src="images.logo_domain" alt="Domain" height="36" />
    </div>

    <div class="search-pill">
      <input type="text" v-model="searchHandle" class="search-input" :placeholder="SEARCH_CONFIG.placeholder"
        @input="onInput" @keyup.enter="handleSearch" />
      <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2.5" @click="handleSearch">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>

    <div class="topbar-actions">
      <img class="flag-icon" src="@/assets/images/webp/icon-flag-cn.webp" alt="中文" width="64" height="64" />
      <div class="menu-icon-wrap" ref="menuWrapRef">
        <svg class="menu-icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg" @click="toggleMenu">
          <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
          <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
          <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
        </svg>
        <div v-if="isMenuOpen" class="menu-drawer">
          <div
            v-for="item in menuItems"
            :key="item.key"
            class="menu-item"
            role="button"
            tabindex="0"
            @click="handleMenuClick(item)"
            @keydown.enter.prevent="handleMenuClick(item)"
            @keydown.space.prevent="handleMenuClick(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { images } from '@/stores/siteConfig.js'
import { SEARCH_CONFIG, TG_OFFICIAL_CHANNEL, CUSTOMER_SERVICE, COMPLAINT_CONTACT } from '@/config/contacts.js'
import { verifyOfficialHandle } from '@/utils/verify.js'
import { showToast } from '@/utils/toast.js'

const searchHandle = ref(SEARCH_CONFIG.defaultValue || '')
const isMenuOpen = ref(false)
const menuWrapRef = ref(null)

const menuItems = computed(() => [
  { key: 'promote-business', label: '推广招商部', targetId: 'business' },
  { key: 'payment-business', label: '支付通道招商部', targetId: 'business' },
  { key: 'guarantee', label: '担保验证', targetId: 'guarantee' },
  { key: 'activity', label: '活动专栏', targetId: 'activity' },
  { key: 'tg-channel', label: 'TG官方频道', externalUrl: TG_OFFICIAL_CHANNEL.url },
  { key: 'customer', label: '福利客服', externalUrl: CUSTOMER_SERVICE.url },
  { key: 'complaint', label: '投诉建议', externalUrl: COMPLAINT_CONTACT.url },
])

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

const HEADER_OFFSET = 64

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
.h5-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: linear-gradient(180deg, rgba(7, 7, 7, 0.98) 0%, rgba(21, 18, 10, 0.96) 100%);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 216, 106, 0.18);
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

  .brand {
    gap: 6px;
  }
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
  background: linear-gradient(180deg, rgba(30, 27, 18, 0.98) 0%, rgba(19, 17, 11, 0.98) 100%);
  border: 1px solid rgba(255, 214, 101, 0.18);
  border-radius: 99px;
  color: #d1b76a;
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
  color: #e6d39a;
  width: 100%;
  padding: 0;
}

.search-input::placeholder {
  color: #8f7e47;
}

.search-pill:active {
  background: rgba(255, 220, 105, 0.08);
}

.search-icon {
  color: #cfaf54;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cfaf54;
  cursor: pointer;
}

.menu-icon-svg {
  width: 22px;
  height: 22px;
}

.menu-drawer {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 128px;
  padding: 6px 0;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(14, 12, 8, 0.98) 0%, rgba(24, 20, 12, 0.98) 100%);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.36);
  border: 1px solid rgba(255, 216, 106, 0.26);
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
  color: #d7bd6b;
  cursor: pointer;
  display: block;
}

.menu-item:active {
  background: rgba(255, 216, 106, 0.08);
  color: #ffe28a;
}
</style>
