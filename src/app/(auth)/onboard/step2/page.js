'use client'

import { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {
  Box,
  TextField,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
} from '@mui/material'
import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'
import { Height } from '@mui/icons-material'

const Page = ({ handleNext }) => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        JSON.parse(localStorage.getItem('step2Data')) || {
          business_type: '',
          business_name: '',
          business_email: '',
          support_email: '',
          trading_name: '',
          website: '',
          registration_number: '',
          industry: '',
          vat_number: '',
          company_size: '',
          office_phone: '',
          sameAsTradingName: false,
        }
      )
    }
    return {}
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('step2Data', JSON.stringify(formData))
    }
  }, [formData])

  const validateForm = () => {
    let newErrors = {}

    if (!formData.business_type)
      newErrors.business_type = 'Business type is required'
    if (!formData.business_name)
      newErrors.business_name = 'Business name is required'
    if (!formData.business_email || !isEmail(formData.business_email))
      newErrors.business_email = 'Valid business email is required'
    if (!formData.support_email || !isEmail(formData.support_email))
      newErrors.support_email = 'Valid support email is required'
    if (!formData.trading_name)
      newErrors.trading_name = 'Trading name is required'
    if (!formData.industry) newErrors.industry = 'Industry is required'
    if (!formData.company_size)
      newErrors.company_size = 'Company size is required'
    if (!formData.office_phone || formData.office_phone.length < 10)
      newErrors.office_phone = 'Valid office phone number is required'
    if (formData.website && !isURL(formData.website))
      newErrors.website = 'Enter a valid URL'

    // Only require registration number if business type is NOT Sole Proprietorship
    if (
      formData.business_type !== 'Sole Proprietorship' &&
      !formData.registration_number
    ) {
      newErrors.registration_number = 'Registration number is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'sameAsTradingName') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        trading_name: checked ? prev.business_name : '',
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }

  const handleSave = () => {
    if (validateForm()) {
      // console.log({ formData }) // uncomment to see form data
      handleNext()
    }
  }

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Business Type (required)"
            name="business_type"
            value={formData.business_type || ''}
            onChange={handleChange}
            error={!!errors.business_type}
            helperText={errors.business_type}
            required
          >
            <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
            <MenuItem value="Registered Business">Registered Business</MenuItem>
            <MenuItem value="Partnership">Partnership</MenuItem>
            <MenuItem value="NGOs/NPC">NGOs/NPC</MenuItem>
          </TextField>
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
              value={formData.office_phone || ''}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, office_phone: value }))
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
            {errors.office_phone && (
              <span style={{ color: '#FF4C3B', fontSize: '12px' }}>
                {errors.office_phone}
              </span>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Business Name (required)"
            name="business_name"
            value={formData.business_name || ''}
            onChange={handleChange}
            error={!!errors.business_name}
            helperText={errors.business_name}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Business Email (required)"
            name="business_email"
            type="email"
            value={formData.business_email || ''}
            onChange={handleChange}
            error={!!errors.business_email}
            helperText={errors.business_email}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                name="sameAsTradingName"
                checked={formData.sameAsTradingName || false}
                onChange={handleChange}
              />
            }
            style={{ color: '#6F7071' }}
            label="Tick if the business name is the same as the trading name."
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Support Email (required)"
            name="support_email"
            type="email"
            value={formData.support_email || ''}
            error={!!errors.support_email}
            helperText={errors.support_email}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Trading Name (required)"
            name="trading_name"
            value={formData.trading_name || ''}
            onChange={handleChange}
            error={!!errors.trading_name}
            helperText={errors.trading_name}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Website (optional)"
            name="website"
            placeholder="e.g., example.com"
            value={formData.website || ''}
            error={!!errors.website}
            helperText={errors.website}
            onChange={(e) => {
              let rawValue = e.target.value.trim()

              // Remove unwanted prefixes if present
              rawValue = rawValue.replace(/^(https?:\/\/)?(www\.)?/, '')

              // Ensure it always has "https://www." in front
              const formattedValue = rawValue ? `https://www.${rawValue}` : ''

              setFormData((prev) => ({ ...prev, website: formattedValue }))
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={
              formData.business_type === 'Sole Proprietorship'
                ? 'Business Registration Number(not required)'
                : 'Business Registration Number (required)'
            }
            name="registration_number"
            value={formData.registration_number || ''}
            onChange={handleChange}
            error={!!errors.registration_number}
            style={{
              background:
                formData.business_type === 'Sole Proprietorship'
                  ? '#e0e0e0'
                  : 'white',
              borderRadius: '4px',
            }}
            helperText={errors.registration_number}
            disabled={formData.business_type === 'Sole Proprietorship'}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Industry (required)"
            name="industry"
            value={formData.industry || ''}
            error={!!errors.industry}
            helperText={errors.industry}
            onChange={handleChange}
            required
          >
            <MenuItem value="Industry 1">Industry 1</MenuItem>
            <MenuItem value="Industry 2">Industry 2</MenuItem>
            <MenuItem value="Industry 3">Industry 3</MenuItem>
          </TextField>
        </Grid>

        {/* VAT Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="VAT Number (optional)"
            name="tax_number"
            value={formData.tax_number || ''}
            error={!!errors.tax_number}
            helperText={errors.tax_number}
            onChange={handleChange}
            // disabled={formData[0].business_type === "Sole Proprietorship"}
          />
        </Grid>

        {/* Staff Size Dropdown */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Staff Size (required)"
            name="company_size"
            value={formData.company_size || ''}
            error={!!errors.company_size}
            helperText={errors.company_size}
            onChange={handleChange}
            required
          >
            <MenuItem value="1-10">1-10</MenuItem>
            <MenuItem value="11-50">11-50</MenuItem>
            <MenuItem value="51-200">51-200</MenuItem>
            <MenuItem value="201-500">201-500</MenuItem>
            <MenuItem value="501+">501+</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={handleSave}
        sx={{ mt: 3, backgroundColor: '#115093' }}
      >
        Save & Continue
      </Button>
    </Box>
  )
}

export default Page
