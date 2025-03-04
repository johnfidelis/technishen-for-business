'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { AUTH_ENDPOINTS } from '@/constants/endpoints'
import logo from '@/assets/images/Technisen.png'
import { validate } from '@/component/utils/validate'
import { Cookies } from 'react-cookie'

export default function page() {
  const cookies = new Cookies()
  const router = useRouter()
  const signup = useCreateData(AUTH_ENDPOINTS.SIGNUP, 'signup')

  const [showPassword, setShowPassword] = useState(false)
  const handleTogglePassword = () => setShowPassword(!showPassword)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    has_accepted_terms: true,
  })
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate inputs
    const emailError = validate.email(formData.email)
    const passwordError = validate.required(formData.password, 'Password')
    const confirmPasswordError = validate.match(
      formData.password,
      formData.confirmPassword,
      'Passwords',
    )

    if (emailError) return toast.error(emailError)
    if (passwordError) return toast.error(passwordError)
    if (confirmPasswordError) return toast.error(confirmPasswordError)

    // Send email as username
    const payload = { ...formData, username: formData.email }

    signup.mutate(payload, {
      onSuccess: (response) => {
        const { access, refresh, user } = response

        // Store tokens & username in cookies
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

        // toast.success('Account created successfully!', {
        //   autoClose: 5000,
        //   hideProgressBar: true,
        // })
        window.location.href = '/onboard'
      },
      // onError: () => toast.error('Failed to create account. Please try again.'),
    })
  }

  return (
    <BackgroundBox>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 360 }}>
        <Box sx={{ mt: -4, textAlign: 'center' }}>
          <Image
            src={logo}
            alt="Technisen Logo"
            width={200}
            height={150}
            style={{ margin: 'auto' }}
          />
        </Box>

        <Typography variant="h5" align="center" fontWeight="bold" color="white">
          Create Account
        </Typography>

        <CustomTextField
          label="Email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
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

        <CustomTextField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm your password"
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
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
            fontWeight: 'bold',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '0.80em',
            '&:hover': { backgroundColor: '#2E8B57' },
          }}
          disabled={signup.isPending}
        >
          {signup.isPending ? 'Creating account...' : 'Create account'}
        </Button>

        <Typography
          variant="caption"
          color="white"
          align="center"
          sx={{ mt: 2 }}
        >
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'white', fontWeight: 'bold' }}>
            Login
          </Link>
        </Typography>
      </Box>
    </BackgroundBox>
  )
}
