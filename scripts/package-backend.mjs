import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, '..')
const serverDir = path.join(rootDir, 'server')
const releaseDir = path.join(rootDir, 'release', 'backend')
const includeDb = process.argv.includes('--with-db')

const serverPackageJsonPath = path.join(serverDir, 'package.json')

if (!fs.existsSync(serverPackageJsonPath)) {
  console.error('[pack:backend] server/package.json not found')
  process.exit(1)
}

const serverPackage = JSON.parse(fs.readFileSync(serverPackageJsonPath, 'utf8'))
const packageName = sanitizeName(serverPackage.name || 'backend-service')
const packageVersion = sanitizeName(serverPackage.version || '0.0.0')
const timestamp = formatTimestamp(new Date())
const bundleName = `${packageName}-${packageVersion}-${timestamp}${includeDb ? '-with-db' : ''}`
const stagingDir = path.join(releaseDir, bundleName)
const bundleServerDir = path.join(stagingDir, 'server')
const archivePath = path.join(releaseDir, `${bundleName}.tar.gz`)

const excludedDirs = new Set(['node_modules', 'uploads'])
const excludedFiles = new Set(['.DS_Store', 'data.sqlite-shm', 'data.sqlite-wal'])

if (!includeDb) {
  excludedFiles.add('data.sqlite')
}

fs.rmSync(stagingDir, { recursive: true, force: true })
fs.mkdirSync(bundleServerDir, { recursive: true })

copyDirectory(serverDir, bundleServerDir, '')
fs.mkdirSync(path.join(bundleServerDir, 'uploads', 'img'), { recursive: true })
fs.mkdirSync(path.join(bundleServerDir, 'uploads', 'video'), { recursive: true })
writeDeployReadme(path.join(stagingDir, 'README.deploy.txt'), bundleName, includeDb)

fs.mkdirSync(releaseDir, { recursive: true })
createTarball(releaseDir, bundleName, archivePath)

console.log(`[pack:backend] package directory: ${stagingDir}`)
console.log(`[pack:backend] archive file: ${archivePath}`)
console.log(`[pack:backend] mode: ${includeDb ? 'with data.sqlite' : 'without data.sqlite'}`)

function copyDirectory(sourceDir, targetDir, relativeDir) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true })

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name)
    const targetPath = path.join(targetDir, entry.name)
    const relativePath = relativeDir ? path.join(relativeDir, entry.name) : entry.name

    if (shouldSkip(relativePath, entry)) {
      continue
    }

    if (entry.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true })
      copyDirectory(sourcePath, targetPath, relativePath)
      continue
    }

    if (entry.isFile()) {
      fs.copyFileSync(sourcePath, targetPath)
    }
  }
}

function shouldSkip(relativePath, entry) {
  const parts = relativePath.split(path.sep)

  if (parts.some((part) => excludedDirs.has(part))) {
    return true
  }

  if (excludedFiles.has(entry.name)) {
    return true
  }

  return false
}

function createTarball(cwd, folderName, destinationPath) {
  fs.rmSync(destinationPath, { force: true })

  const result = spawnSync('tar', ['-czf', destinationPath, '-C', cwd, folderName], {
    stdio: 'inherit',
  })

  if (result.error) {
    console.error(`[pack:backend] failed to create tar.gz: ${result.error.message}`)
    process.exit(1)
  }

  if (result.status !== 0) {
    console.error(`[pack:backend] tar exited with code ${result.status}`)
    process.exit(result.status ?? 1)
  }
}

function writeDeployReadme(filePath, bundle, bundledDb) {
  const lines = [
    'Backend deployment bundle',
    `Bundle: ${bundle}`,
    '',
    'Contents:',
    '- server/ source files for runtime',
    '- empty uploads/img and uploads/video directories',
    bundledDb ? '- includes data.sqlite from the current workspace' : '- does not include data.sqlite',
    '',
    'Deploy steps:',
    '1. Extract the archive on the target server.',
    '2. cd server',
    '3. npm install --omit=dev',
    bundledDb ? '4. Start the service directly, or run seed only if you want to reset the database.' : '4. For a fresh deploy, run: npm run seed',
    '5. Start example: PORT=3456 ADMIN_PASSWORD=change-me SESSION_SECRET=change-me node index.js',
    '',
    'PM2 example:',
    'PORT=3456 ADMIN_PASSWORD=change-me SESSION_SECRET=change-me pm2 start index.js --name hxldy-server',
    '',
    'Notes:',
    '- better-sqlite3 is a native module, so install dependencies on the target machine.',
    '- Set a real ADMIN_PASSWORD before going live.',
  ]

  fs.writeFileSync(filePath, `${lines.join('\n')}\n`)
}

function formatTimestamp(date) {
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}-${hour}${minute}${second}`
}

function sanitizeName(value) {
  return String(value).replace(/[^a-zA-Z0-9._-]+/g, '-')
}
