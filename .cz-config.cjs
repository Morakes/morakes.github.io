module.exports = {
  types: [
    {
      value: 'feature',
      name: '✨  feature: 开发新功能',
    },
    {
      value: 'fixbug',
      name: '🐞  fixbug: 修复bug',
    },
    {
      value: 'refactor',
      name: '🛠  refactor: 重构（既不修复 Bug 也不添加功能的代码更改）',
    },
    {
      value: 'chore',
      name: '🗯  chore: 不修改 src 或测试文件的更改。如更新生成任务、包管理器',
    },
    {
      value: 'build',
      name: '⛪  build: 构建项目相关代码',
    },
    {
      value: 'docs',
      name: '📚  docs: 仅仅修改项目中的文档',
    },
    {
      value: 'test',
      name: '🏁  test: 添加缺少的测试或修改现有测试',
    },
    {
      value: 'style',
      name: '💅  style: 代码样式，不影响代码含义的更改（空格、格式、缺失分号等）',
    },
    {
      value: 'revert',
      name: '⏪  revert: 回退到某个git版本',
    },
  ],

  messages: {
    type: '选择要提交更改的类型:',
    scope: '\n表示此次更改的范围（可选的）:',
    // used if allowCustomScopes is true
    customScope: '表示此次更改的范围 (e.g. 组件 或者 文件名)?:',
    subject: '写一个简短的标题描述您此次的提交:',
    body: '写一个长的备注来描述您此次的提交. 使用 "|" 来进行换行:\n',
    footer: '列出此次修改可以关闭的issue (可选的). E.g.: #31, #34:',
    breaking: '列出一些重大变更 (可选的):\n',
    confirmCommit: '是否确实要继续上述提交？',
  },
  // 定义影响的范围
  scopes: [
    { name: '配置' },
    { name: '构建' },
    { name: '视图' },
    { name: '全局' },
  ],
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // 允许自定义的scope
  allowCustomScopes: true,
  // 允许breakingchange
  allowBreakingChanges: ['feat', 'fix'],
}
