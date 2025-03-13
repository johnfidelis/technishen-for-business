'use client'

import React, { useEffect, useState, useContext } from 'react'
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
import { POST_ENDPOINTS } from '@/constants/endpoints'
import { buildEndpoint } from '@/lib/apiHelpers'
import PriorityCalculator from './PriorityCalculator'
import { Cookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { ThemeContext } from '@/context/ThemeContext'

const InternalTicketForm = () => {
  const { theme } = useContext(ThemeContext)
  const cookies = new Cookies()
  const businessId = cookies.get('selectedBusinessId')
  const createInternalTicket = useCreateData(
    POST_ENDPOINTS.CREATE_INTERNAL_TICKET,

    'createInternalTicket',
  )
  /*** State Declarations ***/
  // Left Column States
  const [callerType, setCallerType] = useState('employee')
  const [caller, setCaller] = useState('')
  const [callerQuery, setCallerQuery] = useState('')
  const [category, setCategory] = useState('')
  const [outsourced, setOutsourced] = useState(false)
  const [outsourcedData, setOutsourcedData] = useState([])
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

  const resetForm = () => {
    setCallerType('employee')
    setCaller('')
    setCallerQuery('')
    setCategory('')
    setOutsourced(false)
    setOutsourcedData([])
    setCategories([])
    setSubCategory('')
    setSubCategories([])
    setChannel('')
    setAddress('')
    setImpact('')
    setUrgency('')
    setPriority({ level: 'Low', color: '#000' })
    setAssignmentGroup('')
    setLoadingGroups(false)
    setAssignmentGroups([])
    setEmployees([])
    setLoadingEmployees(false)
    setAssignTo('')
    setScheduleDateAndTime('')
    setDescription('')
    setImages([])
  }

  // non displayed data
  const [long, setLong] = useState(0.0)
  const [lat, setLat] = useState(0.0)
  const [errors, setErrors] = useState({})

  /*** Validation ***/
  const validate = () => {
    let tempErrors = {}
    if (!caller) tempErrors.caller = 'Caller is required'
    if (!category) tempErrors.category = 'Category is required'
    if (!subCategory) tempErrors.subCategory = 'Sub-category is required'
    if (!channel) tempErrors.channel = 'Contact channel is required'
    if (!address) tempErrors.address = 'Address is required'
    if (!urgency) tempErrors.urgency = 'Urgency level is required'
    if (!impact) tempErrors.impact = 'Impact level is required'
    if (!description) tempErrors.description = 'Description is required'
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  /*** URL Building using buildEndpoint ***/
  const callerUrl = buildEndpoint('CALLER', {
    query: callerQuery,
    business_id: businessId,
    caller_type: callerType,
  })

  const categoriesUrl = buildEndpoint('TICKET_CATEGORY_TO_BOOK', {
    business_id: businessId,
    caller_type: callerType,
  })

  const assignmentGroupsUrl = buildEndpoint('FULFILLER_GROUP_TO_BOOK', {
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

  // Ticket Categories
  const { data: fetchedCategories, isLoading: fetchLoading } = useFetchData(
    categoriesUrl,
    ['fetchCategories', businessId, callerType],
    { enabled: !!businessId },
  )

  // Assignment Groups
  const { data: groups, isLoading } = useFetchData(
    assignmentGroupsUrl,
    ['fetchAssignmentGroups', businessId, callerType],
    { enabled: !!businessId },
  )

  /*** Side Effects ***/
  // Set categories and default subcategory when fetchedCategories change
  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories)
      if (fetchedCategories.length > 0) {
        setCategory(fetchedCategories[0].id)
        setSubCategories(fetchedCategories[0].sub_services || [])
        setSubCategory(fetchedCategories[0].sub_services?.[0]?.id || '')
      }
    }
  }, [fetchedCategories])

  // Set assignment groups and default assignment group when groups change
  useEffect(() => {
    if (groups) {
      setAssignmentGroups(groups)
      if (groups.length > 0) {
        setAssignmentGroup(groups[0].id)
        setEmployees(groups[0].employees)
      }
      setLoadingGroups(false)
    }
  }, [groups])

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

  // const handleAddressUpdate = (addressValue) => {
  //   setAddress(addressValue)
  // }

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

  const handleSubmit = () => {
    if (!validate()) return
    setSubmitLoading(true)
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

    // Submit the formData directly
    createInternalTicket.mutate(formData, {
      onSuccess: async () => {
        setSubmitLoading(false)
        toast.success('Successfully created ticket.')
        resetForm()
      },
      onError: () => {
        toast.error('Error creating ticket')
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
                error={!!errors.caller}
                helperText={errors.caller}
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
              error={!!errors.category}
              helperText={errors.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories?.map((cat) => (
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
            error={!!errors.subCategory}
            helperText={errors.subCategory}
            InputLabelProps={{
              style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
            }}
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            {subCategories.length > 0 ? (
              subCategories?.map((sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.sub_service_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No subcategories available</MenuItem>
            )}
          </TextField>

          {/* Contact Channel */}
          <TextField
            label="Contact Channel"
            select
            fullWidth
            variant="outlined"
            InputLabelProps={{
              style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
            }}
            value={channel}
            error={!!errors.channel}
            helperText={errors.channel}
            onChange={(e) => setChannel(e.target.value)}
            sx={{ display: outsourced !== true ? 'block' : 'none', mt: '1em' }}
          >
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Walk-In">Walk-In</MenuItem>
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
              error={!!errors.address}
              helperText={errors.address}
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
            error={!!errors.impact}
            helperText={errors.impact}
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
            error={!!errors.urgency}
            helperText={errors.urgency}
            onChange={(e) => setUrgency(e.target.value)}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>

          {/* Priority */}
          <PriorityCalculator impact={impact} urgency={urgency} />

          {/* Assignment Group */}
          <TextField
            label="Assignment group"
            select
            fullWidth
            variant="outlined"
            value={assignmentGroup}
            error={!!errors.assignmentGroup}
            helperText={errors.assignmentGroup}
            onChange={(e) => handleGroupChange(e.target.value)}
            InputLabelProps={{
              style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
            }}
            sx={{ display: outsourced !== true ? 'block' : 'none', mt: '1em' }}
          >
            {loadingGroups ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : assignmentGroups.length > 0 ? (
              assignmentGroups?.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.group_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No groups available</MenuItem>
            )}
          </TextField>

          {/* Assign To */}
          <Autocomplete
            freeSolo
            options={employees}
            getOptionLabel={(option) =>
              `${option.first_name} ${option.last_name}` || ''
            }
            loading={loadingEmployees}
            noOptionsText="No employee found"
            onInputChange={(event, value) => {
              if (value) {
                handleEmployeeSearch(value)
              }
            }}
            onChange={(event, newValue) => setAssignTo(newValue || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Assign to"
                fullWidth
                variant="outlined"
                sx={{
                  display: outsourced !== true ? 'block' : 'none',
                  mt: '1em',
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '0.80em',
                    fontFamily: 'Inter, sans-serif',
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingEmployees ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                      <InputAdornment position="end">
                        {assignTo === '' ? null : (
                          <VisibilityIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleOpenAssignToModal(assignTo)}
                          />
                        )}
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            )}
          />

          {/* Support Type */}
          <TextField
            label="Support Type"
            select
            fullWidth
            variant="outlined"
            sx={{ display: outsourced === true ? 'block' : 'none', mt: '1em' }}
            onChange={(e) => setChannel(e.target.value)}
          >
            <MenuItem value="Onsite Support">Onsite Support</MenuItem>
            <MenuItem value="Remote Support">Remote Support</MenuItem>
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
          error={!!errors.description}
          helperText={errors.description}
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
              padding: '0.625rem 1.25em',
              fontSize: '0.80em',
              fontFamily: 'Inter, sans-serif',
            }}
            disabled={submitLoading}
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
