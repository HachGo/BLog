# 部署指南

本文档介绍如何将知识库部署到 GitHub Pages。

## 快速部署

### 方式一：GitHub Actions 自动部署（推荐）

1. **推送代码到 main 分支**
   ```bash
   git add .
   git commit -m "初始化知识库"
   git push origin main
   ```

2. **GitHub Actions 自动构建**
   - 进入仓库 → Actions 标签页
   - 观察 "Deploy VitePress site to Pages" 工作流运行
   - 构建完成后，访问 `https://<username>.github.io/<repo>/`

### 方式二：手动部署

```bash
# 构建静态文件
npm run docs:build

# 本地预览
npm run docs:preview
```

## GitHub Pages 配置

### 1. 启用 GitHub Pages

1. 进入仓库 → Settings → Pages
2. Source 选择 "GitHub Actions"
3. 保存设置

### 2. 配置自定义域名（可选）

1. 在 `.vitepress/public/` 目录创建 `CNAME` 文件：
   ```
   your-domain.com
   ```

2. 在域名服务商处添加 DNS 记录：
   - 类型：A
   - 值：185.199.108.153（GitHub Pages IP）
   - 或类型：CNAME → `<username>.github.io`

3. 仓库 Settings → Pages → Custom domain 中填写域名

## 常见问题

### Q: 构建失败怎么办？

检查以下几点：
- Node.js 版本是否 >= 18
- `package.json` 依赖是否正确
- Markdown 文件语法是否有错误

### Q: 页面未更新？

- 清除浏览器缓存
- 检查 GitHub Actions 是否成功运行
- 等待最多 2 分钟让 CDN 刷新

### Q: 自定义域名不生效？

- 确保 DNS 记录已传播（可能需要几小时）
- 确认 CNAME 文件内容正确
- 在 Settings → Pages 中启用"Enforce HTTPS"

## 工作流配置

`.github/workflows/deploy.yml` 关键配置：

```yaml
on:
  push:
    branches: [main]  # 只在 main 分支推送时触发
```

如需在其他分支触发，修改 `branches` 配置。

## 环境变量

如需配置 Algolia 搜索，在仓库 Settings → Secrets 中添加：
- `ALGOLIA_API_KEY`
- `ALGOLIA_INDEX_NAME`
