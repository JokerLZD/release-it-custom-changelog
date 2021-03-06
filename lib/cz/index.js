const pad = require('pad')

const types = [
  {
    emoji: 'â¨',
    code: ':sparkles:',
    description: {
      'en-US': 'Introducing new features.',
      'zh-CN': 'æ°åè½',
    },
    name: 'feat',
  },
  {
    emoji: 'ð',
    code: ':bug:',
    description: {
      'en-US': 'Fixing a bug.',
      'zh-CN': 'Bug ä¿®å¤',
    },
    name: 'fix',
  },
  {
    emoji: 'â¡ï¸',
    code: ':zap:',
    description: {
      'en-US': 'Improving performance.',
      'zh-CN': 'æ¹åæ§è½',
    },
    name: 'perf',
  },
  {
    emoji: 'ð¨',
    code: ':art:',
    description: {
      'en-US': 'Improving structure / format of the code.',
      'zh-CN': 'æ¹è¿ä»£ç çç»æ/æ ¼å¼ã(å¦å é¤ç©ºæ ¼ãæ ¼å¼åãå»ææ«å°¾åå·ç­)',
    },
    name: 'style',
  },
  {
    emoji: 'ð',
    code: ':lipstick:',
    description: {
      'en-US': 'Updating the UI and style files.',
      'zh-CN': 'æ´æ°åæ ·å¼æä»¶',
    },
    name: 'ui',
  },
  {
    emoji: 'ð',
    code: ':pencil:',
    description: {
      'en-US': 'Writing docs.',
      'zh-CN': 'ææ¡£æ´æ¹',
    },
    name: 'docs',
  },
  {
    emoji: 'â',
    code: ':white_check_mark:',
    description: {
      'en-US': 'Adding tests.',
      'zh-CN': 'æ·»å æµè¯',
    },
    name: 'test',
  },
  {
    emoji: 'â»ï¸',
    code: ':recycle:',
    description: {
      'en-US': 'Refactoring code.',
      'zh-CN': 'ä»£ç éæ',
    },
    name: 'refactor',
  },
  {
    emoji: 'ð¦',
    code: ':package:',
    description: { 'en-US': 'Chores.', 'zh-CN': 'æé¡¹' },
    name: 'chore',
  },
  {
    emoji: 'ð·',
    code: ':construction_worker:',
    description: {
      'en-US': 'Adding CI build system.',
      'zh-CN': 'æ·»å CIæå»ºç³»ç»',
    },
    name: 'ci',
  },
  {
    emoji: 'âª',
    code: ':rewind:',
    description: {
      'en-US': 'Reverting changes.',
      'zh-CN': 'è¿åæ´æ¹',
    },
    name: 'revert',
  },
  {
    emoji: 'ð',
    code: ':tada:',
    description: {
      'en-US': 'Initial commit.',
      'zh-CN': 'åæ¬¡æäº¤',
    },
    name: 'init',
  },
]

const scopes = [
  { value: 'global', name: { 'en-US': 'Impact the whole project', 'zh-CN': 'å½±åæ´ä¸ªé¡¹ç®' } },
  { value: 'components', name: { 'en-US': 'about components', 'zh-CN': 'ç»ä»¶ç¸å³' } },
  { value: 'utils', name: { 'en-US': 'about utils', 'zh-CN': 'utils ç¸å³' } },
  { value: 'ui', name: { 'en-US': 'about UI', 'zh-CN': 'UI è°æ´' } },
  { value: 'deps', name: { 'en-US': 'depends', 'zh-CN': 'é¡¹ç®ä¾èµ' } },
  { value: 'other', name: { 'en-US': 'other', 'zh-CN': 'å¶ä»ä¿®æ¹' } },
  { value: 'custom', name: { 'en-US': 'need custom', 'zh-CN': 'ä»¥ä¸é½ä¸æ¯ï¼æè¦èªå®ä¹' } },
]

const messages = {
  type: {
    'en-US': 'Select the type of change that youâre committing:',
    'zh-CN': 'è¯·ç¡®ä¿ä½ çæäº¤éµå¾ªäºåå­æäº¤è§èï¼\néæ©ä½ è¦æäº¤çç±»å:',
  },
  scope: {
    'en-US': 'Denote the SCOPE of this change (press enter to skip):',
    'zh-CN': 'éæ©ä¸ä¸ª scope (åè½¦è·³è¿):',
  },
  customScope: {
    'en-US': 'Denote the SCOPE of this change:',
    'zh-CN': 'è¯·è¾å¥èªå®ä¹ç scope:',
  },
  subject: {
    'en-US': 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    'zh-CN': 'å¡«åä¸ä¸ªç®ç­ç²¾ç¼çæè¿°è¯­å¥:\n',
  },
  body: {
    'en-US': 'Provide a LONGER description of the change (press enter to skip). Use "|" to break new line:\n',
    'zh-CN':
      'æ·»å ä¸ä¸ªæ´å è¯¦ç»çæè¿°ï¼å¯ä»¥éä¸æ°å¢åè½çæè¿°æ bug é¾æ¥ãæªå¾é¾æ¥ (å¯é)ãä½¿ç¨ "|" æ¢è¡:\n',
  },
  breaking: {
    'en-US': 'List any BREAKING CHANGES (press enter to skip):\n',
    'zh-CN': 'åä¸¾éå¼å®¹æ§éå¤§çåæ´ (å¯é):\n',
  },
  footer: {
    'en-US': 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    'zh-CN': 'åä¸¾åºææåæ´ç ISSUES CLOSED  (å¯é)ã ä¾å¦.: #31, #34:\n',
  },
  confirmCommit: {
    'en-US': 'Are you sure you want to proceed with the commit above?',
    'zh-CN': 'ç¡®è®¤æäº¤?',
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
