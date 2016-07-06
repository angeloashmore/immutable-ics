import { List, Record } from 'immutable'
import { LINE_SEPARATOR, PREFIX, SUFFIX } from './constants'
import { Properties } from './index'

export default class Component extends Record({
  components: List,
  properties: List
}) {
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
    const { componentName } = this.constructor

    return [
      new Properties[PREFIX]({ value: componentName }),
      ...this.properties,
      ...this.components,
      new Properties[SUFFIX]({ value: componentName })
    ].join(LINE_SEPARATOR)
  }
}
