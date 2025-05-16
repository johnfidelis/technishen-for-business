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
  Dialog,
  DialogTitle,
  DialogContent,
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
import { getMinDateForAge } from '../utils/calenderManipulation'
import actionVerbMap from '@/constants/actionVerbMap'

const EmployeeProfile = ({ employeeId }) => {
  const { theme } = useContext(ThemeContext)
  const minDate = getMinDateForAge(18)
  const pathname = usePathname()
  const segments = pathname.split('/')
  const userType = segments[2]

  const patchEmployeeRoleEndpoint =
    PATCH_ENDPOINTS.UPDATE_EMPLOYEE_ROLE(employeeId)
  const patchRole = usePatchData(patchEmployeeRoleEndpoint)

  // const blockandUnblockEndpoint = PATCH_ENDPOINTS.BLOCK_UNBLOCK_USER

  const patchBlockAndUnblock = usePatchData(
    PATCH_ENDPOINTS.BLOCK_UNBLOCK_USER(),
    'blockandUnblock',
  )

  const { data: employeeData, isLoading } = useFetchData(
    GET_ENDPOINTS.GET_EMPLOYEE(employeeId),
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
      email: employeeData?.email,
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
      patchRole.mutate(payload)
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
      target_id: employeeId,
      action: selectedAction,
      reason: reasonText,
    }

    try {
      await patchBlockAndUnblock.mutateAsync(payload)
      toast.success(`Employee ${actionVerbMap[selectedAction]} successfully`, {
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
                alt={`${employeeData?.first_name} ${employeeData?.last_name}`}
                src={
                  typeof employeeData?.profile_picture === 'string'
                    ? `https://technishenbackend.onrender.com${employeeData?.profile_picture}`
                    : employeeData?.profile_picture
                      ? URL.createObjectURL(employeeData?.profile_picture)
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
              {employeeData?.first_name} {employeeData?.last_name}
            </Typography>
          </Box>

          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Personal Details" />
            <Tab label="Bookings" />
          </Tabs>

          {tabIndex === 0 && (
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      required
                      name="first_name"
                      value={employeeData?.first_name || ''}
                      onChange={handleInputChange}
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      required
                      name="last_name"
                      value={employeeData?.last_name || ''}
                      onChange={handleInputChange}
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Gender"
                      variant="outlined"
                      required
                      select
                      name="gender"
                      value={employeeData?.gender || ''}
                      onChange={handleInputChange}
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contact Number"
                      variant="outlined"
                      required
                      name="phone_number"
                      value={employeeData?.phone_number || ''}
                      onChange={handleInputChange}
                      disabled
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      required
                      name="email"
                      value={employeeData?.email || ''}
                      onChange={handleInputChange}
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      variant="outlined"
                      required
                      disabled
                      name="date_of_birth"
                      value={employeeData?.date_of_birth || ''}
                      onChange={handleInputChange}
                      onKeyDown={(e) => e.preventDefault()}
                      inputProps={{ max: minDate }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nationality"
                      variant="outlined"
                      required
                      disabled
                      name="nationality"
                      value={employeeData?.nationality || ''}
                      onChange={handleInputChange}
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Identity Type"
                      variant="outlined"
                      required
                      select
                      disabled
                      name="identity_type"
                      value={employeeData?.identity_type || ''}
                      onChange={handleInputChange}
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value="Passport">Passport</MenuItem>
                      <MenuItem value="National ID Card">
                        National ID Card
                      </MenuItem>
                      <MenuItem value="Driver's License">
                        Driver&apos;s License
                      </MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="ID Number"
                      variant="outlined"
                      required
                      name="id_number"
                      disabled
                      value={employeeData?.id_number || ''}
                      onChange={handleInputChange}
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      variant="outlined"
                      required
                      name="address"
                      disabled
                      value={employeeData?.address || ''}
                      onChange={handleInputChange}
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Role"
                      variant="outlined"
                      required
                      name="role"
                      disabled
                      value={employeeData?.role || ''}
                      onChange={handleInputChange}
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      variant="outlined"
                      required
                      name="position"
                      value={employeeData?.position || ''}
                      onChange={handleInputChange}
                      //  InputProps={{ readOnly: !isEditing }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  onClick={() => handleUpdate()}
                  sx={{ mt: 2, background: theme.primary_color }}
                >
                  Save Changes
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} container justifyContent="center">
                <Box sx={{ textAlign: 'center', width: '90%' }}>
                  <LoadScript
                    // googleMapsApiKey="AIzaSyB4FqfyksmVWw4Ihuzfyd57qds8S1zTDOc"
                    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
                  >
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={{
                        lat: employeeData?.latitude,
                        lng: employeeData?.longitude,
                      }}
                      zoom={10}
                    >
                      <Marker
                        position={{
                          lat: employeeData?.latitude,
                          lng: employeeData?.longitude,
                        }}
                      />
                    </GoogleMap>
                  </LoadScript>

                  {userType === 'employee' && (
                    <FormGroup sx={{ textAlign: 'left', mt: 2 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedRole === 'Admin' ||
                              employeeData?.role === 'Admin'
                            }
                            disabled={employeeData?.role === 'Admin'}
                            onChange={() => handleRoleSelection('Admin')}
                          />
                        }
                        label="Admin"
                        sx={{ marginLeft: '8px' }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedRole === 'User' ||
                              employeeData?.role === 'User'
                            }
                            disabled={employeeData?.role === 'User'}
                            onChange={() => handleRoleSelection('User')}
                          />
                        }
                        label="User"
                        sx={{ marginLeft: '8px' }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedRole === 'Fulfiller' ||
                              employeeData?.role === 'Fulfiller'
                            }
                            disabled={employeeData?.role === 'Fulfiller'}
                            onChange={() => handleRoleSelection('Fulfiller')}
                          />
                        }
                        label="Fulfiller"
                        sx={{ marginLeft: '8px' }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedRole === 'Finance' ||
                              employeeData?.role === 'Finance'
                            }
                            disabled={employeeData?.role === 'Finance'}
                            onChange={() => handleRoleSelection('Finance')}
                          />
                        }
                        label="Finance"
                        sx={{ marginLeft: '8px' }}
                      />
                    </FormGroup>
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      mt: 2,
                      flexWrap: 'wrap', // optional: makes it responsive
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() =>
                        employeeData?.user?.is_blocked
                          ? handleOpenReasonModal(
                              'unblock',
                              employeeData?.user?.id,
                            )
                          : handleOpenReasonModal(
                              'block',
                              employeeData?.user?.id,
                            )
                      }
                      sx={{
                        backgroundColor: employeeData?.user?.is_blocked
                          ? 'darkgreen'
                          : 'darkred',
                        '&:hover': {
                          backgroundColor: employeeData?.user?.is_blocked
                            ? '#1BA847'
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
                            ? '#1BA847'
                            : 'red',
                        },
                      }}
                    >
                      {employeeData?.user?.is_disabled ? 'Enable' : 'Disable'}{' '}
                      Employee
                    </Button>
                  </Box>

                  <Box sx={{ textAlign: 'left', mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleResendInvite()}
                      sx={{
                        mt: 2,
                        background: theme.primary_color || '#115093',
                      }}
                    >
                      Resend Invite
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
          )}

          {tabIndex === 1 && (
            <BookingsTable customerId={employeeId} ticketType={'employee'} />
          )}
        </>
      )}

      <Dialog open={openReasonModal} onClose={() => setOpenReasonModal(false)}>
        <DialogTitle sx={{ textTransform: 'capitalize' }}>
          Provide Reason to {selectedAction} Employee
        </DialogTitle>
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
          <Button
            sx={{ color: theme.primary_color || '#115093' }}
            onClick={() => setOpenReasonModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            disabled={!reasonText.trim()}
            variant="contained"
            sx={{ backgroundColor: theme.primary_color || '#115093' }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default EmployeeProfile
