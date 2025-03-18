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
              src={user?.avatar || 'https://via.placeholder.com/150'}
            />
            <Box>
              <Typography sx={{ fontWeight: 400, fontSize: '1.125em' }}>
                {user?.name || 'David Willie'}
              </Typography>
              <Typography sx={{ fontWeight: 400, fontSize: '0.9em' }}>
                {user?.role || 'FullStack Engineer'}
              </Typography>
              <Typography sx={{ fontWeight: 400, fontSize: '0.9em' }}>
                {user?.company || 'Tsogolo Technologies'}
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
              backgroundColor: theme.primary_color,
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
              Location: {user?.location || '35 Aromat Street, Hillbrow, Joburg'}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}
            >
              <MdPhone style={{ color: theme.primary_color }} /> Phone Number:{' '}
              {user?.phone || '+27 74 637 7232'}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}
            >
              <MdMail style={{ color: theme.primary_color }} /> Email:{' '}
              {user?.email || 'vivica.samkelo@gmail.com'}
            </Typography>
          </Box>

          {/* Actions */}
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.primary_color,
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
                color: theme.primary_color,
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
                    value={user?.firstName || 'David'}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    value={user?.lastName || 'Willie'}
                  />{' '}
                </Box>
                <Box display="flex" alignItems="center" gap="0.5em">
                  {' '}
                  <TextField
                    fullWidth
                    label="Gender"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    value={user?.gender || 'Male'}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    value={user?.email || 'dave@gmail.com'}
                  />
                </Box>
                <Box display="flex" alignItems="center" gap="0.5em">
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    value={user?.phone || '09026122244'}
                  />
                </Box>
              </Box>
            )}
            {rightTabIndex === 1 && <CategoriesTab />}
            {rightTabIndex === 2 && <StaticBookingTab />}
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
