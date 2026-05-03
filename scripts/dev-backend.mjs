/**
 * Start backend with better-sqlite3 rebuilt for *this* Node (process.execPath).
 * Avoids NODE_MODULE_VERSION mismatch when PATH `npm`/`node` come from different installs.
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const serverDir = path.join(root, 'server')
const indexJs = path.join(root, 'server', 'index.js')
const sqliteBuild = path.join(serverDir, 'node_modules', 'better-sqlite3', 'build')
const backendPort = '3456'

function npmCliJs() {
  const binDir = path.dirname(process.execPath)
  const homebrewPrefix = process.execPath.includes('/Cellar/node/')
    ? process.execPath.split('/Cellar/node/')[0]
    : null
  const candidates = [
    path.resolve(binDir, '..', 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    path.resolve(binDir, '..', 'libexec', 'npm', 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    path.resolve(binDir, '..', '..', 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    path.resolve(binDir, '..', '..', 'libexec', 'npm', 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js'),
    ...(homebrewPrefix
      ? [path.join(homebrewPrefix, 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js')]
      : []),
  ]
  for (const c of candidates) {
    if (fs.existsSync(c)) return c
  }
  return null
}

function run(label, command, args, options = {}) {
  const r = spawnSync(command, args, { stdio: 'inherit', ...options })
  if (r.error) throw r.error
  if (r.status !== 0) {
    console.error(`[dev:backend] "${label}" exited with code ${r.status}`)
    process.exit(r.status ?? 1)
  }
}

function killPortIfBusy(port) {
  const lookup = spawnSync('lsof', ['-ti', `tcp:${port}`], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  })
  if (lookup.error) {
    console.warn(`[dev:backend] failed to check port ${port}: ${lookup.error.message}`)
    return
  }
  const pids = (lookup.stdout || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
  if (pids.length === 0) return

  console.warn(`[dev:backend] port ${port} busy; killing PID(s): ${pids.join(', ')}`)
  const kill = spawnSync('kill', ['-9', ...pids], { stdio: 'inherit' })
  if (kill.error || kill.status !== 0) {
    console.error(`[dev:backend] failed to free port ${port}`)
    process.exit(kill.status ?? 1)
  }
}

console.error(`[dev:backend] using ${process.execPath} — ${process.version} (NODE_MODULE_VERSION ${process.versions.modules})`)

killPortIfBusy(backendPort)

if (fs.existsSync(sqliteBuild)) {
  fs.rmSync(sqliteBuild, { recursive: true, force: true })
}

const npmCli = npmCliJs()
if (npmCli) {
  run(
    'npm rebuild better-sqlite3',
    process.execPath,
    [npmCli, 'rebuild', 'better-sqlite3'],
    { cwd: serverDir },
  )
} else {
  console.warn(
    '[dev:backend] npm-cli.js not found beside this Node; falling back to `npm` on PATH (may not match this Node).',
  )
  run(
    'npm rebuild better-sqlite3 (fallback)',
    'npm',
    ['rebuild', 'better-sqlite3'],
    { cwd: serverDir, shell: true },
  )
}

run('server', process.execPath, [indexJs], { cwd: root })
