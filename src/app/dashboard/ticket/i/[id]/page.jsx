'use client'
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import { ThemeContext } from '@/context/ThemeContext'
import ViewTicketDetails from '@/component/ViewTicketDetails'

const Page = ({ onBack }) => {
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  const { id } = useParams()
  console.log('ddd', { id })
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
            backgroundColor: theme.primary_color,
            color: '#FFF',
            textTransform: 'none',
            fontSize: '0.7em',
            fontWeight: 300,
            padding: '0.375rem 0.75em',
          }}
        >
          &larr; Back
        </Button>
        <Typography
             variant="h5"
          sx={{
          
            mb: 3,
            mt: 3,
            textAlign: 'left',
          
          }}
        >
          Ticket Information
        </Typography>
      </Box>
      <hr style={{ margin: '0.625rem 0' }} />
      <ViewTicketDetails ticketId={id} />
    </Box>
  )
}

export default Page
