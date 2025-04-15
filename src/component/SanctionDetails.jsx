import { useState, useContext } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Grid,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  TablePagination,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import GroupSelectionModal from './modals/GroupSelectionModal'
import { ThemeContext } from '@/context/ThemeContext'
import {
  useCreateData,
  useFetchData,
  usePatchData,
} from '@/hooks/useApiService'
import {
  GET_ENDPOINTS,
  PATCH_ENDPOINTS,
  POST_ENDPOINTS,
} from '@/constants/endpoints'
import BookingsTable from './BookingsTable'
import { toast } from 'react-toastify'
import { usePathname } from 'next/navigation'
import { getMinDateForAge } from './utils/calenderManipulation'
import { SentimentDissatisfied } from '@mui/icons-material'

const SanctionDetails = ({ employeeId }) => {
  const { theme } = useContext(ThemeContext)
  const minDate = getMinDateForAge(18)
  const pathname = usePathname()
  const segments = pathname.split('/')
  const userType = segments[2]

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const patchEmployeeRoleEndpoint =
    PATCH_ENDPOINTS.UPDATE_EMPLOYEE_ROLE(employeeId)
  // const blockandUnblockEndpoint = PATCH_ENDPOINTS.BLOCK_UNBLOCK_USER

  const patchBlockAndUnblock = usePatchData(
    PATCH_ENDPOINTS.BLOCK_UNBLOCK_USER,
    'blockandUnblock',
  )

  const { data: employeeData, isLoading } = useFetchData(
    GET_ENDPOINTS.GET_SANCTION_DETAILS(employeeId),
  )

  const resendAccessCode = useCreateData(
    POST_ENDPOINTS.RESEND_ACCESS_CODE,
    'resendAccessCode',
  )
  const [tabIndex, setTabIndex] = useState(0)
  const [selectedRole, setSelectedRole] = useState('')
  const [modalOpenToFulfillerGroup, setModalOpenToFulfillerGroup] =
    useState(false)

  const mapContainerStyle = { width: '100%', height: '200px' }
  const center = { lat: 6.5244, lng: 3.3792 }

  const handleTabChange = (event, newValue) => setTabIndex(newValue)

  const handleFileChange = () => alert('Profile Updated')
  const handleInputChange = () => alert('Profile Updated')
  const handleUpdate = () => alert('Profile Updated')
  const handleResendInvite = async () => {
    const payload = {
      user_type: 'employee', // or "customer" based on your application logic
      email: employeeData?.user?.email,
    }

    resendAccessCode.mutate(payload, {
      onSuccess: async () => {
        toast.success('Sent.', {
          autoClose: 5000,
          hideProgressBar: true,
        })
      },
      onError: () => {
        toast.error('Error.', {
          autoClose: 5000,
          hideProgressBar: true,
        })
      },
    })
  }

  const handleRoleSelection = async (role) => {
    setSelectedRole(role)
    if (role === 'Fulfiller') {
      setModalOpenToFulfillerGroup(true)
    } else {
      const payload = { role }
      usePatchData(patchEmployeeRoleEndpoint, payload)
    }
  }

  const handleBlockEmployee = async (employeeId) => {
    const payload = {
      target_type: 'employee',
      target_id: employeeId,
      action: 'block',
      reason: '',
    }

    try {
      await patchBlockAndUnblock.mutateAsync(payload)
      toast.success('Employee blocked successfully', {
        autoClose: 5000,
        hideProgressBar: true,
      })
    } catch (error) {
      toast.error('Failed to block employee', {
        autoClose: 5000,
        hideProgressBar: false,
      })
    }
  }
  const handleUnBlockEmployee = async (employeeId) => {
    const payload = {
      target_type: 'employee',
      target_id: employeeId,
      action: 'unblock',
      reason: '',
    }

    try {
      await patchBlockAndUnblock.mutateAsync(payload)
      toast.success('Employee unblocked successfully', {
        autoClose: 5000,
        hideProgressBar: true,
      })
    } catch (error) {
      toast.error('Failed to unblock employee', {
        autoClose: 5000,
        hideProgressBar: false,
      })
    }
  }
  const handleEnableEmployee = async (employeeId) => {
    const payload = {
      target_type: 'employee',
      target_id: employeeId,
      action: 'enable',
      reason: '',
    }

    try {
      await patchBlockAndUnblock.mutateAsync(payload)
      toast.success('Employee enabled successfully', {
        autoClose: 5000,
        hideProgressBar: true,
      })
    } catch (error) {
      toast.error('Failed to enable employee', {
        autoClose: 5000,
        hideProgressBar: false,
      })
    }
  }
  const handleDisableEmployee = async (employeeId) => {
    const payload = {
      target_type: 'employee',
      target_id: employeeId,
      action: 'disable',
      reason: '',
    }

    try {
      await patchBlockAndUnblock.mutateAsync(payload)
      toast.success('Employee disabled successfully', {
        autoClose: 5000,
        hideProgressBar: true,
      })
    } catch (error) {
      toast.error('Failed to disable employee', {
        autoClose: 5000,
        hideProgressBar: false,
      })
    }
  }

  const [openReasonModal, setOpenReasonModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
  const [reasonText, setReasonText] = useState('')

  const handleOpenReasonModal = (action, employeeId) => {
    setSelectedAction(action)
    setSelectedEmployeeId(employeeId)
    setReasonText('')
    setOpenReasonModal(true)
  }

  const handleConfirmAction = async () => {
    const payload = {
      target_type: 'employee',
      target_id: selectedEmployeeId,
      action: selectedAction,
      reason: reasonText,
    }

    try {
      await patchBlockAndUnblock.mutateAsync(payload)
      toast.success(`Employee ${selectedAction}d successfully`, {
        autoClose: 5000,
        hideProgressBar: true,
      })
      setOpenReasonModal(false)
    } catch (error) {
      toast.error(`Failed to ${selectedAction} employee`, {
        autoClose: 5000,
        hideProgressBar: false,
      })
    }
  }

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <label
              htmlFor="profile-picture-upload"
              style={{ cursor: 'pointer' }}
            >
              <Avatar
                alt={`${employeeData?.user?.first_name} ${employeeData?.user?.last_name}`}
                src={
                  typeof employeeData?.user?.photo === 'string'
                    ? `${employeeData?.user?.profile_picture}`
                    : employeeData?.user?.profile_picture
                      ? URL.createObjectURL(employeeData?.user?.profile_picture)
                      : ''
                }
                sx={{ width: 80, height: 80, margin: 'auto' }}
              />
            </label>
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Typography variant="h6" sx={{ fontWeight: 300, mt: 2 }}>
              {employeeData?.user?.first_name} {employeeData?.user?.last_name}
            </Typography>
          </Box>

          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Sanction Logs" />
          </Tabs>

          <Grid container spacing={4} sx={{ mt: 3 }}>
            {/* Right Section: Actions */}
            <Grid item xs={12} sm={6} container>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    mt: 1,
                    mb: 1,
                    flexWrap: 'wrap',
                    // justifyContent: 'center',
                  }}
                >
                  {/* <Button
                    variant="contained"
                    onClick={() =>
                      employeeData?.user?.is_blocked
                        ? handleUnBlockEmployee(employeeData?.user?.id)
                        : handleBlockEmployee(employeeData?.user?.id)
                    }
                    sx={{
                      backgroundColor: employeeData?.user?.is_blocked
                        ? 'darkgreen'
                        : 'darkred',
                      '&:hover': {
                        backgroundColor: employeeData?.user?.is_blocked
                          ? 'green'
                          : 'red',
                      },
                    }}
                  >
                    {employeeData?.user?.is_blocked ? 'Unblock' : 'Block'}{' '}
                    Employee
                  </Button>

                
                  <Button
                    variant="contained"
                    onClick={() =>
                      employeeData?.user?.is_disabled
                        ? handleEnableEmployee(employeeData?.user?.id)
                        : handleDisableEmployee(employeeData?.user?.id)
                    }
                    sx={{
                      backgroundColor: employeeData?.user?.is_disabled
                        ? 'darkgreen'
                        : 'darkred',
                      '&:hover': {
                        backgroundColor: employeeData?.user?.is_disabled
                          ? 'green'
                          : 'red',
                      },
                    }}
                  >
                    {employeeData?.user?.is_disabled ? 'Enable' : 'Disable'}{' '}
                    Employee
                  </Button> */}

                  <Button
                    variant="contained"
                    onClick={() =>
                      employeeData?.user?.is_blocked
                        ? handleOpenReasonModal(
                            'unblock',
                            employeeData?.user?.id,
                          )
                        : handleOpenReasonModal('block', employeeData?.user?.id)
                    }
                    sx={{
                      backgroundColor: employeeData?.user?.is_blocked
                        ? 'darkgreen'
                        : 'darkred',
                      '&:hover': {
                        backgroundColor: employeeData?.user?.is_blocked
                          ? 'green'
                          : 'red',
                      },
                    }}
                  >
                    {employeeData?.user?.is_blocked ? 'Unblock' : 'Block'}{' '}
                    Employee
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() =>
                      employeeData?.user?.is_disabled
                        ? handleOpenReasonModal(
                            'enable',
                            employeeData?.user?.id,
                          )
                        : handleOpenReasonModal(
                            'disable',
                            employeeData?.user?.id,
                          )
                    }
                    sx={{
                      backgroundColor: employeeData?.user?.is_disabled
                        ? 'darkgreen'
                        : 'darkred',
                      '&:hover': {
                        backgroundColor: employeeData?.user?.is_disabled
                          ? 'green'
                          : 'red',
                      },
                    }}
                  >
                    {employeeData?.user?.is_disabled ? 'Enable' : 'Disable'}{' '}
                    Employee
                  </Button>
                </Box>

                <GroupSelectionModal
                  open={modalOpenToFulfillerGroup}
                  onClose={() => setModalOpenToFulfillerGroup(false)}
                  employeeId={employeeId}
                />
              </Box>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ borderRadius: '0.5em' }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Actor</TableCell>
                  <TableCell>Target Employee</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  [...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      {Array(6)
                        .fill()
                        .map((_, i) => (
                          <TableCell key={i}>
                            <Skeleton width={100} />
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
                ) : employeeData?.logs?.length > 0 ? (
                  employeeData.logs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ textTransform: 'capitalize' }}>
                          {log.action}
                        </TableCell>
                        <TableCell>{log.actor_name || 'System'}</TableCell>
                        <TableCell>
                          {log.target_employee?.first_name}{' '}
                          {log.target_employee?.last_name}
                        </TableCell>
                        <TableCell>{log.target_employee?.email}</TableCell>
                        <TableCell>{log.reason}</TableCell>
                        <TableCell>{log.target_employee?.role}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      sx={{ textAlign: 'center', padding: '2em' }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <SentimentDissatisfied
                          sx={{ fontSize: 50, color: 'gray' }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 300,
                            fontSize: '1em',
                            color: 'gray',
                          }}
                        >
                          No logs available.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {employeeData?.logs?.length > 0 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={employeeData?.logs?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </TableContainer>
        </>
      )}

      <Dialog open={openReasonModal} onClose={() => setOpenReasonModal(false)}>
        <DialogTitle sx={{textTransform: "capitalize"}}>Provide Reason to {selectedAction} Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={reasonText}
            onChange={(e) => setReasonText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button     sx={{color: theme.primary_color || '#115093'}} onClick={() => setOpenReasonModal(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmAction}
            disabled={!reasonText.trim()}
            variant="contained"
            sx={{backgroundColor: theme.primary_color || '#115093'}}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SanctionDetails
