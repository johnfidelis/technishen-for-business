'use client'

import React, { useState } from 'react'
import { Box, Typography, Switch, FormControlLabel } from '@mui/material'
import InternalTicketForm from '@/component/model1/InternalTicketForm'
import OutsourceTicketForm from '@/component/model1/OutsourceTicketForm'

const CreateTicket = () => {
  const [outsourced, setOutsourced] = useState(false)

  const handleOutsourcedToggle = () => {
    setOutsourced((prev) => !prev)
  }

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
      <Box sx={{ mb: '2em', textAlign: 'left' }}>
        <Typography
          variant="h5"
          sx={{
            color: '#333',
            fontSize: '1.5em',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
          }}
        >
          Create Ticket
        </Typography>

        {/* Toggle Switch */}
        <FormControlLabel
          control={
            <Switch checked={outsourced} onChange={handleOutsourcedToggle} />
          }
          label="Outsource this Ticket"
          componentsProps={{
            typography: { sx: { fontSize: '0.75em' } },
          }}
        />
        <br />
        {/* Outsourcing Warning */}
        <Typography color="error" variant="caption">
          {outsourced
            ? 'This ticket will be outsourced to Technishen Experts. Additional costs may apply.'
            : 'Toggle this ticket to outsource it to Technishen Experts.'}
        </Typography>

        <hr style={{ marginTop: '10px' }} />
      </Box>

      {/* Render Form Based on State */}
      {outsourced ? <OutsourceTicketForm /> : <InternalTicketForm />}
    </Box>
  )
}

export default CreateTicket
