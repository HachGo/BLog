<template>
  <div class="protected-content">
    <div v-if="loading" class="protected-loading">
      <span class="protected-spinner"></span>
      <p>正在解密...</p>
    </div>

    <div v-else-if="error" class="protected-error">
      <div class="protected-error-icon">🔒</div>
      <p class="protected-error-title">解密失败</p>
      <p class="protected-error-msg">{{ error }}</p>
      <button class="protected-retry-btn" @click="retry">重新输入密码</button>
    </div>

    <div v-else-if="!decrypted" class="protected-form">
      <div class="protected-form-icon">🔐</div>
      <h2 class="protected-form-title">此内容已加密</h2>
      <p class="protected-form-desc">请输入密码以查看内容</p>
      <form @submit.prevent="handleSubmit" class="protected-input-group">
        <input
          ref="passwordInput"
          v-model="password"
          type="password"
          placeholder="输入密码..."
          class="protected-input"
          :disabled="submitting"
          autocomplete="off"
        />
        <button type="submit" class="protected-submit-btn" :disabled="submitting || !password">
          {{ submitting ? '验证中...' : '解密' }}
        </button>
      </form>
    </div>

    <div v-else class="protected-rendered vp-doc" v-html="decrypted"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useData } from 'vitepress'
import { marked } from 'marked'

const { page } = useData()

const password = ref('')
const decrypted = ref(null)
const error = ref(null)
const loading = ref(false)
const submitting = ref(false)
const passwordInput = ref(null)

let encryptedData = null
let rememberedPassword = null

try {
  rememberedPassword = sessionStorage.getItem('_protected_pw')
} catch {}

/**
 * Derive AES-256 key from password using PBKDF2
 */
async function deriveKey(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  )
}

/**
 * Decrypt ciphertext with AES-256-GCM
 */
async function decrypt(ciphertext, key, iv) {
  try {
    const plainBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      ciphertext
    )
    return new TextDecoder().decode(plainBuffer)
  } catch {
    return null
  }
}

/**
 * Main decryption flow
 */
async function tryDecrypt(pw) {
  if (!encryptedData) return null
  error.value = null

  const salt = Uint8Array.from(atob(encryptedData.salt), c => c.charCodeAt(0))
  const iv = Uint8Array.from(atob(encryptedData.iv), c => c.charCodeAt(0))
  const combined = Uint8Array.from(atob(encryptedData.ciphertext), c => c.charCodeAt(0))

  // Split ciphertext and authTag (last 16 bytes = GCM auth tag)
  const ciphertext = combined.slice(0, -16)
  const authTag = combined.slice(-16)

  // Web Crypto expects ciphertext + authTag combined
  const cipherBuffer = new Uint8Array(ciphertext.length + authTag.length)
  cipherBuffer.set(ciphertext, 0)
  cipherBuffer.set(authTag, ciphertext.length)

  const key = await deriveKey(pw, salt)
  return decrypt(cipherBuffer, key, iv)
}

async function handleSubmit() {
  if (!password.value) return

  submitting.value = true
  loading.value = true
  error.value = null

  // Brief delay so the loading state is visible
  await new Promise(r => setTimeout(r, 150))

  const result = await tryDecrypt(password.value)

  if (result !== null) {
    try {
      sessionStorage.setItem('_protected_pw', password.value)
    } catch {}

    decrypted.value = marked.parse(result)
    loading.value = false
  } else {
    loading.value = false
    password.value = ''
    await nextTick()
    passwordInput.value?.focus()
  }

  submitting.value = false
}

function retry() {
  decrypted.value = null
  error.value = null
  password.value = ''
  nextTick(() => passwordInput.value?.focus())
}

onMounted(async () => {
  // Use VitePress's useData to get relative path, build the JSON URL
  const relativePath = page.value.relativePath?.replace(/\.md$/, '')
  if (!relativePath) {
    error.value = '无法获取页面路径。'
    return
  }

  const jsonUrl = `/encrypted/${relativePath}.json`

  try {
    const res = await fetch(jsonUrl)
    if (!res.ok) {
      error.value = '未找到加密数据。'
      return
    }
    encryptedData = await res.json()
  } catch {
    error.value = '加载加密数据失败。'
    return
  }

  // Auto-decrypt with remembered password
  if (rememberedPassword) {
    loading.value = true
    const result = await tryDecrypt(rememberedPassword)
    if (result !== null) {
      decrypted.value = marked.parse(result)
    } else {
      try { sessionStorage.removeItem('_protected_pw') } catch {}
      rememberedPassword = null
    }
    loading.value = false
    return
  }

  await nextTick()
  passwordInput.value?.focus()
})
</script>

<style scoped>
@import '../styles/protected.css';
</style>
