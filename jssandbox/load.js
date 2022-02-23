function loadScript(src) {
  return new Promise((resolve) => {
    let addSign = true
    let scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; i++) {
      if (
        scripts[i] &&
        scripts[i].src &&
        scripts[i].src.indexOf(src.replace(/^\./, '')) != -1
      ) {
        addSign = false
      }
    }
    if (addSign) {
      let $script = document.createElement('script')
      $script.setAttribute('type', 'text/javascript')
      $script.setAttribute('src', src)
      document.getElementsByTagName('head').item(0).appendChild($script)
      resolve()
    }
  })
}
function removeScript(src) {
  return new Promise((resolve) => {
    let scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; i++) {
      if (
        scripts[i] &&
        scripts[i].src &&
        scripts[i].src.indexOf(src.replace(/^\./, '')) != -1
      ) {
        scripts[i].parentNode.removeChild(scripts[i])
      }
    }
    resolve()
  })
}

export { loadScript, removeScript }
