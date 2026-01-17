import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "Matrix Dream",
  description: "记录走向梦想的旅程",
  lang: "zh-CN",
  base: '/',
  lastUpdated: true,

  ignoreDeadLinks: true,

  // 排除发布的内容
  srcExclude: ['.obsidian/**'],

  themeConfig: {
    // 站点Logo
    logo: '/favicon.svg',

    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '知识管理', link: '/01-知识管理' },
      { text: '思想感悟', link: '/02-思想感悟' },
      { text: '探索世界', link: '/03-探索世界' }
    ],

    // 自动生成侧边栏
    sidebar: generateSidebar([
      {
        // 知识管理
        documentRootPath: '.',
        scanStartPath: '01-知识管理',
        resolvePath: '/01-知识管理/',
        basePath: '/01-知识管理/',
        excludeByGlobPattern: ['**/index.md'],
        sortMenusOrderNumericallyFromTitle: true,
        collapsed: false,
        includeFolderIndexFile: true,
        useFolderTitleFromIndexFile: true
      },
      {
        // 思想感悟
        documentRootPath: '.',
        scanStartPath: '02-思想感悟',
        resolvePath: '/02-思想感悟/',
        basePath: '/02-思想感悟/',
        excludeByGlobPattern: ['**/index.md'],
        sortMenusOrderNumericallyFromTitle: true,
        collapsed: false,
        includeFolderIndexFile: true,
        useFolderTitleFromIndexFile: true
      },
      {
        // 探索世界
        documentRootPath: '.',
        scanStartPath: '03-探索世界',
        resolvePath: '/03-探索世界/',
        basePath: '/03-探索世界/',
        excludeByGlobPattern: ['**/index.md'],
        sortMenusOrderNumericallyFromTitle: true,
        collapsed: false,
        includeFolderIndexFile: true,
        useFolderTitleFromIndexFile: true
      }
    ]),

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/HachGo/BLog' }
    ],

    // 搜索配置
    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },

    // 快速编辑
    editLink: {
      pattern: 'https://github.com/HachGo/BLog/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 文档群组
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 标题链接
    outline: {
      level: 'deep',
      label: '目录'
    }
  },

  // Markdown 配置
  markdown: {
    theme: 'dracula',
    lineNumbers: true,

    math: {
      inline: ['$', '\\('],
      block: ['$$', '\\]', 'beginollars', 'endollars']
    },

    chart: true,

    container: {
      tip: '提示',
      warning: '注意',
      danger: '警告',
      info: '信息',
      details: '详情'
    }
  },

  mermaid: {
    theme: 'default',
    themeVariables: {
      primaryColor: '#5c7cfa',
      lineColor: '#5c7cfa',
      secondaryColor: '#e7f5ff',
      tertiaryColor: '#f8f9fa'
    }
  }
}))
