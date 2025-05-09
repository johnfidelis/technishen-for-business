// // import axios from 'axios'
// // import { Cookies } from 'react-cookie'

// // export const API_URL =
// //   process.env.NEXT_PUBLIC_BASE_API_URL ||
// //   'https://technishenbackend.onrender.com' // Default fallback

// // console.log(API_URL)

// // export default function init() {
// //   axios.defaults.baseURL = API_URL
// //   axios.defaults.withCredentials = false

// //   const cookies = new Cookies()
// //   const accessValue = cookies.get('your-token')

// //   // Apply token globally except for login & register
// //   axios.interceptors.request.use((config) => {
// //     if (
// //       accessValue &&
// //       !config.url.includes('/login') &&
// //       !config.url.includes('/register')
// //     ) {
// //       config.headers.Authorization = `Bearer ${accessValue}`
// //     }
// //     return config
// //   })

// //   axios.interceptors.response.use(
// //     (response) => response,
// //     async (error) => {
// //       if (error?.response?.status === 401) {
// //         if (typeof window !== 'undefined') {
// //           window.location.href = '/login' // Redirect to login only on the client
// //         }
// //       }
// //       return Promise.reject(error?.response || error) // Return full error response
// //     },
// //   )
// // }

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
//     // Attach Authorization token if applicable

//     if (
//       token &&
//       !config.url.includes('/login') &&
//       !config.url.includes('/register')
//        && !includeUserID
//     ) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//      // If specified, attach User_ID header
//   if (includeUserID && userID) {
//     config.headers['User-ID'] = userID
//   }
//     return config
//   })

// }

// attachAuthHeader(technishenAPI)
// attachAuthHeader(resourcingAPI, { includeUserID: true })

// // instance.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error?.response?.status === 401 && typeof window !== 'undefined') {
// //       window.location.href = '/login'
// //     }
// //     return Promise.reject(error?.response || error)
// //   }
// // )
// // const attachAuthHeader = (instance) => {
// //   instance.interceptors.request.use((config) => {
// //     console.log('--- [Request Interceptor] ---')
// //     console.log('URL:', config?.url)
// //     console.log('BaseURL:', config?.baseURL)
// //     console.log('Full Config:', config)

// //     const url = config?.url || ''
// //     if (typeof url === 'string' && token && !url.includes('/login') && !url.includes('/register')) {
// //       console.log('Attaching Authorization Header')
// //       config.headers.Authorization = `Bearer ${token}`
// //     } else {
// //       console.log('Skipping Authorization Header')
// //     }

// //     return config
// //   })

// //   instance.interceptors.response.use(
// //     (response) => response,
// //     (error) => {
// //       console.log('--- [Response Interceptor - Error] ---')
// //       console.log('Error Response:', error?.response)
// //       if (error?.response?.status === 401 && typeof window !== 'undefined') {
// //         console.warn('Unauthorized! Redirecting to /login')
// //         window.location.href = '/login'
// //       }
// //       return Promise.reject(error?.response || error)
// //     }
// //   )
// // }

// utils/apiClients.ts
import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()
const token = cookies.get('your-token')
const userID = cookies.get('your-id')

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

// Interceptors for both services
const attachAuthHeader = (instance, includeUserID) => {
  instance.interceptors.request.use((config) => {
    // Attach Authorization token if applicable
    if (
      token &&
      !config.url?.includes('/login') &&
      !config.url?.includes('/register') &&
      !includeUserID
    ) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // If specified, attach User_ID header
    if (includeUserID && userID) {
      config.headers['User-ID'] = userID
      // config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })
}

// Attach auth headers to technishenAPI without userID
attachAuthHeader(technishenAPI)

// Attach auth headers to resourcingAPI with userID
attachAuthHeader(resourcingAPI, true)
