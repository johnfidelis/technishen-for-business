'use client'
import { useState, useEffect, useContext } from 'react'
import {
  Box,
  Grid,
  Typography,
  Avatar,
  TextField,
  MenuItem,
  IconButton,
  Button,
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { ThemeContext } from '@/context/ThemeContext'
import { useFetchData, usePatchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS, PATCH_ENDPOINTS } from '@/constants/endpoints'
import { toast } from 'react-toastify'

const PersonalDetails = () => {
  const { theme } = useContext(ThemeContext)
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(false)

  const { data: profileData, isLoading } = useFetchData(
    GET_ENDPOINTS.BUSINESS_OWNER_PROFILE,
    'fetchBusinessOwner',
  )
  const patchData = usePatchData(
    PATCH_ENDPOINTS.BUSINESS_OWNER_PROFILE,
    'businessOwnerProfile',
  )

  const [img, setImg] = useState(null)
  const [profile, setProfile] = useState({})

  // **Update profile state when profileData is fetched**
  useEffect(() => {
    if (profileData) {
      setProfile(profileData)
    }
  }, [profileData])

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImg(file)
      setProfile({ ...profile, ownerImagePreview: URL.createObjectURL(file) })
    }
  }

  const handleSave = async () => {
    console.log({ profile })
    const formData = new FormData()
    formData.append('first_name', profile.first_name)
    formData.append('last_name', profile.last_name)
    formData.append('gender', profile.gender)
    formData.append('nationality', profile.nationality)
    formData.append('identity_type', profile.identity_type)
    formData.append('id_number', profile.id_number)
    formData.append('phone_number', profile.phone_number)
    formData.append('business_email', profile.email)
    formData.append('date_of_birth', profile.date_of_birth)

    if (img) {
      formData.append('owner_image', img)
    }

    // await patchData.mutateAsync(formData)
    setLoading(true)
    try {
      await patchData.mutateAsync(formData)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setLoading(false) // Stop loading
    }
  }

  const menuItems = [
    'Personal Details',
    'Business Profile',
    'Business Customization',
  ]

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 300, mb: 4 }}>
        {menuItems[activeTab]}
      </Typography>

      {activeTab === 0 && (
        <>
          <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
            <Avatar
              src={
                profile?.ownerImagePreview ||
                'https://technishenbackend.onrender.com' + profile?.owner_image
              }
              alt={profile?.first_name || 'Profile'}
              sx={{ width: 80, height: 80, mr: 3 }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 300 }}>
                {profile?.first_name} {profile?.last_name}
              </Typography>
              <input
                accept="image/*"
                type="file"
                id="profile-image-upload"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor="profile-image-upload">
                <IconButton component="span">
                  <PhotoCameraIcon />
                </IconButton>
              </label>
            </Box>
          </Box>
          <Grid container spacing={2}>
            {[
              { label: 'First Name', name: 'first_name', disabled: true },
              { label: 'Last Name', name: 'last_name', disabled: true },
              {
                label: 'Gender',
                name: 'gender',
                type: 'select',
                options: ['Male', 'Female'],
                disabled: true,
              },
              { label: 'Nationality', name: 'nationality', disabled: true },
              {
                label: 'Identity Type',
                name: 'id_type',
                type: 'select',
                options: [
                  'Passport',
                  'National ID Card',
                  `Driver&apos;s License`,
                ],
                disabled: true,
              },
              { label: 'ID Number', name: 'id_number', disabled: true },
              {
                label: 'Contact Number',
                name: 'phone_number',
                disabled: false,
              },
              // { label: ' Email', name: 'email', disabled: false },

              {
                label: 'Date of Birth (MM-DD-YYYY)',
                name: 'date_of_birth',
                disabled: true,
              },
            ].map(({ label, name, type, options, disabled }, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  label={label}
                  name={name}
                  value={profile?.[name] || ''}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  select={type === 'select'}
                  type={type === 'password' ? 'password' : 'text'}
                  fullWidth
                  required
                  disabled={disabled}
                >
                  {options &&
                    options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading} // Disable when loading
          sx={{
            backgroundColor: theme.primary_color || '#115093',
            color: 'white',
          }}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
        {/* <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: theme.primary_color || '#115093',
            color: 'white',
          }}
        >
          Save
        </Button> */}
      </Box>
    </Box>
  )
}

export default PersonalDetails
