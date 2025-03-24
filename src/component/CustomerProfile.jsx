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

const CustomerProfile = ({ employeeId }) => {
  const { theme } = useContext(ThemeContext)
  const minDate = getMinDateForAge(18)
  const pathname = usePathname()
  const segments = pathname.split('/')
  const userType = segments[2]

  const patchEmployeeRoleEndpoint =
    PATCH_ENDPOINTS.UPDATE_EMPLOYEE_ROLE(employeeId)

  const { data: employeeData, isLoading } = useFetchData(
    GET_ENDPOINTS.GET_CUSTOMER(employeeId),
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
      user_type: 'customer', // or "customer" based on your application logic
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
      usePatchData(patchEmployeeRoleEndpoint, payload)
    }
  }

  const handleBack = () => alert('Go Back')

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
                      //  InputProps={{ readOnly: !isEditing }}
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
                      center={center}
                      zoom={10}
                    >
                      <Marker position={center} />
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

                  {/* <FormGroup sx={{ textAlign: 'left', mt: 2 }}>
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
                  </FormGroup> */}
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
            <BookingsTable customerId={employeeId} ticketType={'customer'} />
          )}
        </>
      )}
    </Box>
  )
}

export default CustomerProfile
