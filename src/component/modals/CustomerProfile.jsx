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
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ChatTab from './component/ChatTab'
import ViewMoreDetailsModal from './ViewMoreDetailsModal'
import { ThemeContext } from '@/context/ThemeContext'
import BookingsTab from './component/BookingsTab'

const CustomerProfile = ({ open, onClose, user, type }) => {
  const [rightTabIndex, setRightTabIndex] = React.useState(0)
  const [viewMoreOpen, setViewMoreOpen] = useState(false)

  console.log({ user })
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNiAaKk2O5kUsjqJP01k24EW93PnSHjuJLTA&s" // Replace with actual avatar source
            />
            <Box>
              <Typography
                // variant="h6"
                sx={{
                  fontWeight: 400,
                  color: '#000',
                  fontSize: '1.125em',
                }}
              >
                Vivica Samkelo
              </Typography>
              <Typography
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
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25em',
                    color: '#F44336', // Red for cancelled tickets
                    fontSize: '0.80em',
                  }}
                >
                  {' '}
                  ❗ 1 Cancelled Ticket
                </span>
              </Typography>
              <Box
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
                        color: '#FFC107', // Yellow for stars
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
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={bodyStyle}>
          <Typography
            variant="subtitle2"
            // sx={{ fontWeight: 00, fontSize: '1em' }}
          >
            Customer Details
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
            📍 Current Location: 35 Aromat Street, Hillbrow, Joburg
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
            📞 Emergency Number: +27 74 637 7232
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
            ✉️ Email: vivica.samkelo@gmail.com
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
                <Box
                  sx={{
                    border: '0.063rem solid #E0E0E0',
                    borderRadius: '0.625em',
                    p: '1em',
                    mb: '1em',
                    boxShadow: `0px 4px 0px  ${theme.primary_color || '#115093'}`,
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        textTransform: 'capitalize',
                      }}
                    >
                      IT Support
                    </Typography>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,

                          fontSize: '0.75em',
                        }}
                      >
                        22 May 2023, 09:25 AM
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 400,
                          color: 'red',
                          border: 'solid 1px red',
                          borderRadius: '0.25em',
                          padding: '0.125rem 0.375em',
                          fontSize: '0.75em',
                          textAlign: 'center',
                        }}
                      >
                        Closed
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      Fulfiller Name:{' '}
                      <Typography
                        component="body2"
                        sx={{
                          color: theme.primary_color || '#115093',

                          cursor: 'pointer',
                        }}
                      >
                        David Willie
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 300, fontSize: '0.80em' }}
                    >
                      Ticket Number: TECH-10036LA
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      my: '1em',
                      backgroundColor: theme.primary_color || '#115093',
                    }}
                  />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 400, fontSize: '0.80em' }}
                    >
                      Date
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 400,

                        fontSize: '0.75em',
                      }}
                    >
                      22 May 2023
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 400, fontSize: '0.80em' }}
                    >
                      Time
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 400,

                        fontSize: '0.75em',
                      }}
                    >
                      09:25 AM
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 400, fontSize: '0.80em' }}
                    >
                      Ticket Duration
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 400,

                        fontSize: '0.75em',
                      }}
                    >
                      2hrs 45mins
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      my: '1em',
                      backgroundColor: theme.primary_color || '#115093',
                    }}
                  />
                  {/* Assign Section */}
                  <Box display="flex" alignItems="center" gap="0.5em">
                    <TextField
                      placeholder="Search Fulfiller Name..."
                      fullWidth
                      label="Assign to"
                      size="small"
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '0.80em',
                        },
                        width: '70%',
                      }}
                    />

                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: theme.primary_color || '#115093',
                        color: '#FFF',
                        textTransform: 'none',
                        fontSize: '0.80em',
                        fontWeight: 400,
                        padding: '0.375rem 0.75em',
                        width: '30%',
                      }}
                    >
                      Update Ticket
                    </Button>
                  </Box>
                  <Box sx={{ textAlign: 'center', mt: '1em' }}>
                    <Typography
                      variant="caption"
                      sx={{
                        // fontSize: '0.7rem',
                        fontWeight: 400,
                        cursor: 'pointer',
                        marginTop: '5px',

                        gap: '5px',
                        color: theme?.primary_color,
                      }}
                      onClick={() => setViewMoreOpen(true)}
                    >
                      View More Details ➔
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {rightTabIndex === 2 && <ChatTab />}
          </Box>
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
