/**
 * 设备检测工具
 */
export function isMobile() {
  const ua = navigator.userAgent
  const mobileReg = /Android|iPhone|iPad|iPod|webOS|BlackBerry|Windows Phone|Opera Mini|IEMobile/i
  return mobileReg.test(ua) || window.innerWidth < 1200
}

export function getDeviceType() {
  return isMobile() ? 'h5' : 'pc'
}
