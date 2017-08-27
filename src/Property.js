import { Any, Map, Record } from 'typed-immutable'
import isFunction from 'lodash.isfunction'
import isNull from 'lodash.isnull'
import isUndefined from 'lodash.isundefined'
import * as transformers from './transformers'
import {
  DEFAULT_VALUE_TYPE,
  DEFAULT_VALUE_TYPES,
  FOLD_REGEX,
  FOLD_SEPARATOR,
  PARAMETER_SEPARATOR,
  PARAMETER_KV_SEPARATOR,
  PARAMETER_VALUE_KEY,
  PROPERTY_KV_SEPARATOR,
  VALUE_SEPARATOR,
  VALUE_TYPES
} from './constants'

export default class Property extends Record({
  name: String,
  parameters: Map(String, Any),
  transform: Boolean(true),
  value: Any
}) {
  getTransformedValue () {
    const valueType = VALUE_TYPES[this.parameters.get(PARAMETER_VALUE_KEY)] ||
                      DEFAULT_VALUE_TYPES[this.name] ||
                      DEFAULT_VALUE_TYPE

    const transformer = transformers[valueType]

    if (!isFunction(transformer)) {
      return this.value
    }

    if (Array.isArray(this.value)) {
      return this.value.map((item) => transformer(item, this.parameters))
                       .join(VALUE_SEPARATOR)
    }

    return transformer(this.value, this.parameters)
  }

  toString () {
    let string = this.name

    if (this.parameters.size > 0) {
      string += PARAMETER_SEPARATOR +
                this.parameters
                    .entrySeq()
                    .map(([key, value]) => (key + PARAMETER_KV_SEPARATOR + value))
                    .join(PARAMETER_SEPARATOR)
    }

    const value = this.transform ? this.getTransformedValue() : this.value

    if (!isNull(value) && !isUndefined(value)) {
      string += PROPERTY_KV_SEPARATOR + value
    }

    return string.match(FOLD_REGEX)
                 .join(FOLD_SEPARATOR)
  }
}
