#!/bin/bash
# ============================================================
#  合兴落地页 - 宝塔面板部署脚本
#  用法: ./deploy.sh [选项]
#
#  示例:
#    ./deploy.sh                  # 完整部署（前端 + 后端）
#    ./deploy.sh --frontend       # 只部署前端
#    ./deploy.sh --backend        # 只部署后端
# ============================================================

set -e

# ==================== 配置区域（按需修改） ====================
SERVER_USER="${SERVER_USER:-root}"                # 服务器用户名（可通过环境变量覆盖）
SERVER_HOST="${SERVER_HOST:-}"                    # 服务器IP或域名（必填，建议环境变量注入）
SERVER_PORT="${SERVER_PORT:-22}"                  # SSH 端口

# 宝塔面板路径
SITE_DIR="/www/wwwroot/hxldy"              # 宝塔网站根目录（前端 dist）
SERVER_DEPLOY_DIR="/www/wwwroot/hxldy-server"  # 后端代码目录

NODE_PORT="${NODE_PORT:-3456}"                    # Express 监听端口
ADMIN_PASSWORD="${ADMIN_PASSWORD:-}"              # 管理后台密码（必填，禁止默认弱口令）
# ============================================================

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()   { echo -e "${GREEN}✅ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; exit 1; }
info()  { echo -e "${CYAN}📦 $1${NC}"; }

# 项目根目录
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
DIST_DIR="$PROJECT_DIR/dist"
SERVER_DIR="$PROJECT_DIR/server"

# ==================== 参数解析 ====================
DEPLOY_FRONTEND=true
DEPLOY_BACKEND=true

for arg in "$@"; do
  case $arg in
    --frontend)  DEPLOY_FRONTEND=true; DEPLOY_BACKEND=false ;;
    --backend)   DEPLOY_FRONTEND=false; DEPLOY_BACKEND=true ;;
    --help|-h)
      echo "用法: ./deploy.sh [选项]"
      echo "  --frontend   只部署前端"
      echo "  --backend    只部署后端"
      echo "  -h, --help   显示帮助"
      exit 0
      ;;
  esac
done

# ==================== 前置检查 ====================
if [ -z "$SERVER_HOST" ]; then
  error "请先编辑 deploy.sh，填写 SERVER_HOST（服务器IP或域名）"
fi
if [ -z "$ADMIN_PASSWORD" ]; then
  error "请设置 ADMIN_PASSWORD 环境变量，避免使用硬编码默认密码"
fi

# SSH 连接复用（只需输入一次密码）
SSH_CONTROL_PATH="/tmp/ssh_deploy_$$"
SSH_OPTS="-p $SERVER_PORT -o ControlMaster=auto -o ControlPath=$SSH_CONTROL_PATH -o ControlPersist=300"
SSH_CMD="ssh $SSH_OPTS $SERVER_USER@$SERVER_HOST"

# 脚本结束时关闭连接
cleanup() {
  ssh -o ControlPath=$SSH_CONTROL_PATH -O exit $SERVER_USER@$SERVER_HOST 2>/dev/null || true
}
trap cleanup EXIT

# 建立 SSH 连接（输入一次密码）
info "连接服务器（输入密码）..."
$SSH_CMD "echo ok" > /dev/null || error "无法连接到服务器 $SERVER_HOST，请检查密码或网络"
log "服务器连接正常（后续操作无需再输密码）"

# ==================== 部署前端 ====================
deploy_frontend() {
  info "部署前端..."

  # 本地构建
  info "构建前端项目..."
  cd "$PROJECT_DIR"
  npm run build || error "前端构建失败"

  if [ ! -d "$DIST_DIR" ]; then
    error "dist 目录不存在，构建可能失败"
  fi

  # 确保远程目录存在
  $SSH_CMD "mkdir -p $SITE_DIR"

  # 上传 dist 内容到宝塔网站根目录
  info "上传前端文件到服务器..."
  rsync -avz --delete \
    -e "ssh $SSH_OPTS" \
    "$DIST_DIR/" "$SERVER_USER@$SERVER_HOST:$SITE_DIR/"

  log "前端部署完成 → $SITE_DIR"
}

# ==================== 部署后端 ====================
deploy_backend() {
  info "部署后端..."

  # 确保远程目录存在
  $SSH_CMD "mkdir -p $SERVER_DEPLOY_DIR"

  # 上传 server 代码（排除 node_modules、数据库、uploads）
  info "上传后端代码到服务器..."
  rsync -avz --delete \
    -e "ssh $SSH_OPTS" \
    --exclude='node_modules' \
    --exclude='data.sqlite' \
    --exclude='data.sqlite-shm' \
    --exclude='data.sqlite-wal' \
    --exclude='uploads' \
    "$SERVER_DIR/" "$SERVER_USER@$SERVER_HOST:$SERVER_DEPLOY_DIR/"

  # 在服务器上安装依赖并重启
  info "安装依赖并重启服务..."
  $SSH_CMD << BACKEND_EOF
    set -e
    cd $SERVER_DEPLOY_DIR

    # 确保 uploads 目录存在
    mkdir -p uploads

    # 确保有新版 GCC（CentOS 7 默认 GCC 4.8 不支持 C++14/C++20）
    if ! [ -f /opt/rh/devtoolset-11/enable ]; then
      echo "🔧 安装编译工具链（仅首次）..."

      # CentOS 7 已 EOL，将 yum 源指向 vault 归档镜像
      sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*.repo 2>/dev/null || true
      sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*.repo 2>/dev/null || true

      yum install -y centos-release-scl 2>/dev/null || true

      # SCL 源也需要指向 vault
      sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-SCLo-*.repo 2>/dev/null || true
      sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-SCLo-*.repo 2>/dev/null || true
      sed -i 's|# baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-SCLo-*.repo 2>/dev/null || true

      yum install -y devtoolset-11-gcc devtoolset-11-gcc-c++
    fi

    # 安装依赖（激活新版 GCC 编译原生模块）
    echo "📦 安装 Node 依赖..."
    source /opt/rh/devtoolset-11/enable
    gcc --version | head -1
    npm install --production

    # 初始化数据库（仅首次需要）
    if [ ! -f data.sqlite ]; then
      echo "🌱 初始化数据库..."
      npm run seed
    fi

    # 用 PM2 管理进程
    export PORT=$NODE_PORT
    export ADMIN_PASSWORD="$ADMIN_PASSWORD"

    if command -v pm2 &> /dev/null; then
      if pm2 describe hxldy-server > /dev/null 2>&1; then
        echo "🔄 重启服务..."
        pm2 restart hxldy-server --update-env
      else
        echo "🚀 首次启动服务..."
        PORT=$NODE_PORT ADMIN_PASSWORD="$ADMIN_PASSWORD" pm2 start index.js --name hxldy-server
      fi
      pm2 save
      echo ""
      pm2 list
    else
      echo "⚠️  PM2 未安装，请在宝塔面板中安装 PM2管理器"
      echo "   然后手动添加项目: $SERVER_DEPLOY_DIR/index.js"
    fi
BACKEND_EOF

  log "后端部署完成 → $SERVER_DEPLOY_DIR"
}

# ==================== 执行部署 ====================
echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║      合兴落地页 - 宝塔面板部署脚本            ║"
echo "╠══════════════════════════════════════════════╣"
echo "║  服务器:   $SERVER_USER@$SERVER_HOST"
echo "║  前端目录: $SITE_DIR"
echo "║  后端目录: $SERVER_DEPLOY_DIR"
echo "║  Node端口: $NODE_PORT"
echo "║  前端:     $( $DEPLOY_FRONTEND && echo '✅ 部署' || echo '⏭️  跳过' )"
echo "║  后端:     $( $DEPLOY_BACKEND && echo '✅ 部署' || echo '⏭️  跳过' )"
echo "╚══════════════════════════════════════════════╝"
echo ""

read -p "确认部署？(y/N) " confirm
if [[ "$confirm" != [yY] ]]; then
  echo "已取消"
  exit 0
fi

# 部署前端
if $DEPLOY_FRONTEND; then
  deploy_frontend
fi

# 部署后端
if $DEPLOY_BACKEND; then
  deploy_backend
fi

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║             🎉 文件上传完成！                ║"
echo "╠══════════════════════════════════════════════╣"
echo "║                                              ║"
echo "║  📋 还需要在宝塔面板中操作：                   ║"
echo "║                                              ║"
echo "║  1. 网站 → 添加站点                           ║"
echo "║     根目录: $SITE_DIR"
echo "║                                              ║"
echo "║  2. 站点设置 → 反向代理                       ║"
echo "║     /api  → http://127.0.0.1:$NODE_PORT"
echo "║     /admin → http://127.0.0.1:$NODE_PORT"
echo "║                                              ║"
echo "║  3. PM2管理器 → 添加项目                      ║"
echo "║     启动文件: $SERVER_DEPLOY_DIR/index.js"
echo "║                                              ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
