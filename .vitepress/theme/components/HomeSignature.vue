<template>
  <p class="home-signature">
    <span class="home-signature__mark" aria-hidden="true"></span>
    <span>Matrix Dream</span>
    <span class="home-signature__divider" aria-hidden="true">/</span>
    <span>个人知识花园</span>
  </p>
</template>

<style scoped>
.home-signature {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0 0 1.45rem;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.home-signature__mark {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 0.25rem var(--vp-c-brand-soft);
}

.home-signature__divider {
  color: var(--vp-c-text-3);
}
</style>
