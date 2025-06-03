'use client'
import React, { useState, useContext } from 'react'
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
  Grid,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { ThemeContext } from '@/context/ThemeContext'
import { MdLocationOn, MdPhone, MdMail } from 'react-icons/md'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'

const TicketDetails = ({ open, onClose, ticketData }) => {
  const [rightTabIndex, setRightTabIndex] = useState(0)
  const { theme } = useContext(ThemeContext)

  console.log({ ticketData })
  // const isLoading = !ticket || ticket.length === 0

  const { data: ticket, isLoading } = useFetchData(
    GET_ENDPOINTS.VIEW_TICKETS(
      ticketData?.ticket_details?.id || ticketData?.id,
    ),
  )
  const isNoTicketDetails = ticket?.employee_details !== null

  const handleRightTabChange = (event, newIndex) => {
    setRightTabIndex(newIndex)
  }

  const lifecycle = [
    { status: 'Ticket Booked' },
    { status: 'Ticket Accepted' },
    { status: 'Start Trip' },
    { status: 'Fulfiller Arrived' },
    { status: 'Ticket has been started' },
    { status: 'Ticket has been completed' },
  ]

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
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
        }}
      >
        {/* Modal Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: theme.primary_color }}
        >
          <IconButton
            onClick={onClose}
            sx={{ color: 'white', fontSize: '1em' }}
          >
            Back
          </IconButton>
          <IconButton
            onClick={onClose}
            sx={{ color: 'white', fontSize: '1em' }}
          >
            Close <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Body */}
        <Box sx={{ overflowY: 'auto', flexGrow: 1, p: '1em' }}>
          <Box display="flex" alignItems="center" gap="1em">
            <Avatar
              sx={{
                width: '3.75em',
                height: '3.75em',
                border: `solid ${theme.primary_color}`,
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNiAaKk2O5kUsjqJP01k24EW93PnSHjuJLTA&s"
            />
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 300, fontSize: '1.125em', color: '#000' }}
              >
                {ticket?.customer_details?.first_name}{' '}
                {ticket?.customer_details?.last_name}
              </Typography>
            </Box>
          </Box>
          <Box>
            {/* Customer Details */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 300, fontSize: '1em', mt: '1em' }}
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
                  mt: '0.2em',
                  fontSize: '0.80em',
                  fontWeight: 300,
                }}
              >
                <MdLocationOn /> Ticket Address:{' '}
                {ticket?.ticket_details?.address || '-'}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5em',
                  mt: '0.2em',
                  fontSize: '0.80em',
                  fontWeight: 300,
                }}
              >
                <MdPhone /> Phone Number:{' '}
                {ticket?.customer_details?.phone_number || '-'}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5em',
                  mt: '0.2em',
                  fontSize: '0.80em',
                  fontWeight: 300,
                }}
              >
                <MdMail /> Email: {ticket?.customer_details?.email}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 300, fontSize: '1em', mt: '1em' }}
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
            {!isNoTicketDetails ? (
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
                    Ticket Not assigned Yet
                  </Typography>
                </Grid>
              </Grid>
            ) : (
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
                    {ticket?.service_details?.sub_service_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.80em',
                      fontWeight: 300,
                    }}
                  >
                    Fulfiller Name: {ticket?.employee_details?.first_name}{' '}
                    {ticket?.employee_details?.last_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.80em',
                      fontWeight: 300,
                    }}
                  >
                    Ticket Number: {ticket?.ticket_details?.ticket_number}
                  </Typography>
                  {/* <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.80em',
                      fontWeight: 300,
                    }}
                  >
                    Booking Date: (PLEASE WILL THIS BE NEEDED)
                  </Typography> */}
                  {/* <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.80em',
                      fontWeight: 300,
                    }}
                  >
                    Booking Time: (PLEASE WILL THIS BE NEEDED)
                  </Typography> */}
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
            )}
          </Box>
          <Divider
            sx={{
              mt: '1em',
              backgroundColor: theme.primary_color || '#115093',
            }}
          />
          {/* Tabs */}

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

          {/* Tab Content */}
          <Box sx={{ mt: 3 }}>
            {rightTabIndex === 0 && (
              <Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {ticket?.ticket_details?.description}
                </Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: 300, mb: 1 }}>
                  Images
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {isLoading
                    ? ''
                    : ticket?.uploads?.map((image, index) => (
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
                            src={`https://technishenbackend.onrender.com${image?.url}`}
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

                {/* Ticket Tracker */}
                <Typography variant="subtitle1" sx={{ fontWeight: 300, mb: 1 }}>
                  Ticket Trackerd
                </Typography>
                {isLoading
                  ? ''
                  : lifecycle?.map((step, index) => {
                      // Check if the step is completed based on `actions`
                      const isCompleted = ticket?.actions.some(
                        (action) =>
                          action.action.toLowerCase() ===
                          step.status.toLowerCase().replace(/\s+/g, '_'),
                      )

                      // Determine if it's the current active step
                      const isActive =
                        ticket?.actions[
                          ticket.actions.length - 1
                        ]?.action.toLowerCase() ===
                        step.status.toLowerCase().replace(/\s+/g, '_')

                      return (
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          gap={2}
                          sx={{
                            mb: 2,
                            opacity: isCompleted || isActive ? 1 : 0.5, // Dim unfinished steps
                            pointerEvents: isActive ? 'auto' : 'none', // Highlight active step
                            '&::before': {
                              display: 'block',
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',

                              backgroundColor: isCompleted
                                ? '#4CAF50' // Green for completed steps
                                : isActive
                                  ? 'goldenrod' // Yellow for current step
                                  : '#E0E0E0', // Grey for remaining steps
                            },
                          }}
                        >
                          {/* Tick Icon */}
                          <CheckCircleIcon
                            sx={{
                              color: isCompleted
                                ? '#4CAF50' // Green for completed
                                : isActive
                                  ? 'goldenrod' // Yellow for current
                                  : '#E0E0E0', // Grey for remaining
                              fontSize: '1.5em',
                            }}
                          />
                          {/* Step Status */}
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: isActive ? 500 : 400, // Bold active step
                              fontSize: '0.80em',
                              flexGrow: 1,
                            }}
                          >
                            {step.status}
                          </Typography>
                          {/* Step Timestamp */}
                          <Typography
                            variant="caption"
                            sx={{ color: '#6C757D', fontSize: '0.75em' }}
                          >
                            {isCompleted
                              ? new Date(
                                  ticket?.actions.find(
                                    (action) =>
                                      action.action.toLowerCase() ===
                                      step.status
                                        .toLowerCase()
                                        .replace(/\s+/g, '_'),
                                  )?.timestamp,
                                ).toLocaleString('en-US', {
                                  dateStyle: 'short',
                                  timeStyle: 'short',
                                })
                              : 'Pending'}
                          </Typography>
                        </Box>
                      )
                    })}
              </Box>
            )}

            {rightTabIndex === 1 && (
              <TextField
                fullWidth
                label="Resolution Notes"
                multiline
                rows={3}
                variant="outlined"
              />
            )}
            {rightTabIndex === 2 && (
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                variant="outlined"
              />
            )}
            {rightTabIndex === 3 && (
              <TextField
                fullWidth
                label="Paused Notes"
                multiline
                rows={3}
                variant="outlined"
              />
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default TicketDetails
