'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Box,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { toast } from 'react-toastify'
import CustomTextField from '@/component/CustomTextField'
import BackgroundBox from '@/component/BackgroundBox'
import { useCreateData } from '@/hooks/useApiService'
import { AUTH_ENDPOINTS, GET_ENDPOINTS } from '@/constants/endpoints'
import logo from '../../../assets/images/Technisen.png'
import { validate } from '@/component/utils/validate'
import { useRouter } from 'next/navigation'
import { Cookies } from 'react-cookie'

export default function LoginPage() {
  const cookies = new Cookies()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ username: '', password: '' })
  const login = useCreateData(AUTH_ENDPOINTS.LOGIN, 'login')

  const handleTogglePassword = () => setShowPassword(!showPassword)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate inputs
    const usernameError = validate.email(formData.username)
    const passwordError = validate.required(formData.password, 'Password')

    if (usernameError) return toast.error(usernameError)
    if (passwordError) return toast.error(passwordError)

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
        window.location.href = '/dashboard'
      },
      onError: () => toast.error('Failed to log in. Check credentials.'),
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
          style={{ fontSize: 25, fontWeight: 400 }}
          align="center"
          color="white"
        >
          Login
        </Typography>

        <CustomTextField
          label="Email"
          name="username"
          placeholder="Enter your email"
          value={formData.username}
          onChange={handleChange}
        />

        <CustomTextField
          label="Password"
          name="password"
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
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

        <Typography
          variant="caption"
          color="white"
          align="center"
          sx={{ mt: 2 }}
        >
          New User?{' '}
          <Link href="/signup" style={{ color: 'white', fontWeight: 300 }}>
            Signup
          </Link>
        </Typography>
      </Box>
    </BackgroundBox>
  )
}
