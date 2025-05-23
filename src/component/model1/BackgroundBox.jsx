import { Box } from '@mui/material'

export default function BackgroundBox({ children }) {
  return (
    <Box
      sx={{
        backgroundImage: `url('../images/background.png')`, // Use absolute path from /public
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </Box>
  )
}
