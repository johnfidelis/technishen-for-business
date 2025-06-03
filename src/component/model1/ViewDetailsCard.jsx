import React, { useContext, useState, useEffect } from 'react'
import { MdLocationOn, MdPhone, MdMail } from 'react-icons/md'
import { ThemeContext } from '@/context/ThemeContext'
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
  Avatar,
  Skeleton,
  TextField,
  CircularProgress,
  MenuItem,
  Autocomplete,
  Button,
} from '@mui/material'
import ChatTab from './modals/component/ChatTab'
import BookingsTab from './modals/component/BookingsTab'
import TicketDetails from './modals/TicketDetails'
import { formatDateTime } from '../utils/formatDateTime'
import { buildEndpoint } from '@/lib/apiHelpers'
import { useFetchData, usePatchData } from '@/hooks/useApiService'
import { Cookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { PATCH_ENDPOINTS } from '@/constants/endpoints'
import EmployeeCustomerProfile from './modals/EmployeeCustomerProfile'

const ViewDetailsCard = ({ ticket, ticketId }) => {
  const { theme } = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(true)
  const [ticketas, setTickets] = useState('')
  const [rightTabIndex, setRightTabIndex] = useState(0)
  const cookies = new Cookies()
  const businessId = cookies.get('selectedBusinessId')
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState(null)
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const handleRightTabChange = (event, newIndex) => {
    setRightTabIndex(newIndex)
  }

  const firstName = ticket?.customer_details?.first_name
  const lastName = ticket?.customer_details?.last_name

  const [viewMoreOpen, setViewMoreOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [assignmentGroup, setAssignmentGroup] = useState('')
  const [assignTo, setAssignTo] = useState(null)
  const [assignmentGroups, setAssignmentGroups] = useState([])
  const [employees, setEmployees] = useState([])
  const [loadingGroups, setLoadingGroups] = useState(false)
  const [loadingEmployees, setLoadingEmployees] = useState(false)

  const assignmentGroupsUrl = buildEndpoint('FULFILLER_GROUP_TO_BOOK', {
    business_id: businessId,
    caller_type: 'employee',
  })

  // const assignTicket = usePatchData(
  //   PATCH_ENDPOINTS.ASSIGN_TICKET,
  //   'assignTicket',
  // )

  const assignTicket = PATCH_ENDPOINTS.ASSIGN_TICKET(ticketId)
  const { mutate: patchData } = usePatchData(assignTicket)

  // Assignment Groups
  const { data: groups, isLoading: loadGroups } = useFetchData(
    assignmentGroupsUrl,
    ['fetchAssignmentGroups', businessId, 'employee'],
    { enabled: !!businessId },
  )

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

  const handleOpenClick = (selectedUser) => {
    setSelectedMarker(selectedUser)

    setEmployeeModalOpen(true)
  }

  const handleClose = () => {
    setViewMoreOpen(false)
  }

  const handleViewMore = (ticket) => {
    setSelectedTicket(ticket)
    setViewMoreOpen(true)
  }

  const handleGroupChange = (value) => {
    setAssignmentGroup(value)
    const selectedGroup = assignmentGroups.find((group) => group.id === value)
    if (selectedGroup) {
      setEmployees(selectedGroup.employees || [])
    }
    setAssignTo('')
  }

  const handleEmployeeSearch = (value) => {
    // console.log(`Searching for employee: ${value}`)
  }

  const handleAssignTicket = () => {
    setLoadingEmployees(true)

    const formData = new FormData()
    formData.append('fulfiller_group_id', assignmentGroup)
    formData.append('employee_id', assignTo.id)

    patchData(formData, {
      onSuccess: () => {
        toast.success('Ticket assigned successfully!')
      },
      onError: (error) => {
        if (error?.status === 404) {
          toast.error('Error 404: Ticket or user not found.')
        } else if (error?.status === 400) {
          toast.error(error?.data?.error)
        } else {
          toast.error('Failed to assign ticket. Please try again.')
        }
        console.error('Assign Error:', { error })
      },
      onSettled: () => {
        setLoadingEmployees(false)
      },
    })
  }

  return (
    <Box
      sx={{
        flex: 1,
        border: '0.063rem solid #E0E0E0',
        borderRadius: '0.625em',
        p: '1em',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Box display="flex" alignItems="center" gap="1em" mb="1em">
        {isLoading ? (
          <Skeleton circle sx={{ width: '3.75em', height: '3.75em' }} />
        ) : (
          <Avatar
            sx={{ width: '3.75em', height: '3.75em' }}
            src={
              'https://technishenbackend.onrender.com' +
                ticket?.customer_details?.profile_picture ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNiAaKk2O5kUsjqJP01k24EW93PnSHjuJLTA&s'
            }
          />
        )}

        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              color: '#000',
              fontSize: '1.125em',
              textTransform: 'capitalize',
            }}
          >
            {isLoading ? <Skeleton width={150} /> : `${firstName} ${lastName}`}
          </Typography>
          {isLoading ? (
            <Skeleton width={150} />
          ) : (
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
              {ticket?.customer_details?.completed_tickets || 0} Successful
              Tickets{' '}
            </Typography>
          )}
        </Box>
      </Box>

      <Typography variant="body2" sx={{ fontWeight: 300, fontSize: '1em' }}>
        Customer Details
      </Typography>
      <Divider
        sx={{ my: '1em', backgroundColor: theme.primary_color || '#115093' }}
      />
      {isLoading ? (
        <>
          <Skeleton width={300} />
          <Skeleton width={300} />
          <Skeleton width={300} />
        </>
      ) : (
        <Box>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              fontSize: '0.80em',
            }}
          >
            <MdLocationOn style={{ color: theme.primary_color || '#115093' }} />{' '}
            Ticket Location: {ticket?.ticket_details?.address || '-'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              fontSize: '0.80em',
            }}
          >
            <MdPhone style={{ color: theme.primary_color || '#115093' }} />{' '}
            Phone Number: {ticket?.customer_details?.phone_number || '-'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              fontSize: '0.80em',
            }}
          >
            <MdMail style={{ color: theme.primary_color || '#115093' }} />{' '}
            Email: {ticket?.customer_details?.email || '-'}
          </Typography>
        </Box>
      )}
      <Divider
        sx={{ my: '1em', backgroundColor: theme.primary_color || '#115093' }}
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
            fontSize: '0.80em',
            '&.Mui-selected': {
              color: theme.primary_color || '#115093',
            },
          },
        }}
      >
        <Tab label="Current Tickets" />
        <Tab label="History" />
        <Tab label="Chat to Vivica" />
      </Tabs>

      <Box mt="1em">
        {rightTabIndex === 0 && (
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
                variant="body2"
                sx={{
                  textTransform: 'capitalize',
                }}
              >
                {ticket?.service_details?.sub_service_name || ' '}
              </Typography>
              <Box>
                <Typography
                  variant="body2"
                  // sx={{ fontWeight: 300, fontSize: '0.75em' }}
                >
                  {/* {formatDateTime(ticket?.ticket_details?.created_at) || ''} */}
                  {formatDateTime(ticket?.ticket_details?.scheduled_datetime) ||
                    ''}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
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
                sx={{ display: 'flex' }}
                onClick={
                  ticket?.employee_details?.first_name
                    ? () => handleOpenClick(ticket?.employee_details)
                    : null
                }
              >
                Fulfiller Name:{' '}
                <span
                  style={{
                    color: theme.primary_color || '#115093',
                    cursor: 'pointer',
                  }}
                >
                  {' '}
                  {ticket?.employee_details?.first_name || '-'}
                  {ticket?.employee_details?.last_name || ''}
                </span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, fontSize: '0.80em' }}
              >
                Ticket Number: {ticket?.ticket_details?.ticket_number || ''}
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
                {new Date(
                  ticket?.ticket_details?.created_at,
                ).toLocaleDateString()}
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
                {new Date(
                  ticket?.ticket_details?.created_at,
                ).toLocaleTimeString([], {
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
                ---
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
              disabled={ticket?.employee_details !== null}
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
              ) : assignmentGroups.length > 0 ? (
                assignmentGroups?.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.group_name}
                  </MenuItem>
                ))
              ) : (
                <>
                  <MenuItem disabled>No category available</MenuItem>
                  <MenuItem
                  // onClick={() =>
                  //   router.push(`/dashboard/employee/fulfilers/group`)
                  // }
                  >
                    Create Assignment Group Now
                  </MenuItem>
                </>
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
                disabled={ticket?.employee_details !== null}
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
                onClick={handleAssignTicket}
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
        )}
        {rightTabIndex === 1 && (
          <BookingsTab
            customerId={ticket?.customer_details?.id}
            ticketType={ticket?.ticket_details?.ticket_type}
            bookingType="all"
          />
        )}
        {rightTabIndex === 2 && <ChatTab />}
      </Box>

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

      {/* {selectedTicket && (
        <TicketDetails
          ticketData={selectedTicket}
          open={viewMoreOpen}
          onClose={handleClose}
        />
      )}

      {selectedTicket && (
        <EmployeeCustomerProfile
          open={employeeModalOpen}
          onClose={() => setEmployeeModalOpen(false)}
          userId={selectedMarker?.id}
        />
      )} */}
    </Box>
  )
}

export default ViewDetailsCard
