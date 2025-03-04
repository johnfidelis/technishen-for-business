'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { debounce } from '../../../../component/utils/debounce'
import { toast } from 'react-toastify'
import PhoneInput from 'react-phone-number-input'

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
import { validate } from '@/component/utils/validate'

const page = ({ handleNext, handleBack }) => {
  const router = useRouter()
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
    console.log({formData})
    handleNext()
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
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <PhoneInput
              international
              defaultCountry="ZA"
              value={formData.office_phone || ''}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, office_phone: value }))
              }
              style={{
                width: '100%',
                padding: '16.5px 14px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '4px',
                fontSize: '16px',
              }}
            />
            {errors.office_phone && (
              <p style={{ color: 'red', margin: '4px 0 0' }}>
                {errors.office_phone}
              </p>
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
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Business Registration Number (required)"
            name="registration_number"
            value={formData.registration_number || ''}
            onChange={handleChange}
            error={!!errors.registration_number}
            helperText={errors.registration_number}
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
            label="VAT Number (required)"
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

      <Button variant="contained" onClick={handleSave} sx={{ mt: 3 }}>
      Save & Continue
      </Button>
    </Box>
  )
}

export default page
