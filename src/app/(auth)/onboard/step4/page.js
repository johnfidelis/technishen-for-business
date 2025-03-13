'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Box, TextField, Typography, Grid, Button, Link } from '@mui/material'

const Page = () => {
  const router = useRouter()
  const inputRefs = useRef([])
  const [otp, setOtp] = useState(['', '', '', '', ''])

  useEffect(() => {
    const savedOtp = JSON.parse(localStorage.getItem('otpData')) || [
      '',
      '',
      '',
      '',
      '',
    ]
    setOtp(savedOtp)
  }, [])

  useEffect(() => {
    localStorage.setItem('otpData', JSON.stringify(otp))
  }, [otp])

  const handleChange = (e, index) => {
    const { value } = e.target
    if (!/^[0-9]?$/.test(value)) return // Only allow numbers

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleSubmit = () => {
    if (otp.includes('')) {
      alert('Please enter the complete OTP')
      return
    }
    router.push('/dashboard')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: '#115093', fontWeight: 400, mb: 4 }}
      >
        Verify your Phone Number
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#115093',
          fontWeight: 400,
          mb: 4,
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        Please verify your phone number (+27 73 674 8709) <br /> to complete the
        registration process.
      </Typography>
      <Typography variant="body2" sx={{ color: '#262424', mb: 2 }}>
        Enter the 5 Digit code sent to your holv****@gmail.com
      </Typography>

      <Grid container spacing={1.5} mb={4} justifyContent="center">
        {otp.map((digit, index) => (
          <Grid item key={index} sx={{ width: '60px' }}>
            <TextField
              fullWidth
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: 'center',
                  fontSize: '28px',
                  borderRadius: '8px',
                  height: '20px',
                  width: '40px',
                },
              }}
              variant="outlined"
              value={digit}
              inputRef={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
            />
          </Grid>
        ))}
      </Grid>

      <Typography
        align="center"
        variant="body2"
        sx={{ mb: 3, color: '#262424' }}
      >
        Didn’t receive an OTP? |
        <Link
          href="#"
          sx={{
            fontWeight: 400,
            textDecoration: 'none',
            color: '#032AB4',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Resend OTP
        </Link>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'white',
            color: '#115093',
            width: '100px',
            height: '40px',
            fontSize: '16px',
            fontWeight: 400,
            border: 'solid #115093 ',
            '&:hover': { backgroundColor: 'white' },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default Page
