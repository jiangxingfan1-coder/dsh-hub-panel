<div align="center">

# dsh-hub-panel

**DeepSeek Harness 设置页里的生态商店**

*Browse the ecosystem without leaving your harness. Discovery is automated; installing stays yours.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![type](https://img.shields.io/badge/type-dual--face%20plugin-green)
![install](https://img.shields.io/badge/install-1%20command-orange)
[![index](https://img.shields.io/badge/data-dsh--hub--index-8A2BE2)](https://jiangxingfan1-coder.github.io/dsh-hub-index/)

</div>

---

装上之后，`设置 → Hub` 多出一个原生商店页：搜索、按类型（plugin / compose / app）与信任档（official / verified / community / unreviewed）过滤 [dsh-hub-index](https://github.com/jiangxingfan1-coder/dsh-hub-index) 的全部条目，看安全备注，一键复制安装命令。

```
┌ 设置 ───────────────────────────────────────────────┐
│ 通用设置                                             │
│ 模型         Hub — 生态索引        [在浏览器打开 ↗]   │
│ 插件         ⚠ 装一个 dsh 插件 = 交出整台机器……      │
│ Agent 预设   [搜索名称/描述/发布者…            ]      │
│ ▶ Hub       [all][plugin][app][compose] [信任过滤]   │
│             ┌──────────────────────────────────┐    │
│             │ dsh-xxx  plugin  unreviewed @dev │    │
│             │ 描述……                            │    │
│             │ 🔎 安全备注……                     │    │
│             │ dsh plugin add …  [复制] 仓库 npm │    │
│             └──────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

## ✨ 特性

- **实时索引**：每次打开拉取最新 `entries.json`（策展 + 信任分层的数据源，非实时爬取的噪音流）
- **信任四色徽章** + `!!js` 审计红旗 + 安全备注（securityNotes）内联展示
- **搜索与双维过滤**：名称/描述/发布者全文匹配 × kind × trust
- **只发现、不代装**：安装命令仅供复制——装插件 = npm postinstall + Host realm 零审批，这个决定必须留在人手上
- **深浅色自适应**，compose 条目独立视觉标识

## 🚀 安装

```bash
dsh plugin --profile web add github:jiangxingfan1-coder/dsh-hub-panel
# 重启 dsh web 进程（插件集变更需重启），然后：设置 → Hub
```

## 🔧 技术形态

Dual-face 用户级插件（**不 fork 官方 monorepo**）：

- host 面：极薄壳（`lib/index.js`），`dsh.bundle.patch` 声明使安装即自动进组合树
- client 面：React 组件经 esbuild 打成 `ModuleLoader` 格式（`lib/client.js`），由 `dsh web` 运行时 serve；注册进官方 `settings.section` slot（`label` 即导航文字）
- 构建配方源自社区先例 [dsh-file-upload](https://github.com/HongMing-Huang/dsh-file-upload) 与 [dsh-archived-chats](https://github.com/Ultronen/dsh-archived-chats)，致谢

想改造或自建同类页面：`npm run build` 后 `dsh plugin --profile web add file:<本目录>`（注意 pnpm 的 `file:` 依赖是拷贝快照——改源码后需 remove + add 刷新）。

## 🧩 配套

| 场景 | 工具 |
|---|---|
| Agent 在任务中自主发现插件 | [dsh-id](https://github.com/jiangxingfan1-coder/dsh-id) 内置 `hub_search` / `hub_show`（安装走 ask_user_question 人批门） |
| 浏览器直接逛 | [在线索引](https://jiangxingfan1-coder.github.io/dsh-hub-index/) |
| 提交你的插件 | [dsh-hub-index 提交指南](https://github.com/jiangxingfan1-coder/dsh-hub-index#%EF%B8%8F-提交条目) |

## License

MIT
