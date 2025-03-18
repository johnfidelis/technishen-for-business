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
import countryList from '../../../../component/utils/countryList'
import AddressAutocomplete from '../../../../component/utils/GoogleInputAddress'
import { ThemeContext } from '@/context/ThemeContext'
import profileAddIcon from '../../../../assets/images/profileAddIcon.svg'
import Image from 'next/image'
import { useCreateData } from '@/hooks/useApiService'
import { POST_ENDPOINTS } from '@/constants/endpoints'
import { toast } from 'react-toastify'
import { MdInfoOutline } from 'react-icons/md'

const Page = () => {
  const { theme } = useContext(ThemeContext)

  const [reloadKey, setReloadKey] = useState(Date.now())
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
  const [long, setLong] = useState(null)
  const [lat, setLat] = useState(null)
  const [imagePreview, setImagePreview] = useState(profileAddIcon)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const createEmployee = useCreateData(
    POST_ENDPOINTS.CREATE_EMPLOYEE,
    'createEmployee',
  )

  const validateInputs = () => {
    let tempErrors = {}
    if (!formData.first_name) tempErrors.first_name = 'First Name is required'
    if (!formData.last_name) tempErrors.last_name = 'Last Name is required'
    if (!formData.email) tempErrors.email = 'Email is required'
    if (!formData.gender) tempErrors.gender = 'Gender is required'
    if (!formData.nationality)
      tempErrors.nationality = 'Nationality is required'
    if (!long) tempErrors.address = 'Input a valid address'
    if (!formData.phone_number)
      tempErrors.phone_number = 'Phone number is required'
    if (!formData.date_of_birth)
      tempErrors.date_of_birth = 'Date of birth is required'
    if (!formData.hire_date) tempErrors.hire_date = 'Hire date is required'
    if (!formData.id_number) tempErrors.id_number = 'ID Number is required'
    if (!formData.position) tempErrors.position = 'Position is required'
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prevData) => ({ ...prevData, profile_picture: file }))

      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleAddressUpdate = (parsedAddress) => {
    setFormData((prevData) => ({
      ...prevData,
      address:
        parsedAddress?.street +
        ' ' +
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
    if (!validateInputs()) return
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
        setReloadKey(Date.now())
        setFormData({
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
        setImagePreview(profileAddIcon)
        setLong(null)
        toast.success('Employee created successfully')
      },
      onError: () => {
        setLoading(false)
        toast.error('Error Creating Employee')
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
            color: '#333',
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
                error={!!errors.first_name}
                helperText={errors.first_name}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                required
                name="last_name"
                value={formData.last_name}
                error={!!errors.last_name}
                helperText={errors.last_name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                {/* <InputLabel>Gender</InputLabel> */}
                <TextField
                  name="gender"
                  label="Gender"
                  value={formData.gender}
                  select
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    style: {
                      fontSize: '0.80em',
                      fontFamily: 'Inter, sans-serif',
                    },
                  }}
                  onChange={handleInputChange}
                  error={!!errors.gender}
                  helperText={errors.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
              </FormControl>

              {/* <FormControl fullWidth> */}
              {/* <PhoneInput
                international
                defaultCountry="ZA"
                value={formData.phone_number || ''}
                error={!!errors.phone_number}
                helperText={errors.phone_number}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, phone_number: value }))
                }
                inputProps={{
                  required: true,
                  className:
                    'bg-opacity-50 text-gray-950 mt-2 block border rounded-md border-gray-700 h-[48px] w-[450px] pl-[45px] pr-[12px] justify-between shadow-sm focus:border-gray-300 focus:ring focus:ring-gray-200',
                }}
                style={{
                  width: '100%',
                  padding: '16.5px 14px',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  borderRadius: '4px',
                  fontSize: '16px',
                }}
              /> */}
              {/* </FormControl> */}

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

              <Box sx={{ mt: 2 }}>
                <AddressAutocomplete
                  label="Address"
                  key={reloadKey}
                  fullWidth
                  value={formData.address}
                  error={!!errors.address}
                  helperText={errors.address}
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
                error={!!errors.email}
                helperText={errors.email}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                variant="outlined"
                required
                name="date_of_birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.date_of_birth}
                error={!!errors.date_of_birth}
                helperText={errors.date_of_birth}
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
                error={!!errors.hire_date}
                helperText={errors.hire_date}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                {/* <InputLabel>Nationality</InputLabel> */}
                <TextField
                  label="Nationality"
                  name="nationality"
                  select
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    style: {
                      fontSize: '0.80em',
                      fontFamily: 'Inter, sans-serif',
                    },
                  }}
                  value={formData.nationality}
                  error={!!errors.nationality}
                  helperText={errors.nationality}
                  onChange={handleInputChange}
                >
                  {countryList.map((country) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                {/* <InputLabel>Identity Type</InputLabel> */}
                <TextField
                  label="Identity Type"
                  name="identity_type"
                  select
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    style: {
                      fontSize: '0.80em',
                      fontFamily: 'Inter, sans-serif',
                    },
                  }}
                  value={formData.identity_type}
                  error={!!errors.identity_type}
                  helperText={errors.identity_type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Passport">Passport</MenuItem>
                  <MenuItem value="National ID Card">National ID Card</MenuItem>
                  <MenuItem value="Driver's License">Driver's License</MenuItem>
                </TextField>
              </FormControl>

              <TextField
                fullWidth
                label={formData.identity_type}
                variant="outlined"
                required
                name="id_number"
                value={formData.id_number}
                error={!!errors.id_number}
                helperText={errors.id_number}
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
                error={!!errors.position}
                helperText={errors.position}
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
            <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <MdInfoOutline
                style={{
                  fontSize: '2em',
                  color: theme.primary_color || '#115093',
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
                  color: theme.primary_color || '#115093',
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

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ backgroundColor: theme.primary_color }}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Employee'}
        </Button>
      </Box>
    </Box>
  )
}

export default Page
