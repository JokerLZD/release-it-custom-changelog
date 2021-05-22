'use strict'
const { Plugin } = require('release-it')

const bump = require('conventional-recommended-bump')
const conventionalChangelog = require('conventional-changelog')

const semver = require('semver')
const concat = require('concat-stream')
const { accessSync, writeFileSync, readFileSync } = require('fs-extra')

const {
  gitRawCommitsOpts,
  parserOpts,
  recommendedBumpOpts,
  writerOpts,
} = require('./lib/changelog/index')

const cz = require('./lib/cz')

cz.config = require('./.cz-config')

const FILE_HEADER = {
  title: '# Changelog \n',
  description: 'A string to be used as the main header section of the CHANGELOG. \n',
}

class ConventionalChangelog extends Plugin {
  static disablePlugin() {
    return 'version' // disabled release-it version plugin
  }

  // Gets the log since the last commit
  async getChangelog(latestVersion) {
    const { version, previousTag, currentTag } = await this._getConventionalConfig(latestVersion)
    this.setContext({ version, previousTag, currentTag })
    return this._generateChangelog()
  }

  async _getConventionalConfig(latestVersion) {
    const { increment, isPreRelease, preReleaseId } = this.config.getContext('version')
    const version = await this.getIncrementedVersion({
      increment,
      latestVersion,
      isPreRelease,
      preReleaseId,
    })
    this.setContext({ version })

    const previousTag = this.config.getContext('latestTag')
    const tagTemplate =
      this.options.tagName || ((previousTag || '').match(/^v/) ? 'v${version}' : '${version}')
    const currentTag = tagTemplate.replace('${version}', version)

    return { version, previousTag, currentTag }
  }

  async getIncrementedVersion(opt) {
    const { version } = this.getContext()
    if (version) return version
    return await this._getVersionByBUMP(opt)
  }

  _getVersionByBUMP({ increment, latestVersion, isPreRelease, preReleaseId }) {
    const { options } = this
    const bumpOpt = options.bump
      ? Object.assign(recommendedBumpOpts, options.bump)
      : recommendedBumpOpts
    return new Promise((resolve, reject) =>
      bump(bumpOpt, (err, result) => {
        this.debug({ err, result })
        if (err) return reject(err)
        let { releaseType } = result
        if (increment) {
          this.log.warn(
            `Recommended bump is "${releaseType}", but is overridden with "${increment}".`
          )
          releaseType = increment
        }
        if (increment && semver.valid(increment)) {
          resolve(increment)
        } else if (isPreRelease) {
          const type = increment ? `pre${releaseType}` : 'prerelease'
          resolve(semver.inc(latestVersion, type, preReleaseId))
        } else if (releaseType) {
          resolve(semver.inc(latestVersion, releaseType, preReleaseId))
        } else {
          resolve(null)
        }
      })
    )
  }

  _generateChangelog(options) {
    return new Promise((resolve, reject) => {
      const resolver = (result) => resolve(result.toString().trim())
      const changelogStream = this._getChangelogStream(options)
      changelogStream.pipe(concat(resolver))
      changelogStream.on('error', reject)
    })
  }

  _getChangelogStream(opts = {}) {
    const { version, previousTag, currentTag } = this.getContext()
    const options = Object.assign({}, opts)
    const parser = Object.assign(parserOpts, this.options.parserOpts || {})
    const context = { version, previousTag, currentTag }
    options.debug = this.config.isDebug ? this.debug : function () {}
    const wopt = writerOpts(this.options)

    return conventionalChangelog(options, context, gitRawCommitsOpts, parser, wopt)
  }

  async _writeChangelog() {
    let { infile, fileHeader } = this.options
    let oldContent = ''
    let hasInfile = false
    let { changelog } = this.config.getContext()
    try {
      accessSync(infile)
      hasInfile = true
    } catch (err) {
      this.debug(err)
    }

    fileHeader = fileHeader || FILE_HEADER
    const fileHeaderStr = `${fileHeader.title}${fileHeader.description}`
    const PATTERN = new RegExp(fileHeaderStr, 'm')
    if (!hasInfile) {
      changelog = await this._generateChangelog({ releaseCount: 0 })
      this.debug({ changelog })
    } else {
      oldContent = readFileSync(infile, 'utf-8')
      const oldContentStart = oldContent.search(PATTERN)
      if (oldContentStart !== -1) {
        oldContent = oldContent.substring(oldContentStart + fileHeaderStr.length)
      }
    }

    await writeFileSync(
      infile,
      fileHeaderStr + (changelog + oldContent),
      'utf8'
    )

    if (!hasInfile) {
      await this.exec(`git add ${infile}`)
    }
  }

  async beforeRelease() {
    const { infile } = this.options
    const { isDryRun } = this.config

    this.log.exec(`Writing changelog to ${infile}`, isDryRun)

    if (infile && !isDryRun) {
      await this._writeChangelog()
    }
  }
}

module.exports = ConventionalChangelog

module.exports.cz = cz
