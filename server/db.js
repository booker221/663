/**
 * 合兴落地页 - 数据库初始化 & CRUD 操作
 * ✅ 多站点架构：每个站点拥有独立配置
 */
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, 'data.sqlite')

const db = new Database(DB_PATH)

// 启用 WAL 模式以提升并发性能
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// ==================== 建表 ====================

// 站点表
db.exec(`
  CREATE TABLE IF NOT EXISTS sites (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    domain TEXT DEFAULT '',
    description TEXT DEFAULT '',
    password TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// 兼容旧表：如果 password 列不存在则添加
try {
  db.prepare("SELECT password FROM sites LIMIT 1").get()
} catch {
  db.exec("ALTER TABLE sites ADD COLUMN password TEXT DEFAULT ''")
}

// 配置表（以 site_id + key 为联合主键）
// SQLite 不支持 ALTER PRIMARY KEY，所以检查并重建
try {
  // 检查现有表是否使用了错误的主键结构
  const tableInfo = db.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='config'").get()
  if (tableInfo && tableInfo.sql && !tableInfo.sql.includes('PRIMARY KEY (site_id, key)')) {
    // 旧表结构不对，删除重建
    db.exec('DROP TABLE IF EXISTS config')
  }
} catch (e) {
  // 表不存在，正常创建
}

db.exec(`
  CREATE TABLE IF NOT EXISTS config (
    site_id TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    label TEXT DEFAULT '',
    category TEXT DEFAULT 'general',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (site_id, key),
    FOREIGN KEY (site_id) REFERENCES sites(id) ON DELETE CASCADE
  )
`)

// ==================== 站点 CRUD ====================

/**
 * 获取所有站点
 */
export function getAllSites() {
  return db.prepare('SELECT * FROM sites ORDER BY created_at DESC').all()
}

/**
 * 获取单个站点
 */
export function getSite(id) {
  return db.prepare('SELECT * FROM sites WHERE id = ?').get(id)
}

/**
 * 创建站点
 */
export function createSite(id, name, domain = '', description = '') {
  db.prepare(`
    INSERT INTO sites (id, name, domain, description) VALUES (?, ?, ?, ?)
  `).run(id, name, domain, description)
  return getSite(id)
}

/**
 * 更新站点信息（支持修改ID）
 */
export function updateSite(id, newId, name, domain = '', description = '') {
  if (id !== newId) {
    const transaction = db.transaction(() => {
      // 1. 创建新主键的完全一模一样的记录
      const oldSite = getSite(id)
      db.prepare(`
        INSERT INTO sites (id, name, domain, description, password, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
      `).run(newId, name, domain, description, oldSite.password, oldSite.created_at)

      // 2. 把对应 config 的外键转到新 ID 上
      db.prepare(`UPDATE config SET site_id = ? WHERE site_id = ?`).run(newId, id)

      // 3. 删除老的站点记录
      db.prepare('DELETE FROM sites WHERE id = ?').run(id)
    })
    transaction()
    return getSite(newId)
  } else {
    db.prepare(`
      UPDATE sites SET name = ?, domain = ?, description = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(name, domain, description, id)
    return getSite(id)
  }
}

/**
 * 删除站点（级联删除所有配置）
 */
export function deleteSite(id) {
  // 先删除该站点的所有配置
  db.prepare('DELETE FROM config WHERE site_id = ?').run(id)
  db.prepare('DELETE FROM sites WHERE id = ?').run(id)
}

/**
 * 更新站点密码
 */
export function updateSitePassword(id, password) {
  db.prepare(`UPDATE sites SET password = ?, updated_at = datetime('now') WHERE id = ?`).run(password, id)
}

/**
 * 通过密码查找匹配的站点（用于站点管理员登录）
 * 返回第一个匹配的站点，密码不能为空
 */
export function getSiteByPassword(password) {
  if (!password) return null
  return db.prepare("SELECT * FROM sites WHERE password = ? AND password != ''").get(password)
}

/**
 * 克隆站点配置到新站点
 */
export function cloneSite(sourceSiteId, newSiteId, newName, newDomain = '') {
  // 创建新站点
  createSite(newSiteId, newName, newDomain)
  
  // 复制所有配置
  const configs = db.prepare('SELECT * FROM config WHERE site_id = ?').all(sourceSiteId)
  const insert = db.prepare(`
    INSERT OR REPLACE INTO config (site_id, key, value, label, category, updated_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
  `)
  
  const transaction = db.transaction(() => {
    for (const c of configs) {
      insert.run(newSiteId, c.key, c.value, c.label, c.category)
    }
  })
  transaction()
  
  return getSite(newSiteId)
}

// ==================== 配置 CRUD ====================

/**
 * 根据域名获取站点
 */
export function getSiteByDomain(domain) {
  if (!domain) return null
  // 匹配域名或者 ID（防止用户在本地开发时将 IP 填到了 ID 里导致死活匹配不上）
  return db.prepare("SELECT * FROM sites WHERE (domain = ? AND domain != '') OR id = ?").get(domain, domain)
}

/**
 * 获取某站点的所有配置（前端使用）
 */
export function getAllConfig(siteId) {
  const rows = db.prepare('SELECT key, value FROM config WHERE site_id = ?').all(siteId)
  const result = {}
  for (const row of rows) {
    try {
      result[row.key] = JSON.parse(row.value)
    } catch {
      result[row.key] = row.value
    }
  }
  return result
}

/**
 * 获取某站点的配置详情（管理后台使用）
 */
export function getAllConfigDetailed(siteId) {
  const rows = db.prepare(
    'SELECT key, value, label, category, updated_at FROM config WHERE site_id = ? ORDER BY category, key'
  ).all(siteId)
  return rows.map(row => {
    let parsed
    try { parsed = JSON.parse(row.value) } catch { parsed = row.value }
    return { key: row.key, value: parsed, label: row.label, category: row.category, updated_at: row.updated_at }
  })
}

/**
 * 获取单个配置
 */
export function getConfig(siteId, key) {
  const row = db.prepare('SELECT value FROM config WHERE site_id = ? AND key = ?').get(siteId, key)
  if (!row) return null
  try { return JSON.parse(row.value) } catch { return row.value }
}

/**
 * 设置单个配置
 */
export function setConfig(siteId, key, value, label = '', category = 'general') {
  const serialized = typeof value === 'string' ? value : JSON.stringify(value)
  db.prepare(`
    INSERT OR REPLACE INTO config (site_id, key, value, label, category, updated_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
  `).run(siteId, key, serialized, label || '', category || 'general')
}

/**
 * 批量设置配置
 */
export function setConfigBatch(siteId, items) {
  const insert = db.prepare(`
    INSERT OR REPLACE INTO config (site_id, key, value, label, category, updated_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'))
  `)

  const transaction = db.transaction((items) => {
    for (const item of items) {
      const serialized = typeof item.value === 'string' ? item.value : JSON.stringify(item.value)
      insert.run(siteId, item.key, serialized, item.label || '', item.category || 'general')
    }
  })

  transaction(items)
}

/**
 * 删除某站点的某个配置
 */
export function deleteConfig(siteId, key) {
  db.prepare('DELETE FROM config WHERE site_id = ? AND key = ?').run(siteId, key)
}

export default db
