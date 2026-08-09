export type MediaPlatform =
  | 'github'
  | 'gitee'
  | 'wechat'
  | 'bilibili'
  | 'zhihu'
  | 'juejin'
  | 'xiaohongshu'
  | 'douyin'
  | 'youtube'
  | 'website'

export type IconProvider = 'simple-icons' | 'iconify'

export interface HeaderLink {
  label: string
  handle: string
  description: string
  /** 图标名称或 slug，例如 github、gitee、wechat。 */
  icon: string
  /** 默认使用 Simple Icons；通用功能图标可使用 Iconify。 */
  iconProvider?: IconProvider
  href?: string
  copyText?: string
}

export interface MediaLink extends HeaderLink {
  platform: MediaPlatform
}

/**
 * 右上角媒体入口的数据源。
 *
 * 新增渠道时，把真实的主页链接填进 href。对于没有稳定主页链接的渠道，
 * 可以使用 copyText（例如公众号名称），卡片会提供一键复制而不会产生无效跳转。
 */
export const mediaLinks: MediaLink[] = [
  {
    platform: 'github',
    label: 'GitHub',
    handle: 'HachGo / BLog',
    description: '站点源码、技术实验与持续更新',
    icon: 'github',
    href: 'https://github.com/HachGo/BLog',
  },
  {
    platform: 'gitee',
    label: 'Gitee',
    handle: 'HackerSpace',
    description: '代码镜像、开源项目与协作记录',
    icon: 'gitee',
    href: 'https://gitee.com/HackerSpace',
  },
  {
    platform: 'wechat',
    label: '微信公众号',
    handle: '矩阵之路',
    description: '在微信搜索「矩阵之路」，阅读长文与阶段总结',
    icon: 'wechat',
    copyText: '矩阵之路',
  },
  // 小红书与抖音将在提供真实主页链接后加入：
  // { platform: 'xiaohongshu', label: '小红书', handle: '@你的账号', description: '...', icon: 'xiaohongshu', href: 'https://...' },
  // { platform: 'douyin', label: '抖音', handle: '@你的账号', description: '...', icon: 'tiktok', href: 'https://...' },
]

/** 右上角的个人新闻站入口。 */
export const personalNewsLink: HeaderLink = {
  label: '个人新闻站',
  handle: 'hachgo.github.io/news_auto',
  description: '每日 AI 与国际资讯',
  icon: 'material-symbols:news',
  iconProvider: 'iconify',
  href: 'https://hachgo.github.io/news_auto/',
}
