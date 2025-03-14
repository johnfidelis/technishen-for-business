'use client'

import React, { useContext, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import { ThemeContext } from '@/context/ThemeContext'
import OpenSubcategories from '@/component/OpenSubcategories'
import AddIcon from '@mui/icons-material/Add'
import CreateSubCategory from '@/component/modals/CreateSubCategory'

const Page = ({ onBack }) => {
  const { theme } = useContext(ThemeContext)
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
        p: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        minHeight: '60vh',
        margin: 'auto',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
          justifyContent: 'space-between',
        }}
      >
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
        <Typography variant="h6" sx={{ ml: 2, textTransform: 'uppercase' }}>
          {serviceName}
        </Typography>

        <Button
          onClick={handleCreateSubCategory}
          variant="contained"
          startIcon={<AddIcon />}
          style={{ backgroundColor: theme.primary_color }}
        >
          New Sub-category
        </Button>
      </Box>
      <OpenSubcategories categoryId={id} onServiceNameChange={setServiceName} />

      {/* Create SubCategory Modal */}
      <CreateSubCategory
        open={openModal}
        onClose={() => setOpenModal(false)}
        serviceId={id}
      />
    </Box>
  )
}

export default Page
