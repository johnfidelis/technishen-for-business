
'use client'
import React, { useState, useContext } from 'react'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { MdInfoOutline } from 'react-icons/md'
import AddIcon from '@mui/icons-material/Add'
import { ThemeContext } from '@/context/ThemeContext'
import FulfillerGroupTable from '@/component/FulfillerGroupTable'
import CreateFulfillerGroup from '@/component/modals/CreateFulfillerGroup'

export default function FulfillerGroupPage() {
  const { theme } = useContext(ThemeContext)
  const [openModal, setOpenModal] = useState(false)

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
            color: '#000000',
            fontSize: '1.25em',
            mb: 2,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
          }}
        >
          Fulfillers Group
          <Tooltip
            title="This page displays all open tickets that are currently unassigned. You can take action to assign or manage these tickets."
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
          Create Employee
        </Button>
      </Box>

      <FulfillerGroupTable />

      {/* Modal */}
      <CreateFulfillerGroup
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  )
}
