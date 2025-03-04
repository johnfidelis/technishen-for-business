export const handleGenericError = (error) => {
  if (error?.response) {
    // The request was made, but the server responded with an error
    return (
      error?.response?.data?.message ||
      error?.response?.data?.email?.join(', ') ||
      error?.response?.data?.detail ||
      error?.response?.data?.error ||
      error?.message
    )
  }
  if (error?.message) {
    // The request was made, but no response was received
    return error?.message
  }
  if (error?.request) {
    // The request was made, but no response was received
    return 'No response received from the server.'
  }
  // Something happened in setting up the request that triggered an Error
  return 'An unexpected error occurred.'
}
