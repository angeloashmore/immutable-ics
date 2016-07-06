import Component from './Component'

export default new Proxy({}, {
  get (target, key) {
    return class extends Component {
      static componentName = key
    }
  }
})
