import { List, Record, Typed } from 'typed-immutable'
import Property from './Property'
import { LINE_SEPARATOR, PREFIX, SUFFIX } from './constants'

Typed.Component = Typed('Component', (value) => (
  value instanceof Component ? value
                             : TypeError(`"${value}" is not a Component`)
))

Typed.Property = Typed('Property', (value) => (
  value instanceof Property ? value
                            : TypeError(`"${value}" is not a Property`)
))

export default class Component extends Record({
  name: String,
  components: List(Typed.Component),
  properties: List(Typed.Property)
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
