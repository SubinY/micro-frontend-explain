let APPS = []
let handleRegister = null
let currentWindow = null
let handleRouteClick = null

;((w) => {
  handleRouteClick = function (name) {
    currentWindow = APPS.filter((item) => item.name.indexOf(name) !== -1)[0]
      .appWindow
  }

  handleRegister = function (apps) {
    APPS = apps
    apps.map((item) => {
      let { appWindow, name } = item
      item.appWindow = new Proxy(appWindow, {
        set: (target, key, v) => {
          console.log('我是' + name)
          // @ts-ignore
          target[key] = v
        },
        get: (target, key) => {
          return target[key]
        }
      })
    })
    if (!currentWindow) {
      currentWindow = apps[0].appWindow
    }

    return currentWindow
  }
})(window)
