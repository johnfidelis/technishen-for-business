'use client'

import React, { useContext, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import { ThemeContext } from '@/context/ThemeContext'
import ViewEffectiveAssignment from '@/component/model2/ViewEffectiveAssignment'

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
          View Effective Assignment
        </Typography>
        <hr />
      </Box>
      <ViewEffectiveAssignment />
    </Box>
  )
}

export default Page
