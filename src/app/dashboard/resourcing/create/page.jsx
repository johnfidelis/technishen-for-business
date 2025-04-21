'use client'

import React from 'react'
import { MdInfoOutline } from 'react-icons/md'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import CreateJob from '@/component/model2/CreateJob'

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
          Create Posts
          <Tooltip
            title="This page allows for creating and managing all service catalogues for customers, as well as managing fulfillers in the service catalogue."
            arrow
          >
            <IconButton size="small">
              <MdInfoOutline style={{ fontSize: '1.2em', color: '#666' }} />
            </IconButton>
          </Tooltip>
        </Typography>

        <hr />
      </Box>

      <CreateJob />
    </Box>
  )
}

export default Page
