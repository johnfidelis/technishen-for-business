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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/system'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ThemeContext } from '@/context/ThemeContext'
import UserProfile from './modals/UserProfile'

import {
  GET_RESOURCING_ENDPOINTS,
  POST_ENDPOINTS,
  PATCH_ENDPOINTS,
} from '@/constants/resouringEndpoints'
import {
  useCreateResourcingData,
  useFetchResourcingData,
  usePatchResourcingData,
} from '@/hooks/useResourcingApiService'
import { toast } from 'react-toastify'
import ApproveRejectSection from './modals/ApproveRejectSection'

const ViewTimeCard = ({ timecardId }) => {
  const [open, setOpen] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)

  const handleOpenModal = (entry) => {
    setSelectedEntry(entry)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedEntry(null)
  }

  const { data, isLoading } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_INDIVIDUAL_TIMECARD_AND_EXPENSES(timecardId),
  )

  const approveOrDeclineTimeCard = usePatchResourcingData(
    PATCH_ENDPOINTS.APPROVE_OR_DECLINE_TIMECARD(timecardId),
    'approveOrDeclineTimeCard',
  )

  const handleSubmit = async (stat) => {
    approveOrDeclineTimeCard.mutate(
      { status: stat, reason: 'yyg' },
      {
        onSuccess: () => {
          toast.success(`Timecard ${stat} successfully`)
        },
        onError: (error) => {
          toast.error(`Failed to ${stat} timecard`)
        },
      },
    )
  }
  const formattedEntries = data?.daily_entries?.map((entry) => {
    const hours = parseFloat(entry.hours_worked)
    return {
      date: new Date(entry.date).toDateString(),
      billable: Math.min(8, hours),
      overtime: Math.max(0, hours - 8),
    }
  })

  const totalBillable = formattedEntries?.reduce(
    (sum, e) => sum + e.billable,
    0,
  )
  const totalOvertime = formattedEntries?.reduce(
    (sum, e) => sum + e.overtime,
    0,
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
                <strong>Resource:</strong> {data?.applicant_name}
                {/* <VisibilityIcon
                  sx={{ fontSize: '18px', cursor: 'pointer', color: 'gray' }}
                  onClick={handleModalOpen} // Show modal on click
                /> */}
              </Typography>

              <Typography
                sx={{ fontSize: '14px', mb: 0.5, letterSpacing: '0.5px' }}
              >
                <strong>Job Title:</strong> {data?.job_title}
              </Typography>
              <Typography
                sx={{ fontSize: '14px', mb: 0.5, letterSpacing: '0.5px' }}
              >
                <strong>Resource Supplier:</strong> Technishen
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
                  fontSize: 14,
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
                {formattedEntries?.map((entry, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    {/* <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
                      {entry.date}
                    </Typography> */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
                        {entry.date}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenModal(entry)}
                      >
                        <VisibilityIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>

                    <TextField
                      value={entry.billable}
                      disabled
                      sx={{
                        width: 60,
                        textAlign: 'center',
                        '& input': { textAlign: 'center' },
                      }}
                    />
                  </Box>
                ))}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>
                    <strong>TOTAL</strong>
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{totalBillable}</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
              <Chip
                label="Overtime Hours"
                sx={{
                  backgroundColor: '#FF3B30',
                  color: '#fff',
                  height: 30,
                  fontSize: 14,
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
                {formattedEntries?.map((entry, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 'bold' }}>
                      {entry.date}
                    </Typography>
                    <TextField
                      value={entry.overtime}
                      disabled
                      sx={{ width: 80, mt: 1 }}
                      inputProps={{
                        style: {
                          textAlign: 'center',
                          color: entry.overtime > 0 ? '#000' : '#999',
                        },
                      }}
                    />
                  </Box>
                ))}
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>
                    <strong>TOTAL</strong>
                  </Typography>
                  <Typography sx={{ mt: 2 }}>{totalOvertime}</Typography>
                </Box>
              </Box>
            </Box>

            {/* Total Billable Hours */}
            <Box sx={{ textAlign: 'right', mt: 3 }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                <strong>Total Billable Hours:</strong>{' '}
                {totalBillable + totalOvertime}
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
              <strong>Summary Comments</strong>
            </Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comments"
            disabled
            value={data?.notes || ''}
          />
        </Box>
      </Box>

      {/* Non Billable Hours */}
      {/* <Box>
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
       
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>
                    <strong>TOTAL</strong>
                  </Typography>
                  <Typography sx={{ mt: 2 }}>40</Typography>
                </Box>
              </Box>
            </Box>

      
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
      </Box> */}

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Expense Claims
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {(data?.expense_claims || lines).map((line, index) => (
          <>
            <Box
              key={index}
              display="flex"
              alignItems="center"
              gap={1.5}
              flexWrap="wrap"
              mb={2}
            >
              <TextField
                fullWidth
                label="Expense Claim Title"
                variant="outlined"
                value={line.item_name || ''}
                disabled
              />

              <TextField
                label="Cost Per Unit"
                value={line?.cost_per_unit || ''}
                variant="outlined"
                sx={{ width: 100 }}
                disabled
              />
              <TextField
                label="Unit Bought"
                value={line?.quantity || ''}
                variant="outlined"
                sx={{ width: 100 }}
                disabled
              />
            </Box>

            <TextField
              label="Description"
              value={line?.description || ''}
              disabled
              variant="outlined"
              multiline
              rows={3}
              sx={{ flexGrow: 1, width: '600px' }}
            />

            <br />

            <a href={line?.receipt || '#'} target="_blank">
              <Button
                variant="contained"
                component="label"
                sx={{
                  whiteSpace: 'nowrap',
                  backgroundColor: theme.primary_color,
                  minWidth: 110,
                  mt: 2,
                }}
              >
                View Receipt
              </Button>
            </a>
          </>
        ))}

        <Divider sx={{ my: 4 }} />
        {isLoading ? (
          <></>
        ) : (
          <Box
            display="flex"
            justifyContent="flex-end"
            gap={2}
            alignItems="center"
          >
            {['rejected', 'approved'].includes(data?.status) ? (
              <Button
                sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                variant="contained"
                color="success"
                disabled
              >
                Timecard {data?.status}
              </Button>
            ) : (
              <ApproveRejectSection
                approveOrDeclineTimeCard={approveOrDeclineTimeCard}
              />
            )}
          </Box>
        )}
      </Box>

      <UserProfile open={open} onClose={handleModalClose} />
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Daily Report for {selectedEntry?.date}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {selectedEntry?.task || 'No report recorded.'}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ViewTimeCard
