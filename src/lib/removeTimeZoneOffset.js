export default (date) => {
  const offset = date.getTimezoneOffset() * 60000

  return new Date(date.getTime() + offset)
}
