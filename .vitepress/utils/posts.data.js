import { createContentLoader } from 'vitepress'

// 获取所有笔记用于首页展示
export const data = createContentLoader('**/*.md', {
  includeSrc: false,
  render: true,
  excerpt: true,
  transform(rawData) {
    return rawData
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || url.split('/').pop()?.replace('.md', ''),
        url,
        date: frontmatter.date ? new Date(frontmatter.date).toLocaleDateString('zh-CN') : null,
        description: frontmatter.description || '',
        tags: frontmatter.tags || []
      }))
      .filter(post => !post.url.endsWith('/index.md')) // 排除目录索引页
      .sort((a, b) => {
        // 按日期排序
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        return 0
      })
  }
})
