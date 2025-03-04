'use client'
import React, { useContext } from 'react'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { MdInfoOutline } from 'react-icons/md'
import AddIcon from '@mui/icons-material/Add'

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ListAltIcon from '@mui/icons-material/ListAlt'
import InboxIcon from '@mui/icons-material/Inbox'
import { ThemeContext } from '@/context/ThemeContext'
import EmployeeTable from '@/component/EmployeeTable'

export default function Page() {
  const { theme } = useContext(ThemeContext)

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
              color: '#000000',
              fontSize: '1.25em',
              mb: 2,
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
            }}
          >
            All Fulfilers
            <Tooltip
              title="This page displays all open tickets that are currently unassigned. You can take action to assign or manage these tickets."
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
      <EmployeeTable role={'Fulfiller'} />
    </Box>
  )
}
