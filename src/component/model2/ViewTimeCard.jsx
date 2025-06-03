'use client'

import { useContext, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  TextField,
  Divider,
} from '@mui/material'
import { styled } from '@mui/system'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ThemeContext } from '@/context/ThemeContext'
import UserProfile from './modals/UserProfile'
import { GET_RESOURCING_ENDPOINTS } from '@/constants/resouringEndpoints'
import { useFetchResourcingData } from '@/hooks/useResourcingApiService'

const ViewTimeCard = ({ timecardId }) => {
  const [open, setOpen] = useState(false)

  const { data: applicant, isLoading } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_INDIVIDUAL_TIMECARD_AND_EXPENSES(timecardId),
  )

  // Toggle modal visibility
  const handleModalOpen = () => setOpen(true)
  const handleModalClose = () => setOpen(false)
  const { theme } = useContext(ThemeContext)

  const [lines, setLines] = useState([
    { description: '', cost: '', file: null, fileName: '' },
  ])

  const handleLineChange = (index, field, value) => {
    const updatedLines = [...lines]
    updatedLines[index][field] = value
    setLines(updatedLines)
  }

  const handleFileChange = (index, file) => {
    const updatedLines = [...lines]
    updatedLines[index].file = file
    updatedLines[index].fileName = file ? file.name : ''
    setLines(updatedLines)
  }

  const addLine = () => {
    setLines([
      ...lines,
      { description: '', cost: '', file: null, fileName: '' },
    ])
  }
  return (
    <Box>
      {/* Candidate Info Section */}
      <Box className="mb-8 text-left flex flex-wrap">
        {/* Avatar */}
        <Box className="flex items-center">
          <Avatar
            alt="Candidate"
            src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
            sx={{
              width: 400,
              height: 300,
              borderRadius: '12px',
              marginRight: '16px',
            }}
          />
        </Box>

        {/* Content */}
        <Box>
          {/* First Candidate Info */}
          <Box className="flex flex-col" style={{ gap: '10%' }}>
            <Box>
              <Typography
                sx={{
                  mb: 1,
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <strong>Resource:</strong> David Willie
                <VisibilityIcon
                  sx={{ fontSize: '18px', cursor: 'pointer', color: 'gray' }}
                  onClick={handleModalOpen} // Show modal on click
                />
              </Typography>

              <Typography
                sx={{ fontSize: '14px', mb: 0.5, letterSpacing: '0.5px' }}
              >
                <strong>Job Title:</strong> Devops Engineer
              </Typography>
              <Typography
                sx={{ fontSize: '14px', mb: 0.5, letterSpacing: '0.5px' }}
              >
                <strong>Resource Supplier:</strong> Tsogolo Technologies (Pty)
                Ltd
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  mb: 0.5,
                  letterSpacing: '0.5px',
                  mt: 4,
                }}
              >
                <strong>Document Attachments:</strong> <br />
                <Box
                  component="ul"
                  sx={{
                    color: theme.primary_color,
                    textDecoration: 'underline',
                  }}
                >
                  <li>server-upgrades.pdf</li>
                  <li>server-downgrades.pdf</li>
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Billable Hours */}
      <Box>
        <Box>
          <Box sx={{ mt: 4, textAlign: 'left', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#333',
                fontSize: '1.25em',
                mb: 2,
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
              }}
            >
              Billable Hours
            </Typography>
            <hr />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <Chip
                label="Regular Hours"
                sx={{
                  backgroundColor: '#1E56A0',
                  color: '#fff',
                  height: 30,
                  fontSize: '14px',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-between',
                  ml: 2,
                }}
              >
                {/* Dates */}
                {[
                  'Mon 07/08/2023',
                  'Tue 08/08/2023',
                  'Wed 09/08/2023',
                  'Thu 10/08/2023',
                  'Fri 11/08/2023',
                ].map((date, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                      {date}
                    </Typography>
                    <TextField
                      value="8"
                      disabled
                      sx={{
                        width: 60,
                        textAlign: 'center',
                        '& input': { textAlign: 'center' },
                      }}
                    />
                  </Box>
                ))}
                {/* Total */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>
                    <strong>TOTAL</strong>
                  </Typography>
                  <Typography sx={{ mt: 2 }}>40</Typography>
                </Box>
              </Box>
            </Box>

            {/* Overtime Hours */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
              <Chip
                label="Overtime Hours"
                sx={{
                  backgroundColor: '#FF3B30',
                  color: '#fff',
                  height: 30,
                  fontSize: '14px',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-between',
                  ml: 2,
                }}
              >
                {/* Dates */}
                {[
                  'Mon 07/08/2023',
                  'Tue 08/08/2023',
                  'Wed 09/08/2023',
                  'Thu 10/08/2023',
                  'Fri 11/08/2023',
                ].map((date, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                      {date}
                    </Typography>
                    <TextField
                      value={index === 1 ? '2' : index === 3 ? '3' : 'Hours'}
                      disabled
                      sx={{ width: 80, mt: 1 }}
                      inputProps={{
                        style: {
                          textAlign: 'center',
                          color: index === 1 || index === 3 ? '#000' : '#999',
                        },
                      }}
                    />
                  </Box>
                ))}
                {/* Total */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>
                    <strong>TOTAL</strong>
                  </Typography>
                  <Typography sx={{ mt: 2 }}>5</Typography>
                </Box>
              </Box>
            </Box>

            {/* Total Billable Hours */}
            <Box sx={{ textAlign: 'right', mt: 3 }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                <strong>Total Billable Hours:</strong> 45
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box sx={{ mt: 4, textAlign: 'left', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#333',
                fontSize: '1.25em',
                mb: 2,
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
              }}
            >
              <strong>Cost Allocation</strong>
            </Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comments"
            disabled
            value="Comments"
          />
        </Box>
      </Box>

      {/* Non Billable Hours */}
      <Box>
        <Box>
          <Box sx={{ mt: 4, textAlign: 'left', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#333',
                fontSize: '1.25em',
                mb: 2,
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
              }}
            >
              Non-Billable Hours
            </Typography>
            <hr />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <Chip
                label="Regular Hours"
                sx={{
                  backgroundColor: '#1E56A0',
                  color: '#fff',
                  height: 40,
                  fontSize: '14px',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-between',
                  ml: 2,
                }}
              >
                {/* Dates */}
                {[
                  'Mon 07/08/2023',
                  'Tue 08/08/2023',
                  'Wed 09/08/2023',
                  'Thu 10/08/2023',
                  'Fri 11/08/2023',
                ].map((date, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                      {date}
                    </Typography>
                    <TextField
                      value="8"
                      disabled
                      sx={{
                        width: 60,
                        textAlign: 'center',
                        '& input': { textAlign: 'center' },
                      }}
                    />
                  </Box>
                ))}
                {/* Total */}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>
                    <strong>TOTAL</strong>
                  </Typography>
                  <Typography sx={{ mt: 2 }}>40</Typography>
                </Box>
              </Box>
            </Box>

            {/* Total Billable Hours */}
            <Box sx={{ textAlign: 'right', mt: 3 }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                <strong>Total Billable Hours:</strong> 45
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box sx={{ mt: 4, textAlign: 'left', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#333',
                fontSize: '1.25em',
                mb: 2,
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
              }}
            >
              <strong>Cost Allocation</strong>
            </Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comments"
            disabled
            value="Comments"
          />
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Expense Claims
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <TextField
          fullWidth
          label="Expense Claim Title"
          variant="outlined"
          sx={{ mb: 4 }}
        />

        {lines.map((line, index) => (
          <Box key={index} display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              label="Description"
              value={line.description}
              onChange={(e) =>
                handleLineChange(index, 'description', e.target.value)
              }
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Cost"
              value={line.cost}
              onChange={(e) => handleLineChange(index, 'cost', e.target.value)}
              variant="outlined"
              sx={{ width: 150 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{
                whiteSpace: 'nowrap',
                backgroundColor: theme.primary_color,
              }}
            >
              Choose File
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(index, e.target.files[0])}
              />
            </Button>
            {line.fileName && (
              <Typography variant="body2" color="primary">
                {line.fileName}
              </Typography>
            )}
          </Box>
        ))}

        <Button
          variant="contained"
          onClick={addLine}
          sx={{ mt: 2, backgroundColor: theme.primary_color }}
        >
          Add Line +
        </Button>

        <Divider sx={{ my: 4 }} />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="success">
            Approve
          </Button>
          <Button variant="contained" color="error">
            Decline
          </Button>
        </Box>
      </Box>

      <UserProfile open={open} onClose={handleModalClose} />
    </Box>
  )
}

export default ViewTimeCard
