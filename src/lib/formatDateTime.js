import formatDate from './formatDate'
import formatTime from './formatTime'

/**
 * Format a Date object to a valid DATE-TIME string.
 *
 * @private
 * @param {Date} date - Date to format.
 */
export default (date) => {
  return `${formatDate(date)}T${formatTime(date)}`
}
