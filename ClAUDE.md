
# Obsidian笔记库发布为VitePress静态网站 - 项目文档

## 一、项目总体描述

### 1.1 项目概述
将现有的Obsidian笔记库（BLog）转换为一个基于VitePress的静态网站，实现：
- **自动转换**：Obsidian笔记结构 → VitePress网站结构
- **自动部署**：GitHub推送后自动构建并发布到GitHub Pages
- **双轨并行**：保持Obsidian编辑体验的同时拥有美观的网站展示

### 1.2 技术栈
- **静态网站生成器**：VitePress 1.x
- **部署平台**：GitHub Pages
- **CI/CD**：GitHub Actions
- **源格式**：Markdown（兼容Obsidian语法）
- **主题**：VitePress默认主题 + 自定义CSS
- **数学公式**：KaTeX (markdown-it-mathjax3)
- **图表支持**：Mermaid (vitepress-plugin-mermaid)

### 1.3 项目结构（已完成）
```
BLog/
├── .github/workflows/          # GitHub Actions自动化部署脚本
├── .obsidian/                  # Obsidian配置（不发布）
├── .vitepress/                 # VitePress核心配置
│   ├── config.ts               # 主配置文件
│   ├── 404.md                  # 404页面
│   ├── public/                 # 静态资源
│   │   ├── favicon.svg         # 网站图标
│   │   └── CNAME               # 自定义域名（模板）
│   ├── theme/                  # 自定义主题
│   │   ├── index.ts            # 主题入口
│   │   ├── custom.css          # 自定义样式（Obsidian风格）
│   │   └── config-helper.ts    # Vue配置辅助
│   └── utils/                  # 工具函数
│       ├── sidebar.ts          # 侧边栏生成
│       ├── obsidian-adapter.ts # Obsidian语法适配
│       └── posts.data.js       # 首页文章数据
├── 📁 01-知识管理/             # 知识管理相关笔记
├── 📁 02-思想感悟/             # 思想感悟与思考
├── 📁 03-探索世界/             # 探索世界相关内容
├── 📁 04-资源库/               # 各类优质资源导航
│   ├── 01_技术学习.md
│   ├── 02_新闻媒体.md
│   ├── 03_创意设计.md
│   ├── 04_生活服务.md
│   ├── 05_娱乐休闲.md
│   ├── 06_工具资源.md
│   ├── 07_数据库运维.md
│   ├── 08_学术研究.md
│   └── index.md                # 资源库首页导航
├── .editorconfig               # 编辑器配置
├── .gitignore                  # Git忽略规则
├── DEPLOY.md                   # 部署指南
├── index.md                    # 网站首页
├── package.json                # 项目依赖
└── README.md                   # 项目说明文档
```

### 1.4 核心功能（已完成）
✅ 兼容Obsidian语法：支持内部链接`[[ ]]`、标签`#tag`、高亮`== ==`
✅ 侧边栏配置：手动配置，支持多级嵌套
✅ 搜索功能：本地全文搜索
✅ 响应式设计：适配移动端和桌面端
✅ 暗色/浅色主题：自动适配系统主题
✅ 数学公式：KaTeX 支持 (`$...$` 和 `$$...$$`)
✅ Mermaid图表：流程图、时序图、状态图、类图
✅ 自定义容器：tip/warning/danger/info 提示框
✅ 自动部署：GitHub Actions 自动部署到 Pages
✅ 404页面：自定义友好404页面

---

## 二、配置说明

### 2.1 配置文件结构
```
.vitepress/
├── config.ts                    # 主配置文件
├── 404.md                       # 404页面
├── public/                      # 静态资源目录
│   ├── favicon.svg              # 网站图标
│   └── CNAME                    # 自定义域名（模板）
└── theme/                       # 自定义主题
    ├── index.ts                 # 主题入口
    ├── custom.css               # 自定义样式（Obsidian风格）
    └── config-helper.ts         # Vue配置辅助
```

### 2.2 核心配置文件（config.ts）

**包含的功能：**
1. **基础配置**
   - 站点标题、描述、语言
   - 深色/浅色模式切换
   - Logo配置
   - cleanUrls：干净的URL

2. **导航栏配置**
   - 顶部导航菜单
   - 外部链接（GitHub）
   - 搜索框（本地搜索）

3. **侧边栏配置**
   - 使用 vitepress-sidebar 自动生成
   - 支持按数字排序（sortMenusOrderNumericallyFromTitle）
   - 支持文件夹索引页面

4. **功能配置**
   - 本地搜索
   - 社交媒体链接
   - 页脚配置
   - 编辑链接（链接到GitHub）

5. **Markdown配置**
   - 代码块主题：dracula
   - 行号显示
   - 数学公式（KaTeX）
   - Mermaid图表
   - 自定义容器（tip/warning/danger/info）

### 2.3 自定义主题（custom.css）

**包含的样式：**
1. **Obsidian风格优化**
   - 内部链接样式（虚线下划线）
   - 标签样式（`#tag`圆角胶囊样式）
   - 高亮样式（黄色渐变背景）
   - 引用块样式（左侧蓝色边框）

2. **暗色主题优化**
   - Obsidian风格的暗色配色
   - 代码块语法高亮

3. **动画效果**
   - 页面淡入动画
   - 链接悬停下划线动画
   - 卡片悬停效果

4. **响应式设计**
   - 移动端适配
   - 打印样式

---

## 三、GitHub Actions 自动发布

### 3.1 工作流文件
位置：`.github/workflows/deploy.yml`

**工作流步骤：**
1. **quality-check**：代码质量检查
2. **build-and-deploy**：构建并部署到 GitHub Pages

**触发条件：**
- 推送到 main 分支时触发
- 支持手动触发（workflow_dispatch）

### 3.2 GitHub Pages 配置

1. **启用 Pages**
   - 仓库 → Settings → Pages
   - Source 选择 "GitHub Actions"

2. **自定义域名（可选）**
   - 编辑 `.vitepress/public/CNAME` 填入域名
   - 在域名服务商处添加 DNS 记录

---

## 四、项目完成状态

### 4.1 任务完成清单

#### 第一阶段：基础框架搭建 ✅ 已完成
- [x] 初始化package.json
- [x] 创建.vitepress基础目录结构
- [x] 编写config.ts配置文件
- [x] 创建首页index.md
- [x] 编写README.md项目说明

#### 第二阶段：核心功能实现 ✅ 已完成
- [x] sidebar.ts 侧边栏生成工具
- [x] custom.css 自定义样式（Obsidian风格）
- [x] obsidian-adapter.ts Obsidian语法适配器
- [x] 搜索功能（本地搜索）
- [x] 数学公式支持（KaTeX）
- [x] Mermaid图表支持

#### 第三阶段：自动化部署 ✅ 已完成
- [x] GitHub Actions工作流文件
- [x] DEPLOY.md 部署指南
- [x] CNAME 自定义域名支持
- [x] 404页面

#### 第四阶段：优化和完善 ✅ 已完成
- [x] 移动端体验优化
- [x] 功能展示页面（02-技术笔记/功能展示.md）

#### 第五阶段：内容扩展 ✅ 已完成
- [x] 新增04-资源库分类目录
- [x] 创建资源库首页导航页面
- [x] 配置资源库侧边栏和导航

### 4.2 站点配置

**当前配置（已配置完成）：**
- GitHub 仓库：https://github.com/HachGo/BLog
- 编辑链接：已配置
- 自定义域名：如有需要，编辑 `.vitepress/public/CNAME`

---

## 五、日常使用流程

### 5.1 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览生产版本
npm run docs:preview
```

### 5.2 部署流程
```bash
# 1. 修改配置（GitHub 链接）
# 2. 本地测试
npm run docs:dev

# 3. 提交并推送
git add .
git commit -m "更新内容描述"
git push origin main

# 4. GitHub Actions 自动部署
#    访问：https://用户名.github.io/仓库名/
```

---

## 六、Obsidian 语法支持

### 6.1 已支持的语法

| 语法 | 示例 | 说明 |
|------|------|------|
| 内部链接 | `[[笔记标题]]` | Obsidian风格内部链接 |
| 标签 | `#标签名` | 圆角胶囊样式显示 |
| 高亮 | `==高亮文本==` | 黄色渐变背景 |
| 数学公式 | `$E=mc^2$` | KaTeX 渲染 |
| 块公式 | `$$...$$` | 居中显示 |
| Mermaid | ` ```mermaid ` | 流程图、时序图等 |
| 自定义容器 | `::: tip` | 提示、警告、信息框 |
| 任务列表 | `- [ ] 待办` | 任务标记 |

### 6.2 自定义容器

```markdown
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险提示
:::

::: info
这是一个信息框
:::

::: details
可折叠内容
:::
```

---

## 七、注意事项

### 7.1 发布前检查
- [ ] GitHub 链接已更新为实际仓库地址
- [ ] 本地测试通过 `npm run docs:build`
- [ ] 无敏感信息泄露

### 7.2 文件排除
- `.obsidian/` 目录不会发布
- `node_modules/` 不会发布
- `.gitignore` 中文件不会指定的发布

### 7.3 扩展功能（待实现）
- [ ] 多语言支持（中英文）
- [ ] 评论系统（Giscus）
- [ ] Google Analytics 分析
- [ ] 阅读量统计

---

## 八、相关文档

- [README.md](./README.md) - 项目说明
- [DEPLOY.md](./DEPLOY.md) - 部署指南
- [VitePress 官方文档](https://vitepress.dev/)
- [Obsidian 官方文档](https://help.obsidian.md/)
