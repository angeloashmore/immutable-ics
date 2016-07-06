import { Map, Record } from 'immutable'
import { identity, isNull, isUndefined } from 'lodash'
import {
  FOLD_REGEX,
  FOLD_SEPARATOR,
  PARAMETER_SEPARATOR,
  PARAMETER_KV_SEPARATOR,
  PROPERTY_KV_SEPARATOR
} from './constants'

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
    return this.shouldTransformValue() ? this.transformValue() : this
  }

  toString () {
    const { value } = this.transformValueIfNecessary()

    let string = this.propertyName

    if (this.parameters.size > 0) {
      string += PARAMETER_SEPARATOR +
                this.parameters
                    .entrySeq()
                    .map(([key, value]) => (key + PARAMETER_KV_SEPARATOR + value))
                    .join(PARAMETER_SEPARATOR)
    }

    if (!isNull(value) && !isUndefined(value)) {
      string += PROPERTY_KV_SEPARATOR + value
    }

    return string.match(FOLD_REGEX).join(FOLD_SEPARATOR)
  }
}
