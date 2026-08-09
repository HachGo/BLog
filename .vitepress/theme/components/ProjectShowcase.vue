<script setup lang="ts">
import heroImage from '../../../assets/projects/project-index-hero.webp'
import { projects } from '../data/projects'
</script>

<template>
  <div class="projects-page">
    <header class="projects-hero">
      <div class="projects-hero__copy">
        <p class="projects-kicker">项目</p>
        <h1>项目与实践</h1>
        <p>这里汇总持续维护的开源项目、实验与可访问作品。</p>
      </div>

      <figure class="projects-hero__visual">
        <img :src="heroImage" alt="一张打开的笔记本、键盘与绿叶的桌面照片" width="1536" height="1024" />
      </figure>
    </header>

    <section class="projects-catalog" aria-labelledby="projects-catalog-title">
      <div class="projects-catalog__heading">
        <h2 id="projects-catalog-title">公开项目</h2>
        <p>每个项目均附有代码仓库，在线地址会在可用时一并列出。</p>
      </div>

      <div v-if="projects.length" class="projects-grid">
        <article v-for="(project, index) in projects" :key="project.repository" class="project-card" :class="{ 'project-card--featured': index === 0 }">
          <div class="project-card__body">
            <p class="project-card__category">{{ project.category }}</p>
            <h3>{{ project.title }}</h3>
            <p class="project-card__description">{{ project.description }}</p>
            <ul class="project-card__tags" aria-label="技术标签">
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>

          <nav class="project-card__actions" :aria-label="`${project.title} 的链接`">
            <a :href="project.repository" target="_blank" rel="noreferrer">GitHub 仓库 <span aria-hidden="true">↗</span></a>
            <a v-if="project.website" :href="project.website" target="_blank" rel="noreferrer">打开站点 <span aria-hidden="true">↗</span></a>
          </nav>
        </article>
      </div>

      <p v-else class="projects-empty">项目清单正在整理。</p>
    </section>
  </div>
</template>

<style scoped>
.projects-page {
  --project-accent: var(--vp-c-brand-1);
  --project-rule: var(--vp-c-divider);
  padding: 1.5rem 0 3.5rem;
}

.projects-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(19rem, 1.12fr);
  align-items: end;
  gap: clamp(2.5rem, 7vw, 6.5rem);
  padding: 1.25rem 0 4rem;
}

.projects-kicker {
  margin: 0 0 0.95rem;
  color: var(--project-accent);
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.projects-hero h1,
.projects-catalog h2,
.project-card h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-display);
  font-weight: 700;
  letter-spacing: -0.055em;
}

.projects-hero h1 {
  font-size: clamp(3rem, 6vw, 5.25rem);
  line-height: 1.01;
}

.projects-hero__copy > p:last-child {
  max-width: 27rem;
  margin: 1.3rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.78;
}

.projects-hero__visual {
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: 0.9rem;
  aspect-ratio: 1.5;
  background: var(--vp-c-bg-soft);
}

.projects-hero__visual::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, color-mix(in srgb, var(--vp-c-bg) 18%, transparent), transparent 55%);
  content: "";
  pointer-events: none;
}

.projects-hero__visual img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projects-catalog {
  border-top: 1px solid var(--project-rule);
  padding-top: 3.4rem;
}

.projects-catalog__heading {
  max-width: 34rem;
}

.projects-catalog h2 {
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  line-height: 1.12;
}

.projects-catalog__heading p {
  margin: 0.9rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.7;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 0.85rem;
  margin-top: 2rem;
}

.project-card {
  display: flex;
  min-height: 18rem;
  flex-direction: column;
  grid-column: span 6;
  border: 1px solid var(--project-rule);
  border-radius: 0.9rem;
  padding: 1.35rem;
  background: color-mix(in srgb, var(--vp-c-bg) 93%, var(--vp-c-bg-soft));
  transition: border-color 200ms ease, background-color 200ms ease, transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
}

.project-card--featured {
  grid-column: span 12;
  min-height: 21rem;
  background: color-mix(in srgb, var(--vp-c-bg) 85%, var(--vp-c-brand-soft));
}

.project-card:hover {
  border-color: var(--project-accent);
  background: var(--vp-c-bg-soft);
  transform: translateY(-3px);
}

.project-card__category {
  margin: 0;
  color: var(--project-accent);
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.07em;
}

.project-card h3 {
  margin-top: 3.5rem;
  font-size: clamp(1.75rem, 4vw, 2.8rem);
  line-height: 1.05;
}

.project-card:not(.project-card--featured) h3 {
  font-size: 1.55rem;
}

.project-card__description {
  max-width: 42rem;
  margin: 0.8rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
  line-height: 1.72;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 0.75rem;
  margin: 1.3rem 0 0;
  padding: 0;
  list-style: none;
}

.project-card__tags li {
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.project-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.15rem;
  margin-top: auto;
  padding-top: 1.65rem;
}

.project-card__actions a {
  color: var(--project-accent);
  font-size: 0.84rem;
  font-weight: 700;
  text-decoration: none;
}

.project-card__actions a span {
  display: inline-block;
  margin-left: 0.16rem;
  transition: transform 180ms ease;
}

.project-card__actions a:hover span {
  transform: translate(2px, -2px);
}

.project-card__actions a:focus-visible {
  outline: 2px solid var(--project-accent);
  outline-offset: 3px;
}

.projects-empty {
  margin: 2rem 0 0;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .projects-page {
    padding-top: 0.5rem;
  }

  .projects-hero {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-bottom: 2.7rem;
  }

  .projects-hero h1 {
    font-size: clamp(2.75rem, 12vw, 4.1rem);
  }

  .projects-hero__visual {
    aspect-ratio: 1.35;
  }

  .projects-catalog {
    padding-top: 2.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card,
  .project-card--featured {
    min-height: 16.5rem;
    grid-column: auto;
  }

  .project-card h3 {
    margin-top: 2.6rem;
    font-size: 1.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card,
  .project-card__actions a span {
    transition: none;
  }
}
</style>
