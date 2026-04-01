<template>
  <transition name="toast">
    <div v-if="toastState.show" :class="['toast-container', toastState.type]">
      <div class="toast-content">
        <!-- 成功图标 -->
        <svg v-if="toastState.type === 'success'" class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <!-- 警告图标 -->
        <svg v-if="toastState.type === 'warning'" class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <!-- 信息图标 -->
        <svg v-if="toastState.type === 'info'" class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span class="toast-message">{{ toastState.message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { toastState } from '@/utils/toast.js'
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  min-width: 260px;
  max-width: 90vw;
  padding: 14px 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.03),
    0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

/* H5 特殊处理 */
@media (max-width: 768px) {
  .toast-container {
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 64px);
    padding: 16px 20px;
  }
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.toast-message {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  color: #1d1d1f;
  letter-spacing: -0.01em;
}

/* 类型色彩系统 - 精致化 */
.success .toast-icon { color: #10B981; } /* Emerald */
.warning .toast-icon { color: #FF4D4F; } /* Coral Red */
.info .toast-icon    { color: #3498DB; } /* Sapphire */

/* 动画：缩放 + 呼吸感淡入 */
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
.toast-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -10px) scale(0.92);
}

@media (max-width: 768px) {
  .toast-enter-from {
    transform: translate(-50%, -40%) scale(0.9);
  }
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -5px) scale(0.98);
}
</style>
