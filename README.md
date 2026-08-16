# dsh-hub-panel

DeepSeek Harness Settings 里的生态商店页：搜索/过滤 [dsh-hub-index](https://github.com/jiangxingfan1-coder/dsh-hub-index) 的插件、组合（compose）与周边应用，带信任分层徽章与安全备注。**只发现、不代装**——安装命令仅供复制，装不装由人决定。

```bash
dsh plugin --profile web add github:jiangxingfan1-coder/dsh-hub-panel
# 重启 dsh web 后：设置 → Hub
```

Dual-face 结构（host 薄壳 + React client），构建配方源自社区先例 dsh-file-upload / dsh-archived-chats。配套：`dsh-hub-tools`（Agent 面的 hub_search/hub_show 工具，见 dsh-identity 数据面）。
