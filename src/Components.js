import Component from './Component'
import * as components from './components/index'

export default new Proxy(components, {
  get (target, key) {
    if (target.hasOwnProperty(key)) {
      return target[key]
    }

    return class extends Component {
      static componentName = key
    }
  }
})
