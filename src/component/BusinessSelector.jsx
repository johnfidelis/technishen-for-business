'use client'

import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Skeleton,
  CircularProgress,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
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
  const [isRefreshing, setIsRefreshing] = useState(false) // Loading state for refresh
  const { theme } = useContext(ThemeContext)
  const router = useRouter()

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
    window.location.reload()
  }

  const handleAddBusiness = () => {
    router.push('/onboard')
  }

  const handleRefresh = () => {
    setIsRefreshing(true) // Show loading state

    cookies.remove('selectedBusinessId') // Reset selected business ID
    setTimeout(() => {
      window.location.reload() // Refresh the page after a small delay
    }, 1000)
  }

  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'start' }}>
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
    <Box sx={{ textAlign: 'start' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
        <span>TOTAL BUSINESSES: </span>
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
          fontWeight: 400,
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

      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 400,
          cursor: 'pointer',
          marginTop: '5px',
          display: 'flex',
          alignItems: 'center', // Align icon and text
          gap: '5px', // Add spacing between icon and text
          '&:hover': {
            color: theme?.primary_color,
          },
        }}
        onClick={handleRefresh}
      >
        {isRefreshing ? (
          <CircularProgress size={20} />
        ) : (
          <RefreshIcon fontSize="small" />
        )}
        {isRefreshing ? 'Refreshing...' : 'Refresh Latest Data'}
      </Typography>
    </Box>
  )
}

export default BusinessSelector
