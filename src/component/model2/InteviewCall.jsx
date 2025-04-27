import { Box, Typography, Button, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import VideoCallIcon from '@mui/icons-material/VideoCall'
import MicOffIcon from '@mui/icons-material/MicOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import RepeatIcon from '@mui/icons-material/Repeat'

const InteviewCall = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back() // This will go back to the previous page in Next.js
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
      </Box>

      {/* Chat Section */}
      {/* Add your chat section here if needed */}
    </Box>
  )
}

export default InteviewCall
