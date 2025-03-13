'use client'

import { useState, useContext, useEffect } from 'react'
import {
  Modal,
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
  Avatar,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ThemeContext } from '@/context/ThemeContext'
import { MdLocationOn, MdPhone, MdMail } from 'react-icons/md'
import ChatTab from './component/ChatTab'
import BookingsTab from './component/BookingsTab'

const CustomerProfile = ({ open, onClose, ticket }) => {
  const { theme } = useContext(ThemeContext)

  const [isLoading, setIsLoading] = useState(true)
  const [rightTabIndex, setRightTabIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const handleRightTabChange = (event, newIndex) => {
    setRightTabIndex(newIndex)
  }

  const firstName = ticket?.customer_details?.first_name
  const lastName = ticket?.customer_details?.last_name

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

        <Box
          sx={{
            p: '1em',
            backgroundColor: '#FFFFFF',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <Box display="flex" alignItems="center" gap="1em" mb="1em">
            {isLoading ? (
              <Skeleton variant="circular" width={60} height={60} />
            ) : (
              <Avatar
                sx={{ width: 60, height: 60 }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNiAaKk2O5kUsjqJP01k24EW93PnSHjuJLTA&s"
              />
            )}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  color: '#000',
                  textTransform: 'capitalize',
                }}
              >
                {isLoading ? (
                  <Skeleton width={150} />
                ) : (
                  `${firstName} ${lastName}`
                )}
              </Typography>
              {isLoading ? (
                <Skeleton width={150} />
              ) : (
                <Typography variant="body2" sx={{ fontSize: '0.80em' }}>
                  ✓ 6 Successful Tickets{' '}
                  <span style={{ color: '#F44336' }}>
                    ❗ 1 Cancelled Ticket
                  </span>
                </Typography>
              )}
            </Box>
          </Box>

          <Divider
            sx={{
              my: '1em',
              backgroundColor: theme.primary_color || '#115093',
            }}
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
                sx={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}
              >
                <MdLocationOn
                  style={{ color: theme.primary_color || '#115093' }}
                />{' '}
                Ticket Location: {ticket?.ticket_details?.address || 'N/A'}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}
              >
                <MdPhone style={{ color: theme.primary_color || '#115093' }} />{' '}
                Phone Number: {ticket?.customer_details?.phone_number || 'N/A'}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}
              >
                <MdMail style={{ color: theme.primary_color || '#115093' }} />{' '}
                Email: {ticket?.customer_details?.email || 'N/A'}
              </Typography>
            </Box>
          )}

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
                fontWeight: 400,
                color: '#000',
                fontSize: '0.80em',
                '&.Mui-selected': { color: theme.primary_color || '#115093' },
              },
            }}
          >
            <Tab label="Current Tickets" />
            <Tab label="History" />
            <Tab label="Chat to Vivica" />
          </Tabs>

          <Box mt="1em">
            {rightTabIndex === 0 && (
              <BookingsTab
                customerId={ticket?.customer_details?.id}
                ticketType={ticket?.ticket_details?.ticket_type}
                bookingType="all"
              />
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
        </Box>
      </Box>
    </Modal>
  )
}

export default CustomerProfile
