import { Cookies } from 'react-cookie'
const cookies = new Cookies()
const businessId = cookies.get('selectedBusinessId')

export const POST_ENDPOINTS = {
  BUSINESS_PROFILE: '/business-profile/',
  CREATE_INTERNAL_TICKET: '/create-web-ticket/',
  CREATE_EXTERNAL_TICKET: `/b2c/business/${businessId}/create-ticket/`,
  CREATE_EMPLOYEE: `/create-employee/${businessId}/`,
  CREATE_CUSTOMER: `/create-customer/${businessId}/`,
  RESEND_ACCESS_CODE: '/resend-access-code/',
  CREATE_FULFILLER_GROUP: `/create-fulfiller-group/${businessId}/`,
  CREATE_CATEGORY_AND_SUB_CATEGORY: `/create-category-and-sub-category/`,
  ADD_EMPLOYEE_TO_FULFILER_GROUP: (groupId) =>
    `/add-employees-to-fulfiller-group/${groupId}/`,
}
export const PATCH_ENDPOINTS = {
  BUSINESS_OWNER_PROFILE: '/business-owner-profile/',
  UPDATE_EMPLOYEE_ROLE: (employeeId) =>
    `/update-employee-role/${businessId}/${employeeId}/`,
}

export const AUTH_ENDPOINTS = {
  LOGIN: '/login/',
  SIGNUP: '/register/',
}

export const GET_ENDPOINTS = {
  BUSINESSES: '/get-businesses/',
  BUSINESS_OWNER_PROFILE: '/business-owner-profile/',
  CALLER: '/search-caller/',
  TICKET_CATEGORY_TO_BOOK: '/ticket-category-to-book/',
  FULFILLER_GROUP_TO_BOOK: '/fulfiller-group-to-book/',
  ALL_TICKETS: `/all-tickets/${businessId}`,
  ALL_CATEGORIES: `/all-categories/${businessId}/`,
  ALL_OUTSOURCED_TICKETS: `/b2c/get-outsourced-tickets/${businessId}`,
  TECHNISHEN_BOOKABLE_SERVICES: '/b2c/bookable-services/',

  VIEW_TICKETS: (ticketId) => `/the-ticket/${businessId}/${ticketId}/`,
  VIEW_OUTSOURCED_TICKETS: (ticketId) =>
    `/b2c/customer-or-outsourced-ticket-details/${ticketId}/`,
  TICKET_NOTES: (ticketId) => `/ticket/${ticketId}/notes/`,
  // CUSTOMER_TICKET_HISTORY: (customerId) => {
  //   const businessId = cookies.get('selectedBusinessId') // Fetch latest businessId
  //   return `/customer-ticket-history/${customerId}/${businessId}`
  // },
  CUSTOMER_TICKET_HISTORY: (customerId) =>
    `/customer-ticket-history/${customerId}/${businessId}`,
  EMPLOYEE_TICKET_HISTORY: (customerId) =>
    `/all-tickets-assigned-to-employee/${customerId}/${businessId}`,

  ALL_EMPLOYEE: `/all-employees/${businessId}`,
  ALL_CUSTOMER: `/all-employees/${businessId}`,
  ALL_FULFILLER_GROUPS: `/all-fulfiller-groups/${businessId}`,
  GET_EMPLOYEE: (employeeId) => `/get-employee/${businessId}/${employeeId}/`,
  GET_FULFILLER_GROUP: (groupId) => `get-fulfiller-group/${businessId}/${groupId}/`,
}
