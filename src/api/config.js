/**
 * 合兴落地页 - API 请求封装
 * ✅ 多站点支持：通过 VITE_SITE_ID 指定当前站点
 */

const API_BASE = import.meta.env.VITE_API_BASE || ''

// 从 URL 参数获取明确指定的站点ID
function getUrlSiteId() {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('site')
}

// 默认站点ID（从环境变量或为空）
function getDefaultSiteId() {
  return import.meta.env.VITE_SITE_ID || ''
}

/**
 * 获取指定站点的配置
 * @returns {Promise<Object>} 配置键值对
 */
export async function fetchSiteConfig() {
  let url = ''
  let siteId = getUrlSiteId()
  const domain = window.location.hostname

  if (siteId) {
    // 1. 如果 URL 中指定了 ?site=xx，强制使用该站点
    url = `${API_BASE}/api/config?site=${siteId}`
  } else {
    // 2. 尝试按照当前访问的域名去后端匹配对应站点
    url = `${API_BASE}/api/config/by-domain?domain=${encodeURIComponent(domain)}`
  }

  try {
    let res = await fetch(url, { headers: { 'Accept': 'application/json' } })
    let data = await res.json()

    // 3. 如果按域名匹配失败（例如开发环境 localhost），降级回退到系统内第一条数据
    if (!siteId && !data.success) {
      console.log(`[API] 域名 [${domain}] 未匹配到站点，尝试降级为系统的第一条数据...`)
      url = `${API_BASE}/api/config`
      res = await fetch(url, { headers: { 'Accept': 'application/json' } })
      data = await res.json()
    }

    if (data.success) {
      console.log(`[API] 站点 [${data.site.id}] (${data.site.name}) 配置加载成功`)
      return data.data
    }
    throw new Error(data.error || '获取配置失败')
  } catch (err) {
    console.warn(`[API] 配置获取失败，将使用本地硬编码默认值:`, err.message)
    return null
  }
}

export { getUrlSiteId as getSiteId }
