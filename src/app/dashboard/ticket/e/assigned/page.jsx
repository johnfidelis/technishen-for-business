'use client'
import React, { useContext } from 'react'
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { MdInfoOutline } from 'react-icons/md'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ListAltIcon from '@mui/icons-material/ListAlt'
import InboxIcon from '@mui/icons-material/Inbox'
import { ThemeContext } from '@/context/ThemeContext'
import TicketTable from '@/component/model1/TicketTable'

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
      <Box sx={{ mb: '2em', textAlign: 'left' }}>
        <Typography
          variant="h5"
          sx={{
            color: '#333',
            fontSize: '1.5em',
            fontWeight: 300,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Assigned Tickets{``}
          <Tooltip
            title="This page displays all open tickets that are currently unassigned. You can take action to assign or manage these tickets."
            arrow
          >
            <IconButton size="small">
              <MdInfoOutline style={{ fontSize: '1.2em', color: '#666' }} />
            </IconButton>
          </Tooltip>
          <hr style={{ marginTop: '0.625em' }} />
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          {
            title: "Today's Tickets",
            value: 32,
            icon: <InsertDriveFileIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Average Monthly Tickets',
            value: 23,
            icon: <ListAltIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Total Tickets',
            value: 453,
            icon: <InboxIcon sx={{ color: 'white' }} />,
          },
        ].map((summary, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                backgroundColor: theme.primary_color || '#115093',
                color: '#FFFFFF',
                borderRadius: '8px',
                minHeight: '40px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0.6vh 0vh',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: '14px', fontWeight: 500 }}
                >
                  {summary.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontSize: '14px', fontWeight: 500 }}
                >
                  {summary.value}
                </Typography>
              </Box>
              {summary.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <TicketTable filterType="assigned" />
    </Box>
  )
}
