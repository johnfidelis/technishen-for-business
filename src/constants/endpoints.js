import { Cookies } from 'react-cookie'
const cookies = new Cookies()
const getBusinessId = () => cookies.get('selectedBusinessId')

export const POST_ENDPOINTS = {
  BUSINESS_PROFILE: '/business-profile/',
  CREATE_INTERNAL_TICKET: '/create-web-ticket/',
  CREATE_EXTERNAL_TICKET: () =>
    `/b2c/business/${getBusinessId()}/create-ticket/`,
  CREATE_EMPLOYEE: () => `/create-employee/${getBusinessId()}/`,
  CREATE_CUSTOMER: () => `/create-customer/${getBusinessId()}/`,

  RESEND_ACCESS_CODE: '/resend-access-code/',
  CREATE_FULFILLER_GROUP: () => `/create-fulfiller-group/${getBusinessId()}/`,
  CREATE_CATEGORY_AND_SUB_CATEGORY: `/create-category-and-sub-category/`,
  ADD_EMPLOYEE_TO_FULFILER_GROUP: (groupId) =>
    `/add-employees-to-fulfiller-group/${groupId}/`,
  CREATE_SUB_CATALOG: (serviceId) => `/create-sub-category/${serviceId}/`,
  CREATE_NOTE: (ticketId) => `/ticket/${ticketId}/notes/`,
  ADD_CATEGORY_TO_GROUP: (groupId) =>
    `/add-catalogues-to-fulfiller-group/${groupId}/`,
}
export const PATCH_ENDPOINTS = {
  BUSINESS_OWNER_PROFILE: '/business-owner-profile/',
  UPDATE_EMPLOYEE_ROLE: (employeeId) =>
    `/update-employee-role/${getBusinessId()}/${employeeId}/`,
  UPDATE_CATALOG: (serviceId) => `/update-category/${serviceId}/`,
  UPDATE_SUB_CATALOG: (serviceId) => `/update-sub-category/${serviceId}/`,
  UPDATE_NOTE: (ticketId, noteId) => `/ticket/${ticketId}/notes/${noteId}/`,
  ASSIGN_TICKET: (ticketId) => `/assign-ticket/${ticketId}/`,
  REASSIGN_TICKET: (ticketId) => `/assign-ticket/${ticketId}/`,
  CUSTOMIZE_UI: () => `/customize-UI/${getBusinessId()}/`,
  UPDATE_BUSINESS: () => `/update-business/${getBusinessId()}/`,
  BLOCK_UNBLOCK_USER: () => `/block-unblock-user/`,
}

export const AUTH_ENDPOINTS = {
  LOGIN: '/login/',
  SIGNUP: '/register/',
}
export const DELETE_ENDPOINTS = {
  DELETE_CATALOG: (serviceId) => `/delete-category/${serviceId}/`,
  RESET_THEME: () => `/customize-UI/${getBusinessId()}/`,
}

export const GET_ENDPOINTS = {
  BUSINESSES: '/get-businesses/',
  BUSINESS_OWNER_PROFILE: '/business-owner-profile/',
  CALLER: '/search-caller/',
  TICKET_CATEGORY_TO_BOOK: '/ticket-category-to-book/',
  FULFILLER_GROUP_TO_BOOK: '/fulfiller-group-to-book/',

  ALL_TICKETS: () => `/all-tickets/${getBusinessId()}/`,
  DASHBOARD_TICKETS: () => `/dashboard-tickets/${getBusinessId()}/open/`,
  TICKETS_STATUSES_STATS: () => `/ticket-statuses-stats/${getBusinessId()}/`,
  TICKETS_STATS: () => `/ticket-stats/${getBusinessId()}/`,
  COLORS: () => `/get-colors/${getBusinessId()}/`,
  ALL_CATEGORIES: () => `/all-categories/${getBusinessId()}/`,
  ALL_OUTSOURCED_TICKETS: () =>
    `/b2c/get-outsourced-tickets/${getBusinessId()}`,
  TECHNISHEN_BOOKABLE_SERVICES: '/b2c/bookable-services/',

  VIEW_TICKETS: (ticketId) => `/the-ticket/${getBusinessId()}/${ticketId}/`,
  GET_CUSTOMER_OR_EMPLOYEE_DETAILS: (userId) =>
    `/employee-customer-details/${userId}/`,
  VIEW_OUTSOURCED_TICKETS: (ticketId) =>
    `/b2c/customer-or-outsourced-ticket-details/${ticketId}/`,
  TICKET_NOTES: (ticketId) => `/ticket/${ticketId}/notes/`,
  SUB_CATEGORY: (categoryId) => `/all-sub-categories/${categoryId}/`,
  // CUSTOMER_TICKET_HISTORY: (customerId) => {
  //   const getBusinessId() = cookies.get('selectedgetBusinessId()') // Fetch latest getBusinessId()
  //   return `/customer-ticket-history/${customerId}/${getBusinessId()}`
  // },
  CUSTOMER_TICKET_HISTORY: (customerId) =>
    `/customer-ticket-history/${customerId}/${getBusinessId()}`,
  EMPLOYEE_TICKET_HISTORY: (customerId) =>
    `/all-tickets-assigned-to-employee/${customerId}/${getBusinessId()}`,
  // EMPLOYEE_IN_CATEGORY: (id) => `/add-catalogues-to-fulfiller-group/${id}/`,

  ALL_EMPLOYEE: () => `/all-employees/${getBusinessId()}`,
  PUBLISHMENT_LOG: () => `/punishment-log/${getBusinessId()}`,
  ALL_CUSTOMER: () => `/all-customers/${getBusinessId()}`,
  ALL_FULFILLER_GROUPS: () => `/all-fulfiller-groups/${getBusinessId()}`,
  GET_EMPLOYEE: (employeeId) =>
    `/get-employee/${getBusinessId()}/${employeeId}/`,
  GET_SANCTION_DETAILS: (employeeId) =>
    `/details-for-punishment/employee/${employeeId}/`,
  GET_EMPLOYEE_SERVICES: (employeeId) =>
    `/services-employees-have/${employeeId}/`,
  GET_CUSTOMER: (employeeId) =>
    `/get-customer/${getBusinessId()}/${employeeId}/`,
  GET_FULFILLER_GROUP: (groupId) =>
    `get-fulfiller-group/${getBusinessId()}/${groupId}/`,
}
