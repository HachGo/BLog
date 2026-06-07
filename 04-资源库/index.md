---
layout: doc
title: 资源库
---

# 资源库

这里是各类优质资源的导航集合，分类整理了编程开发、人工智能、创意设计等实用资源。

<div class="resource-grid">
  <a href="/04-资源库/01_编程开发" class="resource-card">
    <div class="icon">💻</div>
    <div class="info">
      <h3>编程开发</h3>
      <p>编程语言、运维技术与开发工具</p>
    </div>
  </a>
  <a href="/04-资源库/02_人工智能" class="resource-card">
    <div class="icon">🤖</div>
    <div class="info">
      <h3>人工智能</h3>
      <p>AI 模型、绘画、LLM 与算力资源</p>
    </div>
  </a>
  <a href="/04-资源库/03_创意设计" class="resource-card">
    <div class="icon">🎨</div>
    <div class="info">
      <h3>创意设计</h3>
      <p>UI/UX、设计素材与灵感资源</p>
    </div>
  </a>
  <a href="/04-资源库/04_效率工具" class="resource-card">
    <div class="icon">⚡</div>
    <div class="info">
      <h3>效率工具</h3>
      <p>常用软件、在线工具与资源导航</p>
    </div>
  </a>
  <a href="/04-资源库/05_学术资讯" class="resource-card">
    <div class="icon">📚</div>
    <div class="info">
      <h3>学术资讯</h3>
      <p>新闻媒体、深度阅读与学术研究</p>
    </div>
  </a>
  <a href="/04-资源库/06_生活娱乐" class="resource-card">
    <div class="icon">🎮</div>
    <div class="info">
      <h3>生活娱乐</h3>
      <p>日常服务、求职考试与影视音乐</p>
    </div>
  </a>
  <a href="/04-资源库/Linux软件清单" class="resource-card">
    <div class="icon">🐧</div>
    <div class="info">
      <h3>Linux 软件</h3>
      <p>常用 Linux 软件推荐与配置</p>
    </div>
  </a>
  <a href="/04-资源库/win必备软件清单" class="resource-card">
    <div class="icon">🪟</div>
    <div class="info">
      <h3>Win 必备</h3>
      <p>Windows 必装软件与工具集</p>
    </div>
  </a>
</div>

<style>
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 32px;
}

.resource-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1) !important;
}

.resource-card:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-2);
}

.resource-card::after {
  display: none !important; /* 去除全局超链接的下划线动画 */
}

.resource-card .icon {
  font-size: 24px;
  line-height: 1;
  padding: 12px;
  background: var(--vp-c-bg-alt);
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.resource-card:hover .icon {
  background: var(--vp-c-bg);
  transform: scale(1.05);
}

.resource-card .info {
  flex: 1;
}

.resource-card h3 {
  margin: 0 !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  color: var(--vp-c-text-1) !important;
  line-height: 1.4 !important;
  border: none !important; 
  padding: 0 !important;
}

.resource-card:hover h3 {
  color: var(--vp-c-brand-1) !important;
}

.resource-card p {
  margin: 6px 0 0 !important;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}
</style>