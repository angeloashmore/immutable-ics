import { isDate } from 'lodash'
import formatDate from './lib/formatDate'
import formatDateTime from './lib/formatDateTime'
import formatTime from './lib/formatTime'
import removeTimeZoneOffset from './lib/removeTimeZoneOffset'

export const BOOLEAN = (value) => value ? 'TRUE' : 'FALSE'

export const DATE = (value) => (
  isDate(value) ? formatDate(removeTimeZoneOffset(value))
                : value
)

export const DATETIME = (value) => (
  isDate(value) ? formatDateTime(value)
                : value
)

export const FLOAT = (value) => Number.parseFloat(value)

// Special case to force VERSION property to be a float with one decimal place.
export const FLOAT__FIXED_1 = (...args) => FLOAT(...args).toFixed(1)

export const INTEGER = (value) => Number.parseInt(value)

export const TEXT = (value) => (
  value.toString()
       .replace(/\\/g, '\\\\')
       .replace(/,/g, '\\,')
       .replace(/;/g, '\\;')
       .replace(/\n/g, '\\n')
)

export const TIME = (value) => (
  isDate(value) ? formatTime(removeTimeZoneOffset(value))
                : value
)
