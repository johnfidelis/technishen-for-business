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
import TicketTable from '@/component/TicketTable'

export default function Page() {
  const { theme } = useContext(ThemeContext)
  const unassignedTickets = [
    {
      id: 'TCK-001',
      subject: 'Payment issue on checkout',
      created_at: '2025-02-25T10:30:00Z',
      priority: 'High',
      status: 'Open',
    },
    {
      id: 'TCK-002',
      subject: 'Login credentials not working',
      created_at: '2025-02-24T15:20:00Z',
      priority: 'Medium',
      status: 'Open',
    },
  ]

  const filteredTickets = unassignedTickets // In real case, you might filter it
  const loading = false
  const searchQuery = ''
  const setSearchQuery = () => {}
  const sortOrder = 'asc'
  const setSortOrder = () => {}
  const startDate = null
  const endDate = null
  const handleDateChange = () => {}
  const status = 'Open'
  const setStatus = () => {}
  const showOutsourcedTickets = false
  const handleSwitchChange = () => {}
  const Page = 0
  const rowsPerPage = 10
  const handleChangePage = () => {}
  const handleChangeRowsPerPage = () => {}
  const handleTicketClick = (ticketId) =>
    console.log(`Clicked ticket: ${ticketId}`)
  const handleOutsourcedTicketClick = () => {}
  const formatDateTime = (dateString) => new Date(dateString).toLocaleString()

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
          Open Tickets{``}
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
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.primary_color || '#115093',
                color: '#fff',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
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
                <Typography variant="body2">{summary.title}</Typography>
                <Typography variant="body2">{summary.value}</Typography>
              </Box>
              {summary.icon}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <TicketTable filterType="open" />
    </Box>
  )
}
