import Component from './Component'
import Property from './Property'
import * as properties from './properties/index'

export const Components = new Proxy({}, {
  get (target, key) {
    return class extends Component {
      static componentName = key
    }
  }
})

export const Properties = new Proxy(properties, {
  get (target, key) {
    if (target.hasOwnProperty(key)) {
      return target[key]
    }

    return class extends Property {
      propertyName = key
    }
  }
})
