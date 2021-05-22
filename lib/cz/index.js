const pad = require('pad')

const types = [
  {
    emoji: '✨',
    code: ':sparkles:',
    description: {
      'en-US': 'Introducing new features.',
      'zh-CN': '新功能',
    },
    name: 'feat',
  },
  {
    emoji: '🐛',
    code: ':bug:',
    description: {
      'en-US': 'Fixing a bug.',
      'zh-CN': 'Bug 修复',
    },
    name: 'fix',
  },
  {
    emoji: '⚡️',
    code: ':zap:',
    description: {
      'en-US': 'Improving performance.',
      'zh-CN': '改善性能',
    },
    name: 'perf',
  },
  {
    emoji: '🎨',
    code: ':art:',
    description: {
      'en-US': 'Improving structure / format of the code.',
      'zh-CN': '改进代码的结构/格式。(如删除空格、格式化、去掉末尾分号等)',
    },
    name: 'style',
  },
  {
    emoji: '💄',
    code: ':lipstick:',
    description: {
      'en-US': 'Updating the UI and style files.',
      'zh-CN': '更新和样式文件',
    },
    name: 'ui',
  },
  {
    emoji: '📝',
    code: ':pencil:',
    description: {
      'en-US': 'Writing docs.',
      'zh-CN': '文档更改',
    },
    name: 'docs',
  },
  {
    emoji: '✅',
    code: ':white_check_mark:',
    description: {
      'en-US': 'Adding tests.',
      'zh-CN': '添加测试',
    },
    name: 'test',
  },
  {
    emoji: '♻️',
    code: ':recycle:',
    description: {
      'en-US': 'Refactoring code.',
      'zh-CN': '代码重构',
    },
    name: 'refactor',
  },
  {
    emoji: '📦',
    code: ':package:',
    description: { 'en-US': 'Chores.', 'zh-CN': '杂项' },
    name: 'chore',
  },
  {
    emoji: '👷',
    code: ':construction_worker:',
    description: {
      'en-US': 'Adding CI build system.',
      'zh-CN': '添加CI构建系统',
    },
    name: 'ci',
  },
  {
    emoji: '⏪',
    code: ':rewind:',
    description: {
      'en-US': 'Reverting changes.',
      'zh-CN': '还原更改',
    },
    name: 'revert',
  },
]

const scopes = [
  { value: 'global', name: { 'en-US': 'Impact the whole project', 'zh-CN': '影响整个项目' } },
  { value: 'components', name: { 'en-US': 'about components', 'zh-CN': '组件相关' } },
  { value: 'utils', name: { 'en-US': 'about utils', 'zh-CN': 'utils 相关' } },
  { value: 'ui', name: { 'en-US': 'about UI', 'zh-CN': 'UI 调整' } },
  { value: 'deps', name: { 'en-US': 'depends', 'zh-CN': '项目依赖' } },
  { value: 'other', name: { 'en-US': 'other', 'zh-CN': '其他修改' } },
  { value: 'custom', name: { 'en-US': 'need custom', 'zh-CN': '以上都不是？我要自定义' } },
]

const messages = {
  type: {
    'en-US': 'Select the type of change that you‘re committing:',
    'zh-CN': '请确保你的提交遵循了原子提交规范！\n选择你要提交的类型:',
  },
  scope: {
    'en-US': 'Denote the SCOPE of this change (press enter to skip):',
    'zh-CN': '选择一个 scope (回车跳过):',
  },
  customScope: {
    'en-US': 'Denote the SCOPE of this change:',
    'zh-CN': '请输入自定义的 scope:',
  },
  subject: {
    'en-US': 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    'zh-CN': '填写一个简短精炼的描述语句:\n',
  },
  body: {
    'en-US': 'Provide a LONGER description of the change (press enter to skip). Use "|" to break new line:\n',
    'zh-CN':
      '添加一个更加详细的描述，可以附上新增功能的描述或 bug 链接、截图链接 (可选)。使用 "|" 换行:\n',
  },
  breaking: {
    'en-US': 'List any BREAKING CHANGES (press enter to skip):\n',
    'zh-CN': '列举非兼容性重大的变更 (可选):\n',
  },
  footer: {
    'en-US': 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    'zh-CN': '列举出所有变更的 ISSUES CLOSED  (可选)。 例如.: #31, #34:\n',
  },
  confirmCommit: {
    'en-US': 'Are you sure you want to proceed with the commit above?',
    'zh-CN': '确认提交?',
  },
}

const defaultTypes = function ({ symbol = true, withEmoji = true, language = 'zh-CN' } = {}) {
  const maxNameLength = types.reduce(
    (maxLength, type) => (type.name.length > maxLength ? type.name.length : maxLength),
    0
  )

  return types.map((choice) => ({
    name: `${pad(choice.name, maxNameLength)}  ${choice.emoji}  ${choice.description[language]}`,
    value: `${withEmoji ? (symbol ? `${choice.emoji} ` : choice.code) : ''}${choice.name}`,
    code: choice.code,
    raw: choice.name
  }))
}

const defaultScopes = function (language = 'zh-CN') {
  return scopes.map((v) => ({ value: v.value, name: `${pad(v.value, 20)} (${v.name[language]})` }))
}

const defaultMessages = function (language = 'zh-CN') {
  const keys = Object.keys(messages)
  return keys.reduce((acc, key) => {
    acc[key] = messages[key][language]
    return acc
  }, {})
}

const getTypesMap = function () {
  return types.reduce((acc, cur) => {
    acc[cur.name] = cur
    return acc
  }, {})
}

module.exports = {
  defaultTypes,
  defaultScopes,
  defaultMessages,
  getTypesMap,
}
