/**
 * 合兴落地页 - API 请求封装
 * ✅ 多站点支持：通过 VITE_SITE_ID 指定当前站点
 */

const API_BASE = import.meta.env.VITE_API_BASE || ''

// 当前站点ID（通过环境变量或 URL 参数配置）
function getSiteId() {
  // 优先级：URL参数 > 环境变量 > 默认值
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('site') || import.meta.env.VITE_SITE_ID || 'hxldy'
}

/**
 * 获取指定站点的配置
 * @returns {Promise<Object>} 配置键值对
 */
export async function fetchSiteConfig() {
  const siteId = getSiteId()
  try {
    const res = await fetch(`${API_BASE}/api/config?site=${siteId}`, {
      headers: { 'Accept': 'application/json' }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data.success) {
      console.log(`[API] 站点 [${siteId}] 配置加载成功`)
      return data.data
    }
    throw new Error(data.error || '获取配置失败')
  } catch (err) {
    console.warn(`[API] 站点 [${siteId}] 配置获取失败，使用默认值:`, err.message)
    return null
  }
}

export { getSiteId }
