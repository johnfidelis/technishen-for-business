'use client'

import React, { useContext } from 'react'
import { MdInfoOutline } from 'react-icons/md'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import UpdateCreatedJob from '@/component/model2/UpdateCreatedJob'
import { useRouter, useParams } from 'next/navigation'
import { ThemeContext } from '@/context/ThemeContext'

const Page = () => {
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  const { id } = useParams()
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
          onClick={() => router.back()}
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
          Update Job Post
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

      <UpdateCreatedJob id={id} />
    </Box>
  )
}

export default Page
