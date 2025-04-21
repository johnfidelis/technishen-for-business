import React from 'react'
import { Box } from '@mui/material'
import DashboardCards from '@/component/model2/DashboardCards'
import PostBarChart from '@/component/model2/PostBarChart'

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
      <PostBarChart />
    </Box>
  )
}

export default Page
