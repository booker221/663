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
import fallbackLogo from '@/assets/images/webp/logo-hx.webp'

// ========== 站点基本信息 ==========
export const siteInfo = reactive({
  title: '',
  description: '',
  keywords: '',
  aboutTitle: '',
  aboutText: '',
})

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
          `<div class="act-flex"><span class="label">${esc(t.label)}</span> <span class="amount">${esc(t.amount)}</span></div>`
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
  hero_banner_pc: '',
  hero_banner_h5: '',
  values_pc: '',
  values_h5: '',
  collab_banner_pc: '',
  collab_banner_h5: '',
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
  const data = await fetchSiteConfig()
  if (!data) {
    configLoaded.value = true
    return // 后端不可用，使用默认值
  }

  // 合并基本信息
  if (data.site_title) siteInfo.title = data.site_title
  if (data.site_description) siteInfo.description = data.site_description
  if (data.site_keywords) siteInfo.keywords = data.site_keywords
  if (data.about_title) siteInfo.aboutTitle = data.about_title
  if (data.about_text) siteInfo.aboutText = data.about_text

  // 合并联系方式
  if (data.business_contact) {
    Object.assign(BUSINESS_CONTACT, {
      ...data.business_contact,
      avatar: data.business_contact.avatar || fallbackLogo
    })
  }
  if (data.tg_recruit_group) Object.assign(TG_RECRUIT_GROUP, data.tg_recruit_group)
  if (data.tg_official_channel) {
    Object.assign(TG_OFFICIAL_CHANNEL, {
      ...data.tg_official_channel,
      avatar: data.tg_official_channel.avatar || fallbackLogo
    })
  }
  if (data.customer_service) {
    Object.assign(CUSTOMER_SERVICE, {
      ...data.customer_service,
      avatar: data.customer_service.avatar || fallbackLogo
    })
  }
  if (data.complaint_contact) {
    const cc = data.complaint_contact
    Object.assign(COMPLAINT_CONTACT, {
      ...cc,
      avatar: cc.avatar || fallbackLogo
    })
  }

  // 合并商务人员（替换整个数组）
  if (data.promote_partners && Array.isArray(data.promote_partners)) {
    PROMOTE_PARTNERS.splice(0, PROMOTE_PARTNERS.length, ...data.promote_partners.map(p => ({
      ...p,
      avatar: p.avatar || fallbackLogo
    })))
  }
  if (data.third_partners && Array.isArray(data.third_partners)) {
    THIRD_PARTNERS.splice(0, THIRD_PARTNERS.length, ...data.third_partners.map(p => ({
      ...p,
      avatar: p.avatar || fallbackLogo
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
    if (data[key]) images[key] = data[key]
  })
  configLoaded.value = true
}
