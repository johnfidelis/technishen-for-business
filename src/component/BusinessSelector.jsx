'use client'

import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Skeleton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/context/ThemeContext'
import { useFetchData } from '@/hooks/useApiService'
import { Cookies } from 'react-cookie'

const BusinessSelector = () => {
  const cookies = new Cookies()
  const { data, isLoading } = useFetchData(
    GET_ENDPOINTS.BUSINESSES,
    'fetchBusinesses',
  )
  const [selectedBusiness, setSelectedBusiness] = useState('')
  const { theme } = useContext(ThemeContext)
  const router = useRouter()

  // Validate cookie against fetched data and set default selected business
  useEffect(() => {
    if (
      !isLoading &&
      Array.isArray(data?.businesses) &&
      data.businesses.length > 0
    ) {
      const cookieBusinessId = cookies.get('selectedBusinessId')
      const matchingBusiness = data.businesses.find(
        (business) => business.id === cookieBusinessId,
      )

      if (cookieBusinessId && matchingBusiness) {
        setSelectedBusiness(cookieBusinessId)
      } else {
        cookies.remove('selectedBusinessId')
        const firstBusinessId = data.businesses[0].id
        setSelectedBusiness(firstBusinessId)
        cookies.set('selectedBusinessId', firstBusinessId, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        })
      }
    }
  }, [data, isLoading, cookies])

  const updateSelectedBusiness = (businessId) => {
    setSelectedBusiness(businessId)
    cookies.set('selectedBusinessId', businessId, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
    })
    window.location.reload() // Refresh to propagate the selected business across endpoints
  }

  const handleAddBusiness = () => {
    router.push('/onboard')
  }

  if (isLoading) {
    return (
      <Box sx={{ mb: 2, textAlign: 'start' }}>
        <Skeleton variant="text" width={150} height={20} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={20}
          sx={{ mb: 1 }}
        />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            width: '100%',
            backgroundColor: theme.primary_color,
            borderColor: theme.primary_color,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.primary_color,
              borderColor: theme.primary_color,
            },
          }}
        >
          Add Business
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ mb: 2, textAlign: 'start' }}>
      <Typography variant="subtitle2" sx={{ color: '#000000' }}>
        <span style={{ fontWeight: 500 }}>TOTAL BUSINESSES: </span>
        {Array.isArray(data?.businesses) ? data.businesses.length : 0}
      </Typography>
      <Select
        value={selectedBusiness || ''}
        variant="standard"
        onChange={(e) => updateSelectedBusiness(e.target.value)}
        sx={{
          width: '100%',
          border: 'none',
          borderRadius: '4px',
          mb: 1,
          color: theme.primary_color,
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
        }}
        MenuProps={{
          PaperProps: {
            style: { maxHeight: 200 },
          },
        }}
        disableUnderline
      >
        {Array.isArray(data?.businesses) &&
          data.businesses.map((business) => (
            <MenuItem key={business.id} value={business.id}>
              {business.business_name}
            </MenuItem>
          ))}
      </Select>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{
          width: '100%',
          backgroundColor: theme.primary_color,
          borderColor: theme.primary_color,
          color: 'white',
          '&:hover': {
            backgroundColor: theme.primary_color,
            borderColor: theme.primary_color,
          },
        }}
        onClick={handleAddBusiness}
      >
        Add Business
      </Button>
    </Box>
  )
}

export default BusinessSelector
