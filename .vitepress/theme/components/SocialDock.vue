<script setup lang="ts">
import { computed, ref } from 'vue'
import { mediaLinks, personalNewsLink, type HeaderLink } from '../data/media'

defineProps<{ screen?: boolean }>()

const copiedLabel = ref<string | null>(null)
const visibleLinks = computed<HeaderLink[]>(() =>
  [...mediaLinks, personalNewsLink].filter((link) => link.href?.trim() || link.copyText),
)

function iconSource(icon: string, provider: HeaderLink['iconProvider'] = 'simple-icons') {
  if (provider === 'iconify') return `https://api.iconify.design/${icon}.svg`

  return `https://cdn.simpleicons.org/${icon}`
}

async function copyMediaName(label: string, value?: string) {
  if (!value) return

  try {
    await navigator.clipboard.writeText(value)
    copiedLabel.value = label
    window.setTimeout(() => {
      if (copiedLabel.value === label) copiedLabel.value = null
    }, 1800)
  } catch {
    copiedLabel.value = null
  }
}
</script>

<template>
  <nav class="social-dock" :class="{ 'social-dock--screen': screen }" aria-label="其他媒体链接">
    <template v-for="link in visibleLinks" :key="link.href || link.label">
      <a
        v-if="link.href"
        class="social-dock__item"
        :class="`social-dock__item--${link.icon}`"
        :href="link.href"
        target="_blank"
        rel="noreferrer"
        :aria-label="`访问 ${link.label}`"
        :title="link.label"
      >
        <img
          class="social-dock__icon"
          :src="iconSource(link.icon, link.iconProvider)"
          alt=""
          width="18"
          height="18"
        />
        <span class="social-dock__label">{{ link.label }}</span>
      </a>
      <button
        v-else
        class="social-dock__item"
        :class="`social-dock__item--${link.icon}`"
        type="button"
        :aria-label="`复制 ${link.label} 名称：${link.handle}`"
        :title="copiedLabel === link.label ? '已复制' : `复制${link.label}名称`"
        @click="copyMediaName(link.label, link.copyText)"
      >
        <img
          class="social-dock__icon"
          :src="iconSource(link.icon, link.iconProvider)"
          alt=""
          width="18"
          height="18"
        />
        <span class="social-dock__label">{{ copiedLabel === link.label ? '已复制' : link.label }}</span>
      </button>
    </template>
  </nav>
</template>

<style scoped>
.social-dock {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-left: 0.6rem;
}

.social-dock__item {
  display: inline-grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  padding: 0;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.social-dock__item:hover {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transform: translateY(-1px);
}

.social-dock__item:active {
  transform: translateY(0);
}

.social-dock__item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.social-dock__icon {
  display: block;
  width: 1.05rem;
  height: 1.05rem;
  object-fit: contain;
}

:global(.dark) .social-dock__item--github .social-dock__icon {
  filter: invert(1);
}

:global(.dark) .social-dock__item--material-symbols\:news .social-dock__icon {
  filter: invert(1);
}

.social-dock__label {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.social-dock--screen {
  justify-content: flex-start;
  margin: 1.5rem 0 0;
  gap: 0.5rem;
}

.social-dock--screen .social-dock__item {
  width: auto;
  height: 2.35rem;
  grid-template-columns: auto auto;
  gap: 0.55rem;
  padding: 0 0.8rem;
}

.social-dock--screen .social-dock__label {
  position: static;
  overflow: visible;
  width: auto;
  height: auto;
  clip: auto;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  font-weight: 650;
  white-space: nowrap;
}

@media (max-width: 959px) {
  .social-dock:not(.social-dock--screen) {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .social-dock__item {
    transition: none;
  }
}
</style>
