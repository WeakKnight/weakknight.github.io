# Agents.md - AI 开发指南

## 项目概述

这是 Tianyu Li 的个人博客网站，基于原生 JavaScript + Webpack 构建的单页面应用（SPA）。博客内容使用 Markdown 编写，动态从 GitHub 仓库获取并渲染。

**线上地址**: https://weakknight.github.io/

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 构建工具 | Webpack 5 |
| 语言 | 原生 JavaScript (ES6 Modules) |
| 样式 | 纯 CSS |
| Markdown 解析 | marked + marked-katex-extension |
| 代码高亮 | highlight.js (CDN) |
| 数学公式 | KaTeX (CDN) |
| 伪代码渲染 | pseudocode.js (CDN) |
| 滚动条 | smooth-scrollbar |

---

## 项目结构

```
weakknight.github.io/
├── index.html              # 入口 HTML，加载 bundle.js 和 CDN 资源
├── bundle.js               # Webpack 打包输出（勿直接编辑）
├── webpack.config.js       # Webpack 配置
├── package.json            # 依赖管理
│
├── src/                    # 源代码目录
│   ├── index.js            # ⭐ 主入口文件，应用初始化和路由逻辑
│   ├── styles.css          # 全局样式
│   ├── highlight.css       # 代码高亮样式
│   │
│   ├── core/               # 核心工具库
│   │   ├── utils.js        # DOM 操作工具（类 jQuery 语法）
│   │   ├── statemachine.js # 简单状态机实现
│   │   └── bloghelper.js   # 博客内容获取（从 GitHub Raw URL）
│   │
│   ├── components/         # UI 组件
│   │   ├── navbar.js       # 顶部导航栏组件
│   │   ├── navbar.css
│   │   ├── sidebar.js      # 侧边栏组件（博客文章列表）
│   │   └── sidebar.css
│   │
│   └── blogs/              # ⭐ 博客内容目录
│       ├── blog.json       # 博客文章列表配置
│       ├── helloworld.md   # 默认博客文章
│       ├── publications.md # 发表论文页面
│       ├── resume.md       # 简历页面
│       └── *.md            # 其他博客文章
│
└── assets/                 # 静态资源（图片等）
    ├── publications/       # 论文相关图片
    ├── mc/                 # 蒙特卡洛相关图片
    ├── cs6610/             # CS6610 课程相关图片
    └── ...
```

---

## 核心文件说明

### 1. `src/index.js` - 主入口

主要职责：
- 初始化 marked 解析器（配置 KaTeX 和代码高亮）
- 管理页面状态（HOME / PUBLICATIONS / RESUME）
- 创建导航栏和侧边栏组件
- 处理 URL hash 路由

**页面状态：**
```javascript
const STATE_HOME = 0;        // 博客首页（显示侧边栏）
const STATE_PUBLICATIONS = 1; // 发表页面（无侧边栏）
const STATE_RESUME = 2;       // 简历页面（无侧边栏）
```

### 2. `src/blogs/blog.json` - 博客配置

定义博客文章列表，格式：
```json
{
    "articles": [
        {
            "path": "error-estimation-of-monte-carlo.md",
            "title": "Error Estimation In Monte Carlo Methods"
        },
        {
            "path": "helloworld.md",
            "title": "Hello World!",
            "default": true  // 标记为默认显示的文章
        }
    ]
}
```

### 3. `src/core/bloghelper.js` - 博客内容获取

从 GitHub Raw URL 动态获取博客内容：
```
https://raw.githubusercontent.com/WeakKnight/weakknight.github.io/master/src/blogs/{path}
```

### 4. `src/core/utils.js` - DOM 工具

提供类 jQuery 的 DOM 操作语法：
```javascript
$("className")           // 按 class 选择
$("#elementId")          // 按 id 选择
$(element)               // 包装原生元素
.enableClass(name)       // 添加 class
.disableClass(name)      // 移除 class
.html(content)           // 设置 innerHTML
.onClick(callback)       // 绑定点击事件
```

---

## 开发命令

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化自动构建）
npm run watch

# 生产构建
npm run build
```

---

## 如何添加新博客

1. 在 `src/blogs/` 目录创建 Markdown 文件，如 `new-article.md`
2. 编辑 `src/blogs/blog.json`，添加文章配置：
   ```json
   {
       "path": "new-article.md",
       "title": "文章标题"
   }
   ```
3. 如果需要图片，放入 `assets/` 对应子目录
4. 提交并推送到 GitHub（内容通过 GitHub Raw URL 动态获取）

---

## Markdown 特性支持

### 数学公式（KaTeX）
```markdown
行内公式: $E = mc^2$

块级公式:
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

### 代码高亮
````markdown
```cpp
int main() {
    return 0;
}
```
````

### 伪代码（pseudocode.js）
```html
<pre class="pseudocode">
\begin{algorithm}
\caption{算法标题}
\begin{algorithmic}
\STATE ...
\end{algorithmic}
\end{algorithm}
</pre>
```

### 图片

**⚠️ 重要：必须使用完整的 GitHub URL，不能使用相对路径！**

因为博客内容是从 GitHub Raw URL 动态获取的，相对路径无法正确解析。

```html
<img src="https://github.com/WeakKnight/weakknight.github.io/raw/master/assets/folder/image.png" width="80%" alt="描述"/>
```

图片尺寸控制（使用 width 属性）：
- `width="45%"` - 小图
- `width="60%"` - 中图
- `width="80%"` - 大图

---

## UI/样式规范

### 配色方案（深色主题）
| 元素 | 颜色 |
|------|------|
| 背景色 | `#1e1e1e` |
| 侧边栏背景 | `rgb(37, 37, 38)` |
| 导航栏背景 | `#373738` |
| 文字颜色 | `#cccccc` / `rgb(212, 212, 212)` |
| 链接颜色 | `rgb(55, 148, 255)` |
| 代码块背景 | `rgb(37, 37, 38)` |

### 布局
- 顶部导航栏：固定在顶部，高度 48px
- 侧边栏：固定在左侧，宽度 200px（可折叠）
- 内容区：右侧主体区域，支持滚动

---

## 路由机制

使用 URL hash 实现路由：
- `#文章标题` - 显示对应博客文章
- `#Publications` - 显示发表页面
- `#Resumé` - 显示简历页面

---

## 注意事项

1. **内容动态获取**：博客内容从 GitHub Raw URL 获取，修改后需要推送到 GitHub 才能生效
2. **CDN 依赖**：KaTeX、highlight.js、pseudocode.js 通过 CDN 加载（见 index.html）
3. **构建输出**：不要直接编辑 `bundle.js`，它是 Webpack 自动生成的
4. **图片路径**：博客中的图片使用相对路径 `../assets/...`

---

## 扩展建议

如需添加新功能，可以考虑：

1. **新页面**：在 `src/index.js` 中添加新的状态常量和对应的处理逻辑
2. **新组件**：在 `src/components/` 目录创建新的 JS/CSS 文件
3. **新样式**：修改 `src/styles.css` 或组件对应的 CSS 文件
4. **新博客功能**：修改 `src/core/bloghelper.js` 和 `blog.json` 结构

---

## 文件修改影响范围

| 修改文件 | 需要操作 | 影响 |
|----------|----------|------|
| `src/**/*.js` | `npm run build` | 重新生成 bundle.js |
| `src/**/*.css` | `npm run build` | 重新生成 bundle.js |
| `src/blogs/*.md` | Git push | 线上内容更新 |
| `src/blogs/blog.json` | Git push | 文章列表更新 |
| `assets/*` | Git push | 图片资源更新 |
| `index.html` | Git push | 页面结构/CDN更新 |
