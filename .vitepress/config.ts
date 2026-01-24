import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Matrix Dream",
  description: "记录走向梦想的旅程",
  lang: "zh-CN",
  base: '/',
  lastUpdated: true,
  ignoreDeadLinks: true,
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '知识管理', link: '/01-知识管理' },
      { text: '思想感悟', link: '/02-思想感悟' },
      { text: '探索世界', link: '/03-探索世界' },
      { text: '资源库', link: '/04-资源库' }
    ],
    sidebar: {
      '/01-知识管理/': [{
        text: '知识管理',
        items: [
          { text: '快速开始', link: '/01-知识管理/快速开始' },
          { text: 'claude', items: [{ text: 'cc_api_setting', link: '/01-知识管理/01_claude/cc_api_setting' }] }
        ]
      }],
      '/02-思想感悟/': [{
        text: '思想感悟',
        items: [
          { text: '年度总结', items: [
            { text: '致逝去的2023', link: '/02-思想感悟/01_年度总结/致逝去的2023' },
            { text: '致逝去的2024', link: '/02-思想感悟/01_年度总结/致逝去的2024' }
          ]},
          { text: '项目管理', items: [
            { text: '浅谈项目与项目管理岗位', link: '/02-思想感悟/02_项目管理/002_浅谈项目与项目管理岗位' }
          ]},
          { text: '功能展示', link: '/02-思想感悟/功能展示' }
        ]
      }],
      '/03-探索世界/': [{ text: '探索世界', items: [{ text: '探索世界', link: '/03-探索世界' }] }],
      '/04-资源库/': [{
        text: '资源库',
        items: [
          { text: '技术学习', link: '/04-资源库/01_技术学习' },
          { text: 'Linux 软件清单', link: '/04-资源库/Linux软件清单' },
          { text: 'Win 必备软件清单', link: '/04-资源库/win必备软件清单' },
          { text: '新闻媒体', link: '/04-资源库/02_新闻媒体' },
          { text: '创意设计', link: '/04-资源库/03_创意设计' },
          { text: '生活服务', link: '/04-资源库/04_生活服务' },
          { text: '娱乐休闲', link: '/04-资源库/05_娱乐休闲' },
          { text: '工具资源', link: '/04-资源库/06_工具资源' },
          { text: '数据库运维', link: '/04-资源库/07_数据库运维' },
          { text: '学术研究', link: '/04-资源库/08_学术研究' }
        ]
      }]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/HachGo/BLog' }],
    search: { provider: 'local' },
    editLink: { pattern: 'https://github.com/HachGo/BLog/edit/main/:path', text: '在 GitHub 上编辑此页' },
    docFooter: { prev: '上一页', next: '下一页' },
    outline: { level: 'deep', label: '目录' }
  },

  markdown: {
    theme: 'dracula',
    lineNumbers: true,
    math: { inline: ['$', '\\('], block: ['$$', '\\]', 'beginollars', 'endollars'] },
    container: { tip: '提示', warning: '注意', danger: '警告', info: '信息', details: '详情' }
  }
})
