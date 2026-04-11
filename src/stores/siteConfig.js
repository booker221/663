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

// 导入默认头像（后端未设置头像时使用）
import avatarDimao from '@/assets/images/webp/avatar-dimao.webp'
import avatarTaiyang from '@/assets/images/webp/avatar-taiyang.webp'
import avatarHema from '@/assets/images/webp/avatar-hema.webp'
import avatarXiaoxiong from '@/assets/images/webp/avatar-xiaoxiong.webp'
import avatarHehua from '@/assets/images/webp/avatar-hehua.webp'
import avatarHexing from '@/assets/images/webp/avatar-hexing.webp'

// 默认头像映射（按名字匹配）
const defaultAvatars = {
  '迪猫': avatarDimao,
  '太阳': avatarTaiyang,
  '河马': avatarHema,
  '小熊': avatarXiaoxiong,
  '荷花': avatarHehua,
  '合兴': avatarHexing,
}

// ========== 站点基本信息 ==========
export const siteInfo = reactive({
  title: '合兴集团 - 合于信 兴于行 | 官方落地页',
  description: '合兴集团官方落地页。合于信、兴于行，提供高效的投流合作、活动奢励与广告资源对接，诚信为本、合作共赣、追求卓越。',
  keywords: '合兴集团,合兴,hexing,投流合作,广告呼召,机房合作,商务合作,资源对接',
  aboutTitle: '关于合兴：',
  aboutText: '合兴集团自成立以来，秉承"<span class="hl">合于信，兴于行</span>"的理念，我们始终坚信，信任是合作关系的基石，卓越的执行力则是可持续发展的引擎。在过去的发展历程中，我们始终坚守"<span class="hl">诚信为本、合作共赢、追求卓越</span>"三大核心价值观，将其作为企业立身与发展的根本。合兴的使命：持续创造价值，驱动行业变革。合兴的愿景：铸就百年品牌，成为您"<span class="hl">百年大业</span>"最信赖的合作伙伴。',
})

// ========== 联系方式 ==========
export const BUSINESS_CONTACT = reactive({
  handle: '@hx_zs888',
  url: 'https://t.me/hx_zs888',
})

export const TG_RECRUIT_GROUP = reactive({
  label: 'TG招商群',
  url: 'https://t.me/hexing_zs663',
})

export const TG_OFFICIAL_CHANNEL = reactive({
  label: 'TG官方频道',
  handle: '@hexing',
  url: 'https://t.me/hexing',
})

export const CUSTOMER_SERVICE = reactive({
  handle: '@hx_zs888',
  url: 'https://t.me/hx_zs888',
})

export const COMPLAINT_CONTACT = reactive({
  name: '迪猫',
  handle: '@hx_zs888',
  url: 'https://t.me/hx_zs888',
  avatar: avatarDimao,
})

// ========== 商务人员 ==========
export const PROMOTE_PARTNERS = reactive([
  { name: '迪猫', handle: '@hx_zs888', url: 'https://t.me/hx_zs888', avatar: avatarDimao },
  { name: '太阳', handle: '@hexing95277', url: 'https://t.me/hexing95277', avatar: avatarTaiyang },
  { name: '河马', handle: '@hm777321', url: 'https://t.me/hm777321', avatar: avatarHema },
])

export const THIRD_PARTNERS = reactive([
  { name: '小熊', handle: '@xiiiong', url: 'https://t.me/xiiiong', avatar: avatarXiaoxiong },
  { name: '荷花', handle: '@newhexing', url: 'https://t.me/newhexing', avatar: avatarHehua },
  { name: '合兴', handle: '@HX_88888', url: 'https://t.me/HX_88888', avatar: avatarHexing },
])

// ========== 搜索配置 ==========
export const SEARCH_CONFIG = reactive({
  placeholder: '点击搜索',
  defaultValue: '@hm777321',
  successText: '此飞机号属于合兴一路向前招商人员',
  failText: '此飞机不属于合兴一路向前招商人员，请谨慎被骗',
})

// ========== 担保认证 ==========
export const GUARANTEE_ACCOUNTS = reactive([
  '@qiyu16168', '@Awang6866', '@Qin789789', '@DF98888888',
  '@laowang168888', '@xiaofeng0900', '@AQ888866666', '@xiaoyu8829',
  '@all16816888', '@xiaocheng95270', '@pk9888888', '@lan52085',
  '@ksf6158', '@hx_zs663', '@kafei128', '@kunkun156688',
  '@pTmT9998', '@xiaotian3749', '@hx_dm888', '@sangbiao888',
  '@Xiangfeng88889999', '@Laok918888', '@fanh01', '@wxj558'
])

// ========== 活动列表 ==========
export const activities = reactive([
  {
    title: '首单奖励',
    content: `<p class="act-line">新、老合作方每月完成首次真实跑量（量+成本）</p><p class="act-line">三网实卡/虚卡/IM首单奖励:</p><div class="act-flex"><span class="label">5W:</span> <span class="amount">188$</span></div><div class="act-flex"><span class="label">10W:</span> <span class="amount">288$</span></div><div class="act-flex"><span class="label">20W:</span> <span class="amount">388$</span></div><div class="act-flex"><span class="label">50W:</span> <span class="amount">688$</span></div><div class="act-flex"><span class="label">100W:</span> <span class="amount">1888$</span></div><p class="act-line mt-2">达标奖励:</p><p class="act-line">满足条件，奖金翻倍！！</p>`
  },
  {
    title: '拉新奖励',
    content: `<p class="act-line">成功引入有效合作渠道并完成对接</p><div class="act-flex mt-2"><span class="label lg">首个有效渠道奖励:</span> <span class="amount">188$</span></div><p class="act-line mt-2">连续拉新奖励:</p><div class="act-flex"><span class="label">3个渠道:</span> <span class="value">额外 <span class="amount">588$</span></span></div><div class="act-flex"><span class="label">5个渠道:</span> <span class="value">额外 <span class="amount">688$</span></span></div><div class="act-flex"><span class="label">10个渠道:</span> <span class="value">额外 <span class="amount">1888$</span></span></div><p class="act-line mt-2">高质量实卡渠道:</p><p class="act-line">额外加奖 <span class="amount">888$-1888$</span></p>`
  },
  {
    title: '冲刺奖励',
    content: `<p class="act-line">短周期爆发（3天/7天）</p><p class="act-line red mt-2 flex-center-y">🔸 3天冲刺</p><div class="act-flex"><span class="label">100W:</span> <span class="amount">1888$</span></div><div class="act-flex"><span class="label">300W:</span> <span class="amount">3888$</span></div><div class="act-flex"><span class="label">超额冲刺:</span> <span class="amount">888$</span></div><p class="act-line red mt-2 flex-center-y">🔸 7天冲刺:</p><div class="act-flex"><span class="label">800W:</span> <span class="amount">1888$</span></div><div class="act-flex"><span class="label">1000W:</span> <span class="amount">18888$</span></div>`
  },
  {
    title: '流水提成奖励',
    content: `<p class="act-line">按打款流水阶梯提成</p><div class="act-flex mt-2"><span class="label">10万:</span> <span class="amount">1888$</span></div><div class="act-flex"><span class="label">30万:</span> <span class="amount">3888$</span></div><div class="act-flex"><span class="label">50万:</span> <span class="amount">6888$</span></div><div class="act-flex"><span class="label">100万:</span> <span class="amount">18888$</span></div><div class="act-flex"><span class="label">200万+:</span> <span class="red-text">额外返点+高额奖金！</span></div>`
  },
  {
    title: '排行榜奖励',
    content: `<p class="act-line">拉新/流水/投量排名</p><div class="act-flex mt-2"><span class="label rank-label">第1名:</span> <span class="amount rank-amount">3888$</span></div><div class="act-flex"><span class="label rank-label">第2名:</span> <span class="amount rank-amount">2888$</span></div><div class="act-flex"><span class="label rank-label">第3名:</span> <span class="amount rank-amount">1888$</span></div>`
  },
  {
    title: '优质通道每月奖励',
    content: `<p class="act-line">提供稳定高质量通道资源</p><div class="act-flex mt-2"><span class="label lg">稳定奖励:</span> <span class="amount">888$</span></div><div class="act-flex"><span class="label lg">高质量稳定通道:</span> <span class="amount">8888$</span></div><p class="act-line red mt-2">长期收益·分红机制·持续提成（躺赚）</p>`
  }
])

// ========== 服务体系 ==========
export const serviceInfo = reactive({
  title: '一对一专员',
  desc: '除指派专员进行日常业务对接外，另委派项目负责人履行监督职能。该负责人统筹项目全局，具备快速决策与纠偏响应能力，旨在最大限度降低沟通成本，保障项目高质量交付，共创双赢局面。',
})

// ========== 图片资源 ==========
export const images = reactive({
  hero_banner_pc: '',
  hero_banner_h5: '',
  values_pc: '',
  values_h5: '',
  collab_banner_pc: '',
  collab_banner_h5: '',
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
  if (data.business_contact) Object.assign(BUSINESS_CONTACT, data.business_contact)
  if (data.tg_recruit_group) Object.assign(TG_RECRUIT_GROUP, data.tg_recruit_group)
  if (data.tg_official_channel) Object.assign(TG_OFFICIAL_CHANNEL, data.tg_official_channel)
  if (data.customer_service) Object.assign(CUSTOMER_SERVICE, data.customer_service)
  if (data.complaint_contact) {
    const cc = data.complaint_contact
    Object.assign(COMPLAINT_CONTACT, {
      ...cc,
      avatar: cc.avatar || defaultAvatars[cc.name] || avatarDimao
    })
  }

  // 合并商务人员（替换整个数组）
  if (data.promote_partners && Array.isArray(data.promote_partners)) {
    PROMOTE_PARTNERS.splice(0, PROMOTE_PARTNERS.length, ...data.promote_partners.map(p => ({
      ...p,
      avatar: p.avatar || defaultAvatars[p.name] || ''
    })))
  }
  if (data.third_partners && Array.isArray(data.third_partners)) {
    THIRD_PARTNERS.splice(0, THIRD_PARTNERS.length, ...data.third_partners.map(p => ({
      ...p,
      avatar: p.avatar || defaultAvatars[p.name] || ''
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

  // 合并图片
  const imageKeys = ['hero_banner_pc', 'hero_banner_h5', 'values_pc', 'values_h5', 'collab_banner_pc', 'collab_banner_h5']
  imageKeys.forEach(key => {
    if (data[key]) images[key] = data[key]
  })

  configLoaded.value = true
  console.log('[Config] 远程配置加载完成')
}
