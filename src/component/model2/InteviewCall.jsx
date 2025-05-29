import {
  Box,
  Typography,
  Button,
  IconButton,
  Modal,
  TextField,
  MenuItem,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import MicOffIcon from '@mui/icons-material/MicOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import RepeatIcon from '@mui/icons-material/Repeat'
import { usePatchResourcingData } from '@/hooks/useResourcingApiService'
import { PATCH_ENDPOINTS } from '@/constants/resouringEndpoints'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

const InterviewCall = ({ id }) => {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  const [openModal, setOpenModal] = useState(false)
  const [remarks, setRemarks] = useState('')
  const [status, setStatus] = useState('')

  const remarkInterview = usePatchResourcingData(
    PATCH_ENDPOINTS.INTERVIEW_REMARKS(id),
    'remarkInterview',
  )

  const handleBack = () => {
    router.back()
  }

  const handleSubmit = async () => {
    const payload = {
      remarks,
      status,
    }

    remarkInterview.mutate(payload, {
      onSuccess: () => {
        toast.success('Updated successfully!')
        setOpenModal(false)
        setRemarks('')
        setStatus('')
      },
      onError: (error) => {
        toast.error(error?.response?.data?.detail || 'Something went wrong')
      },
    })
  }

  return (
    <Box sx={{ display: 'flex', flex: 1, mt: 2 }}>
      {/* Video Section */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pr: 2,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
          alt="Interview"
          style={{
            width: '100%',
            borderRadius: '5px',
            minHeight: '60vh',
            maxHeight: '61vh',
            objectFit: 'cover',
          }}
        />

        {/* Video Call Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 2,
            width: '100%',
          }}
        >
          <IconButton sx={{ backgroundColor: '#0056B3', color: '#FFFFFF' }}>
            <VideoCallIcon />
          </IconButton>
          <IconButton sx={{ backgroundColor: '#0056B3', color: '#FFFFFF' }}>
            <MicOffIcon />
          </IconButton>
          <IconButton sx={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}>
            <CallEndIcon />
          </IconButton>
          <IconButton sx={{ backgroundColor: '#0056B3', color: '#FFFFFF' }}>
            <CameraAltIcon />
          </IconButton>
          <IconButton sx={{ backgroundColor: '#0056B3', color: '#FFFFFF' }}>
            <RepeatIcon />
          </IconButton>
        </Box>

        {/* Remarks Button */}
        <Button
          variant="contained"
          sx={{ mt: 3, backgroundColor: theme?.primary_color }}
          onClick={() => setOpenModal(true)}
        >
          Add Remarks
        </Button>
      </Box>

      {/* Remarks Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="remarks-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" id="remarks-modal">
            Interview Remarks
          </Typography>
          <TextField
            multiline
            rows={4}
            label="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="passed">Passed</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </TextField>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={remarkInterview.isLoading}
            sx={{
              backgroundColor: theme?.primary_color,
              '&:hover': {
                backgroundColor: theme?.primary_color,
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default InterviewCall
