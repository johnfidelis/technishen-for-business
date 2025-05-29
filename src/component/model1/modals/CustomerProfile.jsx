import React, { useContext, useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Avatar,
  IconButton,
  Divider,
  Select,
  MenuItem,
  Skeleton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ChatTab from './component/ChatTab'
import ViewMoreDetailsModal from './ViewMoreDetailsModal'
import { ThemeContext } from '@/context/ThemeContext'
import BookingsTab from './component/BookingsTab'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { useFetchData } from '@/hooks/useApiService'
import profileAddIcon from '../../../assets/images/profileAddIcon.svg'

const CustomerProfile = ({ open, onClose, user, type }) => {
  const [rightTabIndex, setRightTabIndex] = React.useState(0)
  const [viewMoreOpen, setViewMoreOpen] = useState(false)

  const endpoint =
    type === 'customer'
      ? GET_ENDPOINTS.CUSTOMER_TICKET_HISTORY(user)
      : GET_ENDPOINTS.EMPLOYEE_TICKET_HISTORY(user)

  // Fetch data using the selected endpoint
  const { data: tickets, isLoading } = useFetchData(endpoint)

  console.log('trt', { user })
  const { theme } = useContext(ThemeContext)

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

  const headerStyle = {
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    p: '1em',
  }

  const bodyStyle = {
    overflowY: 'auto',
    flexGrow: 1,
    pl: '1em',
    pr: '1em',
  }
  const tabStyle = {
    '& .MuiTabs-indicator': {
      backgroundColor: '#115093',
    },
    '& .MuiTab-root': {
      textTransform: 'none',
      fontWeight: 400,
      fontSize: '0.80em',
      color: '#000', // In-active tab text color
      '&.Mui-selected': {
        color: '#115093', // Active tab text color
      },
    },
  }

  const handleRightTabChange = (event, newIndex) => {
    setRightTabIndex(newIndex)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{ backgroundColor: theme.primary_color || '#115093' }}
        >
          <IconButton
            onClick={onClose}
            sx={{ color: 'white', fontSize: '1em' }}
          >
            {''}
          </IconButton>
          <IconButton
            onClick={onClose}
            sx={{ color: 'white', fontSize: '1em' }}
          >
            Close
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Header */}
        <Box sx={headerStyle}>
          <Box display="flex" alignItems="center" gap="1em">
            <Avatar
              sx={{
                width: '3.75em',
                height: '3.75em',
              }}
              // src={!tickets ?  "https://technishenbackend.onrender.com" + tickets?.employee_details?.photo : profileAddIcon } // Replace with actual avatar source
              src={
                !tickets
                  ? profileAddIcon
                  : type === 'employee'
                    ? 'https://technishenbackend.onrender.com' +
                      tickets?.employee_details?.photo
                    : 'https://technishenbackend.onrender.com' +
                      tickets?.customer_details?.photo
              }
            />
            <Box>
              <Typography
                // variant="h6"
                sx={{
                  fontWeight: 400,
                  color: '#000',
                  fontSize: '1.125em',
                  textTransform: 'capitalize',
                }}
              >
                {!tickets ? (
                  <Skeleton variant="text" width={120} height={20} />
                ) : type === 'employee' ? (
                  `${tickets?.employee_details?.first_name || ''} ${tickets?.employee_details?.last_name || ''}`
                ) : (
                  `${tickets?.customer_details?.first_name || ''} ${tickets?.customer_details?.last_name || ''}`
                )}
              </Typography>
              {/* <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25em',
                  color: '#4CAF50', // Green for successful tickets
                  fontSize: '0.80em',
                }}
              >
                ✓ 6 Successful Tickets{' '}
              </Typography> */}
              {/* <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb="1em"
              >
                <Box display="flex" alignItems="center" gap="0.25em">
                  {[...Array(5)].map((_, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{
                        fontSize: '1.25em',
                        color: 'goldenrod', // Yellow for stars
                      }}
                    >
                      ★
                    </Box>
                  ))}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      backgroundColor: theme.primary_color || '#115093', // Light blue background
                      borderRadius: '0.75em',
                      padding: '0.225rem 0.225em',
                      fontSize: '0.75em',
                      color: '#ffff', // Blue for rating
                    }}
                  >
                    5/5
                  </Typography>
                </Box>
              </Box> */}
            </Box>
          </Box>

          <Typography
            variant="subtitle2"
            // sx={{ fontWeight: 00, fontSize: '1em' }}
          >
            {/* Customer Details */}
            Caller Details
          </Typography>

          <Divider
            sx={{
              my: '0.3em',
              backgroundColor: theme.primary_color || '#115093',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              mt: '0.5em',
              fontSize: '0.80em',
              fontWeight: 400,
            }}
          >
            📍 Current Location:{' '}
            {!tickets ? (
              <Skeleton variant="text" width={80} height={10} />
            ) : type === 'employee' ? (
              `${tickets?.employee_details?.address}`
            ) : (
              `${tickets?.customer_details?.address}`
            )}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              fontSize: '0.80em',
              fontWeight: 400,
            }}
          >
            📞 Emergency Number:{' '}
            {!tickets ? (
              <Skeleton variant="text" width={80} height={10} />
            ) : type === 'employee' ? (
              `${tickets?.employee_details?.phone_number}`
            ) : (
              `${tickets?.customer_details?.phone_number}`
            )}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              fontSize: '0.80em',
              fontWeight: 400,
            }}
          >
            ✉️ Email:{' '}
            {!tickets ? (
              <Skeleton variant="text" width={80} height={10} />
            ) : type === 'employee' ? (
              `${tickets?.employee_details?.email}`
            ) : (
              `${tickets?.customer_details?.email}`
            )}
          </Typography>

          <Divider
            sx={{
              my: '1em',
              backgroundColor: theme.primary_color || '#115093',
            }}
          />

          <Tabs
            value={rightTabIndex}
            onChange={handleRightTabChange}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: theme.primary_color || '#115093', // Blue for active tab underline
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 400,
                color: '#000', // Black for text
                fontSize: '0.80em',
                '&.Mui-selected': {
                  color: theme.primary_color || '#115093', // Blue for active tab
                },
              },
            }}
          >
            <Tab label="Current Tickets" />
            <Tab label="History" />
            <Tab label="Chat to Vivica" />
          </Tabs>
        </Box>
        <Box sx={bodyStyle}>
          <Box mt="1em">
            {/* Current Tickets */}
            {rightTabIndex === 0 && (
              <BookingsTab customerId={user} ticketType={type} />
            )}
            {rightTabIndex === 1 && (
              <Box>
                {/* Sort and Search */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1em"
                >
                  <Box display="flex" flexDirection="column" gap="0.5em">
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 400, fontSize: '0.80em' }}
                    >
                      Sort By
                    </Typography>
                    <Select
                      fullWidth
                      value="Newest (Most Recent)"
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiSelect-select': {
                          fontSize: '0.80em',
                        },
                      }}
                    >
                      <MenuItem value="Newest (Most Recent)">
                        Newest (Most Recent)
                      </MenuItem>
                      <MenuItem value="Oldest">Oldest</MenuItem>
                    </Select>
                  </Box>
                  <Box display="flex" flexDirection="column" gap="0.5em">
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 400, fontSize: '0.80em' }}
                    >
                      Search
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Type something..."
                      variant="outlined"
                      size="small"
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.80em',
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Ticket Details */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">No tickets found.</Typography>
                </Box>
              </Box>
            )}
          </Box>
          {rightTabIndex === 2 && <ChatTab />}
        </Box>

        <ViewMoreDetailsModal
          open={viewMoreOpen}
          onClose={() => setViewMoreOpen(false)}
        />
      </Box>
    </Modal>
  )
}

export default CustomerProfile
