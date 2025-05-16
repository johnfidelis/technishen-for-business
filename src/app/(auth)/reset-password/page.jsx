
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Box, Button, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import CustomTextField from '@/component/model1/CustomTextField'
import BackgroundBox from '@/component/model1/BackgroundBox'
import { useCreateData } from '@/hooks/useApiService'
import { AUTH_ENDPOINTS } from '@/constants/endpoints'
import logo from '../../../assets/images/Technisen.png'
import { validate } from '@/component/utils/validate'
import { useRouter } from 'next/navigation'
import { Cookies } from 'react-cookie'

export default function LoginPage() {
  const cookies = new Cookies()
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '' })
  const login = useCreateData(
    AUTH_ENDPOINTS.PASSWORD_RECOVERY,
    'passwordRecovery',
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate email
    const emailError = validate.required(formData.email, 'Email')
    if (emailError) return toast.error(emailError)

    login.mutate(formData, {
      onSuccess: async (response) => {
        toast.success('Password recovery email sent successfully!')
      },
      onError: (error) => {
        console.error('Error:', error)
        toast.error(
          error?.response?.data?.error ||
            'Something went wrong. Please try again.',
        )
      },
    })
  }

  return (
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
          Recover with Email
        </Typography>

        <CustomTextField
          label="Email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
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
          disabled={login.isPending}
        >
          {login.isPending ? 'Loading...' : 'Continue'}
        </Button>
      </Box>
    </BackgroundBox>
  )
}
