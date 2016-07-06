import { isDate } from 'lodash'
import Property from '../Property'
import formatDate from '../lib/formatDate'

export default class DTSTAMP extends Property {
  shouldTransformValue () {
    return super.shouldTransformValue() &&
           isDate(this.value)
  }

  transformValue () {
    const valueIsDate = this.parameters.get('VALUE') === 'DATE'

    let value = this.value

    if (valueIsDate) {
      // Remove timezone offset
      const offset = value.getTimezoneOffset() * 60000

      value = new Date(value.getTime() + offset)
    }

    const transformedValue = formatDate(value, !valueIsDate)

    return this.set('value', transformedValue)
  }
}
