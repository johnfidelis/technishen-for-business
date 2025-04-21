'use client'

import React, { useContext } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { ThemeContext } from '@/context/ThemeContext'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const PostBarChart = () => {
  const { theme } = useContext(ThemeContext)

  const data = {
    labels: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUNE',
      'JUL',
      'AUG',
      'SEPT',
      'OCT',
      'NOV',
      'DEC',
    ],
    datasets: [
      {
        label: 'Posts',
        backgroundColor: [
          //   theme.primary_color || '#3BAB46',
          theme.secondary_color || '#123865',
        ],
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        data: [65, 5, 49, 50, 73, 60, 12, 100, 90, 60, 44, 80],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [8, 4],
        },
      },
    },
  }

  return (
    <Box
      sx={{
        pt: '2em',
      }}
    >
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#333',
            mb: 1,
          }}
        >
          Posts
        </Typography>
        <hr />
      </Box>

      <Box sx={{ height: '400px' }}>
        <Box
          sx={{
            textAlign: 'center',
            mb: 2,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
            Total Posts
          </Typography>

          <br />

          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 14,
                backgroundColor: theme.primary_color || '#3BAB46',
                borderRadius: '4px',
              }}
            />
            <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
              Number of Posts Created
            </Typography>
          </Box>
        </Box>

        <Bar data={data} options={options} />
      </Box>
    </Box>
  )
}

export default PostBarChart
