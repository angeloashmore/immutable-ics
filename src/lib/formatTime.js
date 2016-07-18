import leftpad from 'left-pad'

/**
 * Format a Date object to a valid TIME string.
 *
 * @private
 * @param {Date} date - Date to format.
 */
export default (date) => {
  return leftpad(date.getHours(), 2, 0) +
         leftpad(date.getMinutes(), 2, 0) +
         leftpad(date.getSeconds(), 2, 0)
}
