'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
import CustomersTable from '@/component/CustomersTable'

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
          All Customers
        </Typography>
        <hr />
      </Box>
      <CustomersTable />
    </Box>
  )
}

export default Page
