'use client'

import React, { useState } from 'react'
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputAdornment,
  FormControl,
} from '@mui/material'
import { toast } from 'react-toastify'
import PhoneInput from 'react-phone-number-input'
import countryList from '../../../../component/utils/countryList'
import { usePatchData } from '@/hooks/useApiService'
import { PATCH_ENDPOINTS } from '@/constants/endpoints'

const Page = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    nationality: '',
    gender: '',
    id_type: '',
    id_number: '',
    date_of_birth: '',
    phone_number: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const patchData = usePatchData(
    PATCH_ENDPOINTS.BUSINESS_OWNER_PROFILE,
    'businessOwnerProfile',
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }

  const validateFields = () => {
    const newErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = 'This field is required.'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateFields()) {
      toast.error('An error occurred. Please fill all required fields.', {
        autoClose: 5000,
        hideProgressBar: true,
      })
      return
    }
    setIsLoading(true)
    try {
      await patchData.mutateAsync(formData)
      handleNext()
    } catch (error) {
      toast.error('Failed to save data. Please try again.', {
        autoClose: 5000,
        hideProgressBar: true,
      })
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ padding: '20px' }}>
      {/* <Typography variant="h6" sx={{ mb: 2 }}>
        Personal Details
      </Typography> */}
      <Grid container spacing={2}>
        {Object.keys(formData).map((key) => (
          <Grid item xs={12} sm={6} key={key}>
            {key === 'nationality' ? (
              <TextField
                select
                label="Nationality"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                fullWidth
                required
              >
                {countryList.map((country) => (
                  <MenuItem key={country.name} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : key === 'gender' ? (
              <TextField
                select
                label="Gender"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            ) : key === 'id_type' ? (
              <TextField
                select
                label="Identity Type"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="Passport">Passport</MenuItem>
                <MenuItem value="National ID Card">National ID Card</MenuItem>
                <MenuItem value="Driver's License">Driver's License</MenuItem>
              </TextField>
            ) : key === 'phone_number' ? (
              <FormControl
                fullWidth
                style={{
                  width: '100%',
                  padding: '15px 14px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
              >
                <PhoneInput
                  international
                  defaultCountry="ZA"
                  value={formData.phone_number || ''}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, phone_number: value }))
                  }
                  className="phone-input"
                  sx={{
                    '& .PhoneInputInput': {
                      outline: 'none',
                      border: 'none',
                      boxShadow: 'none',
                    },
                  }}
                />
              </FormControl>
            ) : (
              <TextField
                label={key
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                fullWidth
                required
                type={key === 'date_of_birth' ? 'date' : 'text'}
                InputLabelProps={
                  key === 'date_of_birth' ? { shrink: true } : {}
                }
              />
            )}
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={{ mt: 3, backgroundColor: '#115093' }}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save & Continue'}
      </Button>
    </Box>
  )
}

export default Page
