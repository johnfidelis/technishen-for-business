'use client'

import React, { useContext, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import { ThemeContext } from '@/context/ThemeContext'
import InteviewCall from '@/component/model2/InteviewCall'

const Page = ({ onBack }) => {
  const { theme } = useContext(ThemeContext)
  const [number, setNumber] = useState(0)
  const router = useRouter()
  const { id } = useParams()
  const [serviceName, setServiceName] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const handleCreateSubCategory = () => {
    setOpenModal(true)
  }

  return (
    <Box
      sx={{
        width: '98%',
        p: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        minHeight: '60vh',
        margin: 'auto',
      }}
    >
      <Box sx={{ mb: 4, textAlign: 'left' }}>
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

        <Typography
          variant="h5"
          sx={{
            color: '#333',
            fontSize: '1.25em',
            mb: 2,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
          }}
        >
          Join Interview
        </Typography>
        <hr />
      </Box>
      <InteviewCall id={id} />
    </Box>
  )
}

export default Page
