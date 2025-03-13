'use client'

import React, { useContext, useState } from 'react'
import {
  Grid,
  TextField,
  MenuItem,
  Box,
  Typography,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddressAutocomplete from './utils/GoogleInputAddress'
import { useFetchData, useCreateData } from '@/hooks/useApiService'
import { GET_ENDPOINTS, POST_ENDPOINTS } from '@/constants/endpoints'
import { buildEndpoint } from '@/lib/apiHelpers'
import PriorityCalculator from './PriorityCalculator'
import { toast } from 'react-toastify'
import { ThemeContext } from '@/context/ThemeContext'

const InternalTicketForm = () => {
  const { theme } = useContext(ThemeContext)
  /*** Constants & Initial Setup ***/
  // Replace with your actual business id source
  const businessId = '155f5f2b-b0e7-4364-a91c-80b0f75128db'
  const createExternalTicket = useCreateData(
    POST_ENDPOINTS.CREATE_EXTERNAL_TICKET,
    'createExternalTicket',
  )
  /*** State Declarations ***/
  // Left Column States
  const [callerType, setCallerType] = useState('employee')
  const [caller, setCaller] = useState('')
  const [callerQuery, setCallerQuery] = useState('')
  const [category, setCategory] = useState('')

  const [categories, setCategories] = useState([])
  const [subCategory, setSubCategory] = useState('')
  const [subCategories, setSubCategories] = useState([])
  const [channel, setChannel] = useState('')
  const [address, setAddress] = useState('')

  // Right Column & Global States
  const [impact, setImpact] = useState('')
  const [urgency, setUrgency] = useState('')
  const [priority, setPriority] = useState({ level: 'Low', color: '#000' })
  const [assignmentGroup, setAssignmentGroup] = useState('')
  const [loadingGroups, setLoadingGroups] = useState(false)
  const [assignmentGroups, setAssignmentGroups] = useState([])
  const [employees, setEmployees] = useState([])
  const [loadingEmployees, setLoadingEmployees] = useState(false)
  const [assignTo, setAssignTo] = useState('')
  const [scheduleDateAndTime, setScheduleDateAndTime] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)

  // non displayed data
  const [long, setLong] = useState(0.0)
  const [lat, setLat] = useState(0.0)

  const { data: services, isLoading: servicesLoading } = useFetchData(
    GET_ENDPOINTS.TECHNISHEN_BOOKABLE_SERVICES,
    'technishenBookableServices',
  )

  /*** URL Building using buildEndpoint ***/
  const callerUrl = buildEndpoint('CALLER', {
    query: callerQuery,
    business_id: businessId,
    caller_type: callerType,
  })

  /*** Data Fetching with Custom Hooks ***/
  // Caller Data
  const { data: callerData, isLoading: callerLoading } = useFetchData(
    callerUrl,
    ['fetchCaller', callerQuery, businessId, callerType],
    { enabled: !!callerType && callerQuery.trim().length > 0 },
  )

  const callerOptions = callerData || []

  /*** Handlers ***/
  const handleInputChange = (event, value) => {
    setCallerQuery(value)
  }

  const handleOpenCallerModal = (callerId) => {
    // Open modal with caller details
  }

  const handleCategoryChange = (value) => {
    setCategory(value)
    // Optionally update subCategories based on the selected category
  }

  const handleAddressUpdate = (parsedAddress) => {
    console.log(parsedAddress)
    setAddress(
      parsedAddress?.city +
        ' ' +
        parsedAddress?.state +
        ' ' +
        parsedAddress?.country,
    )
    setLong(parsedAddress?.longitude)
    setLat(parsedAddress?.latitude)
  }

  const clearAddressRef = () => {
    // Optionally clear the address input
  }

  const handleGroupChange = (value) => {
    setAssignmentGroup(value)
  }

  const handleEmployeeSearch = (value) => {
    // Implement your employee search logic here
  }

  const handleOpenAssignToModal = (assignId) => {
    // Open modal with assign-to details
  }

  const handleImageUpload = (e) => {
    const files = e.target.files
    const fileArray = Array.from(files)?.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }))
    setImages((prev) => [...prev, ...fileArray])
  }

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const validateForm = () => {
    if (!caller) {
      toast.error('Caller is required.')
      return false
    }
    if (!category) {
      toast.error('Category is required.')
      return false
    }
    if (!subCategory) {
      toast.error('Sub-Category is required.')
      return false
    }
    if (!address) {
      toast.error('Address is required.')
      return false
    }
    if (!impact) {
      toast.error('Impact is required.')
      return false
    }
    if (!urgency) {
      toast.error('Urgency is required.')
      return false
    }
    if (!scheduleDateAndTime) {
      toast.error('Schedule Date and Time is required.')
      return false
    }
    if (!description) {
      toast.error('Description is required.')
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const found = callerOptions.find((option) => option.id === caller)
    const formData = new FormData()

    formData.append('business', businessId)
    formData.append('description', description)
    formData.append('service', category)
    formData.append('sub_service', subCategory)
    formData.append('address', address)
    formData.append('longitude', long)
    formData.append('latitude', lat)
    formData.append('urgency', urgency)
    formData.append('priority_level', priority.level)
    formData.append('impact', impact)
    formData.append('caller_type', callerType)
    formData.append('caller', caller)
    if (found) {
      const { first_name, last_name } = found
      formData.append('caller_name', `${first_name} ${last_name}`)
    }
    formData.append('caller_channel', channel)
    formData.append('scheduled_datetime', scheduleDateAndTime)

    if (assignmentGroup !== '') {
      formData.append('fulfiller_group', assignmentGroup)
    }
    if (assignTo !== '') {
      formData.append('assigned_to', assignTo.id)
    }

    images.forEach((image) => {
      formData.append('images', image.file)
    })
    setSubmitLoading(true)
    // Submit the formData directly
    createExternalTicket.mutate(formData, {
      onSuccess: async () => {
        setSubmitLoading(false)
        toast.success('Ticket created successfully.')
        setDescription('')
        setCategory('')
        setSubCategory('')
        setAddress('')
        setLong('')
        setLat('')
        setUrgency('')
        setPriority({ level: '' })
        setImpact('')
        setCallerType('')
        setCaller('')
      },
      onError: () => {
        toast.error("Couldn't create ticket. Please try again.")
        setSubmitLoading(false)
      },
    })
  }

  /*** Render ***/
  return (
    <Grid container spacing={2}>
      {/* Left Column */}
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Caller Type */}
          <TextField
            label="Caller Type"
            select
            fullWidth
            variant="outlined"
            InputLabelProps={{
              style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
            }}
            value={callerType}
            onChange={(e) => {
              setCallerType(e.target.value)
              setCallerQuery('') // Clear previous query when callerType changes
            }}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </TextField>

          {/* Caller Autocomplete */}
          <Autocomplete
            freeSolo
            options={callerOptions}
            getOptionLabel={(option) =>
              option.first_name + ' ' + option.last_name || ''
            }
            loading={callerLoading}
            noOptionsText="No caller found"
            onInputChange={handleInputChange}
            onChange={(event, newValue) => setCaller(newValue?.id || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Caller"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: {
                    fontSize: '0.80em',
                    fontFamily: 'Inter, sans-serif',
                  },
                }}
                sx={{ mt: '1em' }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {callerLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                      <InputAdornment position="end">
                        {caller === '' ? null : (
                          <VisibilityIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleOpenCallerModal(caller)}
                          />
                        )}
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            )}
          />

          {/* Category */}
          <Box sx={{ mt: '1em' }}>
            <TextField
              label="Category"
              select
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
              }}
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {services?.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.service_name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Sub-Category */}
          <TextField
            label="Sub-Category"
            select
            fullWidth
            variant="outlined"
            sx={{ mt: '0.7em' }}
            InputLabelProps={{
              style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
            }}
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            {services
              ?.find((cat) => cat.id === category)
              ?.associated_sub_services?.map((sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.sub_service_name} - ${parseFloat(sub.cost).toFixed}
                </MenuItem>
              ))}
          </TextField>

          {/* Address */}
          <Box sx={{ mt: '1em' }}>
            <AddressAutocomplete
              label="Address"
              fullWidth
              componentRestrictions={{ country: 'za' }}
              InputLabelProps={{
                style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
              }}
              variant="outlined"
              value={address}
              handleAddressUpdate={handleAddressUpdate}
              clearInput={clearAddressRef}
            />
          </Box>
        </Box>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Impact */}
          <TextField
            label="Impact"
            select
            fullWidth
            variant="outlined"
            InputLabelProps={{
              style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
            }}
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>

          {/* Urgency */}
          <TextField
            label="Urgency"
            select
            fullWidth
            variant="outlined"
            InputLabelProps={{
              style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
            }}
            sx={{ mt: '1em' }}
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>

          {/* Priority */}
          <PriorityCalculator impact={impact} urgency={urgency} />

          {/* Support Type */}
          <TextField
            label="Support Type"
            select
            fullWidth
            variant="outlined"
            sx={{ mt: '1em' }}
            // onChange={(e) => setChannel(e.target.value)}
          >
            <MenuItem value="Onsite">Onsite Support</MenuItem>
            <MenuItem value="Remote">Remote Support</MenuItem>
          </TextField>

          {/* Ticket Date and Time */}
          <TextField
            label="Ticket Date and Time"
            fullWidth
            variant="outlined"
            sx={{ mt: '1em' }}
            type="datetime-local"
            InputLabelProps={{
              style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
              shrink: true,
            }}
            value={scheduleDateAndTime || ' '}
            onChange={(e) => setScheduleDateAndTime(e.target.value)}
          />
        </Box>
      </Grid>
      {/* Full-width Items */}
      <Grid item xs={12}>
        <TextField
          label="Description of Ticket"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>

      {/* Upload Images Section */}
      <Grid item xs={12}>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          Upload Images
        </Typography>
        <Button variant="outlined" component="label" sx={{ mb: 2 }}>
          Choose Files
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </Button>
        <Grid container spacing={2}>
          {images?.map((image) => (
            <Grid item key={image.id} xs={12} sm={3} md={2}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={image.id}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }}
                  onClick={() => removeImage(image.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.primary_color,
              color: '#FFFFFF',
              fontWeight: 400,
              py: '0.625rem',
              px: '1.25em',
              fontSize: '0.80em',
              fontFamily: 'Inter, sans-serif',
            }}
            // disabled={submitLoading}
            onClick={handleSubmit}
          >
            {submitLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'CREATE TICKET'
            )}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default InternalTicketForm
