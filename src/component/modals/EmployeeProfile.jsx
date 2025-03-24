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
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ThemeContext } from '@/context/ThemeContext'
import { MdLocationOn, MdPhone, MdMail, MdBlock } from 'react-icons/md'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import BookingsTab from './component/BookingsTab'

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
  console.log('yyyy', { user })
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
              src={
                'https://technishenbackend.onrender.com' +
                  user?.profile_picture || 'https://via.placeholder.com/150'
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
          </Box>

          {/* Actions */}
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Typography
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
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.primary_color || '#115093',
                display: 'flex',
                alignItems: 'center',
                gap: 0.6,
                cursor: 'pointer',
              }}
            >
              <MdBlock size={16} /> Block
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#FF4C3B',

                display: 'flex',
                alignItems: 'center',
                gap: 0.6,
                cursor: 'pointer',
              }}
            >
              <PersonOffIcon sx={{ fontSize: 16 }} /> Disable Account
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
            {rightTabIndex === 1 && <CategoriesTab />}
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
  )
}

export default EmployeeProfile
