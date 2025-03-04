import { Box, TextField, Typography } from '@mui/material'

export default function CustomTextField({ label, ...props }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
      <Typography variant="body2" color="white" component="label">
        {label}
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            fontSize: '0.80em',
            padding: '8px',
            '& fieldset': {
              borderColor: 'transparent', // Remove default outline
            },
            '&:hover fieldset': {
              borderColor: 'transparent', // Remove hover outline
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', // Remove focus outline
              boxShadow: 'none', // Remove focus shadow
            },
          },
        }}
        {...props}
      />
    </Box>
  )
}
