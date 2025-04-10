'use client'

import { useState } from 'react'
import { Box, Typography, TextField, Chip } from '@mui/material'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'

const initialSelectedCategories = [
  'Anti-Virus',
  'Software',
  'PWA',
  'Email Config',
  'E-Commerce',
]

const suggestedCategories = [
  'IT Support',
  'Anti-Virus',
  'Server Support',
  'Security Patch',
]

const CategoriesTab = ({ employeeId }) => {
  const [selectedCategories, setSelectedCategories] = useState(
    initialSelectedCategories,
  )

  const { data: employeeServices, isLoading } = useFetchData(
    GET_ENDPOINTS.GET_EMPLOYEE_SERVICES(employeeId),
  )
  console.log({ employeeServices })
  // Handle delete action
  const handleDelete = (category) => {
    setSelectedCategories((prev) => prev.filter((item) => item !== category))
  }

  return (
    <Box sx={{ p: 1, backgroundColor: '#E8E8E8', borderRadius: '10px' }}>
      {/* Selected Categories Section */}
      <Box
        sx={{
          mt: 2,
          m: 1,
          p: 1,
          backgroundColor: 'white',
          borderRadius: '5px',
        }}
      >
        <Typography variant="body1" sx={{ mb: 1 }}>
          Categories
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {employeeServices?.services?.length > 0 ? (
            employeeServices.services.map((category, index) => (
              <Chip
                key={index}
                label={category}
                sx={{
                  backgroundColor: '#333',
                  color: '#FFFFFF',
                }}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No services available.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Suggested Categories Section */}
      <Box
        sx={{
          mt: 2,
          m: 1,
          p: 1,
          backgroundColor: 'white',
          borderRadius: '5px',
        }}
      >
        <Typography variant="body1" sx={{ mb: 1 }}>
          Sub Categories
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {employeeServices?.sub_services?.length > 0 ? (
            employeeServices.sub_services.map((category, index) => (
              <Chip
                key={index}
                label={category}
                sx={{
                  backgroundColor: '#B0BEC5',
                  color: '#FFFFFF',
                }}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No sub-services available.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default CategoriesTab
