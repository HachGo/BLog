/**
 * Obsidian 语法适配器
 * 将 Obsidian 特有的 Markdown 语法转换为 VitePress 兼容的格式
 */

/**
 * Obsidian 链接匹配正则
 * [[链接文本]] 或 [[链接|别名]]
 */
const OBSIDIAN_LINK_REGEX = /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g

/**
 * Obsidian 标签匹配正则
 * #tag 或 #标签
 */
const OBSIDIAN_TAG_REGEX = /#([a-zA-Z0-9_\u4e00-\u9fa5]+)/g

/**
 * 高亮语法 ==高亮==
 */
const HIGHLIGHT_REGEX = /==([^=]+)==/g

/**
 * 嵌入图片 ![[图片]]
 */
const EMBED_IMAGE_REGEX = /!\[\[([^\]]+)\]\]/g

/**
 * 嵌入笔记 ![[笔记]]
 */
const EMBED_NOTE_REGEX = /!\[\[([^\]]+)\]\]/g

/**
 * Obsidian 任务列表语法
 * - [ ] 未完成
 * - [x] 已完成
 */
const TASK_REGEX = /-\s\[([ xX])\]\s/g

/**
 * 转换 Obsidian 内部链接
 * [[链接]] → [链接](链接)
 * [[链接|别名]] → [别名](链接)
 */
export function transformInternalLinks(content: string): string {
  return content.replace(OBSIDIAN_LINK_REGEX, (match, link, alias) => {
    const text = alias || link
    // 处理锚点
    const [path, anchor] = link.split('#')
    const href = anchor ? `${path}#${anchor}` : path
    return `[${text}](${href})`
  })
}

/**
 * 转换 Obsidian 标签
 * #tag → <span class="tag">#tag</span>
 */
export function transformTags(content: string): string {
  return content.replace(OBSIDIAN_TAG_REGEX, (match, tag) => {
    return `<span class="tag">#${tag}</span>`
  })
}

/**
 * 转换高亮语法
 * ==高亮== → <mark>高亮</mark>
 */
export function transformHighlight(content: string): string {
  return content.replace(HIGHLIGHT_REGEX, (_, text) => {
    return `<mark>${text}</mark>`
  })
}

/**
 * 转换嵌入内容
 * ![[图片]] → ![图片](图片路径)
 */
export function transformEmbeds(content: string, assetsDir: string = ''): string {
  // 图片嵌入
  content = content.replace(EMBED_IMAGE_REGEX, (_, file) => {
    const normalizedPath = file.replace(/\s+/g, '%20')
    return `![${file}](${assetsDir}${normalizedPath})`
  })

  // 笔记嵌入 (VitePress 不直接支持，使用 iframe 或提示)
  content = content.replace(EMBED_NOTE_REGEX, (_, file) => {
    const link = file.replace(/\s+/g, '-').toLowerCase()
    return `<div class="embed-note">

> **嵌入笔记**: [${file}](${link})
>
> *这是 Obsidian 的笔记嵌入，在 VitePress 中显示为链接*

</div>`
  })

  return content
}

/**
 * 转换任务列表
 * - [ ] → - [ ]
 */
export function transformTasks(content: string): string {
  return content.replace(TASK_REGEX, (_, checked) => {
    return `- [${checked}] `
  })
}

/**
 * 完整的内容转换
 */
export function adaptObsidianContent(content: string): string {
  let result = content

  // 按顺序应用转换
  result = transformInternalLinks(result)
  result = transformTags(result)
  result = transformHighlight(result)
  result = transformEmbeds(result)
  result = transformTasks(result)

  return result
}

/**
 * 创建 Obsidian 兼容的链接
 * 用于在 Obsidian 中使用的外部链接
 */
export function createObsidianLink(vitepressPath: string, text: string): string {
  // 将 VitePress 路径转换为 Obsidian 内部链接
  const obsidianPath = vitepressPath
    .replace(/^\//, '')           // 移除开头的 /
    .replace(/\//g, '-')          // 将 / 转换为 -
    .replace(/\.md$/, '')         // 移除 .md 扩展名

  return `[[${obsidianPath}|${text}]]`
}

/**
 * 转换块引用链接
 * [[^块ID]] → #^块ID
 */
export function transformBlockLinks(content: string): string {
  return content.replace(/\[\[(\^[^]]+)\]\]/g, '#$1')
}

/**
 * 转换标签语法（移除链接中的标签）
 * 将 [标签文本](链接#tag) → [标签文本](链接)
 */
export function cleanTagFromLinks(content: string): string {
  return content.replace(/\[([^\]]+)\]\([^)]+#([^)]+)\)/g, '[$1]($2)')
}
