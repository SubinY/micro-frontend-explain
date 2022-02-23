
;((w) => {
  createHackWindow = function (extraObj) {
    const propertiesWithGetter = new Map()
    const fakeWindow = {}
    Object.getOwnPropertyNames({ ...w, ...extraObj })
      .filter((p) => {
        const descriptor = Object.getOwnPropertyDescriptor(w, p)
        return !descriptor?.configurable
      })
      .forEach((p) => {
        const descriptor = Object.getOwnPropertyDescriptor(w, p)
        if (descriptor) {
          if (p === 'top' || p === 'parent' || p === 'self' || p === 'window') {
            descriptor.configurable = true
          }
          Object.defineProperty(fakeWindow, p, descriptor)
        }
      })

    return fakeWindow
    // return {
    //   fakeWindow,
    //   propertiesWithGetter
    // }
  }
})(window)
