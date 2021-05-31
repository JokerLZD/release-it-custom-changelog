# Custom Changelog plugin for release-it

This plugin will provide the recommended bump to release-it, and update the changelog file (e.g. `CHANGELOG.md`).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [options](#options)
  - [infile](#infile)
  - [fileHeader](#fileHeader)
  - [whitEmoji](#whitEmoji)
  - [showAuthor](#showAuthor)
  - [showEmail](#showEmail)
  - [parserOpts](#parserOpts)
  - [bump](#bump)

## Install

### npm

```bash
npm install --save-dev release-it-custom-changelog
```

### yarn

```bash
yarn add -D release-it-custom-changelog
```

## Usage

In the [release-it](https://github.com/release-it/release-it) config, for example:

```json
"plugins": {
  "release-it-custom-changelog": {
    "infile": "CHANGELOG.md",
    "fileHeader": {
      "title": "# Changelog\n\n",
      "description": "A string to be used as the main header section of the CHANGELOG.\n",
    },
    "withEmoji": true,
    "language": "zh-CN",
    "showAuthor": true,
    "showEmail": false,
    "parserOpts": "...",
    "bump":"..."
  }
}
```

## Options

The Options description.

#### infile

**Type:** `string` **Default:** ``

If `’‘` or `undefined`, will not be written to the log file

#### fileHeader

**Type:** `object` **Default:** `{ "title": "# Changelog\n\n", "description": "A string to be used as the main header section of the CHANGELOG.\n", }`

#### whitEmoji

**Type:** `boolean` **Default:** `true`

If `false`, There will be no emoji before commit type

#### language

**Type:** `string` **Default:** `zh-CN`

Only `en-US` and `zh-CN`

#### showAuthor

**Type:** `boolean` **Default:** `false`

If `true`, will show commit author

#### showEmail

**Type:** `boolean` **Default:** `false`

If `true`, will show commit email

#### parserOpts

See the [conventional-commits-parser](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-commits-parser/README.md) docs.

#### bump

See the [conventional-recommended-bump](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump/README.md) docs.
