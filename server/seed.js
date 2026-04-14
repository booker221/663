/**
 * 合兴落地页 - 数据初始化脚本
 * ✅ 多站点架构：创建默认站点并写入配置
 * 运行: node seed.js
 */
import { createSite, getSite, setConfigBatch } from './db.js'

console.log('🌱 开始初始化数据库...\n')

// ==================== 创建默认站点 ====================
const DEFAULT_SITE_ID = 'default_site'

if (!getSite(DEFAULT_SITE_ID)) {
  createSite(DEFAULT_SITE_ID, '我的落地页', '', '默认系统生成的站点，请在后台编辑')
  console.log(`✅ 创建站点: ${DEFAULT_SITE_ID} (我的落地页)`)
} else {
  console.log(`ℹ️  站点 ${DEFAULT_SITE_ID} 已存在，跳过创建`)
}

// ==================== 写入默认配置 ====================
const seedData = [
  // =========== 基本信息 ===========
  { key: 'site_title', value: '合兴集团 - 合于信 兴于行 | 官方落地页', label: '网站标题', category: 'site' },
  { key: 'site_description', value: '合兴集团官方落地页。合于信、兴于行，提供高效的投流合作、活动奢励与广告资源对接，诚信为本、合作共赣、追求卓越。', label: '网站描述(SEO)', category: 'site' },
  { key: 'site_keywords', value: '合兴集团,合兴,hexing,投流合作,广告呼召,机房合作,商务合作,资源对接', label: '关键词(SEO)', category: 'site' },
  { key: 'site_author', value: '合兴集团', label: '作者/版权(meta author)', category: 'site' },
  { key: 'about_title', value: '关于合兴：', label: '关于我们标题', category: 'site' },
  { key: 'about_text', value: '合兴集团自成立以来，秉承"<span class="hl">合于信，兴于行</span>"的理念，我们始终坚信，信任是合作关系的基石，卓越的执行力则是可持续发展的引擎。在过去的发展历程中，我们始终坚守"<span class="hl">诚信为本、合作共赢、追求卓越</span>"三大核心价值观，将其作为企业立身与发展的根本。合兴的使命：持续创造价值，驱动行业变革。合兴的愿景：铸就百年品牌，成为您"<span class="hl">百年大业</span>"最信赖的合作伙伴。', label: '关于我们描述', category: 'site' },

  // =========== 联系方式 ===========
  { key: 'business_contact', value: { handle: '@hx_zs888', url: 'https://t.me/hx_zs888' }, label: '商务合作', category: 'contacts' },
  { key: 'tg_recruit_group', value: { label: 'TG招商群', url: 'https://t.me/hexing_zs663' }, label: 'TG招商群', category: 'contacts' },
  { key: 'tg_official_channel', value: { label: 'TG官方频道', handle: '@hexing', url: 'https://t.me/hexing' }, label: 'TG官方频道', category: 'contacts' },
  { key: 'customer_service', value: { handle: '@hx_zs888', url: 'https://t.me/hx_zs888' }, label: '客服联系', category: 'contacts' },
  { key: 'complaint_contact', value: { name: '迪猫', handle: '@hx_zs888', url: 'https://t.me/hx_zs888', avatar: '' }, label: '投诉接受', category: 'contacts' },

  // =========== 商务人员 ===========
  {
    key: 'promote_partners', label: '推广招商部', category: 'partners',
    value: [
      { name: '迪猫', handle: '@hx_zs888', url: 'https://t.me/hx_zs888', avatar: '' },
      { name: '太阳', handle: '@hexing95277', url: 'https://t.me/hexing95277', avatar: '' },
      { name: '河马', handle: '@hm777321', url: 'https://t.me/hm777321', avatar: '' },
    ]
  },
  {
    key: 'third_partners', label: '支付通道招商部', category: 'partners',
    value: [
      { name: '小熊', handle: '@xiiiong', url: 'https://t.me/xiiiong', avatar: '' },
      { name: '荷花', handle: '@newhexing', url: 'https://t.me/newhexing', avatar: '' },
      { name: '合兴', handle: '@HX_88888', url: 'https://t.me/HX_88888', avatar: '' },
    ]
  },

  // =========== 活动专栏 ===========
  {
    key: 'activities', label: '活动列表', category: 'activities',
    value: [
      {
        title: '首单奖励',
        sections: [
          { type: 'text', value: '新、老合作方每月完成首次真实跑量（量+成本）' },
          { type: 'text', value: '三网实卡/虚卡/IM首单奖励:' },
          { type: 'tiers', items: [
            { label: '5W:', amount: '188$' }, { label: '10W:', amount: '288$' },
            { label: '20W:', amount: '388$' }, { label: '50W:', amount: '688$' },
            { label: '100W:', amount: '1888$' },
          ]},
          { type: 'text', value: '达标奖励:' },
          { type: 'highlight', value: '满足条件，奖金翻倍！！' },
        ]
      },
      {
        title: '拉新奖励',
        sections: [
          { type: 'text', value: '成功引入有效合作渠道并完成对接' },
          { type: 'tiers', items: [{ label: '首个有效渠道奖励:', amount: '188$' }] },
          { type: 'text', value: '连续拉新奖励:' },
          { type: 'tiers', items: [
            { label: '3个渠道:', amount: '额外 588$' },
            { label: '5个渠道:', amount: '额外 688$' },
            { label: '10个渠道:', amount: '额外 1888$' },
          ]},
        ]
      },
      {
        title: '冲刺奖励',
        sections: [
          { type: 'text', value: '短周期爆发（3天/7天）' },
          { type: 'highlight', value: '🔸 3天冲刺' },
          { type: 'tiers', items: [
            { label: '100W:', amount: '1888$' }, { label: '300W:', amount: '3888$' },
          ]},
        ]
      },
      {
        title: '流水提成奖励',
        sections: [
          { type: 'text', value: '按打款流水阶梯提成' },
          { type: 'tiers', items: [
            { label: '10万:', amount: '1888$' }, { label: '30万:', amount: '3888$' },
            { label: '50万:', amount: '6888$' }, { label: '100万:', amount: '18888$' },
          ]},
        ]
      },
      {
        title: '排行榜奖励',
        sections: [
          { type: 'text', value: '拉新/流水/投量排名' },
          { type: 'tiers', items: [
            { label: '第1名:', amount: '3888$' }, { label: '第2名:', amount: '2888$' },
            { label: '第3名:', amount: '1888$' },
          ]},
        ]
      },
      {
        title: '优质通道每月奖励',
        sections: [
          { type: 'text', value: '提供稳定高质量通道资源' },
          { type: 'tiers', items: [
            { label: '稳定奖励:', amount: '888$' }, { label: '高质量稳定通道:', amount: '8888$' },
          ]},
        ]
      }
    ]
  },

  // =========== 服务体系 ===========
  { key: 'service_title', value: '一对一专员', label: '服务标题', category: 'service' },
  { key: 'service_desc', value: '除指派专员进行日常业务对接外，另委派项目负责人履行监督职能。该负责人统筹项目全局，具备快速决策与纠偏响应能力，旨在最大限度降低沟通成本，保障项目高质量交付，共创双赢局面。', label: '服务描述', category: 'service' },

  // =========== 担保认证 ===========
  {
    key: 'guarantee_accounts', label: '担保账户列表', category: 'guarantee',
    value: [
      '@qiyu16168', '@Awang6866', '@Qin789789', '@DF98888888',
      '@laowang168888', '@xiaofeng0900', '@AQ888866666', '@xiaoyu8829',
      '@all16816888', '@xiaocheng95270', '@pk9888888', '@lan52085',
      '@ksf6158', '@hx_zs663', '@kafei128', '@kunkun156688',
      '@pTmT9998', '@xiaotian3749', '@hx_dm888', '@sangbiao888',
      '@Xiangfeng88889999', '@Laok918888', '@fanh01', '@wxj558'
    ]
  },

  // =========== 搜索配置 ===========
  {
    key: 'search_config', label: '搜索验证配置', category: 'search',
    value: {
      placeholder: '点击搜索',
      defaultValue: '@hm777321',
      successText: '此飞机号属于合兴一路向前招商人员',
      failText: '此飞机不属于合兴一路向前招商人员，请谨慎被骗'
    }
  },

  // =========== 图片配置 ===========
  { key: 'site_favicon', value: '', label: '网站图标(Favicon)', category: 'images' },
  { key: 'logo_main', value: '', label: '站点Logo(圆形)', category: 'images' },
  { key: 'logo_text', value: '', label: '站点文字Logo', category: 'images' },
  { key: 'logo_domain', value: '', label: '站点域名Logo', category: 'images' },
  { key: 'hero_banner_pc', value: '', label: 'PC首屏Banner', category: 'images' },
  { key: 'hero_banner_h5', value: '', label: 'H5首屏Banner', category: 'images' },
  { key: 'values_pc', value: '', label: 'PC核心价值观图片', category: 'images' },
  { key: 'values_h5', value: '', label: 'H5核心价值观图片', category: 'images' }
]

try {
  setConfigBatch(DEFAULT_SITE_ID, seedData)
  console.log(`✅ 成功写入 ${seedData.length} 条配置到站点 [${DEFAULT_SITE_ID}]\n`)
  
  const categories = {}
  seedData.forEach(item => {
    if (!categories[item.category]) categories[item.category] = 0
    categories[item.category]++
  })
  console.log('📋 配置分类:')
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} 条`)
  })
  console.log('\n🎉 数据库初始化完成！')
} catch (err) {
  console.error('❌ 初始化失败:', err.message)
  process.exit(1)
}
