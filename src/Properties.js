import Property from './Property'
import * as properties from './properties/index'

export default new Proxy(properties, {
  get (target, key) {
    if (target.hasOwnProperty(key)) {
      return target[key]
    }

    return class extends Property {
      propertyName = key
    }
  }
})
