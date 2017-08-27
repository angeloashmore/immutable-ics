import { padStart } from 'lodash-es'

/**
 * Format a Date object to a valid DATE string.
 *
 * @private
 * @param {Date} date - Date to format.
 */
export default date => {
  return (
    date.getFullYear() +
    padStart(date.getMonth() + 1, 2, 0) +
    padStart(date.getDate(), 2, 0)
  )
}
