'use client'
import React, { useContext, useState } from 'react'
import CatalogTable from '@/component/CatalogTable'
import { MdInfoOutline } from 'react-icons/md'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import { ThemeContext } from '@/context/ThemeContext'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'

const Page = () => {
  const { theme } = useContext(ThemeContext)
  const [number, setNumber] = useState(0)
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
        <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
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
            Manage Employee Catalog {`(${number})`}
            <Tooltip
              title="This page allows for creating and managing all service catalogues for customers, as well as managing fulfillers in the service catalogue."
              arrow
            >
              <IconButton size="small">
                <MdInfoOutline style={{ fontSize: '1.2em', color: '#666' }} />
              </IconButton>
            </Tooltip>
          </Typography>
          <Link href="/dashboard/catalog/create">
            <Button
              variant="contained"
              sx={{ backgroundColor: theme.primary_color }}
              startIcon={<AddIcon />}
            >
              Create Catalog
            </Button>
          </Link>
        </Box>
        <hr />
      </Box>
      <CatalogTable catalogType={'Employee'} setNumber={setNumber} />
    </Box>
  )
}

export default Page
