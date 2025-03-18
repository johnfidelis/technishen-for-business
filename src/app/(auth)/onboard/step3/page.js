'use client'

import { useState, useEffect } from 'react'
import { Box, TextField, Grid, Button, MenuItem } from '@mui/material'
import { toast } from 'react-toastify'
import countryList from '../../../../component/utils/countryList'
import AddressAutocomplete from '../../../../component/utils/GoogleInputAddress'
import { useCreateData } from '@/hooks/useApiService'
import { POST_ENDPOINTS } from '@/constants/endpoints'

const Page = ({ handleNext, handleBack }) => {
  const [reloadKey, setReloadKey] = useState(Date.now())
  const [errors, setErrors] = useState({})
  const createBusiness = useCreateData(
    POST_ENDPOINTS.BUSINESS_PROFILE,
    'businessProfile',
  )

  const [formData, setFormData] = useState({
    trading_address: '',
    city: '',
    state_or_region: '',
    country: '',
    building_name: '',
    unit_number: '',
    longitude: '',
    latitude: '',
    country_building: '',
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = JSON.parse(localStorage.getItem('step2Data')) || {}
      setFormData((prev) => ({ ...prev, ...savedData }))
      console.log({ savedData })
    }
  }, [])

  useEffect(() => {
    if (formData.business_type === 'Sole Proprietorship') {
      setFormData((prev) => ({ ...prev, sole_prop_docs: '' }))
    }
  }, [formData.business_type])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('step2Data', JSON.stringify(formData))
    }
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // setFormData((prev) => ({ ...prev, ['sole_prop_docs']: file }))
    setFormData((prev) => ({ ...prev, sole_prop_docs: file }))
  }

  const handleAddressUpdate = (address, placeDetails) => {
    console.log({ address, placeDetails })
    console.log('1')

    setFormData((prev) => ({
      ...prev,
      trading_address:
        address?.city + ' ' + address?.state + ' ' + address?.country,
      city: address?.city,
      state_or_region: address?.state,
      country: address?.country,
      country_building: address?.country,
      longitude: address?.longitude,
      latitude: address?.latitude,
    }))
  }

  const handleSave = () => {
    let newErrors = {}
    if (!formData.trading_address)
      newErrors.trading_address = 'Trading address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.state_or_region)
      newErrors.state_or_region = 'State/Region is required'
    if (!formData.country) newErrors.country = 'Country is required'
    if (
      formData.business_type === 'Sole Proprietorship' &&
      !formData.sole_prop_docs
    ) {
      newErrors.sole_prop_docs = 'Business document is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Please fix the errors before submitting.')
      return
    }

    const formDataObject = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataObject.append(key, value)
    })
    createBusiness.mutate(formDataObject, {
      onSuccess: async () => {
        // handleNext()
        setReloadKey(Date.now())
        localStorage.clear('step2Data')
        window.location.href = '/dashboard'
      },
      onError: () => toast.error('check inputs.'),
    })
  }

  return (
    <Box sx={{ padding: '0 10px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <AddressAutocomplete
            key={reloadKey}
            label="Trading Address (required)"
            value={formData.trading_address || ''}
            handleAddressUpdate={handleAddressUpdate}
          />
          {errors.trading_address && (
            <p style={{ color: 'red', marginTop: '4px' }}>
              {errors.trading_address}
            </p>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City (required)"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Region, Province or State (required)"
            name="state_or_region"
            value={formData.state_or_region || ''}
            onChange={handleChange}
            error={!!errors.state_or_region}
            helperText={errors.state_or_region}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Country (required)"
            name="country"
            value={formData.country || ''}
            onChange={handleChange}
            error={!!errors.country}
            helperText={errors.country}
            required
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
            fullWidth
            label="Building Name (optional)"
            name="building_name"
            value={formData.building_name || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Unit Number (optional)"
            name="unit_number"
            value={formData.unit_number || ''}
            onChange={handleChange}
          />
        </Grid>
        {formData.business_type === 'Sole Proprietorship' ? (
          <>
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                name="sole_prop_docs"
                onChange={handleFileChange}
                label="Business Document(required)"
                required
              />
              {formData.sole_prop_docs && (
                <p>Selected File: {formData.sole_prop_docs.name}</p>
              )}
              <br />
              <small>Proof of Address (required)</small>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>

      <Button
        variant="contained"
        onClick={() => handleBack()}
        sx={{ mt: 3, backgroundColor: '#115093' }}
      >
        Previous Step
      </Button>
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{ mt: 3, ml: 1, backgroundColor: '#115093' }}
      >
        Submit
      </Button>
    </Box>
  )
}

export default Page
