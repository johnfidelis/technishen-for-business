import React from 'react'
import { Box } from '@mui/material'
import DashboardCards from '@/component/DashboardCards'
import DashboardMap from '@/component/DashboardMap'

const Page = () => {
  return (
    <Box
      sx={{
        width: '98%',
        p: '0px 5px',
        borderRadius: '10px',
        minHeight: '60vh',
        margin: 'auto',
      }}
    >
      <DashboardCards />
      <DashboardMap />
    </Box>
  )
}

export default Page
