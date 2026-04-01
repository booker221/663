<template>
  <div id="app-root">
    <router-view />
    <Toast />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getDeviceType } from './utils/device.js'
import Toast from './components/common/Toast.vue'

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
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
