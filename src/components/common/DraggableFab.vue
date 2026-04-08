<template>
  <div
    class="draggable-fab"
    :style="{
      top: pos.y + 'px',
      left: pos.x + 'px',
      '--fab-w': props.fabWidth + 'px',
      '--fab-h': props.fabHeight + 'px',
      '--fab-r': (props.fabHeight * 0.56) + 'px',
      '--fab-bg': props.bg,
      '--fab-shadow': props.shadowColor,
    }"
    @mousedown="onDragStart"
    @touchstart.passive="onDragStart"
    @click="onClick"
    role="button"
    aria-label="投诉与建议"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  href: { type: String, default: '#' },
  defaultRight: { type: Number, default: 24 },
  defaultBottom: { type: Number, default: 80 },
  fabWidth: { type: Number, default: 80 },
  fabHeight: { type: Number, default: 77.333 },
  bg: { type: String, default: 'linear-gradient(180deg, #FFB676 0%, #FF4D00 59.67%, #FF9C45 100%)' },
  shadowColor: { type: String, default: 'rgba(255, 77, 0, 0.4)' },
})

// 初始位置（右下角换算为 left/top）
const pos = ref({ x: 0, y: 0 })
const dragging = ref(false)
const hasDragged = ref(false)

// 拖拽状态
let startX = 0, startY = 0
let startPosX = 0, startPosY = 0
// 使用 props 驱动尺寸
const FAB_W = () => props.fabWidth
const FAB_H = () => props.fabHeight

function initPos() {
  pos.value.x = window.innerWidth - FAB_W() - props.defaultRight
  pos.value.y = window.innerHeight - FAB_H() - props.defaultBottom
}

function getClientXY(e) {
  if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY }
  return { x: e.clientX, y: e.clientY }
}

function onDragStart(e) {
  dragging.value = true
  hasDragged.value = false
  const { x, y } = getClientXY(e)
  startX = x
  startY = y
  startPosX = pos.value.x
  startPosY = pos.value.y

  window.addEventListener('mousemove', onDragMove)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchmove', onDragMove, { passive: false })
  window.addEventListener('touchend', onDragEnd)
}

function onDragMove(e) {
  if (!dragging.value) return
  if (e.cancelable) e.preventDefault()

  const { x, y } = getClientXY(e)
  const dx = x - startX
  const dy = y - startY

  // 超过 5px 才算拖动
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasDragged.value = true

  pos.value.x = Math.max(0, Math.min(window.innerWidth - FAB_W(), startPosX + dx))
  pos.value.y = Math.max(0, Math.min(window.innerHeight - FAB_H(), startPosY + dy))
}

function onDragEnd() {
  dragging.value = false
  window.removeEventListener('mousemove', onDragMove)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchmove', onDragMove)
  window.removeEventListener('touchend', onDragEnd)

  // 松手后吸附到左或右边缘
  const mid = window.innerWidth / 2
  if (pos.value.x + FAB_W() / 2 > mid) {
    // 吸右
    pos.value.x = window.innerWidth - FAB_W() - 16
  } else {
    // 吸左
    pos.value.x = 16
  }
}

function onClick() {
  // 只有没拖动时才触发跳转
  if (!hasDragged.value) {
    window.open(props.href, '_blank')
  }
}

// 窗口大小变化时重新计算，防止跑出屏幕
function onResize() {
  pos.value.x = Math.min(pos.value.x, window.innerWidth - FAB_W())
  pos.value.y = Math.min(pos.value.y, window.innerHeight - FAB_H())
}

onMounted(() => {
  initPos()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.draggable-fab {
  position: fixed;
  width: var(--fab-w, 80px);
  height: var(--fab-h, 77.333px);
  border-radius: var(--fab-r, 43.5px);
  background: var(--fab-bg, linear-gradient(180deg, #FFB676 0%, #FF4D00 59.67%, #FF9C45 100%));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  z-index: 999;
  box-shadow: 0 6px 24px var(--fab-shadow, rgba(255, 77, 0, 0.4));
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition: box-shadow 0.2s;
}

.draggable-fab:active {
  cursor: grabbing;
  box-shadow: 0 10px 32px rgba(217, 13, 13, 0.55);
}
</style>
