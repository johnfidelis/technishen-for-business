'use client'

import React, { useState, useContext } from 'react'
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material'
import PhoneInput from 'react-phone-number-input'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { MdInfoOutline } from 'react-icons/md'
import countryList from '../../../../component/utils/countryList'
import AddressAutocomplete from '../../../../component/utils/GoogleInputAddress'
import { ThemeContext } from '@/context/ThemeContext'
import profileAddIcon from '../../../../assets/images/profileAddIcon.svg'
import Image from 'next/image'
import { useCreateData } from '@/hooks/useApiService'
import { POST_ENDPOINTS } from '@/constants/endpoints'

const Page = () => {
  const { theme } = useContext(ThemeContext)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    phone_number: '',
    address: '',
    email: '',
    date_of_birth: '',
    hire_date: '',
    nationality: '',
    identity_type: 'ID Number',
    id_number: '',
    position: '',
    password: '00000000',
    profile_picture: null,
  })
  const [long, setLong] = useState(0.0)
  const [lat, setLat] = useState(0.0)
  const [imagePreview, setImagePreview] = useState(profileAddIcon)
  const [loading, setLoading] = useState(false)

  const createEmployee = useCreateData(
    POST_ENDPOINTS.CREATE_EMPLOYEE,
    'createEmployee',
  )

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, ['profile_picture']: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddressUpdate = (parsedAddress) => {
    setFormData((prevData) => ({
      ...prevData,
      address:
        parsedAddress?.city +
        ' ' +
        parsedAddress?.state +
        ' ' +
        parsedAddress?.country,
    }))

    setLong(parsedAddress?.longitude)
    setLat(parsedAddress?.latitude)
  }

  const handleSubmit = () => {
    setLoading(true)

    const formDataObject = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        formDataObject.append(key, value)
      }
    })
    createEmployee.mutate(formDataObject, {
      onSuccess: async () => {
        setLoading(false)
      },
      onError: () => {
        setLoading(false)
      },
    })
  }

  return (
    <Box
      sx={{
        width: '98%',
        p: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        minHeight: '60vh',
        margin: 'auto',
      }}
    >
      <Box sx={{ mb: 4, textAlign: 'left' }}>
        <Typography
          variant="h5"
          sx={{
            color: '#000000',
            fontSize: '1.25em',
            mb: 2,
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
          }}
        >
          Create New Employee
        </Typography>
        <hr />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                required
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                required
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <PhoneInput
                  international
                  defaultCountry="ZA"
                  value={formData.phone_number || ''}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, phone_number: value }))
                  }
                  style={{
                    width: '100%',
                    padding: '16.5px 14px',
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    borderRadius: '4px',
                    fontSize: '16px',
                  }}
                />
              </FormControl>

              <Box sx={{ mt: 2 }}>
                <AddressAutocomplete
                  label="Address"
                  fullWidth
                  value={formData.address}
                  handleAddressUpdate={handleAddressUpdate}
                />
              </Box>

              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6} container justifyContent="center">
              <TextField
                fullWidth
                label="Date of Birth"
                variant="outlined"
                required
                name="date_of_birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.date_of_birth}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Hired Date"
                variant="outlined"
                required
                name="hire_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.hire_date}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Nationality</InputLabel>
                <Select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                >
                  {countryList.map((country) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Identity Type</InputLabel>
                <Select
                  name="identity_type"
                  value={formData.identity_type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="ID Number">ID Number</MenuItem>
                  <MenuItem value="Passport Number">Passport Number</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label={formData.identity_type}
                variant="outlined"
                required
                name="id_number"
                value={formData.id_number}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Position"
                variant="outlined"
                required
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                mb: 2,
                width: '16em',
                height: '18em',
              }}
            >
              <Image
                src={imagePreview}
                alt="Uploaded"
                width={100}
                height={100}
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: '15em',
                  maxHeight: '16em',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{
                  marginTop: '16px',
                  fontFamily: 'Inter, sans-serif',
                  background: theme.primary_color,
                }}
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Create Employee'}
        </Button>
      </Box>
    </Box>
  )
}

export default Page
