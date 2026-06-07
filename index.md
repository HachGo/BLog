---
layout: home

hero:
  name: 探索世界
  text: 体验生命的旅程
  tagline: 愿每一个生命都能找到属于自己的独一无二的生命旅程
  actions:
    - theme: brand
      text: 快速开始
      link: /01-知识管理/快速开始
    - theme: alt
      text: 浏览笔记
      link: /02-思想感悟

features:
  - icon: 📚
    title: 知识管理
    details: 技术知识，项目管理，以及其他学习到的知识
    link: /01-知识管理
  - icon: 💻
    title: 思想感悟
    details: 人生历程中学习总结到的一些思想感悟，包括个人成长，投资理财
    link: /02-思想感悟
  - icon: 📖
    title: 探索世界
    details: 记录自己探索世界，体验生命历程的一些重要瞬间
    link: /03-探索世界
---

<div class="nav-grid">
  <a href="/DEPLOY.md">部署指南 <span class="arrow">→</span></a>
  <a href="/README.md">项目结构 <span class="arrow">→</span></a>
  <a href="https://github.com/HachGo/BLog">GitHub 仓库 <span class="arrow">→</span></a>
</div>

<style>
.nav-grid {
  display: flex;
  gap: 32px;
  justify-content: center;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}

.nav-grid a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.15s cubic-bezier(0.2, 0, 0, 1);
}

.nav-grid a:hover {
  color: var(--vp-c-text-1);
}

.nav-grid a .arrow {
  display: inline-block;
  transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.nav-grid a:hover .arrow {
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .nav-grid {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
</style>