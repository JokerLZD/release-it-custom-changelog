'use strict'

const { resolve } = require('path')
const { readFileSync } = require('fs-extra')
const transformer = require('../transformer')

const basePath = resolve(__dirname, '../templates')

const mainTemplate = readFileSync(`${basePath}/main.hbs`, 'utf-8')
const headerPartial = readFileSync(`${basePath}/header.hbs`, 'utf-8')
const commitPartial = readFileSync(`${basePath}/commit.hbs`, 'utf-8')
const footerPartial = readFileSync(`${basePath}/footer.hbs`, 'utf-8')

module.exports = (config) => ({
  // groupBy: 'type',
  // commitGroupsSort: 'title',
  // commitsSort: ['scope', 'subject'],
  // noteGroupsSort: 'title',
  mainTemplate,
  headerPartial,
  commitPartial,
  footerPartial,
  transform: transformer(config),
})
