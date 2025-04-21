'use client'
import React, { useContext, useState } from 'react'
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
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { useFetchData } from '@/hooks/useApiService'

export default function Page() {
  const { theme } = useContext(ThemeContext)
  const [number, setNumber] = useState(0)
  const { data: ticketStat, isLoading } = useFetchData(
    GET_ENDPOINTS.TICKETS_STATUSES_STATS(),
    'allTickets',
  )

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
          Open Tickets {`(${number})`}
          <Tooltip
            title="This page shows all tickets that are currently active and unresolved, whether assigned or unassigned. Use this view to track ongoing issues.

"
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
            value: ticketStat?.unassigned_tickets?.today || 0,
            icon: <InsertDriveFileIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Average Monthly Tickets',
            value: ticketStat?.unassigned_tickets?.monthly_average || 0,
            icon: <ListAltIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Total Tickets',
            value: ticketStat?.unassigned_tickets?.total_this_month || 0,
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

      <TicketTable filterType="open" setNumber={setNumber} />
    </Box>
  )
}
