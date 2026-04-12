<template>
  <div v-if="!resolvedSrc" class="image-placeholder" :style="placeholderStyle">
    <svg class="placeholder-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" stroke-width="2.5" />
      <path d="M6 32l10-10 8 8 6-6 12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="18" cy="20" r="3" stroke="currentColor" stroke-width="2" />
    </svg>
    <span v-if="label" class="placeholder-label">{{ label }}</span>
  </div>
  <img
    v-else
    :src="resolvedSrc"
    :alt="alt"
    :class="imgClass"
    :style="imgStyle"
    loading="lazy"
    @error="handleError"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  // 后台配置的远程图片 URL
  remoteSrc: { type: String, default: '' },
  // 本地打包的默认图片（import 的资源）
  fallbackSrc: { type: String, default: '' },
  alt: { type: String, default: '' },
  label: { type: String, default: '' },
  imgClass: { type: String, default: '' },
  imgStyle: { type: [String, Object], default: '' },
  // 占位图样式
  aspectRatio: { type: String, default: '' },
  height: { type: String, default: '' },
  borderRadius: { type: String, default: '12px' },
})

const loadFailed = ref(false)

// 监听 remoteSrc 变化时重置错误状态
watch(() => props.remoteSrc, () => { loadFailed.value = false })

const resolvedSrc = computed(() => {
  if (props.remoteSrc && !loadFailed.value) return props.remoteSrc
  if (props.fallbackSrc) return props.fallbackSrc
  return ''
})

const placeholderStyle = computed(() => ({
  aspectRatio: props.aspectRatio || undefined,
  height: props.height || (props.aspectRatio ? undefined : '120px'),
  borderRadius: props.borderRadius,
}))

const handleError = () => {
  loadFailed.value = true
}
</script>

<style scoped>
.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8ecf4 100%);
  border: 2px dashed #c5d0e6;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.placeholder-icon {
  width: 48px;
  height: 48px;
  color: #a0b4d0;
  opacity: 0.6;
}

.placeholder-label {
  font-size: 12px;
  color: #8898b5;
  font-weight: 500;
  font-family: "PingFang SC", sans-serif;
}
</style>
