module.exports = {
  plugins: {
    './index.js': {
      infile: 'CHANGELOG.md',
      fileHeader: {
        title: '# Changelog\n\n',
        description: 'A string to be used as the main header section of the CHANGELOG.\n',
      },
      withEmoji: true,
      language: 'zh-CN',
      showAuthor: true,
      showEmail: false,
    },
  },
  npm: {
    publish: false,
  },
  git: {
    addUntrackedFiles: false,
    commitMessage: ':package: chore(release): version',
    push: false,
    requireCleanWorkingDir: false,
    requireUpstream: false,
    tag: true,
    tagName: 'v${version}',
  },
  github: {
    release: false,
  },
}
