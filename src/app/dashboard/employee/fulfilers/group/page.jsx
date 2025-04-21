'use client'
import React, { useState, useContext } from 'react'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { MdInfoOutline } from 'react-icons/md'
import AddIcon from '@mui/icons-material/Add'
import { ThemeContext } from '@/context/ThemeContext'
import FulfillerGroupTable from '@/component/model1/FulfillerGroupTable'
import CreateFulfillerGroup from '@/component/model1/modals/CreateFulfillerGroup'

export default function FulfillerGroupPage() {
  const { theme } = useContext(ThemeContext)
  const [openModal, setOpenModal] = useState(false)
  const [number, setNumber] = useState(0)
  return (
    <Box
      sx={{
        width: '98%',
        p: '2em',
        backgroundColor: '#FFFFFF',
        borderRadius: '0.625em',
        minHeight: '60vh',
        margin: 'auto',
        fontFamily: 'Inter, sans-serif',
      }}
    >
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
          Fulfillers Group {`(${number})`}
          <Tooltip
            title="This page allows you to create and manage groups of fulfillers for easier ticket distribution and team coordination.

"
            arrow
          >
            <IconButton size="small">
              <MdInfoOutline style={{ fontSize: '1.2em', color: '#666' }} />
            </IconButton>
          </Tooltip>
        </Typography>

        <Button
          variant="contained"
          sx={{ backgroundColor: theme.primary_color }}
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)} // Open modal on button click
        >
          Create Fulfiller Group
        </Button>
      </Box>

      <FulfillerGroupTable setNumber={setNumber} />

      {/* Modal */}
      <CreateFulfillerGroup
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  )
}
