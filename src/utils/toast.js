import { reactive } from 'vue'

export const toastState = reactive({
  show: false,
  message: '',
  type: 'info', // 'success' | 'warning' | 'info'
})

let timer = null

/**
 * 显示全局自定义提示
 * @param {string} message 提示文本
 * @param {'success' | 'warning' | 'info'} type 提示类型
 * @param {number} duration 持续时间（毫秒）
 */
export function showToast(message, type = 'info', duration = 2500) {
  toastState.message = message
  toastState.type = type
  toastState.show = true

  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    toastState.show = false
  }, duration)
}
