const recommendedBumpOpts = require('./utils/conventional-recommended-bump') // 根据提交信息自动生成版本号
const gitRawCommitsOpts = require('./utils/git-raw-commits') // 格式化 git log 信息
const parserOpts = require('./utils/parser-opts') // 解析流
const writerOpts = require('./utils/writer-opts') // 输出流

module.exports = {
  parserOpts,
  recommendedBumpOpts,
  writerOpts,
  gitRawCommitsOpts,
}
