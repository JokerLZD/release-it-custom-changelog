const typeDisplayName = require('./typeDisplayName')
const { getTypesMap } = require('../../cz')

const defaultTypes = Object.keys(getTypesMap())

const BREAKING_CHANGES = {
  'zh-CN': '不兼容变更',
  'en-US': 'BREAKING CHANGES',
}

module.exports = (config) => (commit, context) => {
  // console.log(config, commit, context)
  let discard = true
  const issues = []
  const { showAuthor, showEmail, language, withEmoji, issuesUrl } = config

  context.issuesUrl = issuesUrl || false
  context.author = showAuthor || false
  context.email = showEmail || false

  commit.notes.forEach((note) => {
    note.title = `${withEmoji ? '💥 ' : ''}${BREAKING_CHANGES[language]}`
    discard = false
  })

  let displayTypes = defaultTypes

  if (config.displayTypes) {
    displayTypes = config.displayTypes
  }

  if (!displayTypes.includes(commit.type) && discard) return

  // change type
  commit.type = typeDisplayName(commit.type, {
    language: config.language,
    withEmoji: config.withEmoji,
  })

  if (typeof commit.hash === 'string') {
    commit.shortHash = commit.hash.substring(0, 7)
  }

  if (typeof commit.subject === 'string') {
    let url = context.repository
      ? `${context.host}/${context.owner}/${context.repository}`
      : context.repoUrl
    if (url) {
      url = `${url}/issues/`
      // Issue URLs.
      commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
        issues.push(issue)
        return `[#${issue}](${url}${issue})`
      })
    }
    if (context.host) {
      // User URLs.
      commit.subject = commit.subject.replace(
        /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
        (_, username) => {
          if (username.includes('/')) {
            return `@${username}`
          }

          return `[@${username}](${context.host}/${username})`
        }
      )
    }
  }

  // remove references that already appear in the subject
  commit.references = commit.references.filter((reference) => {
    return issues.indexOf(reference.issue) === -1
  })
  return commit
}
