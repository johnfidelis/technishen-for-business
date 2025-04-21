'use client'

import React, { useState, useContext, useMemo } from 'react'
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Tabs,
  Tab,
  Button,
} from '@mui/material'
import { ThemeContext } from '@/context/ThemeContext'
import ViewOutsouredDetailsCard from '@/component/model1/ViewOutsouredDetailsCard'
import { useCreateData, useFetchData } from '@/hooks/useApiService'
import {
  GET_ENDPOINTS,
  PATCH_ENDPOINTS,
  POST_ENDPOINTS,
} from '@/constants/endpoints'
import { formatDateTime } from '../utils/formatDateTime'

const ViewOutsourceTicketDetails = ({ ticketId }) => {
  const { data: ticketNote, isLoading: isLoadingNote } = useFetchData(
    GET_ENDPOINTS.TICKET_NOTES(ticketId),
  )

  const { data: ticket, isLoading } = useFetchData(
    GET_ENDPOINTS.VIEW_OUTSOURCED_TICKETS(ticketId),
  )

  // const updateNoteEndpoint = useMemo(() => {
  //   return PATCH_ENDPOINTS.UPDATE_NOTE(ticketId, existingNote.id)
  // }, [ticketId, existingNote])

  const createNote = useCreateData(
    POST_ENDPOINTS.CREATE_NOTE(ticketId),
    'createNote',
  )

  const { theme } = useContext(ThemeContext)
  const [isOutsourced, setIsOutsourced] = useState(false)
  const [leftTabIndex, setLeftTabIndex] = useState(0)
  const [description, setDescription] = useState(ticket?.description || '')
  const [noteContent, setNoteContent] = useState('')
  const [loadNote, setLoadNote] = useState(false)

  const handleOutsourcedToggle = () => setIsOutsourced((prev) => !prev)
  const handleLeftTabChange = (_, newIndex) => setLeftTabIndex(newIndex)
  const handleAddOrUpdateNote = () => {
    setLoadNote(true)
    setTimeout(() => setLoadNote(false), 1000)
  }
  console.log('dssddsds', { ticketNote })

  return (
    <Box display="flex" gap={2}>
      {/* Left Side - Ticket Details */}
      <Box
        sx={{
          flex: 1,
          borderRadius: '10px',
          p: '1em',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gap="1em"
          alignItems="left"
        >
          <TextField
            fullWidth
            label="Caller"
            value={`${ticket?.caller_name || ''} `}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Ticket Number"
            value={ticket?.ticket_number || ''}
            variant="outlined"
            disabled
          />
          <TextField
            fullWidth
            label="Category"
            value={ticket?.service_name || ' '}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Status"
            value={ticket?.status || ' '}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Sub-Category"
            value={ticket?.sub_service_name || ' '}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Impact"
            value={ticket?.impact || ' '}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Ticket Date and Time"
            value={formatDateTime(ticket?.scheduled_datetime) || ' '}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Urgency"
            value={ticket?.urgency || ' '}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Contact Type"
            value={ticket?.caller_channel || ' '}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Address"
            value={ticket?.address || ' '}
            variant="outlined"
          />
        </Box>
        {/* <FormControlLabel
          control={
            <Switch checked={isOutsourced} onChange={handleOutsourcedToggle} />
          }
          label="Ticket type: Outsourced"
          sx={{ mt: '1em' }}
        /> */}
        {isOutsourced && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: '0.5em', fontSize: '0.80em' }}
          >
            This ticket will be outsourced to Technishen Experts. This will
            result in additional costs.
          </Typography>
        )}
        <Tabs
          value={leftTabIndex}
          onChange={handleLeftTabChange}
          sx={{
            borderBottom: '1px solid #E0E0E0',
            mt: '1.5em',
            '& .MuiTabs-indicator': {
              backgroundColor: theme.primary_color || '#115093',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '0.80em',
              fontWeight: 300,
              fontFamily: 'Inter, sans-serif',
              color: '#000',
              '&.Mui-selected': {
                color: theme.primary_color || '#115093',
              },
            },
          }}
        >
          <Tab label="Ticket Description" />
          <Tab label="Resolution Notes" />
          <Tab label="Paused Notes" />
          <Tab label="Notes" />
        </Tabs>
        <Box sx={{ mt: '1em' }}>
          {leftTabIndex === 0 ? (
            <TextField
              fullWidth
              label="Description of Ticket"
              multiline
              rows={3}
              value={ticket?.description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <Box>
              {/* Get the selected note based on tab */}
              {['resolution', 'paused', 'general'].includes(
                ['resolution', 'paused', 'general'][leftTabIndex - 1],
              ) && (
                <TextField
                  fullWidth
                  label="Edit Note"
                  multiline
                  rows={3}
                  defaultValue={
                    ticket?.ticket_notes.find(
                      (note) =>
                        note?.note_type ===
                        ['resolution', 'paused', 'general'][leftTabIndex - 1],
                    )?.content || ''
                  }
                  onChange={(e) => setNoteContent(e.target.value)}
                  variant="outlined"
                />
              )}

              {/* <Box textAlign="right" sx={{ marginTop: '1em' }}>
                <Button
                  variant="contained"
                  onClick={handleAddOrUpdateNote}
                  disabled={loadNote}
                  sx={{
                    mt: '1.5em',
                    width: '100%',
                    backgroundColor: theme.primary_color || '#115093',
                  }}
                >
                  {loadNote ? 'Updating...' : 'Update Note'}
                </Button>
              </Box> */}
            </Box>
          )}
        </Box>
      </Box>

      {/* Right Side - Form Section */}
      <Box
        sx={{
          flex: 1,
          borderRadius: '10px',
          p: '1em',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <ViewOutsouredDetailsCard ticket={ticket} ticketId={ticketId} />
      </Box>
    </Box>
  )
}

export default ViewOutsourceTicketDetails
