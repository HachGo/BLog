export interface Project {
  title: string
  category: string
  description: string
  tags: string[]
  repository: string
  website?: string
}

/**
 * 项目页的唯一数据源。
 *
 * 新项目按下面的结构添加即可自动出现在页面中。repository 填 GitHub
 * 或其他代码托管地址，website 可选，用于填写在线体验地址。
 */
export const projects: Project[] = [
  {
    title: 'BLog',
    category: '个人知识库',
    description: '基于 Obsidian 与 VitePress 构建的个人知识管理网站，沉淀学习、工作与探索过程中的长期记录。',
    tags: ['VitePress', 'Vue', 'Obsidian'],
    repository: 'https://github.com/HachGo/BLog',
    website: 'https://godream.show',
  },
  // {
  //   title: '项目名称',
  //   category: '项目类型',
  //   description: '用一两句话说明项目解决的问题和你的核心贡献。',
  //   tags: ['技术标签', '技术标签'],
  //   repository: 'https://github.com/你的账号/项目仓库',
  //   website: 'https://项目在线地址',
  // },
]
