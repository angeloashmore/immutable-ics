import { List, Record } from 'immutable'
import { LINE_SEPARATOR, PREFIX, SUFFIX } from './constants'

export default class Component extends Record({
  components: List,
  properties: List
}) {
  prefix () {
    return `${PREFIX}:${this.constructor.componentName}`
  }

  suffix () {
    return `${SUFFIX}:${this.constructor.componentName}`
  }

  pushComponent (component) {
    return this.update('components', v => v.push(component))
  }

  pushProperty (property) {
    return this.update('properties', v => v.push(property))
  }

  clear () {
    return this.clearComponents()
               .clearProperties()
  }

  clearComponents () {
    return this.remove('components')
  }

  clearProperties () {
    return this.remove('properties')
  }

  toString () {
    return [
      this.prefix(),
      ...this.properties,
      ...this.components,
      this.suffix()
    ].join(LINE_SEPARATOR)
  }
}
