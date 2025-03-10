'use client'
import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Avatar,
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import EditIcon from '@mui/icons-material/Edit'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { Cookies } from 'react-cookie'
import { ThemeContext } from '@/context/ThemeContext'

const BusinessProfileSettings = () => {
  const { theme } = useContext(ThemeContext)
  const [profile, setProfile] = useState({})
  const cookies = new Cookies()
  const businessId = cookies.get('selectedBusinessId')
  const { data, isLoading } = useFetchData(
    GET_ENDPOINTS.BUSINESSES,
    'fetchBusinesses',
  )

  useEffect(() => {
    const business = data?.businesses?.find((b) => b.id === businessId)
    console.log({ business })

    setProfile({
      // buildingName: business.building_name || "",
      businessEmail: business.business_email || '',
      businessName: business.business_name || '',
      businessType: business.business_type || '',
      city: business.city || '',
      companySize: business.company_size || '',
      country: business.country || '',
      countryBuilding: business.country_building || '',
      industry: business.industry || '',
      // logo: business.logo || "",
      stateOrRegion: business.state_or_region || '',
      supportEmail: business.support_email || '',
      taxNumber: business.tax_number || '',
      tradingAddress: business.trading_address || '',
      tradingName: business.trading_name || '',
      unitNumber: business.unit_number || '',
      website: business.website || '',
    })
  }, [data, businessId])

  const [logoPreview, setLogoPreview] = useState(null)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  const handleLogoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
        Business Profile
      </Typography>
      <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
        <Avatar
          src={logoPreview}
          alt={profile.businessName}
          sx={{ width: 80, height: 80, mr: 3 }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {profile.businessName || 'Business Name'}
          </Typography>
          <IconButton component="label">
            <PhotoCameraIcon />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleLogoChange}
            />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {Object.entries(profile).map(
          ([key, value]) =>
            key !== 'logo' && (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  label={key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            ),
        )}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{ backgroundColor: '#115093', color: 'white' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default BusinessProfileSettings
