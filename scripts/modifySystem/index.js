const config = require('./config')
const request = require('request')
const pka = require('../../package.json')

/**
 * 请求github api
 * @param {*} method
 * @param {*} content
 * @returns 返回值数据结构 {content: base64, sha: '文件唯一id，用作删除或者修改'，。。。}
 */
function fetchGH(method, params, c) {
  const UpperMethod = method.toUpperCase()
  return new Promise((resolve, reject) => {
    request(
      {
        method: UpperMethod,
        uri: `https://api.github.com/repos/SubinY/system/contents/${config.filePath}`,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PostmanRuntime/7.29.0',
          Authorization: config.token
        },
        body: JSON.stringify(params),
        ...c
      },
      function (err, resp, data) {
        if (err) {
          console.error(err, 'err')
          reject()
        }
        const d = JSON.parse(data) || {}
        if (d.message === 'Not Found') {
          console.error('更新失败，资源不存在或者远程action secret token已失效')
          reject()
        }
        resolve({
          sha: d.sha,
          content: d.content
        })
      }
    )
  })
}

function modifyVersion(oldObj) {
  let result = {}
  let flag = false // 是否有修改

  Object.keys(oldObj).map((key) => {
    result[key] = []
    oldObj[key].map((m) => {
      if (m.name === pka.name && m.version !== pka.version) {
        flag = true
        m.version = pka.version
      }
      result[key].push(m)
    })
  })

  return [JSON.stringify(result, null, 2), flag]
}

async function start() {
  try {
    const { sha, content: obj } = await fetchGH('get')
    const [newStr, isNew] = modifyVersion(
      JSON.parse(Buffer.from(obj, 'base64').toString())
    )
    if (!isNew) return console.log('配置文件无需修改')
    await fetchGH('delete', { message: config.commitMsg.del, sha })

    await fetchGH('put', {
      message: config.commitMsg.add,
      content: Buffer.from(newStr).toString('base64')
    })
    console.log('修改成功')
  } catch (error) {
    console.log('修改失败')
  }
}

start()
