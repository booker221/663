import avatarDimao from '@/assets/images/webp/avatar-dimao.webp'
import avatarTaiyang from '@/assets/images/webp/avatar-taiyang.webp'
import avatarHema from '@/assets/images/webp/avatar-hema.webp'

/**
 * 合兴落地页 - 联系方式统一配置
 * 修改这里即可更新全站所有联系人链接与头像
 */

// ✅ 商务合作（活动区 + FAB 按钮跳转）
export const BUSINESS_CONTACT = {
  handle: '@hexing663',
  url: 'https://t.me/hexing663',
}

// ✅ 联系客服 / 投诉建议浮球跳转
export const CUSTOMER_SERVICE = {
  handle: '@hexing663',
  url: 'https://t.me/hexing663',
}

// ✅ 投诉接受
export const COMPLAINT_CONTACT = {
  name: '迪猫',
  handle: '@hx_zs888',
  url: 'https://t.me/hx_zs888',
  avatar: avatarDimao,
}

// ✅ 推广招商部人员列表
export const PROMOTE_PARTNERS = [
  { name: '迪猫', handle: '@hx_zs888', url: 'https://t.me/hx_zs888', avatar: avatarDimao },
  { name: '太阳', handle: '@hexing95277', url: 'https://t.me/hexing95277', avatar: avatarTaiyang },
  { name: '河马', handle: '@hm777321', url: 'https://t.me/hm777321', avatar: avatarHema },
]

// ✅ 三方招商部人员列表
export const THIRD_PARTNERS = [
  { name: '迪猫', handle: '@hx_zs888', url: 'https://t.me/hx_zs888', avatar: avatarDimao },
  { name: '太阳', handle: '@hexing95277', url: 'https://t.me/hexing95277', avatar: avatarTaiyang },
  { name: '河马', handle: '@hm777321', url: 'https://t.me/hm777321', avatar: avatarHema },
]

// ✅ 搜索核验配置
export const SEARCH_CONFIG = {
  placeholder: '点击搜索',
  defaultValue: '@hm777321',
  successText: '此飞机号属于合兴一路向前招商人员',
  failText: '此飞机不属于合兴一路向前招商人员，请谨慎被骗',
}
