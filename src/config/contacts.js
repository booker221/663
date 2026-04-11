/**
 * 合兴落地页 - 联系方式统一配置
 * 
 * ⚠️ 此文件已重构为从 siteConfig store 统一导出
 *    所有数据实际存储在 stores/siteConfig.js 中（支持远程 API 更新）
 *    现有组件的 import 路径无需修改，完全向后兼容
 */

export {
  BUSINESS_CONTACT,
  TG_RECRUIT_GROUP,
  TG_OFFICIAL_CHANNEL,
  CUSTOMER_SERVICE,
  COMPLAINT_CONTACT,
  PROMOTE_PARTNERS,
  THIRD_PARTNERS,
  SEARCH_CONFIG,
  GUARANTEE_ACCOUNTS,
} from '@/stores/siteConfig.js'
