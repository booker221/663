<template>
  <section class="guarantee-section" id="guarantee-h5">
    <div class="guarantee-card">
      <!-- 标题 -->
      <h3 class="guarantee-title">担保验证</h3>
      <p class="guarantee-subtitle">首创担保与理赔一体化服务！</p>

      <!-- 输入区 -->
      <div class="input-wrapper">
        <div class="input-box">
          <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            v-model="inputId"
            class="guarantee-input"
            placeholder="请输入ID，ID是理赔唯一依据"
            @input="onInput"
            @keyup.enter="handleVerify"
          />
          <button class="paste-btn" @click="handlePaste">粘贴</button>
        </div>
      </div>

      <!-- 验证按钮 -->
      <button class="verify-btn" @click="handleVerify" :disabled="!inputId.trim()">
        <span>验证</span>
      </button>

      <!-- 验证结果 -->
      <transition name="result-fade">
        <div v-if="verifyResult !== null" :class="['verify-result', verifyResult ? 'success' : 'fail']">
          <svg v-if="verifyResult" class="result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" stroke="#16a34a" stroke-width="2"/><path d="M7 12.5l3 3 7-7" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <svg v-else class="result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" stroke="#dc2626" stroke-width="2"/><path d="M8 8l8 8M16 8l-8 8" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/></svg>
          <span class="result-text" v-if="verifyResult">验证通过！该ID为官方认证合作伙伴，放心合作。</span>
          <span class="result-text" v-else>验证失败！该ID不在官方认证列表中，请谨慎辨别，防止被骗。</span>
        </div>
      </transition>

      <!-- 底部提示 -->
      <p class="guarantee-footer">
        <span class="footer-note">合作ID是理赔的唯一依据！</span>
        <span class="footer-highlight">使用前请先验证网址是否加入担保，未来才能放心的使用或发起理赔。</span>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { GUARANTEE_ACCOUNTS, PROMOTE_PARTNERS, THIRD_PARTNERS } from '@/config/contacts.js'
import { showToast } from '@/utils/toast.js'

const inputId = ref('')
const verifyResult = ref(null)

// 收集所有官方 handles（包含相关部门的 handle）
const allOfficialHandles = (() => {
  const handles = [...GUARANTEE_ACCOUNTS]
  ;[...PROMOTE_PARTNERS, ...THIRD_PARTNERS].forEach(p => {
    if (p.handle && !handles.includes(p.handle)) {
      handles.push(p.handle)
    }
  })
  return handles.map(h => h.replace(/^@/, '').toLowerCase().trim())
})()

const onInput = () => {
  verifyResult.value = null
}

const handlePaste = async () => {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      const text = await navigator.clipboard.readText()
      if (text) {
        inputId.value = text.trim()
        verifyResult.value = null
        showToast('已粘贴', 'success')
      } else {
        showToast('剪贴板为空', 'warning')
      }
    } else {
      showToast('当前浏览器不支持粘贴功能，请手动输入', 'warning')
    }
  } catch (err) {
    showToast('粘贴失败，请手动输入ID', 'warning')
  }
}

const handleVerify = () => {
  const query = inputId.value.trim()
  if (!query) return

  const normalized = query.replace(/^@/, '').toLowerCase().trim()
  verifyResult.value = allOfficialHandles.includes(normalized)
}
</script>

<style scoped>
.guarantee-section {
  margin: 12px 12px 0;
}

.guarantee-card {
  background: #FFF;
  border-radius: 12px;
  padding: 24px 20px 20px;
  box-shadow: 0 4px 8px 0 rgba(163, 191, 222, 0.24);
  text-align: center;
}

/* 标题 */
.guarantee-title {
  font-family: "PingFang SC", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--blue);
  margin: 0 0 6px;
}

.guarantee-subtitle {
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  color: #6C7BA8;
  margin: 0 0 20px;
}

/* 输入区 */
.input-wrapper {
  margin: 0 0 16px;
}

.input-box {
  display: flex;
  height: 48px;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 10px;
  background: #E9F3FF;
  border: none;
  box-shadow: 0 1px 0.5px 0 #B8D3F4 inset;
  transition: box-shadow 0.25s;
}

.input-box:focus-within {
  box-shadow: 0 1px 0.5px 0 #B8D3F4 inset, 0 0 0 2px rgba(70, 118, 255, 0.2);
}

.search-icon {
  color: #A3B5D0;
  flex-shrink: 0;
}

.guarantee-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: var(--text);
  font-family: "PingFang SC", sans-serif;
  min-width: 0;
}

.guarantee-input::placeholder {
  color: #A3B5D0;
  font-size: 13px;
}

.paste-btn {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 10px;
  border: none;
  background: rgba(70, 118, 255, 0.24);
  font-size: 13px;
  font-weight: 600;
  color: #4676FF;
  cursor: pointer;
  font-family: "PingFang SC", sans-serif;
  -webkit-tap-highlight-color: transparent;
}

.paste-btn:active {
  background: #E4EBF6;
  transform: scale(0.96);
}

/* 验证按钮 */
.verify-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  max-width: 280px;
  margin: 0 auto 16px;
  padding: 12px 0;
  border: none;
  border-radius: 999px;
  background: linear-gradient(180deg, #FF5E3A 0%, #E6302A 50%, #C41F17 100%);
  box-shadow: 0 4px 16px rgba(230, 48, 39, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  font-family: "PingFang SC", sans-serif;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s;
}

.verify-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.verify-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 验证结果 */
.verify-result {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 10px;
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: "PingFang SC", sans-serif;
  line-height: 1.5;
}

.verify-result.success {
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #16a34a;
}

.verify-result.fail {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #dc2626;
}

.result-icon {
  flex-shrink: 0;
}

/* 结果动画 */
.result-fade-enter-active {
  animation: resultIn 0.35s ease-out;
}

.result-fade-leave-active {
  animation: resultIn 0.2s ease-in reverse;
}

@keyframes resultIn {
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 底部提示 */
.guarantee-footer {
  font-family: "PingFang SC", sans-serif;
  font-size: 12px;
  font-style: normal;
  line-height: normal;
  margin: 0;
}

.footer-note {
  color: #414A65;
  font-weight: 400;
}

.footer-highlight {
  color: #00D800;
  font-weight: 500;
}
</style>
