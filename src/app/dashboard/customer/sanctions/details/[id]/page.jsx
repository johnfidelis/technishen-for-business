'use client'
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import { ThemeContext } from '@/context/ThemeContext'
import CustomerSanctionDetails from '@/component/CustomerSanctionDetails'

const Page = ({ onBack }) => {
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  const { id } = useParams()

  return (
    <Box
      sx={{
        width: '98%',
        p: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        minHeight: '60vh',
        margin: 'auto',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Box>
        <Button
          variant="contained"
          onClick={onBack || (() => router.back())}
          sx={{
            backgroundColor: theme.primary_color || '#115093',
            color: '#FFF',
            textTransform: 'none',
            fontSize: '0.7em',
            fontWeight: 300,
            padding: '0.375rem 0.75em',
          }}
        >
          &larr; Back
        </Button>
      </Box>

      <CustomerSanctionDetails employeeId={id} />
    </Box>
  )
}

export default Page
