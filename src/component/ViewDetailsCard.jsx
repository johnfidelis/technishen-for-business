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
} from '@mui/material'
import ChatTab from './modals/component/ChatTab'
import BookingsTab from './modals/component/BookingsTab'

const ViewDetailsCard = ({ ticket, ticketId }) => {
  const { theme } = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(true)
  const [ticketas, setTickets] = useState('')
  const [rightTabIndex, setRightTabIndex] = useState(0)
  console.log('dsd', { ticket })
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const handleRightTabChange = (event, newIndex) => {
    setRightTabIndex(newIndex)
  }

  const firstName = ticket?.customer_details?.first_name
  const lastName = ticket?.customer_details?.last_name

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
                fontSize: '0.80em',
              }}
            >
              ✓ 6 Successful Tickets{' '}
              <span style={{ color: '#F44336' }}>❗ 1 Cancelled Ticket</span>
            </Typography>
          )}
        </Box>
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: 300, fontSize: '1em' }}>
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
            Phone Number: {ticket?.customer_details?.phone_number || 'N/A'}
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
            Email: {ticket?.customer_details?.email || 'N/A'}
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
  )
}

export default ViewDetailsCard
