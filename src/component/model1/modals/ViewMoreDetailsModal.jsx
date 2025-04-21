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
  Grid,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { MdLocationOn, MdPhone, MdMail, MdRefresh } from 'react-icons/md'
import { ThemeContext } from '@/context/ThemeContext'

// ?dsds

const ViewMoreDetailsModal = ({ open, onClose, user }) => {
  const [rightTabIndex, setRightTabIndex] = React.useState(0)
  const [viewMoreOpen, setViewMoreOpen] = useState(false)

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
    p: '1em',
  }
  const tabStyle = {
    '& .MuiTabs-indicator': {
      backgroundColor: '#115093',
    },
    '& .MuiTab-root': {
      textTransform: 'none',
      fontWeight: 300,
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
            Back
            {/* <CloseIcon /> */}
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
                border: `solid ${theme.primary_color || '#115093'}`,
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNiAaKk2O5kUsjqJP01k24EW93PnSHjuJLTA&s"
            />
            <Box>
              <Typography
                // variant="h5"
                sx={{
                  fontWeight: 400,
                  color: '#000',
                  fontSize: '1.125em',
                }}
              >
                David Willie
              </Typography>
              <Typography
                sx={{
                  color: '#000',
                }}
              >
                FullStack Engineer
              </Typography>
              <Typography
                sx={{
                  color: '#000',
                }}
              >
                Tsogolo Technologies
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={bodyStyle}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 400, fontSize: '1em' }}
          >
            Customer Details
          </Typography>
          <Divider
            sx={{
              my: '0.3em',
              backgroundColor: theme.primary_color || '#115093',
            }}
          />

          <Box>
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5em',
                mt: '0.5em',
                fontSize: '0.80em',
                fontWeight: 300,
              }}
            >
              <MdLocationOn /> Ticket Address: 35 Aromat Street, Hillbrow,
              Joburg
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5em',
                fontSize: '0.80em',
                fontWeight: 300,
              }}
            >
              <MdPhone /> Phone Number: +27 74 637 7232
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5em',
                fontSize: '0.80em',
                fontWeight: 300,
              }}
            >
              <MdMail /> Email: vivica.samkelo@gmail.com
            </Typography>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 400, fontSize: '1em', mt: '1em' }}
          >
            Ticket Details
          </Typography>

          <Divider
            sx={{
              my: '0.3em',
              backgroundColor: theme.primary_color || '#115093',
            }}
          />

          <Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                {' '}
                {/* Take most of the space */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.80em',
                    fontWeight: 300,
                  }}
                >
                  IT Support
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.80em',
                    fontWeight: 300,
                  }}
                >
                  Fulfiller Name: David Willie
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.80em',
                    fontWeight: 300,
                  }}
                >
                  Ticket Number: TECH-10036LA
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.80em',
                    fontWeight: 300,
                  }}
                >
                  Booking Date: 25 May 2023
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.80em',
                    fontWeight: 300,
                  }}
                >
                  Booking Time: 15:30 PM
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.80em',
                    fontWeight: 300,
                  }}
                >
                  Status:
                  <Typography
                    variant="span"
                    sx={{
                      fontWeight: 300,
                      color: '#4CAF50',
                      border: 'solid 1px #4CAF50',
                      borderRadius: '0.25em',
                      padding: '0.125rem 0.375em',
                      fontSize: '0.75em',
                      textAlign: 'center',
                    }}
                  >
                    Working
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={3} style={{}}>
                <Avatar
                  sx={{
                    width: '4.75em',
                    height: '4.75em',
                    border: `solid ${theme.secondary_color || '#00D284'}`,
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNiAaKk2O5kUsjqJP01k24EW93PnSHjuJLTA&s"
                />
              </Grid>
            </Grid>
          </Box>

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
                backgroundColor: theme.primary_color || '#115093',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 300,
                color: '#000',
                fontSize: '0.8em',
                '&.Mui-selected': {
                  color: theme.primary_color || '#115093',
                },
              },
            }}
          >
            <Tab label="Ticket Description" />
            <Tab label="Resolution Notes" />
            <Tab label="Notes" />
            <Tab label="Paused Notes" />
          </Tabs>

          <Box sx={{ mt: 3 }}>
            {rightTabIndex === 0 && (
              <Box>
                {/* Ticket Description Content */}
                <Typography sx={{ mb: 2, fontSize: '0.8em', fontWeight: 300 }}>
                  I have a couple of hard drives that I need to be fixed. I have
                  attached some images about the items that need to be fixed.
                </Typography>

                <Typography sx={{ fontWeight: 400, mb: 1 }}>Images</Typography>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {[...Array(6)].map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        border: '1px solid #E0E0E0',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={`https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=${
                          index + 1
                        }`}
                        alt={`Attachment ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: '5px',
                          right: '5px',
                          backgroundColor: '#115093',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: '#FFF', fontSize: '0.75em' }}
                        >
                          🔍
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Ticket Tracker */}
                <Typography sx={{ fontWeight: 400, mb: 1 }}>
                  Ticket Tracker
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {[
                    { status: 'Ticket Booked', time: '25 May 2023 - 14:45 PM' },
                    {
                      status: 'Ticket Accepted',
                      time: '25 May 2023 - 15:30 PM',
                    },
                    { status: 'Start Trip', time: '25 May 2023 - 15:45 PM' },
                    {
                      status: 'Fulfiller Arrived',
                      time: '25 May 2023 - 16:00 PM',
                    },
                    {
                      status: 'Ticket has been started',
                      time: '25 May 2023 - 16:15 PM',
                    },
                    {
                      status: 'Ticket has been completed',
                      time: '25 May 2023 - 16:30 PM',
                      success: true,
                    },
                  ].map((event, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      gap={2}
                      sx={{
                        mb: 2,
                        '&::before': {
                          display: 'block',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: event.success
                            ? '#4CAF50'
                            : '#115093',
                        },
                      }}
                    >
                      {/* Tick Icon */}
                      <CheckCircleIcon
                        sx={{
                          color: event.success ? '#4CAF50' : '#115093',
                          fontSize: '1.5em',
                          // mr: "1em",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 300,
                          fontSize: '0.80em',
                          flexGrow: 1,
                        }}
                      >
                        {event.status}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#6C757D', fontSize: '0.75em' }}
                      >
                        {event.time}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {rightTabIndex === 1 && (
              <TextField
                fullWidth
                label="Resolution Notes"
                multiline
                rows={3}
                variant="outlined"
                InputLabelProps={{
                  style: {
                    fontSize: '0.80em',
                    fontFamily: 'Inter, sans-serif',
                  },
                }}
              />
            )}
            {rightTabIndex === 2 && (
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                variant="outlined"
                InputLabelProps={{
                  style: {
                    fontSize: '0.80em',
                    fontFamily: 'Inter, sans-serif',
                  },
                }}
              />
            )}
            {rightTabIndex === 3 && (
              <TextField
                fullWidth
                label="Paused Notes"
                multiline
                rows={3}
                variant="outlined"
                InputLabelProps={{
                  style: {
                    fontSize: '0.80em',
                    fontFamily: 'Inter, sans-serif',
                  },
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ViewMoreDetailsModal
