import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  IconButton,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import { toast } from 'react-toastify'

const ApproveRejectSection = ({ approveOrDeclineTimeCard }) => {
  const { theme } = useContext(ThemeContext)
  const [openModal, setOpenModal] = useState(false)
  const [reason, setReason] = useState('')
  const [action, setAction] = useState('') // 'approved' or 'rejected'
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (stat, reasonText = '') => {
    setLoading(true)
    approveOrDeclineTimeCard.mutate(
      { status: stat, reason: reasonText },
      {
        onSuccess: () => {
          toast.success(`Timecard ${stat} successfully`)
          setOpenModal(false)
          setReason('')
          setAction('')
        },
        onError: () => {
          toast.error(`Failed to ${stat} timecard`)
        },
        onSettled: () => {
          setLoading(false)
        },
      },
    )
  }

  const handleApprove = () => {
    // handleSubmit('approved')
    setAction('approved')
    setOpenModal(true)
  }

  const handleReject = () => {
    setAction('rejected')
    setOpenModal(true)
  }

  const handleModalSubmit = () => {
    if (!reason.trim()) {
      toast.error('Please provide a reason.')
      return
    }
    handleSubmit('rejected', reason)
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
    <>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="contained" color="success" onClick={handleApprove}>
          Approve
        </Button>
        <Button variant="contained" color="error" onClick={handleReject}>
          Decline
        </Button>
      </Box>

      {/* Modal for Rejection Reason */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <Box
            display="flex"
            justifyContent="right"
            alignItems="center"
            sx={{ backgroundColor: theme.primary_color }}
          >
            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{ color: 'white', fontSize: '1em' }}
            >
              Close <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: '1em' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Reason{' '}
            </Typography>

            <TextField
              label="Enter reason"
              fullWidth
              multiline
              minRows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleModalSubmit}
                disabled={loading}
                sx={{
                  backgroundColor: theme.primary_color,
                  color: '#fff',
                  '&:hover': { backgroundColor: theme.primary_color },
                }}
                startIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                {loading ? '' : 'Proceed'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default ApproveRejectSection
