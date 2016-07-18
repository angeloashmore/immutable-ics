import leftpad from 'left-pad'

/**
 * Format a Date object to a valid DATE string.
 *
 * @private
 * @param {Date} date - Date to format.
 */
export default (date) => {
  return date.getFullYear() +
         leftpad(date.getMonth() + 1, 2, 0) +
         leftpad(date.getDate(), 2, 0)
}
