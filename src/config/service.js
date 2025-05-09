// import axios from 'axios'
// export const fetchData = async (endpoint) => {
//   const response = await axios.get(endpoint)
//   return response.data
// }

// export const postData = async (endpoint, data) => {
//   const response = await axios.post(endpoint, data)
//   return response.data
// }

// export const updateData = async (endpoint, data) => {
//   const response = await axios.put(endpoint, data)
//   return response.data
// }

// export const patchData = async (endpoint, data) => {
//   const response = await axios.patch(endpoint, data)
//   return response.data
// }

// export const deleteData = async (endpoint) => {
//   const { data } = await axios.delete(endpoint)
//   return data
// }

// utils/httpHelpers.ts
import { technishenAPI, resourcingAPI } from './index'

// ====== Technishen API Helpers ======
export const fetchData = async (endpoint) => {
  const response = await technishenAPI.get(endpoint)
  return response.data
}

export const postData = async (endpoint, data) => {
  const response = await technishenAPI.post(endpoint, data)
  return response.data
}

export const updateData = async (endpoint, data) => {
  const response = await technishenAPI.put(endpoint, data)
  return response.data
}

export const patchData = async (endpoint, data) => {
  const response = await technishenAPI.patch(endpoint, data)
  return response.data
}

export const deleteData = async (endpoint) => {
  const { data } = await technishenAPI.delete(endpoint)
  return data
}

/**
 * Resourcing API Helpers
 */
export const fetchResourcingData = async (endpoint) => {
  const response = await resourcingAPI.get(endpoint)
  return response.data
}

export const postResourcingData = async (endpoint, data) => {
  const response = await resourcingAPI.post(endpoint, data)
  return response.data
}

export const updateResourcingData = async (endpoint, data) => {
  const response = await resourcingAPI.put(endpoint, data)
  return response.data
}

export const patchResourcingData = async (endpoint, data) => {
  const response = await resourcingAPI.patch(endpoint, data)
  return response.data
}

export const deleteResourcingData = async (endpoint) => {
  const { data } = await resourcingAPI.delete(endpoint)
  return data
}
