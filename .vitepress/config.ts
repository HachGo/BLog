import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

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

    // 侧边栏配置
    sidebar: {
      '/01-知识管理/': [
        {
          text: '知识管理',
          items: [
            { text: '介绍', link: '/01-知识管理' },
            { text: '快速开始', link: '/01-知识管理/快速开始' }
          ]
        }
      ],
      '/02-思想感悟/': [
        {
          text: '思想感悟',
          items: [
            { text: '介绍', link: '/02-思想感悟' },
            { text: '功能展示', link: '/02-思想感悟/功能展示' }
          ]
        },
        {
          text: '年度总结',
          items: [
            { text: '致逝去的2023', link: '/02-思想感悟/01_年度总结/致逝去的2023' },
            { text: '致逝去的2024', link: '/02-思想感悟/01_年度总结/致逝去的2024' }
          ]
        },
        {
          text: '项目管理',
          items: [
            { text: '浅谈项目与项目管理', link: '/02-思想感悟/02_项目管理/002_浅谈项目与项目管理岗位' }
          ]
        }
      ],
      '/03-探索世界/': [
        {
          text: '探索世界',
          items: [
            { text: '介绍', link: '/03-探索世界' }
          ]
        }
      ]
    },

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
