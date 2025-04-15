'use client'
import React, { useContext, useState } from 'react'
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { MdInfoOutline } from 'react-icons/md'
import AddIcon from '@mui/icons-material/Add'
import { ThemeContext } from '@/context/ThemeContext'
import PenaltyTable from '@/component/PenaltyTable'
import Link from 'next/link'

export default function Page() {
  const { theme } = useContext(ThemeContext)
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
      <Box sx={{ mb: 4 }}>
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
            All Punishnments {`(${number})`}
            <Tooltip
              title="This page displays a complete list of all employees in the system, regardless of their role or group. Use this view to monitor or manage your workforce.

"
              arrow
            >
              <IconButton size="small">
                <MdInfoOutline style={{ fontSize: '1.2em', color: '#666' }} />
              </IconButton>
            </Tooltip>
          </Typography>
        </Box>
        <hr />
      </Box>
      <PenaltyTable role={''} setNumber={setNumber} />
    </Box>
  )
}
