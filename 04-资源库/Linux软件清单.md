
# Linux 软件清单

> Linux 系统常用软件汇总

## 目录
- [系统工具](#系统工具)
- [开发工具](#开发工具)
- [文件管理](#文件管理)
- [终端工具](#终端工具)
- [编辑器](#编辑器)
- [其他工具](#其他工具)

## 系统工具

| 软件 | 用途 | 官网 |
|------|------|------|
| DBeaver | 数据库管理工具 | https://dbeaver.io/ |
| QEMU | 虚拟机 | https://www.qemu.org/ |
| UFW | 防火墙管理 | https://help.ubuntu.com/community/UFW |

## 开发工具

| 软件 | 用途 | 官网 |
|------|------|------|
| Git | 版本控制 | https://git-scm.com/ |
| Neovim | 终端编辑器 | https://neovim.io/ |
| LazyVim | Neovim 发行版 | https://www.lazyvim.org/ |
| DBeaver | 数据库客户端 | https://dbeaver.io/ |

## 文件管理

| 软件 | 用途 | 特点 | 官网 |
|------|------|------|------|
| Nnn | 文件管理器 | 轻量、支持插件 | https://github.com/jarun/nnn |
| Ranger | 文件管理器 | 键盘操作 | https://github.com/ranger/ranger |
| Dolphin | KDE 文件管理器 | 图形界面 | https://apps.kde.org/dolphin/ |

## 终端工具

### Shell
| 软件 | 特点 | 官网 |
|------|------|------|
| Fish Shell | 自动补全友好 | https://fishshell.com/ |
| Zsh | 功能强大 | https://www.zsh.org/ |
| Oh My Zsh | Zsh 框架 | https://ohmyz.sh/ |

### 终端复用
| 软件 | 用途 | 官网 | 文档 |
|------|------|------|------|
| Tmux | 终端复用 | https://github.com/tmux/tmux | [速查表](https://gist.github.com/ryerh/14b7c24dfd623ef8edc7) |

### 启动器
| 软件 | 用途 | 官网 |
|------|------|------|
| Ulauncher | 应用启动器 | https://ulauncher.io/ |

## 编辑器

| 软件 | 特点 | 官网 |
|------|------|------|
| Neovim | 高效终端编辑器 | https://neovim.io/ |
| Emacs | 强大的编辑器 | https://www.gnu.org/software/emacs/ |
| LazyVim | 开箱即用的 Neovim 配置 | https://www.lazyvim.org/ |

## 其他工具

### 文档工具
| 软件 | 用途 | 官网 |
|------|------|------|
| LibreOffice | 办公套件 | https://www.libreoffice.org/ |
| MarkText | Markdown 编辑器 | https://marktext.app/ |
| VNote | Markdown 笔记 | https://vnotex.github.io/vnote/ |

### 思维导图
| 软件 | 备注 | 官网 |
|------|------|------|
| iThoughts (付费) | - | https://www.toketaware.com/ |

### 音乐
- 音乐播放器 (如 Rhythmbox, Spotify 等)

### 社交
- 微信 (Wine)：可通过 Wine 或 CrossOver 运行，无官方 Linux 版。
- 钉钉：有官方 Linux 客户端 (https://www.dingtalk.com/)。

### 云盘
- 各云存储客户端 (如 Dropbox, Nextcloud 等)

## 配置笔记

### Tmux 快捷键
参考: [Tmux 快捷键速查表](https://gist.github.com/ryerh/14b7c24dfd623ef8edc7)

### 常用命令
```bash
# UFW 防火墙管理
sudo ufw status
sudo ufw enable
sudo ufw disable

# 系统代理设置
export http_proxy="http://127.0.0.1:7890"
export https_proxy="http://127.0.0.1:7890"
```