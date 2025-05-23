'use client'

import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Modal,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import AddressAutocomplete from '@/component/utils/GoogleInputAddress'
import {
  useCreateResourcingData,
  // usePatchResourcingData,
} from '@/hooks/useResourcingApiService'
import { POST_ENDPOINTS } from '@/constants/resouringEndpoints'
import { toast } from 'react-toastify'

const UserProfile = ({ open, onClose, user, applicationId }) => {
  const { theme } = useContext(ThemeContext)
  const sheduleInterview = useCreateResourcingData(
    POST_ENDPOINTS.SCHEDULE_INTERVIEW(applicationId),
    'sheduleInterview',
  )
  const [isLoading, setIsLoading] = useState(false) // Add loading state

  const [interviewMode, setInterviewMode] = useState('')
  const [location, setLocation] = useState('')
  const [meetingLink, setMeetingLink] = useState('')
  const [scheduledDateTime, setScheduledDateTime] = useState('')

  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  useEffect(() => {
    // Reset fields on modal open
    if (open) {
      setInterviewMode('')
      setLocation('')
      setMeetingLink('')
    }
  }, [open])

  const handleModeChange = (e) => {
    setInterviewMode(e.target.value)
    setLocation('')
    setMeetingLink('')
  }

  const handleAddressUpdate = (parsedAddress) => {
    console.log(parsedAddress)
    setLocation(
      parsedAddress?.city +
        ' ' +
        parsedAddress?.state +
        ' ' +
        parsedAddress?.country,
    )
    setLong(parsedAddress?.longitude)
    setLat(parsedAddress?.latitude)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const basePayload = {
      scheduled_datetime: new Date(scheduledDateTime).toISOString(),
      interview_mode: interviewMode,
    }

    let payload = {}

    if (interviewMode === 'online') {
      payload = {
        ...basePayload,
        meeting_link: meetingLink,
      }
    } else if (interviewMode === 'in-person') {
      payload = {
        ...basePayload,
        location,
        latitude: lat,
        longitude: long,
      }
    }

    sheduleInterview.mutate(payload, {
      onSuccess: () => {
        toast.success('Scheduled successfully!')
        resetForm()
        setIsLoading(false)
      },
      onError: (error) => {
        toast.error(error?.response?.data?.detail)
        // toast.error(error?.response?.data?.detail || 'Something went wrong')
        setIsLoading(false)
      },
    })
  }

  const modalStyle = {
    position: 'absolute',
    right: '2px',
    transform: 'translate(0, 0)',
    width: '450px',
    height: '100%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="right"
          alignItems="center"
          sx={{ backgroundColor: theme.primary_color }}
        >
          <IconButton
            onClick={onClose}
            sx={{ color: 'white', fontSize: '1em' }}
          >
            Close <CloseIcon />
          </IconButton>
        </Box>

        {/* Profile Info */}
        <Box sx={{ p: '1em' }}>
          <Box display="flex" alignItems="center" gap="1em">
            <Avatar
              sx={{ width: '3.75em', height: '3.75em' }}
              src={user?.applicant_profile?.profile_picture}
            />
            <Box>
              <Typography sx={{ fontWeight: 400, fontSize: '1.125em' }}>
                {user?.applicant_profile?.first_name +
                  ' ' +
                  user?.applicant_profile?.last_name}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Contact Info */}
        <Box sx={{ overflowY: 'auto', flexGrow: 1, p: '1em' }}>
          <Box mt="1em">
            <Box display="flex" alignItems="center" gap="0.5em">
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                sx={{ mb: 3 }}
                value={user?.applicant_profile?.first_name || ''}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                sx={{ mb: 3 }}
                value={user?.applicant_profile?.last_name || ''}
                InputProps={{ readOnly: true }}
              />
            </Box>

            {/* Interview Mode Select */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Interview Mode</InputLabel>
              <Select
                value={interviewMode}
                label="Interview Mode"
                onChange={handleModeChange}
              >
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="in-person">In-Person</MenuItem>
              </Select>
            </FormControl>

            {/* Conditional Inputs */}
            {interviewMode === 'online' && (
              <TextField
                fullWidth
                label="Meeting Link"
                variant="outlined"
                sx={{ mb: 3 }}
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />
            )}

            {interviewMode === 'in-person' && (
              <Box sx={{ mb: 3 }}>
                <AddressAutocomplete
                  label="Interview Location"
                  value={location}
                  handleAddressUpdate={handleAddressUpdate}
                />
              </Box>
            )}

            <TextField
              fullWidth
              label="Meeting Date and Time"
              variant="outlined"
              sx={{ mb: 3 }}
              type="datetime-local"
              value={scheduledDateTime}
              onChange={(e) => setScheduledDateTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {/* <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: theme.primary_color,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.primary_color,
                  },
                }}
              >
                Schedule & Notify
              </Button> */}
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
                sx={{
                  backgroundColor: theme.primary_color,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.primary_color,
                  },
                }}
                startIcon={
                  isLoading && <CircularProgress size={20} color="inherit" />
                }
              >
                {isLoading ? 'Scheduling...' : 'Schedule & Notify'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default UserProfile
