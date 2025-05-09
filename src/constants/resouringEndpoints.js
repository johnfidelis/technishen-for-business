import { Cookies } from 'react-cookie'
const cookies = new Cookies()
const getBusinessId = () => cookies.get('selectedBusinessId')

export const POST_ENDPOINTS = {
  POST_A_JOB: `/resourcing/post-job/${getBusinessId()}/`,
}
export const GET_RESOURCING_ENDPOINTS = {
  GET_A_SKILL: `/resourcing/skills/`,
  GET_A_POST: `/resourcing/business-job-posts/${getBusinessId()}/`,
  GET_AUDIT_LOG: `/resourcing/audit-log/${getBusinessId()}/`,
  GET_A_POST_DETAILS: (postId) => `/resourcing/job-post-details/${postId}/`,
  // VIEW_A_SKILL: (skillId) => `/resourcing/skill-details/${skillId}/`,
}
