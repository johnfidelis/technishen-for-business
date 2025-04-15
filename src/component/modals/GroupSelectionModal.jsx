import React, { useContext, useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
  IconButton,
  Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ThemeContext } from '@/context/ThemeContext'
import { useFetchData, useCreateData } from '@/hooks/useApiService'
import { GET_ENDPOINTS, POST_ENDPOINTS } from '@/constants/endpoints'
import { toast } from 'react-toastify'
import Link from 'next/link'

const GroupSelectionModal = ({ open, onClose, employeeId }) => {
  const { theme } = useContext(ThemeContext)
  const [groupId, setGroupId] = useState(null)
  // Fetch groups
  const { data: groups, isLoading } = useFetchData(
    GET_ENDPOINTS.ALL_FULFILLER_GROUPS(),
    'allFulfilerGroups',
  )

  const createData = useCreateData(
    POST_ENDPOINTS.ADD_EMPLOYEE_TO_FULFILER_GROUP(groupId),
    'businessProfile',
  )

  const onSelectGroup = async (groupId) => {
    setGroupId(groupId)
    createData.mutate(
      {
        employees: [employeeId],
        action: 'add',
      },
      {
        onSuccess: async () => {
          toast.success('Successful!.', {
            autoClose: 5000,
            hideProgressBar: true,
          })
          onClose()
        },
        onError: () =>
          toast.error('Error!.', {
            autoClose: 5000,
            hideProgressBar: true,
          }),
      },
    )
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold">
            Select Fulfiller Group
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#333' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {groups.length > 0 ? (
              groups.map((group) => (
                <React.Fragment key={group.id}>
                  <ListItem
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <ListItemText
                      primary={group.group_name}
                      secondary={`Created on: ${new Date(group.created_at).toLocaleDateString()}`}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: theme.primary_color || '#007BFF',
                        color: '#fff',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: theme.primary_color || '#115093',
                        },
                      }}
                      onClick={() => onSelectGroup(group.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : 'Select'}
                    </Button>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <>
                <ListItem>
                  <ListItemText
                    primary="No groups available."
                    sx={{
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  />
                </ListItem>

                <Typography
                  component={Link}
                  href="/dashboard/employee/fulfilers/group"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    color: theme.primary_color || '#007BFF',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginTop: '8px',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Create FulFilers Group Now
                </Typography>
              </>
            )}
          </List>

          // <List>
          //   {groups.map((group) => (
          //     <React.Fragment key={group.id}>
          //       <ListItem
          //         sx={{
          //           display: 'flex',
          //           justifyContent: 'space-between',
          //           alignItems: 'center',
          //         }}
          //       >
          //         <ListItemText
          //           primary={group.group_name}
          //           secondary={`Created on: ${new Date(group.created_at).toLocaleDateString()}`}
          //         />
          //         <Button
          //           variant="contained"
          //           sx={{
          //             backgroundColor: theme.primary_color || '#007BFF',
          //             color: '#fff',
          //             textTransform: 'none',
          //             '&:hover': {
          //               backgroundColor: theme.primary_color || '#115093',
          //             },
          //           }}
          //           onClick={() => onSelectGroup(group.id)}
          //           disabled={isLoading}
          //         >
          //           {isLoading ? 'Processing...' : 'Select'}
          //         </Button>
          //       </ListItem>
          //       <Divider />
          //     </React.Fragment>
          //   ))}
          // </List>
        )}
      </Box>
    </Modal>
  )
}

export default GroupSelectionModal
