<template>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getDeviceType } from './utils/device.js'

const router = useRouter()

let lastDevice = getDeviceType()

function handleResize() {
  const currentDevice = getDeviceType()
  if (currentDevice !== lastDevice) {
    lastDevice = currentDevice
    router.replace(`/${currentDevice}`)
  }
}

onMounted(() => {
  // 首次加载时检测设备并跳转
  const device = getDeviceType()
  const currentPath = router.currentRoute.value.path
  if (currentPath !== `/${device}`) {
    router.replace(`/${device}`)
  }

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
