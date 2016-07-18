import { List, Record } from 'immutable'
import { identity } from 'lodash'
import Property from './Property'
import { LINE_SEPARATOR, PREFIX, SUFFIX } from './constants'

export default class Component extends Record({
  name: identity,
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
    return [
      new Property({ name: PREFIX, value: this.name }),
      ...this.properties,
      ...this.components,
      new Property({ name: SUFFIX, value: this.name })
    ].join(LINE_SEPARATOR)
  }
}
