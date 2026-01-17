import { promises as fs } from 'fs'
import path from 'path'

/**
 * 侧边栏配置生成器
 * 自动扫描目录结构生成侧边栏配置
 */

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

interface SidebarConfig {
  [key: string]: SidebarItem[]
}

// 需要排除的目录
const EXCLUDED_DIRS = ['.obsidian', '.vitepress', 'node_modules', 'dist', '.git']

// 目录名称到显示名称的映射（移除序号前缀）
const DIR_NAME_MAP: Record<string, string> = {
  '01-知识管理': '知识管理',
  '02-技术笔记': '技术笔记',
  '03-读书笔记': '读书笔记'
}

/**
 * 扫描目录生成侧边栏配置
 */
export async function generateSidebar(
  docsDir: string,
  basePath: string = ''
): Promise<SidebarConfig> {
  const config: SidebarConfig = {}

  try {
    const entries = await fs.readdir(docsDir, { withFileTypes: true })

    for (const entry of entries) {
      if (!entry.isDirectory() || EXCLUDED_DIRS.includes(entry.name)) {
        continue
      }

      const dirPath = path.join(docsDir, entry.name)
      const sidebarItems = await scanDirectory(dirPath, basePath)
      config[`/${entry.name}/`] = sidebarItems
    }
  } catch (error) {
    console.error('生成侧边栏失败:', error)
  }

  return config
}

/**
 * 扫描单个目录
 */
async function scanDirectory(
  dirPath: string,
  basePath: string,
  depth: number = 0
): Promise<SidebarItem[]> {
  const items: SidebarItem[] = []

  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })

    // 排序：README在前，其他按文件名排序
    entries.sort((a, b) => {
      if (a.name.toLowerCase() === 'readme.md') return -1
      if (b.name.toLowerCase() === 'readme.md') return 1
      return a.name.localeCompare(b.name)
    })

    for (const entry of entries) {
      // 跳过排除的目录和隐藏文件
      if (entry.name.startsWith('.') || EXCLUDED_DIRS.includes(entry.name)) {
        continue
      }

      if (entry.isDirectory()) {
        // 递归处理子目录
        const subItems = await scanDirectory(
          path.join(dirPath, entry.name),
          basePath,
          depth + 1
        )

        if (subItems.length > 0) {
          // 获取目录显示名称
          const displayName = DIR_NAME_MAP[entry.name] || entry.name.replace(/^\d+-/, '')
          items.push({
            text: displayName,
            items: subItems,
            collapsed: false
          })
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // 处理 Markdown 文件
        const sidebarItem = await createSidebarItem(entry.name, dirPath, basePath)
        if (sidebarItem) {
          items.push(sidebarItem)
        }
      }
    }
  } catch (error) {
    console.error(`扫描目录失败: ${dirPath}`, error)
  }

  return items
}

/**
 * 创建侧边栏项
 */
async function createSidebarItem(
  fileName: string,
  filePath: string,
  basePath: string
): Promise<SidebarItem | null> {
  // 跳过 README 文件（它作为目录索引）
  if (fileName.toLowerCase() === 'readme.md') {
    return null
  }

  // 读取文件内容获取标题
  const content = await fs.readFile(path.join(filePath, fileName), 'utf-8')
  const title = extractTitle(content, fileName)

  // 生成链接路径
  const relativePath = path.relative(basePath, filePath)
  const linkPath = `/${relativePath}/${fileName.replace('.md', '')}`

  return {
    text: title,
    link: linkPath
  }
}

/**
 * 从 Markdown 内容提取标题
 */
function extractTitle(content: string, defaultName: string): string {
  // 尝试从 frontmatter 提取
  const frontmatterMatch = content.match(/^---\n[\s\S]*?title:\s*(.+)\n[\s\S]*?---/)
  if (frontmatterMatch) {
    return frontmatterMatch[1].trim()
  }

  // 从 H1 标题提取
  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) {
    return h1Match[1].trim()
  }

  // 使用文件名（去除扩展名和序号前缀）
  return defaultName
    .replace('.md', '')
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
}

/**
 * 手动配置的侧边栏覆盖
 */
export function getSidebarOverride(): Partial<SidebarConfig> {
  return {
    // 可以手动覆盖特定路径的侧边栏
    // '/01-知识管理/': [
    //   { text: '介绍', link: '/01-知识管理/' },
    //   { text: '快速开始', link: '/01-知识管理/快速开始' }
    // ]
  }
}
