import React, { useContext, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Select,
  Card,
  CardContent,
  Avatar,
  Divider,
} from '@mui/material'

import ViewMoreDetailsModal from '../ViewMoreDetailsModal'
import { ThemeContext } from '@/context/ThemeContext'

const StaticBookingTab = () => {
  const { theme } = useContext(ThemeContext)
  const [viewMoreOpen, setViewMoreOpen] = useState(false)
  const handleClose = () => {
    setViewMoreOpen(false)
  }
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="1em"
      >
        <Box display="flex" flexDirection="column" gap="0.5em">
          <Typography
            variant="body2"
            sx={{ fontWeight: 300, fontSize: '0.80em' }}
          >
            Sort By
          </Typography>
          <Select
            fullWidth
            value="Newest (Most Recent)"
            variant="outlined"
            size="small"
            sx={{
              '& .MuiSelect-select': {
                fontSize: '0.80em',
              },
            }}
          >
            <MenuItem value="Newest (Most Recent)">
              Newest (Most Recent)
            </MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </Select>
        </Box>
        <Box display="flex" flexDirection="column" gap="0.5em">
          <Typography
            variant="body2"
            sx={{ fontWeight: 300, fontSize: '0.80em' }}
          >
            Search
          </Typography>
          <TextField
            fullWidth
            placeholder="Type something..."
            variant="outlined"
            size="small"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '0.80em',
              },
            }}
          />
        </Box>
      </Box>

      {/* Ticket Details */}
      <Box
        sx={{
          border: '0.063rem solid #E0E0E0',
          borderRadius: '0.625em',
          p: '1em',
          mb: '1em',
          // boxShadow: `0px 4px 0px ${theme.primary_color || "#115093"}`,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 300, fontSize: '0.80em' }}
          >
            IT Support
          </Typography>

          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 300,

                fontSize: '0.75em',
              }}
            >
              22 May 2023, 09:25 AM
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 300,
                color: '#4CAF50',
                border: 'solid 1px #4CAF50',
                borderRadius: '0.25em',
                padding: '0.125rem 0.375em',
                fontSize: '0.75em',
                textAlign: 'center',
              }}
            >
              Working
            </Typography>
          </Box>
        </Box>

        <Box>
          <Box display="flex" alignItems="center" gap="1em">
            <Avatar
              sx={{
                width: '3.75em',
                height: '3.75em',
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNiAaKk2O5kUsjqJP01k24EW93PnSHjuJLTA&s"
            />
            <Box>
              <Typography
                sx={{
                  color: '#000',
                  fontSize: '0.80em',
                }}
              >
                Client Name: David Willie
              </Typography>
              <Typography
                sx={{
                  color: theme.secondary_color || '#00D284',
                  fontSize: '0.8em',
                }}
              >
                Remote Ticket: TECHNISHEN™
              </Typography>
              <Typography
                sx={{
                  color: '#000',
                  fontSize: '0.74em',
                }}
              >
                Client Number: +27 82 646 0957
                <br /> Client Email: cristiano747@gmail.com <br /> Client
                Address: 53 Arodnap Street, Joburg, Gauteng
              </Typography>
              <Typography
                sx={{
                  color: '#000',
                  fontSize: '0.7em',
                }}
              >
                Ticket Number: TECH-10036LA
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'right', marginTop: '0.5em' }}>
          <Button
            variant="text"
            onClick={() => setViewMoreOpen(true)}
            sx={{
              backgroundColor: theme.primary_color || '#115093',
              color: 'white',
              fontWeight: 300,
              textTransform: 'none',
              mt: '1em',
              fontSize: '0.80em',
              margin: 'auto',

              '&:hover': {
                backgroundColor: theme.primary_color
                  ? `${theme.primary_color}80`
                  : '#11509380',
              },
            }}
          >
            View Bookings
          </Button>
        </Box>
      </Box>
      <ViewMoreDetailsModal
        open={viewMoreOpen}
        onClose={handleClose} // Close modal when triggered
      />
    </Box>
  )
}

export default StaticBookingTab
