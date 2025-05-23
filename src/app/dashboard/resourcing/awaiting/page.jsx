'use client'

import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import Awaiting from '@/component/model2/Awaiting'

const Page = () => {
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
          Awaiting Start Date
        </Typography>
        <hr />
      </Box>
      <Awaiting filter={'Approved'} />
    </Box>
  )
}

export default Page
