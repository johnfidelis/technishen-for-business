'use client'
import React, { useContext } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { ThemeContext } from '@/context/ThemeContext'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import AssignmentIcon from '@mui/icons-material/Assignment'
import GroupIcon from '@mui/icons-material/Group'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Link from 'next/link'

const DashboardCards = () => {
  const { theme } = useContext(ThemeContext)

  const cardData = [
    {
      label: 'All Tickets',
      count: 10,
      path: '/dashboard/ticket/i/all',
      icon: <AllInboxIcon />,
    },
    {
      label: 'Open Tickets',
      count: 10,
      path: '/dashboard/ticket/i/open',
      icon: <HelpOutlineIcon />,
    },
    {
      label: 'Assigned Tickets',
      count: 10,
      path: '/dashboard/ticket/i/assigned',

      icon: <AssignmentIcon />,
    },
    {
      label: 'Unassigned Ticket',
      count: 0,
      path: '/dashboard/ticket/i/open-unassigned',
      icon: <HelpOutlineIcon />,
    },
    {
      label: 'Resolved Tickets',
      count: 10,
      path: '/dashboard/ticket/i/resolved',
      icon: <CheckCircleIcon />,
    },
    {
      label: 'Total Users',
      count: 4,
      path: '/dashboard/customer/all',
      icon: <GroupIcon />,
    },
  ]

  return (
    <Grid container spacing={2}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={4} md={4} key={index}>
          <Link href={card.path}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.primary_color,
                color: '#fff',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <Typography
                variant="body2"
                sx={{
            
                  padding: '0.6vh 0vh',
                }}
              >
                {card.label} <br /> {card.count}
              </Typography>
              {card.icon}
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

export default DashboardCards
