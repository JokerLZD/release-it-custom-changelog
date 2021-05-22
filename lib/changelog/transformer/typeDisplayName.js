const { getTypesMap } = require('../../cz')

const typesMap = getTypesMap()

module.exports = function getDisplayName(type, options = { withEmoji: true, language: 'zh-CN' }) {
  const { withEmoji, language } = options
  if (type in typesMap) {
    const item = typesMap[type]
    const { emoji } = item
    return `${withEmoji ? `${emoji} ` : ''}${item.description[language]}`
  }

  return type
}
