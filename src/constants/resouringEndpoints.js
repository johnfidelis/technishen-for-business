import { Cookies } from 'react-cookie'
const cookies = new Cookies()
const getBusinessId = () => cookies.get('selectedBusinessId')

export const POST_ENDPOINTS = {
  POST_A_JOB: `/resourcing/post-job/${getBusinessId()}/`,
  SCHEDULE_INTERVIEW: (jobId) =>
    `/resourcing/schedule-interview/${jobId}/${getBusinessId()}/`,
  SEND_JOB_OFFER: (applicationId) =>
    `/resourcing/send-job-offer/${applicationId}/`,
}
export const PATCH_ENDPOINTS = {
  UPDATE_A_JOB: (postId) =>
    `/resourcing/update-job-post/${postId}/${getBusinessId()}/`,
  INTERVIEW_REMARKS: (applicationId) =>
    `/resourcing/update-interview-result/${applicationId}/`,
  SCHEDULE_INTERVIEW: (jobId) =>
    `/resourcing/schedule-interview/${jobId}/${getBusinessId()}/`,
  CLOSE_JOB: (jobId) =>
    `/resourcing/close-job-post/${jobId}/${getBusinessId()}/`,
  APPROVE_OR_DECLINE_TIMECARD: (cardId) =>
    `/resourcing/approve-or-decline-time-card/${getBusinessId()}/${cardId}/`,
}
export const GET_RESOURCING_ENDPOINTS = {
  GET_A_SKILL: `/resourcing/skills/`,
  GET_A_POST: `/resourcing/business-job-posts/${getBusinessId()}/`,
  GET_AUDIT_LOG: `/resourcing/audit-log/${getBusinessId()}/`,
  GET_A_POST_DETAILS: (postId) => `/resourcing/job-post-details/${postId}/`,
  GET_A_POST_APPLICANT: (postId) =>
    `/resourcing/applications/${postId}/${getBusinessId()}`,

  GET_APPLICANT_DETAILS: (jobId, applicantId) =>
    `/resourcing/applicant-details/${jobId}/${applicantId}/`,
  GET_INTERVIEWS: `/resourcing/all-interviews/${getBusinessId()}/`,

  GET_TIMECARD_AND_EXPENSES: `/resourcing/all-time-cards/${getBusinessId()}/`,
  GET_INDIVIDUAL_TIMECARD_AND_EXPENSES: (timeCardId) =>
    `/resourcing/get-a-time-card/${timeCardId}/`,
  // VIEW_A_SKILL: (skillId) => `/resourcing/skill-details/${skillId}/`,
}
