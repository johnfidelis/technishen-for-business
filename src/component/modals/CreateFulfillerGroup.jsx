import React, { useState, useContext } from 'react'
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ThemeContext } from '@/context/ThemeContext'
import { useCreateData } from '@/hooks/useApiService'
import { POST_ENDPOINTS } from '@/constants/endpoints'
import { toast } from 'react-toastify'

const CreateFulfillerGroup = ({ open, onClose }) => {
  const { theme } = useContext(ThemeContext)
  const [groupName, setGroupName] = useState('')

  const createFulfillerGroup = useCreateData(
    POST_ENDPOINTS.CREATE_FULFILLER_GROUP,
    'createFulfillerGroup',
  )

  const handleCreateGroup = () => {
    if (!groupName.trim()) return
    createFulfillerGroup.mutate(
      {
        group_name: groupName,
      },
      {
        onSuccess: async () => {
          toast.success('Created.', {
            autoClose: 5000,
            hideProgressBar: true,
          })
          onClose()
        },
        onError: () => {
          toast.error('Error.', {
            autoClose: 5000,
            hideProgressBar: true,
          })
        },
      },
    )
    setGroupName('')
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '450px',
          bgcolor: 'white',
          borderRadius: '12px',
          boxShadow: 24,
          p: 3,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create Fulfiller Group</Typography>
          <IconButton onClick={onClose} sx={{ color: 'black' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider
          sx={{ borderColor: theme.primary_color || '#115093', mb: 2 }}
        />

        {/* Form Fields */}
        <TextField
          fullWidth
          label="Group Name *"
          variant="outlined"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          sx={{
            mb: 2,
            input: { color: '#333' },
            label: { color: '#333' },
            backgroundColor: '#eeeeee',
          }}
        />

        {/* Save Button */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            onClick={handleCreateGroup}
            disabled={!groupName.trim()}
            sx={{
              backgroundColor: theme.primary_color || '#115093',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#00A55A',
              },
            }}
          >
            Create Group
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateFulfillerGroup
