import React from 'react'
import { Box } from '@mui/material'
import DashboardCards from '@/component/model1/DashboardCards'
import DashboardMap from '@/component/model1/DashboardMap'

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
