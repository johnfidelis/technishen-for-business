export const getMinDateForAge = (age) => {
  const today = new Date()
  const minDate = new Date(
    today.getFullYear() - age,
    today.getMonth(),
    today.getDate(),
  )
  return minDate.toISOString().split('T')[0] // Format to YYYY-MM-DD
}

export const getMaxPastDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}
