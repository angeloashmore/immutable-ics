import { Map, Record } from 'immutable'
import { identity, isFunction, isNull, isUndefined } from 'lodash'
import * as transformers from './transformers'
import {
  DEFAULT_VALUE_TYPE,
  DEFAULT_VALUE_TYPES,
  FOLD_REGEX,
  FOLD_SEPARATOR,
  PARAMETER_SEPARATOR,
  PARAMETER_KV_SEPARATOR,
  PROPERTY_KV_SEPARATOR,
  VALUE_TYPES
} from './constants'

export default class Property extends Record({
  name: identity,
  parameters: Map,
  transform: (v = true) => Boolean(v),
  value: identity
}) {
  getTransformedValue () {
    const valueType = VALUE_TYPES[this.parameters.get('VALUE')] ||
                      DEFAULT_VALUE_TYPES[this.name] ||
                      DEFAULT_VALUE_TYPE

    if (isFunction(transformers[valueType])) {
      return transformers[valueType](this) || this.value
    } else {
      return this.value
    }
  }

  toString () {
    const value = this.transform ? this.getTransformedValue() : this.value

    // Build the output.
    let string = this.name

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

    return string.match(FOLD_REGEX)
                 .join(FOLD_SEPARATOR)
  }
}
