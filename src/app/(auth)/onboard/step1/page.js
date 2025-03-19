
'use client'

import React, { useState } from 'react'
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
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
    id_type: 'Passport',
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.last_name}
            helperText={errors.last_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.nationality}
            helperText={errors.nationality}
          >
            {countryList.map((country) => (
              <MenuItem key={country.name} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.gender}
            helperText={errors.gender}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Identity Type"
            name="id_type"
            value={formData.id_type}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.id_type}
            helperText={errors.id_type}
          >
            <MenuItem value="Passport">Passport</MenuItem>
            <MenuItem value="National ID Card">National ID Card</MenuItem>
            <MenuItem value="Driver's License">Driver&apos;s License</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={formData.id_type + ' Number'}
            name="id_number"
            value={formData.id_number}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.id_number}
            helperText={errors.id_number}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={!!errors.date_of_birth}
            helperText={errors.date_of_birth}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
              error={!!errors.phone_number}
              helperText={errors.phone_number}
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
        </Grid>
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
