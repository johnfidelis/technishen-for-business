

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
// //   const refreshValue = cookies.get('your-refresh')
// //   const usernameValue = cookies.get('your-username')

// //   if (accessValue) {
// //     axios.defaults.headers.common['Authorization'] = `Bearer ${accessValue}`
// //   }

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




// import axios from 'axios'
// import { Cookies } from 'react-cookie'

// export const API_URL =
//   process.env.NEXT_PUBLIC_BASE_API_URL ||
//   'https://technishenbackend.onrender.com' // Default fallback

// console.log(API_URL)

// export default function init() {
//   axios.defaults.baseURL = API_URL
//   axios.defaults.withCredentials = false

//   const cookies = new Cookies()
//   const accessValue = cookies.get('your-token')
//   // const refreshValue = cookies.get('your-refresh')
//   // const usernameValue = cookies.get('your-username')

//   if (accessValue) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${accessValue}`
//   }

//   axios.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (error?.response?.status === 401) {
//         if (typeof window !== 'undefined') {
//           window.location.href = '/login' // Redirect to login only on the client
//         }
//       }
//       return Promise.reject(error?.response || error) // Return full error response
//     },
//   )
// }



import axios from 'axios'
import { Cookies } from 'react-cookie'

export const API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL ||
  'https://technishenbackend.onrender.com' // Default fallback

console.log(API_URL)

export default function init() {
  axios.defaults.baseURL = API_URL
  axios.defaults.withCredentials = false

  const cookies = new Cookies()
  const accessValue = cookies.get('your-token')

  // Apply token globally except for login & register
  axios.interceptors.request.use((config) => {
    if (accessValue && !config.url.includes('/login') && !config.url.includes('/register')) {
      config.headers.Authorization = `Bearer ${accessValue}`
    }
    return config
  })

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login' // Redirect to login only on the client
        }
      }
      return Promise.reject(error?.response || error) // Return full error response
    },
  )
}
