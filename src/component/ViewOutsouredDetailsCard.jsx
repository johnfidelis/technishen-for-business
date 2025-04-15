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
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ChatTab from './modals/component/ChatTab'
import BookingsTab from './modals/component/BookingsTab'
import TicketDetails from './modals/TicketDetails'
import { formatDateTime } from './utils/formatDateTime'
import { buildEndpoint } from '@/lib/apiHelpers'
import { useFetchData, usePatchData } from '@/hooks/useApiService'
import { Cookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { PATCH_ENDPOINTS } from '@/constants/endpoints'

const ViewOutsouredDetailsCard = ({ ticket, ticketId }) => {
  const { theme } = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(true)
  const [ticketas, setTickets] = useState('')
  const [rightTabIndex, setRightTabIndex] = useState(0)
  const cookies = new Cookies()
  const businessId = cookies.get('selectedBusinessId')
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const handleRightTabChange = (event, newIndex) => {
    setRightTabIndex(newIndex)
  }

  const firstName = ticket?.assigned_employee_profile?.first_name || 'Not'
  const lastName = ticket?.assigned_employee_profile?.last_name || 'Assigned'

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

  const lifecycle = [
    { status: 'Ticket Booked' },
    { status: 'Ticket Accepted' },
    { status: 'Start Trip' },
    { status: 'Fulfiller Arrived' },
    { status: 'Ticket has been started' },
    { status: 'Ticket has been completed' },
  ]

  const handleAssignTicket = async () => {
    const formData = new FormData()
    formData.append('fulfiller_group_id', assignmentGroup)
    formData.append('employee_id', assignTo.id)
    patchData(formData)
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNiAaKk2O5kUsjqJP01k24EW93PnSHjuJLTA&s"
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
              {ticket?.assigned_employee_profile?.completed_tickets || 0}{' '}
              Successful Tickets{' '}
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
            Ticket Location: {ticket?.ticket_details?.address || 'N/A'}
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
            Phone Number:{' '}
            {ticket?.assigned_employee_profile?.phone_number || 'N/A'}
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
            Email: {ticket?.assigned_employee_profile?.email || 'N/A'}
          </Typography>
        </Box>
      )}
      <Divider
        sx={{ my: '1em', backgroundColor: theme.primary_color || '#115093' }}
      />

      <Box>
        {/* Ticket Description Content */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          {ticket?.ticket_details?.description}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 1 }}>
          Ticket Images
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {ticket?.ticket_images?.map((image, index) => (
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
                src={`https://technishenbackend.onrender.com${image?.image_url}`}
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
        <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 1 }}>
          Ticket Tracker
        </Typography>
        {lifecycle?.map((step, index) => {
          const actions = ticket?.ticket_actions || []
          const completedSteps = actions.length // Number of actions performed

          // Check if the step is completed based on its position in the lifecycle
          const isCompleted = completedSteps > index

          // Determine if it's the current active step
          const isActive = completedSteps === index + 1

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
              }}
            >
              <CheckCircleIcon
                sx={{
                  color: isCompleted
                    ? '#115093' // Blue for completed
                    : isActive
                      ? '#FFC107' // Yellow for current
                      : '#E0E0E0', // Grey for remaining
                  fontSize: '1.5em',
                }}
              />

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

              <Typography
                variant="caption"
                sx={{ color: '#6C757D', fontSize: '0.75em' }}
              >
                {isCompleted
                  ? new Date(actions[index]?.timestamp).toLocaleString(
                      'en-US',
                      {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      },
                    )
                  : isActive
                    ? 'In Progress'
                    : 'Pending'}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default ViewOutsouredDetailsCard
