const pka = require('../../package.json')

module.exports = {
  defaultRepo: '',
  branch: 'master',
  name: 'rh-template-vue',
  filePath: 'manifest.default.json',
  token: `token ${process.env.TEMP_TOKEN}`,
  commitMsg: {
    add: `修改${pka.name}信息, 版本号${pka.version} ✔`,
    del: `删除${pka.name}信息 👀`
  }
}
