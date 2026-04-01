import { showToast } from './toast.js'

/**
 * 统一复制函数
 * 强制确保 Telegram 账号带上 @ 符号
 * @param {string} text 需要复制的文本
 */
export function copyToClipboard(text) {
  if (!text) return

  // 确保 handle 带有 @ 符号
  const normalizedText = text.trim().startsWith('@') ? text.trim() : `@${text.trim()}`

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(normalizedText).then(() => {
      showToast(`已复制: ${normalizedText}`, 'success')
    }).catch(err => {
      console.error('复制失败:', err)
      showToast('复制失败，请重试', 'warning')
    })
  } else {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = normalizedText
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      showToast(`已复制: ${normalizedText}`, 'success')
    } catch (err) {
      showToast('复制失败', 'warning')
    }
    document.body.removeChild(textArea)
  }
}
