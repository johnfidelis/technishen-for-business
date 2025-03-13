'use client'

import { useState } from 'react'
import { Box, Typography, TextField, Chip } from '@mui/material'

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

const CategoriesTab = () => {
  const [selectedCategories, setSelectedCategories] = useState(
    initialSelectedCategories,
  )

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
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Category"
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '5px',
            mb: 2,
            input: { padding: '10px' },
          }}
        />
        <Typography variant="body1" sx={{ mb: 1 }}>
          List of Selected Categories
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {selectedCategories.map((category, index) => (
            <Chip
              key={index}
              label={category}
              onDelete={() => handleDelete(category)}
              sx={{
                backgroundColor: '#333',
                color: '#FFFFFF',
                '& .MuiChip-deleteIcon': { color: '#FFFFFF' },
              }}
            />
          ))}
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
          Suggested List of Categories
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {suggestedCategories.map((category, index) => (
            <Chip
              key={index}
              label={category}
              sx={{
                backgroundColor: '#B0BEC5',
                color: '#FFFFFF',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default CategoriesTab
