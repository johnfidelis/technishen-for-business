// 'use client'

// import React, { Suspense, useState } from 'react'
// import Image from 'next/image'
// import { Box, Button, Typography } from '@mui/material'
// import { toast } from 'react-toastify'
// import CustomTextField from '@/component/model1/CustomTextField'
// import BackgroundBox from '@/component/model1/BackgroundBox'
// import { useCreateData } from '@/hooks/useApiService'
// import { AUTH_ENDPOINTS } from '@/constants/endpoints'
// import logo from '../../../assets/images/Technisen.png'
// import { validate } from '@/component/utils/validate'
// // import { useRouter } from 'next/navigation'
// import { useRouter, useSearchParams } from 'next/navigation'

// export default function ResetPassword() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const uid = searchParams.get('uid')
//   const token = searchParams.get('token')

//   const [formData, setFormData] = useState({
//     password: '',
//     confirmPassword: '',
//   })

//   const reset = useCreateData(
//     AUTH_ENDPOINTS.PASSWORD_RESET, // update this endpoint if different
//     'resetPassword',
//   )

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const { password, confirmPassword } = formData

//     const passwordError = validate.required(password, 'Password')
//     if (passwordError) return toast.error(passwordError)

//     if (password.length < 6) {
//       return toast.error('Password must be at least 6 characters long.')
//     }

//     if (password !== confirmPassword) {
//       return toast.error("Passwords don't match.")
//     }

//     if (!token) return toast.error('Invalid or missing reset token.')
//     if (!uid) return toast.error('Invalid or missing reset uid.')

//     reset.mutate(
//       { token, uid, password },
//       {
//         onSuccess: () => {
//           toast.success('Password reset successfully!')
//           router.push('/login')
//         },
//         onError: (error) => {
//           console.error('Error:', error)
//           toast.error(
//             error?.response?.data?.error ||
//               'Something went wrong. Please try again.',
//           )
//         },
//       },
//     )
//   }

//   return (
//     <Suspense fallback={<div></div>}>
//       <BackgroundBox>
//         <Box component="form" onSubmit={handleSubmit} sx={{ width: 360 }}>
//           <Box sx={{ mt: -4, textAlign: 'center' }}>
//             <Image
//               src={logo}
//               alt="Technishen Logo"
//               width={250}
//               height={200}
//               style={{ margin: 'auto' }}
//             />
//           </Box>

//           <Typography
//             style={{ fontSize: 25, fontWeight: 400, marginBottom: 20 }}
//             align="center"
//             color="white"
//           >
//             Reset Your Password
//           </Typography>

//           <CustomTextField
//             label="New Password"
//             name="password"
//             type="password"
//             placeholder="Enter new password"
//             value={formData.password}
//             onChange={handleChange}
//           />

//           <CustomTextField
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirm new password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />

//           <Button
//             type="submit"
//             fullWidth
//             sx={{
//               backgroundColor: '#3BAB46',
//               color: 'white',
//               fontWeight: 300,
//               borderRadius: '8px',
//               padding: '12px',
//               fontSize: '0.80em',
//               '&:hover': { backgroundColor: '#2E8B57' },
//             }}
//             disabled={reset.isPending}
//           >
//             {reset.isPending ? 'Resetting...' : 'Reset Password'}
//           </Button>
//         </Box>
//       </BackgroundBox>
//     </Suspense>
//   )
// }

'use client'

import React, { Suspense, useState, useEffect } from 'react' // Import useEffect
import Image from 'next/image'
import { Box, Button, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import CustomTextField from '@/component/model1/CustomTextField'
import BackgroundBox from '@/component/model1/BackgroundBox'
import { useCreateData } from '@/hooks/useApiService'
import { AUTH_ENDPOINTS } from '@/constants/endpoints'
import logo from '../../../assets/images/Technisen.png'
import { validate } from '@/component/utils/validate'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ResetPassword() {
  const router = useRouter()
  const [uid, setUid] = useState(null)
  const [token, setToken] = useState(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams) {
      setUid(searchParams.get('uid'))
      setToken(searchParams.get('token'))
    }
  }, [searchParams])

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  const reset = useCreateData(
    AUTH_ENDPOINTS.PASSWORD_RESET, // update this endpoint if different
    'resetPassword',
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { password, confirmPassword } = formData

    const passwordError = validate.required(password, 'Password')
    if (passwordError) return toast.error(passwordError)

    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters long.')
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords don't match.")
    }

    if (!token) return toast.error('Invalid or missing reset token.')
    if (!uid) return toast.error('Invalid or missing reset uid.')

    reset.mutate(
      { token, uid, password },
      {
        onSuccess: () => {
          toast.success('Password reset successfully!')
          router.push('/login')
        },
        onError: (error) => {
          console.error('Error:', error)
          toast.error(
            error?.response?.data?.error ||
              'Something went wrong. Please try again.',
          )
        },
      },
    )
  }

  // Conditionally render the form only when uid and token are available on the client
  return (
    <Suspense fallback={<div>Loading reset password form...</div>}>
      {uid !== null && token !== null ? (
        <BackgroundBox>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: 360 }}>
            <Box sx={{ mt: -4, textAlign: 'center' }}>
              <Image
                src={logo}
                alt="Technishen Logo"
                width={250}
                height={200}
                style={{ margin: 'auto' }}
              />
            </Box>

            <Typography
              style={{ fontSize: 25, fontWeight: 400, marginBottom: 20 }}
              align="center"
              color="white"
            >
              Reset Your Password
            </Typography>

            <CustomTextField
              label="New Password"
              name="password"
              type="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
            />

            <CustomTextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: '#3BAB46',
                color: 'white',
                fontWeight: 300,
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.80em',
                '&:hover': { backgroundColor: '#2E8B57' },
              }}
              disabled={reset.isPending}
            >
              {reset.isPending ? 'Resetting...' : 'Reset Password'}
            </Button>
          </Box>
        </BackgroundBox>
      ) : (
        <div>Checking password reset link...</div> // Or some other initial loading state
      )}
    </Suspense>
  )
}
