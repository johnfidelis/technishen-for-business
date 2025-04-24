'use client'

import { useState, useContext } from 'react'
import dynamic from 'next/dynamic'
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ThemeContext } from '@/context/ThemeContext'
import { MdLocationOn, MdPhone, MdMail, MdBlock } from 'react-icons/md'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import BookingsTab from './component/BookingsTab'
import { usePatchData } from '@/hooks/useApiService'
import { PATCH_ENDPOINTS } from '@/constants/endpoints'
import actionVerbMap from '@/constants/actionVerbMap'
import { toast } from 'react-toastify'
import StarIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import EmailLauncher from './EmailLauncher'

// Dynamically import tabs for better performance
const CategoriesTab = dynamic(() => import('./component/CategoriesTab'), {
  ssr: false,
})
const StaticBookingTab = dynamic(() => import('./component/StaticBookingTab'), {
  ssr: false,
})
const ChatTab = dynamic(() => import('./component/ChatTab'), { ssr: false })
const TicketDetails = dynamic(() => import('./TicketDetails'), { ssr: false })

const EmployeeProfile = ({ open, onClose, user }) => {
  const [rightTabIndex, setRightTabIndex] = useState(0)
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

  const patchBlockAndUnblock = usePatchData(
    PATCH_ENDPOINTS.BLOCK_UNBLOCK_USER(),
    'blockandUnblock',
  )

  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
  const [reasonText, setReasonText] = useState('')

  const handleOpenReasonModal = (action, employeeId) => {
    setSelectedAction(action)
    setSelectedEmployeeId(employeeId)
    setReasonText('')
    setOpenReasonModal(true)
  }

  const handleConfirmAction = async () => {
    const payload = {
      target_type: 'employee',
      target_id: selectedEmployeeId,
      action: selectedAction,
      reason: reasonText,
    }

    try {
      await patchBlockAndUnblock.mutateAsync(payload)
      toast.success(`Employee ${actionVerbMap[selectedAction]} successfully`, {
        autoClose: 5000,
        hideProgressBar: true,
      })
      setOpenReasonModal(false)
    } catch (error) {
      toast.error(`Failed to ${selectedAction} employee`, {
        autoClose: 5000,
        hideProgressBar: false,
      })
    }
  }

  return (
    <>
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
                src={
                  user?.image ||
                  'https://technishenbackend.onrender.com' +
                    user?.profile_picture
                }
              />
              <Box>
                <Typography sx={{ fontWeight: 400, fontSize: '1.125em' }}>
                  {user?.first_name + ' ' + user?.last_name}
                </Typography>
                <Typography sx={{ fontWeight: 400, fontSize: '0.9em' }}>
                  {user?.role}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box sx={{ overflowY: 'auto', flexGrow: 1, p: '1em' }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, fontSize: '1em' }}
            >
              Fulfiller Control Centre
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
                }}
              >
                <MdLocationOn style={{ color: theme.primary_color }} /> Current
                Location: {user?.address}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}
              >
                <MdPhone style={{ color: theme.primary_color }} /> Phone Number:{' '}
                {user?.phone_number}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}
              >
                <MdMail style={{ color: theme.primary_color }} /> Email:{' '}
                {user?.email}
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
                {user?.completed_tickets || 0} Successful Tickets{' '}
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb="1em"
              >
                <Box display="flex" alignItems="center" gap="0.25em">
                  {[...Array(5)].map((_, index) => {
                    const rating = user?.average_rating || 0
                    const rounded = Math.floor(rating)
                    const isHalf = rating - index >= 0.5 && rating - index < 1

                    return (
                      <Box
                        key={index}
                        component="span"
                        sx={{ color: '#FFC107', fontSize: '1.25em' }}
                      >
                        {index + 1 <= rating ? (
                          <StarIcon fontSize="inherit" />
                        ) : isHalf && index === rounded ? (
                          <StarHalfIcon fontSize="inherit" />
                        ) : (
                          <StarBorderIcon fontSize="inherit" />
                        )}
                      </Box>
                    )
                  })}

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      backgroundColor: theme.primary_color || '#115093',
                      borderRadius: '0.75em',
                      padding: '0.225rem 0.5em',
                      fontSize: '0.75em',
                      color: '#fff',
                    }}
                  >
                    {user?.average_rating?.toFixed(0)}/5
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Actions */}
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
              {/* <Typography
                variant="body2"
                sx={{
                  color: theme.primary_color || '#115093',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.6,
                  cursor: 'pointer',
                }}
              >
                <MdMail size={16} /> Send Email
              </Typography> */}
              <EmailLauncher email={user?.email} />
              <Typography
                variant="body2"
                sx={{
                  color: user?.is_blocked ? '#1BA847' : '#FF4C3B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.6,
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
                onClick={() =>
                  user?.is_blocked
                    ? handleOpenReasonModal('unblock', user?.id)
                    : handleOpenReasonModal('block', user?.id)
                }
              >
                <MdBlock size={16} />
                {user?.is_blocked ? 'Unblock' : 'Block'}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: user?.is_disabled ? '#1BA847' : '#FF4C3B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.6,
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
                onClick={() =>
                  user?.is_disabled
                    ? handleOpenReasonModal('enable', user?.id)
                    : handleOpenReasonModal('disable', user?.id)
                }
              >
                <PersonOffIcon sx={{ fontSize: 16 }} />
                {user?.is_disabled ? 'Enable Account' : 'Disable Account'}
              </Typography>
            </Box>

            <Divider sx={{ backgroundColor: theme.primary_color }} />

            {/* Tabs */}
            <Tabs
              value={rightTabIndex}
              onChange={(event, newIndex) => setRightTabIndex(newIndex)}
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
              <Tab label="Profile" />
              <Tab label="Category" />
              <Tab label="Bookings" />
              <Tab label="Chat" />
            </Tabs>

            <Box mt="1em">
              {/* Tab Content */}
              {rightTabIndex === 0 && (
                <Box>
                  <Box display="flex" alignItems="center" gap="0.5em">
                    {' '}
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      sx={{ mb: 3 }}
                      value={user?.first_name}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      sx={{ mb: 3 }}
                      value={user?.last_name}
                    />{' '}
                  </Box>
                  <Box display="flex" alignItems="center" gap="0.5em">
                    {' '}
                    <TextField
                      fullWidth
                      label="Gender"
                      variant="outlined"
                      sx={{ mb: 3 }}
                      value={user?.gender}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      sx={{ mb: 3 }}
                      value={user?.email}
                    />
                  </Box>
                  <Box display="flex" alignItems="center" gap="0.5em">
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      sx={{ mb: 3 }}
                      value={user?.phone_number}
                    />
                  </Box>
                </Box>
              )}
              {rightTabIndex === 1 && <CategoriesTab employeeId={user?.id} />}
              {/* {rightTabIndex === 2 && <StaticBookingTab />} */}
              {rightTabIndex === 2 && (
                <BookingsTab customerId={user?.id} ticketType={'employee'} />
              )}
              {rightTabIndex === 3 && <ChatTab />}
            </Box>
          </Box>

          <TicketDetails
            open={viewMoreOpen}
            onClose={() => setViewMoreOpen(false)}
          />
        </Box>
      </Modal>

      <Dialog open={openReasonModal} onClose={() => setOpenReasonModal(false)}>
        <DialogTitle sx={{ textTransform: 'capitalize' }}>
          Provide Reason to {selectedAction} Employee
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={reasonText}
            onChange={(e) => setReasonText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: theme.primary_color || '#115093' }}
            onClick={() => setOpenReasonModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            disabled={!reasonText.trim()}
            variant="contained"
            sx={{ backgroundColor: theme.primary_color || '#115093' }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EmployeeProfile
