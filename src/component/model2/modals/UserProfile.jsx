import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Divider,
  TextField,
  Modal,
  Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

const UserProfile = ({ open, onClose }) => {
  const { theme } = useContext(ThemeContext)

  // Hardcoded user data
  const user = {
    first_name: 'John',
    last_name: 'Doe',
    role: 'Fulfiller',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    address: '1234 Main St, City, Country',
    phone_number: '+1234567890',
    email: 'johndoe@example.com',
    completed_tickets: 35,
    average_rating: 4.2,
    is_blocked: false,
    is_disabled: false,
    gender: 'Male',
  }

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
                user?.image || 'https://randomuser.me/api/portraits/men/1.jpg'
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
          {/* Static Profile Fields */}
          <Box mt="1em">
            <Box display="flex" alignItems="center" gap="0.5em">
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                sx={{ mb: 3 }}
                value={user?.first_name}
                aria-readonly
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                sx={{ mb: 3 }}
                value={user?.last_name}
                aria-readonly
              />
            </Box>
            <TextField
              fullWidth
              label="Nationality"
              variant="outlined"
              sx={{ mb: 3 }}
              value={'South Africa'}
              aria-readonly
            />
            <TextField
              fullWidth
              label="Job Title"
              variant="outlined"
              sx={{ mb: 3 }}
              value={'Web Dev'}
              aria-readonly
            />
            <TextField
              fullWidth
              label="Meeting Date and Time"
              variant="outlined"
              sx={{ mb: 3 }}
              value={'29 Sept 2023, 09:00AM  -  29 Sept 2023, 09:30AM'}
              aria-readonly
            />
            <TextField
              fullWidth
              label="Meeting Link"
              variant="outlined"
              sx={{ mb: 3, color: theme.primary_color }}
              value={'https://app.imbizo.co/v/tsogolo/live'}
              aria-readonly
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.primary_color,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.primary_color,
                  },
                }}
              >
                Schedule & Notify
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default UserProfile
