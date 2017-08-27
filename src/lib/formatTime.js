import { padStart } from 'lodash'

/**
 * Format a Date object to a valid TIME string.
 *
 * @private
 * @param {Date} date - Date to format.
 */
export default date => {
  return (
    padStart(date.getHours(), 2, 0) +
    padStart(date.getMinutes(), 2, 0) +
    padStart(date.getSeconds(), 2, 0)
  )
}
