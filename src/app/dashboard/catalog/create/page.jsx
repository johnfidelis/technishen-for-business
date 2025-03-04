'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
import ServiceCatalog from '@/component/ServiceCatalogForm'

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
            color: '#000000',
            fontSize: '1.25em',
            mb: 2,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
          }}
        >
          Create Service Catalog
        </Typography>
        <hr />
      </Box>
      <ServiceCatalog />
    </Box>
  )
}

export default Page
