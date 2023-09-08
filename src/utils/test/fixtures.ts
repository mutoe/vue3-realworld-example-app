import type { Comment, Article, Profile, User } from 'src/services/api'

const author: Profile = {
  username: 'Author name',
  bio: 'Author bio',
  following: false,
  image: '',
}

const user: User = {
  ...author,
  email: 'foo@example.com',
  token: '',
}

const article: Article = {
  slug: 'article-foo',
  title: 'Article foo',
  author,
  tagList: ['foo'],
  description: 'Article description',
  body: `# Article body

This is **Strong** content.`,
  favorited: false,
  favoritesCount: 0,
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2020-01-01T00:00:00Z',
}

const comment: Comment = {
  id: 1,
  author,
  body: 'Comment body',
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2020-01-01T00:00:00Z',
}

const comment2: Comment = {
  ...comment,
  id: 2,
  body: 'comment2',
}

const articleComments = [
  {
    id: 5,
    createdAt: '2021-11-24T12:11:08.480Z',
    updatedAt: '2021-11-24T12:11:08.480Z',
    body: 'If someone else has started working on an implementation, consider jumping in and helping them! by contacting the author.',
    author: {
      username: 'Gerome',
      bio: null,
      image: 'https://api.realworld.io/images/demo-avatar.png',
      following: false,
    },
  },
  {
    id: 4,
    createdAt: '2021-11-24T12:11:08.340Z',
    updatedAt: '2021-11-24T12:11:08.340Z',
    body: 'Before starting a new implementation, please check if there is any work in progress for the stack you want to work on.',
    author: {
      username: 'Gerome',
      bio: null,
      image: 'https://api.realworld.io/images/demo-avatar.png',
      following: false,
    },
  },
]

const markdown = '\n# h1 Heading 8-)\n## h2 Heading\n### h3 Heading\n#### h4 Heading\n##### h5 Heading\n###### h6 Heading\n\n\n## Horizontal Rules\n\n___\n\n---\n\n***\n\n\n## Typographic replacements\n\nEnable typographer option to see result.\n\n(c) (C) (r) (R) (tm) (TM) (p) (P) +-\n\ntest.. test... test..... test?..... test!....\n\n!!!!!! ???? ,,  -- ---\n\n"Smartypants, double quotes" and \'single quotes\'\n\n\n## Emphasis\n\n**This is bold text**\n\n__This is bold text__\n\n*This is italic text*\n\n_This is italic text_\n\n~~Strikethrough~~\n\n\n## Blockquotes\n\n\n> Blockquotes can also be nested...\n>> ...by using additional greater-than signs right next to each other...\n> > > ...or with spaces between arrows.\n\n\n## Lists\n\nUnordered\n\n+ Create a list by starting a line with `+`, `-`, or `*`\n+ Sub-lists are made by indenting 2 spaces:\n  - Marker character change forces new list start:\n    * Ac tristique libero volutpat at\n    + Facilisis in pretium nisl aliquet\n    - Nulla volutpat aliquam velit\n+ Very easy!\n\nOrdered\n\n1. Lorem ipsum dolor sit amet\n2. Consectetur adipiscing elit\n3. Integer molestie lorem at massa\n\n\n1. You can use sequential numbers...\n1. ...or keep all the numbers as `1.`\n\nStart numbering with offset:\n\n57. foo\n1. bar\n\n\n## Code\n\nInline `code`\n\nIndented code\n\n    // Some comments\n    line 1 of code\n    line 2 of code\n    line 3 of code\n\n\nBlock code "fences"\n\n```\nSample text here...\n```\n\nSyntax highlighting\n\n``` js\nvar foo = function (bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n```\n\n## Tables\n\n| Option | Description |\n| ------ | ----------- |\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\nRight aligned columns\n\n| Option | Description |\n| ------:| -----------:|\n| data   | path to data files to supply the data that will be passed into templates. |\n| engine | engine to be used for processing templates. Handlebars is the default. |\n| ext    | extension to be used for dest files. |\n\n\n## Links\n\n[link text](http://dev.nodeca.com)\n\n[link with title](http://nodeca.github.io/pica/demo/ "title text!")\n\nAutoconverted link https://github.com/nodeca/pica (enable linkify to see)\n\n\n## Images\n\n![Minion](https://octodex.github.com/images/minion.png)\n![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")\n\nLike links, Images also have a footnote style syntax\n\n![Alt text][id]\n\nWith a reference later in the document defining the URL location:\n\n[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"\n\n\n## Plugins\n\nThe killer feature of `markdown-it` is very effective support of\n[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).\n\n\n### [Emojies](https://github.com/markdown-it/markdown-it-emoji)\n\n> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:\n>\n> Shortcuts (emoticons): :-) :-( 8-) ;)\n\nsee [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.\n\n\n### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)\n\n- 19^th^\n- H~2~O\n\n\n### [\\<ins>](https://github.com/markdown-it/markdown-it-ins)\n\n++Inserted text++\n\n\n### [\\<mark>](https://github.com/markdown-it/markdown-it-mark)\n\n==Marked text==\n\n\n### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)\n\nFootnote 1 link[^first].\n\nFootnote 2 link[^second].\n\nInline footnote^[Text of inline footnote] definition.\n\nDuplicated footnote reference[^second].\n\n[^first]: Footnote **can have markup**\n\n    and multiple paragraphs.\n\n[^second]: Footnote text.\n\n\n### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)\n\nTerm 1\n\n:   Definition 1\nwith lazy continuation.\n\nTerm 2 with *inline markup*\n\n:   Definition 2\n\n        { some code, part of Definition 2 }\n\n    Third paragraph of definition 2.\n\n_Compact style:_\n\nTerm 1\n  ~ Definition 1\n\nTerm 2\n  ~ Definition 2a\n  ~ Definition 2b\n\n\n### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)\n\nThis is HTML abbreviation example.\n\nIt converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.\n\n*[HTML]: Hyper Text Markup Language\n\n### [Custom containers](https://github.com/markdown-it/markdown-it-container)\n\n::: warning\n*here be dragons*\n:::\n'

const markdownCN = '# Markdown 示例\n\n标签： Markdown\n\n---\n\n### 1. 斜体和粗体\n\n使用 * 和 ** 表示斜体和粗体。\n\n示例：\n\n这是 *斜体*，这是 **粗体**。\n\n### 2. 分级标题\n\n使用 === 表示一级标题，使用 --- 表示二级标题。\n\n示例：\n\n```\n这是一个一级标题\n============================\n\n这是一个二级标题\n--------------------------------------------------\n\n### 这是一个三级标题\n```\n\n你也可以选择在行首加井号表示不同级别的标题 (H1-H6)，例如：# H1, ## H2, ### H3，#### H4。\n\n### 3. 外链接\n\n使用 \\[描述](链接地址) 为文字增加外链接。\n\n示例：\n\n这是去往 [本人博客](http://ghosertblog.github.com) 的链接。\n\n### 4. 无序列表\n\n使用 *，+，- 表示无序列表。\n\n示例：\n\n- 无序列表项 一\n- 无序列表项 二\n- 无序列表项 三\n\n### 5. 有序列表\n\n使用数字和点表示有序列表。\n\n示例：\n\n1. 有序列表项 一\n2. 有序列表项 二\n3. 有序列表项 三\n\n### 6. 文字引用\n\n使用 > 表示文字引用。\n\n示例：\n\n> 野火烧不尽，春风吹又生。\n\n### 7. 行内代码块\n\n使用 `\n代码` 表示行内代码块。\n\n示例：\n\n让我们聊聊 `html`。\n\n### 8.  代码块\n\n使用 四个缩进空格 表示代码块。\n\n示例：\n\n    这是一个代码块，此行左侧有四个不可见的空格。\n\n### 9.  插入图像\n\n使用 \\!\\[描述](图片链接地址) 插入图像。\n\n示例：\n\n![我的头像](https://www.zybuluo.com/static/img/my_head.jpg)\n\n# Cmd Markdown 高阶语法手册\n\n### 1. 内容目录\n\n在段落中填写 `[TOC]` 以显示全文内容的目录结构。\n\n[TOC]\n\n### 2. 标签分类\n\n在编辑区任意行的列首位置输入以下代码给文稿标签：\n\n标签： 数学 英语 Markdown\n\n或者\n\nTags： 数学 英语 Markdown\n\n### 3. 删除线\n\n使用 ~~ 表示删除线。\n\n~~这是一段错误的文本。~~\n\n### 4. 注脚\n\n使用 [^keyword] 表示注脚。\n\n这是一个注脚[^footnote]的样例。\n\n这是第二个注脚[^footnote2]的样例。\n\n### 5. LaTeX 公式\n\n$ 表示行内公式：\n\n质能守恒方程可以用一个很简洁的方程式 $E=mc^2$ 来表达。\n\n$$ 表示整行公式：\n\n$$\\sum_{i=1}^n a_i=0$$\n\n$$f(x_1,x_x,\\ldots,x_n) = x_1^2 + x_2^2 + \\cdots + x_n^2 $$\n\n$$\\sum^{j-1}_{k=0}{\\widehat{\\gamma}_{kj} z_k}$$\n\n访问 [MathJax](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference) 参考更多使用方法。\n\n### 6. 加强的代码块\n\n支持四十一种编程语言的语法高亮的显示，行号显示。\n\n非代码示例：\n\n```\n$ sudo apt-get install vim-gnome\n```\n\nPython 示例：\n\n```python\n@requires_authorization\ndef somefunc(param1=\'\', param2=0):\n    \'\'\'A docstring\'\'\'\n    if param1 > param2: # interesting\n        print \'Greater\'\n    return (param2 - param1 + 1) or None\n\nclass SomeClass:\n    pass\n\n>>> message = \'\'\'interpreter\n... prompt\'\'\'\n```\n\nJavaScript 示例：\n\n``` javascript\n/**\n* nth element in the fibonacci series.\n* @param n >= 0\n* @return the nth element, >= 0.\n*/\nfunction fib(n) {\n  var a = 1, b = 1;\n  var tmp;\n  while (--n >= 0) {\n    tmp = a;\n    a += b;\n    b = tmp;\n  }\n  return a;\n}\n\ndocument.write(fib(10));\n```\n\n### 7. 流程图\n\n#### 示例\n\n```flow\nst=>start: Start:>https://www.zybuluo.com\nio=>inputoutput: verification\nop=>operation: Your Operation\ncond=>condition: Yes or No?\nsub=>subroutine: Your Subroutine\ne=>end\n\nst->io->op->cond\ncond(yes)->e\ncond(no)->sub->io\n```\n\n#### 更多语法参考：[流程图语法参考](http://adrai.github.io/flowchart.js/)\n\n### 8. 序列图\n\n#### 示例 1\n\n```seq\nAlice->Bob: Hello Bob, how are you?\nNote right of Bob: Bob thinks\nBob-->Alice: I am good thanks!\n```\n\n#### 示例 2\n\n```seq\nTitle: Here is a title\nA->B: Normal line\nB-->C: Dashed line\nC->>D: Open arrow\nD-->>A: Dashed open arrow\n```\n\n#### 更多语法参考：[序列图语法参考](http://bramp.github.io/js-sequence-diagrams/)\n\n### 9. 甘特图\n\n甘特图内在思想简单。基本是一条线条图，横轴表示时间，纵轴表示活动（项目），线条表示在整个期间上计划和实际的活动完成情况。它直观地表明任务计划在什么时候进行，及实际进展与计划要求的对比。\n\n```gantt\n    title 项目开发流程\n    section 项目确定\n        需求分析       :a1, 2016-06-22, 3d\n        可行性报告     :after a1, 5d\n        概念验证       : 5d\n    section 项目实施\n        概要设计      :2016-07-05  , 5d\n        详细设计      :2016-07-08, 10d\n        编码          :2016-07-15, 10d\n        测试          :2016-07-22, 5d\n    section 发布验收\n        发布: 2d\n        验收: 3d\n```\n\n#### 更多语法参考：[甘特图语法参考](https://knsv.github.io/mermaid/#gant-diagrams)\n\n### 10. Mermaid 流程图\n\n```graphLR\n    A[Hard edge] -->|Link text| B(Round edge)\n    B --> C{Decision}\n    C -->|One| D[Result one]\n    C -->|Two| E[Result two]\n```\n\n#### 更多语法参考：[Mermaid 流程图语法参考](https://knsv.github.io/mermaid/#flowcharts-basic-syntax)\n\n### 11. Mermaid 序列图\n\n```sequence\n    Alice->John: Hello John, how are you?\n    loop every minute\n        John-->Alice: Great!\n    end\n```\n\n#### 更多语法参考：[Mermaid 序列图语法参考](https://knsv.github.io/mermaid/#sequence-diagrams)\n\n### 12. 表格支持\n\n| 项目        | 价格   |  数量  |\n| --------   | -----:  | :----:  |\n| 计算机     | \\$1600 |   5     |\n| 手机        |   \\$12   |   12   |\n| 管线        |    \\$1    |  234  |\n\n\n### 13. 定义型列表\n\n名词 1\n:   定义 1（左侧有一个可见的冒号和四个不可见的空格）\n\n代码块 2\n:   这是代码块的定义（左侧有一个可见的冒号和四个不可见的空格）\n\n        代码块（左侧有八个不可见的空格）\n\n### 14. Html 标签\n\n本站支持在 Markdown 语法中嵌套 Html 标签，譬如，你可以用 Html 写一个纵跨两行的表格：\n\n    <table>\n        <tr>\n            <th rowspan="2">值班人员</th>\n            <th>星期一</th>\n            <th>星期二</th>\n            <th>星期三</th>\n        </tr>\n        <tr>\n            <td>李强</td>\n            <td>张明</td>\n            <td>王平</td>\n        </tr>\n    </table>\n\n\n<table>\n    <tr>\n        <th rowspan="2">值班人员</th>\n        <th>星期一</th>\n        <th>星期二</th>\n        <th>星期三</th>\n    </tr>\n    <tr>\n        <td>李强</td>\n        <td>张明</td>\n        <td>王平</td>\n    </tr>\n</table>\n\n### 15. 内嵌图标\n\n本站的图标系统对外开放，在文档中输入\n\n    <i class="icon-weibo"></i>\n\n即显示微博的图标： <i class="icon-weibo icon-2x"></i>\n\n替换 上述 `i 标签` 内的 `icon-weibo` 以显示不同的图标，例如：\n\n    <i class="icon-renren"></i>\n\n即显示人人的图标： <i class="icon-renren icon-2x"></i>\n\n更多的图标和玩法可以参看 [font-awesome](http://fortawesome.github.io/Font-Awesome/3.2.1/icons/) 官方网站。\n\n### 16. 待办事宜 Todo 列表\n\n使用带有 [ ] 或 [x] （未完成或已完成）项的列表语法撰写一个待办事宜列表，并且支持子列表嵌套以及混用Markdown语法，例如：\n\n    - [ ] **Cmd Markdown 开发**\n        - [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率\n        - [ ] 支持以 PDF 格式导出文稿\n        - [x] 新增Todo列表功能 [语法参考](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)\n        - [x] 改进 LaTex 功能\n            - [x] 修复 LaTex 公式渲染问题\n            - [x] 新增 LaTex 公式编号功能 [语法参考](http://docs.mathjax.org/en/latest/tex.html#tex-eq-numbers)\n    - [ ] **七月旅行准备**\n        - [ ] 准备邮轮上需要携带的物品\n        - [ ] 浏览日本免税店的物品\n        - [x] 购买蓝宝石公主号七月一日的船票\n\n对应显示如下待办事宜 Todo 列表：\n\n- [ ] **Cmd Markdown 开发**\n    - [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率\n    - [ ] 支持以 PDF 格式导出文稿\n    - [x] 新增Todo列表功能 [语法参考](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)\n    - [x] 改进 LaTex 功能\n        - [x] 修复 LaTex 公式渲染问题\n        - [x] 新增 LaTex 公式编号功能 [语法参考](http://docs.mathjax.org/en/latest/tex.html#tex-eq-numbers)\n- [ ] **七月旅行准备**\n    - [ ] 准备邮轮上需要携带的物品\n    - [ ] 浏览日本免税店的物品\n    - [x] 购买蓝宝石公主号七月一日的船票\n\n\n[^footnote]: 这是一个 *注脚* 的 **文本**。\n\n[^footnote2]: 这是另一个 *注脚* 的 **文本**。'

const markdownXss = '<script>alert("script injection")</script>\n\n<img src=1 onerror="alert(\'img onerror\')">'

export default {
  author,
  user,
  article,
  comment,
  comment2,
  articleComments,
  markdown,
  markdownCN,
  markdownXss,
}
