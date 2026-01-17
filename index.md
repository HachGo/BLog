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
  <a href="/DEPLOY.md">部署指南</a>
  <a href="/README.md">项目结构</a>
  <a href="https://github.com/HachGo/BLog">GitHub 仓库</a>
</div>

<style>
.nav-grid {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}

.nav-grid a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.nav-grid a:hover {
  text-decoration: underline;
}
</style>