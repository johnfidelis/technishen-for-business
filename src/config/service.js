import axios from 'axios'
export const fetchData = async (endpoint) => {
  const response = await axios.get(endpoint)
  return response.data
}

export const postData = async (endpoint, data) => {
  const response = await axios.post(endpoint, data)
  return response.data
}

export const updateData = async (endpoint, data) => {
  const response = await axios.put(endpoint, data)
  return response.data
}

export const patchData = async (endpoint, data) => {
  const response = await axios.patch(endpoint, data)
  return response.data
}

export const deleteData = async (endpoint) => {
  const { data } = await axios.delete(endpoint)
  return data
}
