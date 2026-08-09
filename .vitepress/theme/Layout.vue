<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomeSignature from './components/HomeSignature.vue'
import SocialDock from './components/SocialDock.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <SocialDock />
    </template>

    <template #nav-screen-content-after>
      <SocialDock screen />
    </template>

    <template #home-hero-info-before>
      <HomeSignature />
    </template>
  </DefaultTheme.Layout>
</template>
