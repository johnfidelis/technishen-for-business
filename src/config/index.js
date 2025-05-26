// // utils/apiClients.ts
// import axios from 'axios'
// import { Cookies } from 'react-cookie'

// const cookies = new Cookies()
// const token = cookies.get('your-token')
// const userID = cookies.get('your-id')

// // Technishen backend
// export const technishenAPI = axios.create({
//   baseURL: 'https://technishenbackend.onrender.com',
//   withCredentials: false,
// })

// // Resourcing backend
// export const resourcingAPI = axios.create({
//   baseURL: 'https://resourcingbackend.onrender.com',
//   withCredentials: false,
// })

// // Interceptors for both services
// const attachAuthHeader = (instance, includeUserID) => {
//   instance.interceptors.request.use((config) => {
//     if (
//       token &&
//       !config.url?.includes('/login') &&
//       !config.url?.includes('/register') &&
//       !includeUserID
//     ) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     if (includeUserID && userID) {
//       config.headers['User-ID'] = userID
//     }

//     return config
//   })

//   // Response interceptor for 401 handling
//   instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error?.response?.status === 401) {
//         if (typeof window !== 'undefined') {
//           window.location.href = '/login' // Redirect to login page on 401
//         }
//       }
//       return Promise.reject(error?.response || error)
//     },
//   )
// }

// // Attach interceptors
// attachAuthHeader(technishenAPI)
// attachAuthHeader(resourcingAPI, true)

// utils/apiClients.ts
import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

const getAccessToken = () => cookies.get('your-token')
const getRefreshToken = () => cookies.get('your-refresh')
const getUserID = () => cookies.get('your-id')

// Technishen backend
export const technishenAPI = axios.create({
  baseURL: 'https://technishenbackend.onrender.com',
  withCredentials: false,
})

// Resourcing backend
export const resourcingAPI = axios.create({
  baseURL: 'https://resourcingbackend.onrender.com',
  withCredentials: false,
})

const attachAuthHeader = (instance, includeUserID = false) => {
  instance.interceptors.request.use((config) => {
    const token = getAccessToken()
    const userID = getUserID()

    if (
      token &&
      !config.url?.includes('/login') &&
      !config.url?.includes('/register') &&
      !includeUserID
    ) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (includeUserID && userID) {
      config.headers['User-ID'] = userID
    }

    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      console.log({ error })
      // If token expired and not already retried
      if (
        error?.response?.status === 401 &&
        !originalRequest._retry &&
        getRefreshToken()
      ) {
        originalRequest._retry = true

        try {
          // Try refreshing the token
          const refreshRes = await axios.post(
            'https://technishenbackend.onrender.com/auth/token/refresh/',
            {
              refresh: getRefreshToken(),
            },
          )

          const newAccessToken = refreshRes.data.access
          cookies.set('your-token', newAccessToken, { path: '/' })

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axios(originalRequest)
        } catch (refreshError) {
          // If refresh also fails
          alert('Your session has expired. Please log in again.')
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
          return Promise.reject(refreshError?.response || refreshError)
        }
      }

      return Promise.reject(error?.response || error)
    },
  )
}

// Attach interceptors
attachAuthHeader(technishenAPI)
attachAuthHeader(resourcingAPI, true)
