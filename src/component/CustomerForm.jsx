import React, { useState, useContext } from 'react'
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'

import PhoneInput from 'react-phone-number-input'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AddressAutocomplete from './utils/GoogleInputAddress'
import countryList from './utils/countryList'
import { MdInfoOutline } from 'react-icons/md'
import profileAddIcon from '../assets/images/profileAddIcon.svg'
import { ThemeContext } from '@/context/ThemeContext'
import Image from 'next/image'
import { useCreateData } from '@/hooks/useApiService'
import { POST_ENDPOINTS } from '@/constants/endpoints'
import { toast } from 'react-toastify'

const CustomerForm = () => {
  const { theme } = useContext(ThemeContext)
  const createCustomer = useCreateData(
    POST_ENDPOINTS.CREATE_CUSTOMER,
    'createCustomer',
  )
  // const [customer_type, setCustomerType] = useState('Personal')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    customer_type: 'Personal',
    date_of_birth: '',
    address: '',
    gender: '',
    nationality: '',
    phone_number: '',
    identity_type: '',
    id_number: '',
    email: '',
    businessName: '',
  
    officeNumber: '',
    industry: '',
    companyRegNumber: '',
    staffSize: '',
    vatNumber: '',
    website: '',
    supportEmail: '',
    password: '00000000',
    profile_picture: null,
  })
  const [imagePreview, setImagePreview] = useState(profileAddIcon)

  const handleCustomerTypeChange = (event) => {
    const { value } = event.target
    setFormData((prevData) => ({ ...prevData, ['customer_type']: value }))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData({ ...formData, ['profile_picture']: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCountryChange = (e) => {
    const selectedCountry = countryList.find((c) => c.name === e.target.value)
    setFormData((prevData) => ({
      ...prevData,
      nationality: selectedCountry.name,
      countryCode: selectedCountry.code,
    }))
  }

  const handleAddressUpdate = (parsedAddress) => {
    console.log({ parsedAddress })
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

  const handleBusinessAddressUpdate = (parsedAddress) => {
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

  const validateInputs = () => {
    const requiredFields = formData.customer_type === 'Personal'
      ? ['first_name', 'last_name', 'date_of_birth', 'address', 'gender', 'nationality', 'phone_number', 'identity_type', 'id_number', 'email']
      : ['first_name', 'last_name', 'businessName', 'address', 'gender', 'nationality', 'phone_number', 'identity_type', 'id_number', 'email', 'industry', 'companyRegNumber', 'staffSize', 'vatNumber', 'website', 'supportEmail']

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field.replace('_', ' ')} field`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
        })
        return false
      }
    }
    return true
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validateInputs()) return
    setLoading(true)
    const formDataObject = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        formDataObject.append(key, value)
      }
    })
    createCustomer.mutate(formDataObject, {
      onSuccess: async () => {
        toast.success('Customer created successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
        })
        setFormData({
          first_name: '',
          last_name: '',
          customer_type: 'Personal',
          date_of_birth: '',
          address: '',
          gender: '',
          nationality: '',
          phone_number: '',
          identity_type: '',
          id_number: '',
          email: '',
          businessName: '',
     
          officeNumber: '',
          industry: '',
          companyRegNumber: '',
          staffSize: '',
          vatNumber: '',
          website: '',
          supportEmail: '',
          password: '00000000',
          profile_picture: null,
        })
        setLoading(false)
      },
      onError: () => {
        toast.error('An error occurred while creating customer', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
        })
        setLoading(false)
      },
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Customer Type *</InputLabel>
                <Select
                  value={formData?.customer_type}
                  onChange={handleCustomerTypeChange}
                >
                  <MenuItem value="Personal">Personal Customer</MenuItem>
                  <MenuItem value="Business">Business Customer</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Personal Customer Fields */}
            {formData?.customer_type === 'Personal' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name *"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth (MM-DD-YYYY)"
                    name="date_of_birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name *"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <AddressAutocomplete
                    label="Address"
                    fullWidth
                    InputLabelProps={{
                      style: {
                        fontSize: '0.80em',
                        fontFamily: 'Inter, sans-serif',
                      },
                    }}
                    variant="outlined"
                    value={formData.address}
                    style={{ mb: '200px' }}
                    handleAddressUpdate={handleAddressUpdate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Gender"
                    name="gender"
                    select
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="nationality"
                    label="Nationality"
                    select
                    fullWidth
                    value={formData.nationality}
                    onChange={handleCountryChange}
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
                  <FormControl fullWidth>
                    <PhoneInput
                      international
                      defaultCountry="ZA"
                      value={formData.phone_number || ''}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone_number: value,
                        }))
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
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Identity Type"
                    name="identity_type"
                    select
                    value={formData.identity_type}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="ID Number">ID Number</MenuItem>
                    <MenuItem value="Passport Number">Passport Number</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email *"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={formData.identity_type || 'ID Number'}
                    name="id_number"
                    value={formData.id_number}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}

            {/* Business Customer Fields */}
            {formData?.customer_type === 'Business' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name *"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name *"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <AddressAutocomplete
                    label="Business Address"
                    fullWidth
                    name="address"
                    InputLabelProps={{
                      style: {
                        fontSize: '0.80em',
                        fontFamily: 'Inter, sans-serif',
                      },
                    }}
                    variant="outlined"
                    value={formData.address}
                    style={{ mb: '200px' }}
                    handleAddressUpdate={handleBusinessAddressUpdate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Gender"
                    name="gender"
                    select
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <PhoneInput
                      international
                      defaultCountry="ZA"
                      value={formData.phone_number || ''}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone_number: value,
                        }))
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email *"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <PhoneInput
                      international
                      defaultCountry="ZA"
                      value={formData.phone_number || ''}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone_number: value,
                        }))
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Registration Number"
                    name="companyRegNumber"
                    value={formData.companyRegNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth (MM-DD-YYYY)"
                    name="date_of_birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Identity Type"
                    name="identity_type"
                    select
                    value={formData.identity_type}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="ID Number">ID Number</MenuItem>
                    <MenuItem value="Passport Number">Passport Number</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="nationality"
                    label="Nationality"
                    select
                    fullWidth
                    value={formData.nationality}
                    onChange={handleCountryChange}
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
                    label={formData.identity_type || 'ID Number'}
                    name="id_number"
                    value={formData.id_number}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Staff Size"
                    name="staffSize"
                    value={formData.staffSize}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="VAT Number"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Support Email"
                    name="supportEmail"
                    value={formData.supportEmail}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                // border: "2px solid #1976d2",
                borderRadius: '8px',
                mb: 2,
                width: '16em',
                height: '18em',
              }}
            >
              {imagePreview ? (
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
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#9e9e9e',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    No Image
                  </Typography>
                </Box>
              )}
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

            <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <MdInfoOutline
                style={{
                  fontSize: '2em',
                  color: theme.primary_color,
                  marginRight: '8px',
                }}
              />
              <span
                style={{
                  fontSize: '0.8em',
                }}
              >
                Please note that the user will be sent a <br /> verification
                code via Email.
              </span>
            </Typography>
            <Typography style={{ display: 'flex', alignItems: 'center' }}>
              <MdInfoOutline
                style={{
                  fontSize: '2em',
                  color: theme.primary_color,
                  marginRight: '8px',
                }}
              />
              <span
                style={{
                  fontSize: '0.8em',
                }}
              >
                The code can be used within the <br /> Technishen Mobile
                Application to activate and <br /> link user's account to the
                Business.
              </span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ backgroundColor: theme.primary_color }}
          disabled={loading}
        >
        
           {loading ? <CircularProgress size={24} /> : '   Create Customer'}
        </Button>
      </Box>
    </Box>
  )
}

export default CustomerForm
