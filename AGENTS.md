# skills

该文件是 [skills](https://github.com/vercel-labs/skills) 的 README.md 副本。

如果项目中存在名为 `skills` 的目录（发生命名冲突），`npx` 可能会报错，此时请使用 `pnpx`。

---

## 安装 Skill

```bash
npx skills add vercel-labs/agent-skills
```

---

### 支持的来源格式

```bash
# GitHub 简写（owner/repo）
npx skills add vercel-labs/agent-skills

# 完整 GitHub URL
npx skills add https://github.com/vercel-labs/agent-skills

# 指向仓库中某个 skill 的路径
npx skills add https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines

# GitLab URL
npx skills add https://gitlab.com/org/repo

# 任意 git URL
npx skills add git@github.com:vercel-labs/agent-skills.git

# 本地路径
npx skills add ./my-local-skills
```

---

### 参数说明

| 参数                      | 说明                                        |
| ------------------------- | ------------------------------------------- |
| `-g, --global`            | 安装到用户目录（而不是项目目录）            |
| `-a, --agent <agents...>` | 指定目标 agent（如 `claude-code`, `codex`） |
| `-s, --skill <skills...>` | 按名称安装指定 skill（使用 `'*'` 表示全部） |
| `-l, --list`              | 仅列出可用 skills，不执行安装               |
| `--copy`                  | 复制文件而不是使用符号链接                  |
| `-y, --yes`               | 跳过所有确认提示                            |
| `--all`                   | 安装所有 skills 到所有 agents（无提示）     |

---

### 示例

```bash
# 查看仓库中的 skills
npx skills add vercel-labs/agent-skills --list

# 安装指定 skills
npx skills add vercel-labs/agent-skills --skill frontend-design --skill skill-creator

# 安装带空格的 skill（需要加引号）
npx skills add owner/repo --skill "Convex Best Practices"

# 安装到指定 agents
npx skills add vercel-labs/agent-skills -a claude-code -a opencode

# 非交互安装（适用于 CI/CD）
npx skills add vercel-labs/agent-skills --skill frontend-design -g -a claude-code -y

# 安装仓库中所有 skills 到所有 agents
npx skills add vercel-labs/agent-skills --all

# 安装所有 skills 到指定 agents
npx skills add vercel-labs/agent-skills --skill '*' -a claude-code

# 安装指定 skills 到所有 agents
npx skills add vercel-labs/agent-skills --agent '*' --skill frontend-design
```

---

### 安装范围

| 范围       | 参数 | 位置                | 使用场景             |
| ---------- | ---- | ------------------- | -------------------- |
| **项目级** | 默认 | `./<agent>/skills/` | 随项目提交，团队共享 |
| **全局**   | `-g` | `~/<agent>/skills/` | 所有项目可用         |

---

### 安装方式

交互式安装时可选择：

| 方式                 | 说明                                             |
| -------------------- | ------------------------------------------------ |
| **符号链接（推荐）** | 每个 agent 指向统一源，便于更新                  |
| **复制（Copy）**     | 每个 agent 独立副本，适用于不支持 symlink 的环境 |

---

## 其他命令

| 命令                         | 说明                            |
| ---------------------------- | ------------------------------- |
| `npx skills list`            | 列出已安装 skills（别名：`ls`） |
| `npx skills find [query]`    | 搜索 skills                     |
| `npx skills remove [skills]` | 删除 skills                     |
| `npx skills update [skills]` | 更新 skills                     |
| `npx skills init [name]`     | 创建新 SKILL.md                 |

---

### `skills list`

列出所有已安装 skills（类似 `npm ls`）

```bash
# 列出全部（项目 + 全局）
npx skills list

# 仅全局
npx skills ls -g

# 按 agent 过滤
npx skills ls -a claude-code -a cursor
```

---

### `skills find`

```bash
# 交互式搜索（类似 fzf）
npx skills find

# 按关键词搜索
npx skills find typescript
```

---

### `skills update`

```bash
# 更新所有 skills（交互选择范围）
npx skills update

# 更新单个
npx skills update my-skill

# 更新多个
npx skills update frontend-design web-design-guidelines

# 只更新全局或项目
npx skills update -g
npx skills update -p

# 非交互模式（自动判断范围）
npx skills update -y
```

| 参数            | 说明                 |
| --------------- | -------------------- |
| `-g, --global`  | 仅更新全局           |
| `-p, --project` | 仅更新项目           |
| `-y, --yes`     | 跳过选择（自动判断） |
| `[skills...]`   | 指定更新某些 skills  |

---

### `skills init`

```bash
# 当前目录创建 SKILL.md
npx skills init

# 子目录创建
npx skills init my-skill
```

---

### `skills remove`

删除已安装 skills：

```bash
# 交互式删除
npx skills remove

# 删除指定 skill
npx skills remove web-design-guidelines

# 删除多个
npx skills remove frontend-design web-design-guidelines

# 删除全局
npx skills remove --global web-design-guidelines

# 从指定 agents 删除
npx skills remove --agent claude-code cursor my-skill

# 删除全部（无确认）
npx skills remove --all

# 从某 agent 删除所有 skill
npx skills remove --skill '*' -a cursor

# 从所有 agent 删除某 skill
npx skills remove my-skill --agent '*'

# 使用别名
npx skills rm my-skill
```

| 参数           | 说明                         |
| -------------- | ---------------------------- |
| `-g, --global` | 从全局删除                   |
| `-a, --agent`  | 指定 agent（`'*'` 表示全部） |
| `-s, --skill`  | 指定 skill                   |
| `-y, --yes`    | 跳过确认                     |
| `--all`        | 等价于删除全部               |

---

## 什么是 Agent Skills？

Agent Skills 是一组可复用的指令集合，用于扩展你的编码 Agent 能力。

它们定义在 `SKILL.md` 文件中，包含 YAML 头部（`name` 和 `description`）。

Skill 可以让 Agent 执行专业任务，例如：

- 根据 git 历史生成发布说明
- 按团队规范创建 PR
- 集成外部工具（如 Linear、Notion 等）

👉 在 **[https://skills.sh](https://skills.sh)** 发现更多 skills

---

## 创建 Skill

一个 Skill 是一个目录，包含 `SKILL.md`：

```markdown
---
name: my-skill
description: 这个 skill 做什么、何时使用
---

# My Skill

Agent 执行该 skill 时的指令

## 使用场景

说明何时触发

## 步骤

1. 第一步
2. 第二步
```

---

### 必填字段

- `name`：唯一标识（小写 + 连字符）
- `description`：简要说明

---

### 可选字段

- `metadata.internal`：设为 `true` 时隐藏 skill（仅在 `INSTALL_INTERNAL_SKILLS=1` 时可见）

```markdown
---
name: my-internal-skill
description: 内部使用 skill
metadata:
  internal: true
---
```

---

## License

MIT
