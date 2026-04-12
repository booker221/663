/**
 * 合兴落地页 - Express 后端主服务
 * ✅ 多站点架构：一套后端支持多个落地页网站
 */
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import {
  getAllSites, getSite, createSite, updateSite, deleteSite, cloneSite,
  getAllConfig, getAllConfigDetailed, getConfig, setConfig, setConfigBatch,
  updateSitePassword, getSiteByPassword
} from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3456

// 超级管理员密码
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hx663admin'

// ==================== 中间件 ====================
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(session({
  secret: process.env.SESSION_SECRET || 'hxldy-admin-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax' }
}))

// ==================== 文件上传 ====================
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 按站点分目录存储上传文件
    const siteId = req.query.site || 'default'
    const siteDir = path.join(uploadsDir, siteId)
    if (!fs.existsSync(siteDir)) fs.mkdirSync(siteDir, { recursive: true })
    cb(null, siteDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9\-_]/g, '_')
    cb(null, `${name}-${Date.now()}${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(path.extname(file.originalname))) {
      cb(null, true)
    } else {
      cb(new Error('只支持图片文件 (jpg/png/gif/webp/svg)'))
    }
  }
})

// ==================== 鉴权中间件 ====================

// 基本登录校验
function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next()
  res.status(401).json({ error: '未登录' })
}

// 超级管理员校验（站点管理、创建/删除站点等操作）
function requireSuperAdmin(req, res, next) {
  if (req.session && req.session.authenticated && req.session.role === 'superadmin') return next()
  res.status(403).json({ error: '权限不足，需要超级管理员权限' })
}

// 站点数据访问校验（站点管理员只能访问自己的站点）
function requireSiteAccess(req, res, next) {
  if (!req.session || !req.session.authenticated) return res.status(401).json({ error: '未登录' })
  // 超级管理员可以访问所有站点
  if (req.session.role === 'superadmin') return next()
  // 站点管理员只能访问自己的站点
  const siteId = req.query.site || req.params.id
  if (req.session.role === 'siteadmin' && req.session.siteId === siteId) return next()
  res.status(403).json({ error: '无权访问该站点' })
}

// ==================== 公共 API ====================

// 获取指定站点的配置（前端使用，不需要登录）
// GET /api/config?site=hxldy
app.get('/api/config', (req, res) => {
  try {
    const siteId = req.query.site || 'hxldy'
    const site = getSite(siteId)
    if (!site) return res.status(404).json({ error: `站点 [${siteId}] 不存在` })
    const config = getAllConfig(siteId)
    res.json({ success: true, site: { id: site.id, name: site.name }, data: config })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 静态文件（上传的图片）支持按站点路径
app.use('/api/uploads', express.static(uploadsDir, { maxAge: '7d', immutable: true }))

// ==================== 认证 API ====================

/**
 * 登录逻辑：
 * 1. 先检查是否匹配超级管理员密码 → role: superadmin
 * 2. 再检查是否匹配某个站点的密码 → role: siteadmin, siteId: xxx
 * 3. 都不匹配 → 密码错误
 */
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body
  if (!password) return res.status(400).json({ error: '请输入密码' })

  // 超级管理员
  if (password === ADMIN_PASSWORD) {
    req.session.authenticated = true
    req.session.role = 'superadmin'
    req.session.siteId = null
    return res.json({ success: true, role: 'superadmin' })
  }

  // 站点管理员（通过站点密码匹配）
  const site = getSiteByPassword(password)
  if (site) {
    req.session.authenticated = true
    req.session.role = 'siteadmin'
    req.session.siteId = site.id
    return res.json({ success: true, role: 'siteadmin', siteId: site.id, siteName: site.name })
  }

  res.status(401).json({ error: '密码错误' })
})

app.get('/api/auth/check', (req, res) => {
  if (req.session && req.session.authenticated) {
    res.json({
      authenticated: true,
      role: req.session.role,
      siteId: req.session.siteId || null
    })
  } else {
    res.json({ authenticated: false })
  }
})

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy()
  res.json({ success: true })
})

// ==================== 站点管理 API ====================

// 获取站点列表（超管：全部含密码标记；站点管理员：只返回自己的站点不含密码）
app.get('/api/admin/sites', requireAuth, (req, res) => {
  try {
    if (req.session.role === 'superadmin') {
      const sites = getAllSites()
      res.json({ success: true, data: sites })
    } else {
      // 站点管理员只能看到自己的站点，且不返回密码
      const site = getSite(req.session.siteId)
      if (site) {
        const { password, ...safeSite } = site
        res.json({ success: true, data: [safeSite] })
      } else {
        res.json({ success: true, data: [] })
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 创建新站点（仅超管）
app.post('/api/admin/sites', requireSuperAdmin, (req, res) => {
  try {
    const { id, name, domain, description, password } = req.body
    if (!id || !name) return res.status(400).json({ error: '站点ID和名称不能为空' })
    if (!/^[a-zA-Z0-9._-]+$/.test(id)) return res.status(400).json({ error: '站点ID只能包含字母、数字、下划线和连字符' })
    if (getSite(id)) return res.status(400).json({ error: `站点 [${id}] 已存在` })
    const site = createSite(id, name, domain || '', description || '')
    // 设置站点密码（如果提供）
    if (password) updateSitePassword(id, password)
    res.json({ success: true, data: site })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 更新站点信息（超管可更新所有，站点管理员只能更新自己的）
app.put('/api/admin/sites/:id', requireSiteAccess, (req, res) => {
  try {
    const { name, domain, description } = req.body
    if (!getSite(req.params.id)) return res.status(404).json({ error: '站点不存在' })
    const site = updateSite(req.params.id, name, domain || '', description || '')
    res.json({ success: true, data: site })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 设置站点密码（仅超管）
app.put('/api/admin/sites/:id/password', requireSuperAdmin, (req, res) => {
  try {
    const { password } = req.body
    if (!getSite(req.params.id)) return res.status(404).json({ error: '站点不存在' })
    if (password === ADMIN_PASSWORD) return res.status(400).json({ error: '站点密码不能与超管密码相同' })
    updateSitePassword(req.params.id, password || '')
    res.json({ success: true, message: password ? '密码已设置' : '密码已清除' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 删除站点（仅超管）
app.delete('/api/admin/sites/:id', requireSuperAdmin, (req, res) => {
  try {
    if (!getSite(req.params.id)) return res.status(404).json({ error: '站点不存在' })
    deleteSite(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 克隆站点（仅超管）
app.post('/api/admin/sites/:id/clone', requireSuperAdmin, (req, res) => {
  try {
    const { newId, newName, newDomain } = req.body
    if (!newId || !newName) return res.status(400).json({ error: '新站点ID和名称不能为空' })
    if (!/^[a-zA-Z0-9._-]+$/.test(newId)) return res.status(400).json({ error: '站点ID格式不正确' })
    if (getSite(newId)) return res.status(400).json({ error: `站点 [${newId}] 已存在` })
    if (!getSite(req.params.id)) return res.status(404).json({ error: '源站点不存在' })
    const site = cloneSite(req.params.id, newId, newName, newDomain || '')
    res.json({ success: true, data: site })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 配置管理 API ====================

// 获取站点详细配置（需要站点访问权限）
// GET /api/admin/config?site=hxldy
app.get('/api/admin/config', requireSiteAccess, (req, res) => {
  try {
    const siteId = req.query.site
    if (!siteId) return res.status(400).json({ error: '缺少 site 参数' })
    const config = getAllConfigDetailed(siteId)
    res.json({ success: true, data: config })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 更新单个配置（需要站点访问权限）
// PUT /api/admin/config/:key?site=hxldy
app.put('/api/admin/config/:key', requireSiteAccess, (req, res) => {
  try {
    const siteId = req.query.site
    if (!siteId) return res.status(400).json({ error: '缺少 site 参数' })
    const { value, label, category } = req.body
    setConfig(siteId, req.params.key, value, label, category)
    res.json({ success: true, message: `[${siteId}] 配置 ${req.params.key} 已更新` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 批量更新配置（需要站点访问权限）
// PUT /api/admin/config?site=hxldy
app.put('/api/admin/config', requireSiteAccess, (req, res) => {
  try {
    const siteId = req.query.site
    if (!siteId) return res.status(400).json({ error: '缺少 site 参数' })
    const { items } = req.body
    if (!Array.isArray(items)) return res.status(400).json({ error: 'items 必须是数组' })
    setConfigBatch(siteId, items)
    res.json({ success: true, message: `[${siteId}] 已更新 ${items.length} 条配置` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 上传图片（需要站点访问权限）
app.post('/api/admin/upload', requireSiteAccess, upload.single('image'), (req, res) => {
  try {
    const siteId = req.query.site || 'default'
    if (!req.file) return res.status(400).json({ error: '请选择图片' })
    const fileUrl = `/api/uploads/${siteId}/${req.file.filename}`
    res.json({ success: true, data: { url: fileUrl, filename: req.file.filename, size: req.file.size } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 管理后台 ====================
app.use('/admin', express.static(path.join(__dirname, 'admin')))

// ==================== 启动 ====================
app.listen(PORT, () => {
  const sites = getAllSites()
  console.log('')
  console.log('╔════════════════════════════════════════════════╗')
  console.log('║    落地页管理系统 - 多站点版 已启动             ║')
  console.log('╠════════════════════════════════════════════════╣')
  console.log(`║  🌐 管理后台:  http://localhost:${PORT}/admin       ║`)
  console.log(`║  📡 API 地址:  http://localhost:${PORT}/api         ║`)
  console.log(`║  🔑 默认密码:  ${ADMIN_PASSWORD.padEnd(30)}  ║`)
  console.log(`║  🏢 站点数量:  ${String(sites.length).padEnd(30)}  ║`)
  console.log('╚════════════════════════════════════════════════╝')
  if (sites.length > 0) {
    console.log('\n已注册站点:')
    sites.forEach(s => console.log(`  • ${s.id} → ${s.name} ${s.domain ? `(${s.domain})` : ''}`))
  }
  console.log('')
})
