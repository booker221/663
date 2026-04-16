/**
 * 合兴落地页 - API 请求封装
 * ✅ 多站点支持：通过 VITE_SITE_ID 指定当前站点
 */

const API_BASE = (import.meta.env.VITE_API_BASE || '').trim()

/**
 * 统一拼接 API 地址，避免出现 /api/api 的重复前缀。
 * 支持以下写法：
 * - VITE_API_BASE=/api
 * - VITE_API_BASE=/
 * - VITE_API_BASE=http://host:port
 * - VITE_API_BASE=http://host:port/api
 */
function buildApiUrl(pathname) {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  const hasApiPrefix = /^\/api(\/|$)/.test(cleanPath)
  const normalizedBase = API_BASE.replace(/\/+$/, '')

  // 没配环境变量时，默认走当前域名下 /api
  if (!normalizedBase) return hasApiPrefix ? cleanPath : `/api${cleanPath}`

  // 若 base 已经是 /api，则不再重复加 /api
  if (/\/api$/i.test(normalizedBase)) {
    return hasApiPrefix ? `${normalizedBase}${cleanPath.replace(/^\/api/, '')}` : `${normalizedBase}${cleanPath}`
  }

  return hasApiPrefix ? `${normalizedBase}${cleanPath}` : `${normalizedBase}/api${cleanPath}`
}

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
 * @returns {Promise<{ config: Object, site: { id: string, name: string } | null } | null>}
 */
export async function fetchSiteConfig() {
  let url = ''
  let siteId = getUrlSiteId() || getDefaultSiteId()
  const domain = window.location.hostname

  if (siteId) {
    // 1. 如果 URL 或环境变量中指定了站点，优先按 site 读取（跨服务器部署更稳定）
    url = `${buildApiUrl('/config')}?site=${encodeURIComponent(siteId)}`
  } else {
    // 2. 尝试按照当前访问的域名去后端匹配对应站点
    url = `${buildApiUrl('/config/by-domain')}?domain=${encodeURIComponent(domain)}`
  }

  try {
    let res = await fetch(url, { headers: { 'Accept': 'application/json' } })
    let data = await res.json()

    // 3. 如果按域名匹配失败（例如开发环境 localhost），降级回退到系统内第一条数据
    if (!siteId && !data.success) {
      console.log(`[API] 域名 [${domain}] 未匹配到站点，尝试降级为系统的第一条数据...`)
      url = buildApiUrl('/config')
      res = await fetch(url, { headers: { 'Accept': 'application/json' } })
      data = await res.json()
    }

    if (data.success) {
      console.log(`[API] 站点 [${data.site.id}] (${data.site.name}) 配置加载成功`)
      return { config: data.data, site: data.site || null }
    }
    throw new Error(data.error || '获取配置失败')
  } catch (err) {
    console.warn(`[API] 配置获取失败，将使用本地硬编码默认值:`, err.message)
    return null
  }
}

export { getUrlSiteId as getSiteId }
