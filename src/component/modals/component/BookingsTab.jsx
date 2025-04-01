'use client'

import { useState, useContext, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  Avatar,
  Divider,
  CircularProgress,
  Autocomplete,
} from '@mui/material'
import { ThemeContext } from '@/context/ThemeContext'
import TicketDetails from '../TicketDetails'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { formatDateTime } from '@/component/utils/formatDateTime'
// import EmployeeProfile from '../EmployeeProfile'
import EmployeeCustomerProfile from '../EmployeeCustomerProfile'

const BookingsTab = ({ customerId, ticketType }) => {
  const { theme } = useContext(ThemeContext)
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState(null)

  const handleOpenClick = (selectedUser) => {
    setSelectedMarker(selectedUser)

    setEmployeeModalOpen(true)
  }

  const endpoint =
    ticketType === 'External' || ticketType === 'customer'
      ? GET_ENDPOINTS.CUSTOMER_TICKET_HISTORY(customerId)
      : GET_ENDPOINTS.EMPLOYEE_TICKET_HISTORY(customerId)

  // Fetch data using the selected endpoint
  const { data: history, isLoading } = useFetchData(endpoint)

  const [viewMoreOpen, setViewMoreOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [assignmentGroup, setAssignmentGroup] = useState('')
  const [assignTo, setAssignTo] = useState(null)
  const [assignmentGroups, setAssignmentGroups] = useState([])
  const [employees, setEmployees] = useState([])
  const [loadingGroups, setLoadingGroups] = useState(false)
  const [loadingEmployees, setLoadingEmployees] = useState(false)

  const handleClose = () => {
    setViewMoreOpen(false)
  }

  const handleViewMore = (ticket) => {
    setSelectedTicket(ticket)
    console.log('sasasa', { ticket })
    setViewMoreOpen(true)
  }

  const handleGroupChange = (value) => {
    setAssignmentGroup(value)
  }

  const handleEmployeeSearch = (value) => {
    console.log(`Searching for employee: ${value}`)
  }

  return (
    <Box>
      {/* Ticket Details */}
      {isLoading ? (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={24} />
        </Box>
      ) : history?.tickets?.length > 0 ? (
        history.tickets.map((ticket) => (
          <Box
            sx={{
              border: '0.063rem solid #E0E0E0',
              borderRadius: '0.625em',
              p: '1em',
              mb: '1em',
              boxShadow: `0px 4px 0px ${theme.primary_color}`,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 300,
                  fontSize: '0.80em',
                  textTransform: 'capitalize',
                }}
              >
                {ticket?.sub_service || ' '}
              </Typography>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 300, fontSize: '0.75em' }}
                >
                  {formatDateTime(ticket?.created_at) || ''}
                </Typography>
                <Typography
                  variant="body2"
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
              </Box>
            </Box>

            {/* Client Details */}
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, fontSize: '0.80em' }}
                onClick={() => handleOpenClick(ticket?.assigned_to)}
              >
                Fulfiller Name:{' '}
                <span
                  style={{
                    color: theme.primary_color || '#115093',
                    cursor: 'pointer',
                  }}
                >
                  {' '}
                  {ticket?.assigned_to?.name || 'N/A'}
                </span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, fontSize: '0.80em' }}
              >
                Ticket Number: {ticket?.ticket_number || ''}
              </Typography>
            </Box>

            <Divider
              sx={{
                my: '1em',
                backgroundColor: theme.primary_color || '#115093',
              }}
            />

            {/* Date and Time */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, fontSize: '0.80em' }}
              >
                Date
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, fontSize: '0.75em' }}
              >
                {new Date(ticket?.created_at).toLocaleDateString()}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, fontSize: '0.80em' }}
              >
                Time
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, fontSize: '0.75em' }}
              >
                {new Date(ticket?.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, fontSize: '0.80em' }}
              >
                Ticket Duration
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, fontSize: '0.75em' }}
              >
                {/* {new Date(ticket?.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })} */}
                2hours
              </Typography>
            </Box>

            <Divider
              sx={{
                my: '1em',
                backgroundColor: theme.primary_color || '#115093',
              }}
            />

            {/* Assignment Section */}
            <TextField
              label="Assignment group"
              disabled={history?.employee_details !== null}
              select
              fullWidth
              variant="outlined"
              value={assignmentGroup}
              onChange={(e) => handleGroupChange(e.target.value)}
              InputLabelProps={{
                style: { fontSize: '0.80em', fontFamily: 'Inter, sans-serif' },
              }}
            >
              {loadingGroups ? (
                <MenuItem disabled>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : assignmentGroups?.length > 0 ? (
                assignmentGroups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.group_name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No groups available</MenuItem>
              )}
            </TextField>

            {/* Employee Assignment */}
            <Box
              display="flex"
              alignItems="center"
              gap="0.5em"
              sx={{ marginTop: '1em' }}
            >
              <Autocomplete
                disabled={history?.employee_details !== null}
                options={employees}
                getOptionLabel={(option) =>
                  `${option.first_name} ${option.last_name}`
                }
                sx={{
                  '& .MuiInputBase-input': { fontSize: '0.80em' },
                  width: '70%',
                }}
                onChange={(event, newValue) => setAssignTo(newValue)}
                onInputChange={(event, value) =>
                  value && handleEmployeeSearch(value)
                }
                loading={loadingEmployees}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assign to"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      style: {
                        fontSize: '0.80em',
                        fontFamily: 'Inter, sans-serif',
                      },
                    }}
                  />
                )}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.primary_color || '#115093',
                  color: '#FFF',
                  textTransform: 'none',
                  fontSize: '0.7em',
                  fontWeight: 300,
                  padding: '0.75rem 0.75em',
                  width: '30%',
                }}
                disabled={ticket?.employee_details !== null}
              >
                {loadingEmployees ? (
                  <CircularProgress size={24} color="inherit" />
                ) : ticket?.employee_details == null ? (
                  'Assign Ticket'
                ) : (
                  'Already Assigned'
                )}
              </Button>
            </Box>

            {/* View More Button */}
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
                onClick={() => handleViewMore(ticket)}
              >
                View More Details ➔
              </Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">No tickets found.</Typography>
        </Box>
      )}

      {/* Modal */}
      <TicketDetails
        ticketData={selectedTicket}
        open={viewMoreOpen}
        onClose={handleClose}
      />

      <EmployeeCustomerProfile
        open={employeeModalOpen}
        onClose={() => setEmployeeModalOpen(false)}
        userId={selectedMarker?.id}
      />
    </Box>
  )
}

export default BookingsTab
