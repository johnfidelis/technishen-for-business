export const validate = {
  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(value) ? '' : 'Invalid email address'
  },

  phoneNumber: (value) => {
    const regex = /^[0-9]{10,15}$/
    return regex.test(value) ? '' : 'Invalid phone number'
  },

  // required: (value, fieldname) => {
  //   return value.trim() ? '' : `${fieldname} is required`
  // },

  required: (value, fieldname) => {
    return String(value || '').trim() ? '' : `${fieldname} is required`
  },

  match: (value1, value2, fieldname) => {
    return value1 === value2 ? '' : `${fieldname} does not match`
  },
}
