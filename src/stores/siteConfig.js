/**
 * 合兴落地页 - 全局响应式配置 Store
 * 
 * 设计思路：
 *   1. 以当前硬编码值为默认值（保证后端不可用时站点仍正常）
 *   2. 启动时尝试从后端 API 拉取配置并合并
 *   3. 所有导出均使用 reactive/ref，组件可直接响应更新
 */
import { reactive, ref } from 'vue'
import { fetchSiteConfig } from '@/api/config.js'
import logoMain from '@/assets/images/webp/logo-hx.webp'
import logoText from '@/assets/images/webp/logo-text-hexing.webp'
import logoDomain from '@/assets/images/webp/logo-text-663.webp'
const API_BASE = (import.meta.env.VITE_API_BASE || '').trim()

function getApiOrigin() {
  if (!API_BASE) return window.location.origin
  try {
    if (/^https?:\/\//i.test(API_BASE)) return new URL(API_BASE).origin
  } catch {
    // ignore parse error, fallback to current origin
  }
  return window.location.origin
}

const API_ORIGIN = getApiOrigin()

// ========== 站点基本信息 ==========
export const siteInfo = reactive({
  title: '',
  description: '',
  keywords: '',
  author: '',
  aboutTitle: '',
  aboutText: '',
})

/** 与 index.html 占位一致：后端不可用时页面 head 仍为此内容 */
const SEO_FALLBACK = {
  title: '企业官方落地页',
  description: '官方企业展示系统落地页，提供业务对接、商务洽谈等一站式服务。',
  keywords: '落地页,企业系统,商务合作,资源对接',
  author: '企业官方',
  ogSiteName: '企业落地页',
}

export const remoteSiteMeta = ref(null)

function toAbsoluteUrl(href) {
  if (!href || typeof href !== 'string') return ''
  const normalized = resolveAssetUrl(href)
  if (normalized) return normalized
  try {
    return new URL(href, window.location.origin).href
  } catch {
    return href
  }
}

function resolveAssetUrl(href) {
  if (!href || typeof href !== 'string') return ''
  const value = href.trim()
  if (!value) return ''

  // 已经是绝对地址 / data url，直接返回
  if (/^(https?:)?\/\//i.test(value) || /^data:/i.test(value) || /^blob:/i.test(value)) return value

  // 后端上传资源：跨服务器部署时统一走 API 服务地址
  if (value.startsWith('/api/uploads/') || value.startsWith('/uploads/')) {
    try {
      return new URL(value, API_ORIGIN).href
    } catch {
      return value
    }
  }

  // 其他绝对路径保持当前站点域名
  if (value.startsWith('/')) {
    try {
      return new URL(value, window.location.origin).href
    } catch {
      return value
    }
  }

  return value
}

function setMetaName(name, content) {
  if (content == null || content === '') return
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', String(content))
}

function setMetaProperty(property, content) {
  if (content == null || content === '') return
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', String(content))
}

/**
 * 将后台 SEO 字段同步到 document.title、meta、OG/Twitter 与 JSON-LD（SPA 场景下社交爬虫若只抓首屏 HTML 仍可能看不到，需另做 SSR/预渲染）
 */
function applySeoToDocument({ title, description, keywords, author, ogSiteName, shareImageAbs, jsonLd }) {
  document.title = title

  setMetaName('description', description)
  setMetaName('keywords', keywords)
  setMetaName('author', author)

  setMetaProperty('og:site_name', ogSiteName)
  setMetaProperty('og:title', title)
  setMetaProperty('og:description', description)
  if (shareImageAbs) {
    setMetaProperty('og:image', shareImageAbs)
  }

  setMetaName('twitter:title', title)
  setMetaName('twitter:description', description)
  if (shareImageAbs) {
    setMetaName('twitter:image', shareImageAbs)
  }

  let ldEl = document.querySelector('script[type="application/ld+json"]')
  if (!ldEl) {
    ldEl = document.createElement('script')
    ldEl.type = 'application/ld+json'
    document.head.appendChild(ldEl)
  }
  ldEl.textContent = JSON.stringify(jsonLd)
}

// ========== 联系方式 ==========
export const BUSINESS_CONTACT = reactive({
  handle: '',
  url: '',
  avatar: '',
})

export const TG_RECRUIT_GROUP = reactive({
  label: '',
  url: '',
})

export const TG_OFFICIAL_CHANNEL = reactive({
  label: '',
  handle: '',
  url: '',
  avatar: '',
})

export const CUSTOMER_SERVICE = reactive({
  handle: '',
  url: '',
  avatar: '',
})

export const COMPLAINT_CONTACT = reactive({
  name: '',
  handle: '',
  url: '',
  avatar: '',
})

// ========== 商务人员 ==========
export const PROMOTE_PARTNERS = reactive([])

export const THIRD_PARTNERS = reactive([])

// ========== 搜索配置 ==========
export const SEARCH_CONFIG = reactive({
  placeholder: '',
  defaultValue: '',
  successText: '',
  failText: '',
})

// ========== 担保认证 ==========
export const GUARANTEE_ACCOUNTS = reactive([])

// ========== 活动列表 ==========

/**
 * 将结构化活动数据转换为 HTML（供 v-html 渲染）
 * 
 * 支持的 section 类型：
 *   - text:      普通描述文字  { type: 'text', value: '...' }
 *   - highlight: 高亮文字(红色) { type: 'highlight', value: '...' }
 *   - tiers:     奖励阶梯表格  { type: 'tiers', items: [{ label: '5W', amount: '188$' }] }
 */
export function activityToHtml(sections) {
  if (!Array.isArray(sections)) return ''
  return sections.map(s => {
    switch (s.type) {
      case 'text':
        return `<p class="act-line">${esc(s.value)}</p>`
      case 'highlight':
        return `<p class="act-line red mt-2">${esc(s.value)}</p>`
      case 'tiers':
        return (s.items || []).map(t =>
          `<div class="act-flex"><div class="label">${esc(t.label)}</div><div class="amount">${esc(t.amount)}</div></div>`
        ).join('')
      default:
        return ''
    }
  }).join('')
}

function esc(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * 活动数据格式（结构化）
 */
export const activities = reactive([])

// ========== 服务体系 ==========
export const serviceInfo = reactive({
  title: '',
  desc: '',
})

// ========== 图片资源 ==========
export const images = reactive({
  site_favicon: logoMain,
  logo_main: logoMain,
  logo_text: logoText,
  logo_domain: logoDomain,
  hero_banner_pc: '',
  hero_banner_h5: '',
  about_cover_pc: '',
  about_video_pc: '',
  about_cover_h5: '',
  about_video_h5: '',
  values_pc: '',
  values_h5: '',
  activity_person_pc: '',
  activity_person_h5: '',
  activity_bg_h5: '',
  activity_bg_pc: '',
  service_person_pc: '',
  service_person_h5: '',
  service_card_bg_pc: '',
  service_card_bg_h5: '',
})

// ========== 配置加载状态 ==========
export const configLoaded = ref(false)

/**
 * 从后端加载配置并合并到响应式对象中
 * 启动时调用一次即可
 */
export async function loadRemoteConfig() {
  const payload = await fetchSiteConfig()
  if (!payload) {
    remoteSiteMeta.value = null
    configLoaded.value = true
    return // 后端不可用，使用 index.html 占位与本地默认
  }

  const data = payload.config
  remoteSiteMeta.value = payload.site

  // 合并基本信息
  if (data.site_title) siteInfo.title = data.site_title
  if (data.site_description) siteInfo.description = data.site_description
  if (data.site_keywords) siteInfo.keywords = data.site_keywords
  if ('site_author' in data && data.site_author != null) siteInfo.author = String(data.site_author)
  if (data.about_title) siteInfo.aboutTitle = data.about_title
  if (data.about_text) siteInfo.aboutText = data.about_text

  // 合并联系方式
  if (data.business_contact) {
    Object.assign(BUSINESS_CONTACT, {
      ...data.business_contact,
      avatar: resolveAssetUrl(data.business_contact.avatar) || logoMain
    })
  }
  if (data.tg_recruit_group) Object.assign(TG_RECRUIT_GROUP, data.tg_recruit_group)
  if (data.tg_official_channel) {
    Object.assign(TG_OFFICIAL_CHANNEL, {
      ...data.tg_official_channel,
      avatar: resolveAssetUrl(data.tg_official_channel.avatar) || logoMain
    })
  }
  if (data.customer_service) {
    Object.assign(CUSTOMER_SERVICE, {
      ...data.customer_service,
      avatar: resolveAssetUrl(data.customer_service.avatar) || logoMain
    })
  }
  if (data.complaint_contact) {
    const cc = data.complaint_contact
    Object.assign(COMPLAINT_CONTACT, {
      ...cc,
      avatar: resolveAssetUrl(cc.avatar) || logoMain
    })
  }

  // 合并商务人员（替换整个数组）
  if (data.promote_partners && Array.isArray(data.promote_partners)) {
    PROMOTE_PARTNERS.splice(0, PROMOTE_PARTNERS.length, ...data.promote_partners.map(p => ({
      ...p,
      avatar: resolveAssetUrl(p.avatar) || logoMain
    })))
  }
  if (data.third_partners && Array.isArray(data.third_partners)) {
    THIRD_PARTNERS.splice(0, THIRD_PARTNERS.length, ...data.third_partners.map(p => ({
      ...p,
      avatar: resolveAssetUrl(p.avatar) || logoMain
    })))
  }

  // 合并搜索配置
  if (data.search_config) Object.assign(SEARCH_CONFIG, data.search_config)

  // 合并担保账户
  if (data.guarantee_accounts && Array.isArray(data.guarantee_accounts)) {
    GUARANTEE_ACCOUNTS.splice(0, GUARANTEE_ACCOUNTS.length, ...data.guarantee_accounts)
  }

  // 合并活动列表
  if (data.activities && Array.isArray(data.activities)) {
    activities.splice(0, activities.length, ...data.activities)
  }

  // 合并服务信息
  if (data.service_title) serviceInfo.title = data.service_title
  if (data.service_desc) serviceInfo.desc = data.service_desc

  // 合并图片（所有可配置的图片 key）
  Object.keys(images).forEach(key => {
    if (data[key]) images[key] = resolveAssetUrl(data[key])
  })

  // 动态更新浏览器 Favicon
  if (images.site_favicon) {
    let link = document.querySelector("link[rel*='icon']")
    if (!link) {
      link = document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = images.site_favicon
  }

  const title = siteInfo.title || SEO_FALLBACK.title
  const description = siteInfo.description || SEO_FALLBACK.description
  const keywords = siteInfo.keywords || SEO_FALLBACK.keywords
  const author = siteInfo.author || SEO_FALLBACK.author
  const ogSiteName = (remoteSiteMeta.value && remoteSiteMeta.value.name) || SEO_FALLBACK.ogSiteName
  const shareImageAbs = toAbsoluteUrl(images.logo_main || images.site_favicon)

  applySeoToDocument({
    title,
    description,
    keywords,
    author,
    ogSiteName,
    shareImageAbs,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: title,
      ...(remoteSiteMeta.value?.id ? { alternateName: remoteSiteMeta.value.id } : {}),
      description,
      ...(shareImageAbs ? { logo: shareImageAbs } : {}),
    },
  })

  configLoaded.value = true
}
