import * as contacts from '../config/contacts.js'

/**
 * 验证输入的飞机号是否为官方在编 handles
 * @param {string} query 用户输入的飞机号
 * @returns {boolean} 是否为官方人员
 */
export function verifyOfficialHandle(query) {
  if (!query) return false

  // 1. 递归收集所有 handles
  const allHandles = []

  const collectHandles = (obj) => {
    if (!obj) return
    if (typeof obj === 'string') {
      if (obj.startsWith('@')) allHandles.push(obj)
      return
    }
    if (Array.isArray(obj)) {
      obj.forEach(collectHandles)
      return
    }
    if (typeof obj === 'object') {
      if (obj.handle) allHandles.push(obj.handle)
      Object.values(obj).forEach(val => {
        if (typeof val === 'object' || Array.isArray(val)) {
          collectHandles(val)
        }
      })
    }
  }

  collectHandles(contacts)

  // 2. 格式化并验证
  const normalize = (h) => h.replace(/^@/, '').toLowerCase().trim()
  const normalizedQuery = normalize(query)

  return allHandles.some(h => normalize(h) === normalizedQuery)
}
