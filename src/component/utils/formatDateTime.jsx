/**
 * Formats a date string into "day-month in words-year, time in 12-hour format".
 * @param {string} dateStr - The date string to format (e.g., "2024-12-12T15:42:26.239513Z").
 * @returns {string} - The formatted date and time (e.g., "12-December-2024, 03:42 PM").
 */
export function formatDateTime(dateStr) {
  if (!dateStr) return 'Invalid date'

  const date = new Date(dateStr)

  // Format the date
  const dateOptions = { day: '2-digit', month: 'long', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', dateOptions)

  // Format the time
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions)

  // Combine and return
  return `${formattedDate}, ${formattedTime}`
}
