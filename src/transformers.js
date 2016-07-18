import { isDate } from 'lodash'
import formatDate from './lib/formatDate'
import formatDateTime from './lib/formatDateTime'
import formatTime from './lib/formatTime'
import removeTimeZoneOffset from './lib/removeTimeZoneOffset'

export const BOOLEAN = ({ value }) => value ? 'TRUE' : 'FALSE'

export const DATE = ({ value }) => {
  if (isDate(value)) {
    return formatDate(removeTimeZoneOffset(value))
  }
}

export const DATETIME = ({ value }) => {
  if (isDate(value)) {
    return formatDateTime(value)
  }
}

export const FLOAT = ({ value }) => Number.parseFloat(value)

// Special case to force VERSION property to be a float with one decimal place.
export const FLOAT__FIXED_1 = (property) => FLOAT(property).toFixed(1)

export const INTEGER = ({ value }) => Number.parseInt(value)

export const TIME = ({ value }) => {
  if (isDate(value)) {
    return formatTime(removeTimeZoneOffset(value))
  }
}
