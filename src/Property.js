import { Map, Record } from 'immutable'
import { identity, isNull, isUndefined } from 'lodash'
import { FOLD_SEPARATOR } from './constants'

export default class Property extends Record({
  parameters: Map,
  transform: (v = true) => Boolean(v),
  value: identity
}) {
  propertyName = this.constructor.name

  shouldTransformValue () {
    return this.transform
  }

  transformValue () {
    return this
  }

  transformValueIfNecessary () {
    if (this.shouldTransformValue()) {
      return this.transformValue()
    }

    return this
  }

  toString () {
    const { value } = this.transformValueIfNecessary()

    let string = this.propertyName

    if (this.parameters.size > 0) {
      string += ';' + this.parameters
                          .entrySeq()
                          .map(([key, value]) => `${key}=${value}`)
                          .join(';')
    }

    if (!isNull(value) && !isUndefined(value)) {
      string += `:${value}`
    }

    return string.match(/.{1,75}/g).join(FOLD_SEPARATOR)
  }
}
