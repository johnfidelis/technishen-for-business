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
  const [formData, setFormData] = useState({ access_code: '' })
  const login = useCreateData(
    AUTH_ENDPOINTS.ACCESS_CODE_LOGIN,
    'accessCodeLogin',
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate access code
    const codeError = validate.required(formData.access_code, 'Access Code')
    if (codeError) return toast.error(codeError)

    login.mutate(formData, {
      onSuccess: async (response) => {
        const { access, refresh, user } = response

        cookies.set('your-token', access, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        })
        cookies.set('your-refresh', refresh, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        })
        cookies.set('your-username', user.username, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        })
        cookies.set('your-id', user.profile_id, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        })
        cookies.set('selectedBusinessId', user.business, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        })

        router.push('/dashboard')
      },
      onError: () => toast.error('Failed to log in. Invalid access code.'),
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
          Login with Access Code
        </Typography>

        <CustomTextField
          label="Access Code"
          name="access_code"
          placeholder="Enter your access code"
          value={formData.access_code}
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
          {login.isPending ? 'Logging in...' : 'Login'}
        </Button>
      </Box>
    </BackgroundBox>
  )
}
