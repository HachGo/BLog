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
    details: 系统化的知识管理方法论，帮助你更好地组织和利用知识。
    link: /01-知识管理
  - icon: 💻
    title: 思想感悟
    details: 编程技术、开发工具、框架使用等实用技术笔记。
    link: /02-思想感悟
  - icon: 📖
    title: 探索世界
    details: 书籍阅读笔记和思考，将知识内化为自己的理解。
    link: /03-探索世界

---

## Obsidian 语法支持

<div class="syntax-grid">

<div class="syntax-item">

**内部链接**

```markdown
[[笔记标题]]
```

</div>

<div class="syntax-item">

**标签**

```markdown
#标签名
```

</div>

<div class="syntax-item">

**高亮**

```markdown
==高亮文本==
```

</div>

<div class="syntax-item">

**Mermaid**

```mermaid
graph TD
  A --> B
```

</div>

<div class="syntax-item">

**数学公式**

```markdown
$E = mc^2$
```

</div>

<div class="syntax-item">

**提示框**

```markdown
::: tip
提示内容
:::
```

</div>

</div>

<style>
.syntax-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin: 32px 0;
}

.syntax-item {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
}

.syntax-item code {
  font-size: 0.85em;
  background: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>

## 最新更新


---

<div class="nav-grid">

<span>[部署指南](/DEPLOY.md)</span>
<span>[项目结构](/README.md)</span>
<span>[GitHub 仓库](https://github.com/HachGo/BLog)</span>

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
