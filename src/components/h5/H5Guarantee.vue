<template>
  <section class="guarantee-section" id="guarantee">
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
          <div class="paste-btn" role="button" tabindex="0" @click="handlePaste" @keydown.enter.prevent="handlePaste" @keydown.space.prevent="handlePaste">粘贴</div>
        </div>
      </div>

      <!-- 验证按钮 -->
      <div
        :class="['verify-btn', { disabled: isVerifyDisabled }]"
        role="button"
        :tabindex="isVerifyDisabled ? -1 : 0"
        :aria-disabled="isVerifyDisabled"
        @click="handleVerify"
        @keydown.enter.prevent="handleVerify"
        @keydown.space.prevent="handleVerify"
      >
        <div>验证</div>
      </div>

      <!-- 验证结果 -->
      <transition name="result-fade">
        <div v-if="verifyResult !== null" :class="['verify-result', verifyResult ? 'success' : 'fail']">
          <svg v-if="verifyResult" class="result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" stroke="#16a34a" stroke-width="2"/><path d="M7 12.5l3 3 7-7" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <svg v-else class="result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" stroke="#dc2626" stroke-width="2"/><path d="M8 8l8 8M16 8l-8 8" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/></svg>
          <div class="result-text" v-if="verifyResult">验证通过！该ID为官方认证合作伙伴，放心合作。</div>
          <div class="result-text" v-else>验证失败！该ID不在官方认证列表中，请谨慎辨别，防止被骗。</div>
        </div>
      </transition>

      <!-- 底部提示 -->
      <div class="guarantee-footer">
        <div class="footer-note">合作ID是理赔的唯一依据！</div>
        <div class="footer-highlight">使用前请先验证网址是否加入担保，未来才能放心的使用或发起理赔。</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { GUARANTEE_ACCOUNTS, PROMOTE_PARTNERS, THIRD_PARTNERS } from '@/config/contacts.js'
import { showToast } from '@/utils/toast.js'

const inputId = ref('')
const verifyResult = ref(null)
const isVerifyDisabled = computed(() => !inputId.value.trim())

// 响应式计算所有官方 handles（API 更新后自动变化）
const allOfficialHandles = computed(() => {
  const handles = [...GUARANTEE_ACCOUNTS]
  ;[...PROMOTE_PARTNERS, ...THIRD_PARTNERS].forEach(p => {
    if (p.handle && !handles.includes(p.handle)) {
      handles.push(p.handle)
    }
  })
  return handles.map(h => h.replace(/^@/, '').toLowerCase().trim())
})

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
  if (isVerifyDisabled.value) return
  const query = inputId.value.trim()
  if (!query) return

  const normalized = query.replace(/^@/, '').toLowerCase().trim()
  verifyResult.value = allOfficialHandles.value.includes(normalized)
}
</script>

<style scoped>
.guarantee-section {
  margin: 12px 12px 0;
}

.guarantee-card {
  background:
    linear-gradient(180deg, rgba(255, 220, 105, 0.07) 0%, rgba(255, 220, 105, 0) 24%),
    linear-gradient(180deg, rgba(17, 14, 7, 0.98) 0%, rgba(6, 5, 3, 0.98) 100%);
  border-radius: 12px;
  padding: 24px 20px 20px;
  border: 1px solid rgba(255, 216, 106, 0.18);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  text-align: center;
}

/* 标题 */
.guarantee-title {
  color: #ffdc69;
  text-align: center;
  font-family: "PingFang SC", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0 0 6px;
}

.guarantee-subtitle {
  color: #d6c28a;
  font-family: "PingFang SC", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  background: rgba(255, 220, 105, 0.08);
  border: 1px solid rgba(255, 216, 106, 0.16);
  box-shadow: inset 0 1px 0 rgba(255, 220, 105, 0.08);
  transition: box-shadow 0.25s;
}

.input-box:focus-within {
  box-shadow: inset 0 1px 0 rgba(255, 220, 105, 0.12), 0 0 0 2px rgba(255, 216, 106, 0.12);
}

.search-icon {
  color: #cfaf54;
  flex-shrink: 0;
}

.guarantee-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #f4e4ad;
  font-family: "PingFang SC", sans-serif;
  min-width: 0;
}

.guarantee-input::placeholder {
  color: #8f7e47;
  font-size: 13px;
}

.paste-btn {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 10px;
  border: none;
  background: rgba(255, 220, 105, 0.14);
  font-size: 13px;
  font-weight: 600;
  color: #ffdc69;
  cursor: pointer;
  font-family: "PingFang SC", sans-serif;
  -webkit-tap-highlight-color: transparent;
}

.paste-btn:active {
  background: rgba(255, 220, 105, 0.22);
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
  background: linear-gradient(180deg, #ffdc69 0%, #b48735 100%);
  box-shadow: 0 4px 16px rgba(255, 216, 106, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  color: #000;
  font-size: 16px;
  font-weight: 700;
  font-family: "PingFang SC", sans-serif;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s;
}

.verify-btn:active:not(.disabled) {
  transform: scale(0.97);
}

.verify-btn.disabled {
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
  background: rgba(255, 220, 105, 0.08);
  border: 1px solid rgba(255, 220, 105, 0.22);
  color: #ffdc69;
}

.verify-result.fail {
  background: rgba(180, 135, 53, 0.12);
  border: 1px solid rgba(180, 135, 53, 0.28);
  color: #f0c366;
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
  color: #d6c28a;
  font-weight: 400;
}

.footer-highlight {
  color: #ffdc69;
  font-weight: 500;
}
</style>
