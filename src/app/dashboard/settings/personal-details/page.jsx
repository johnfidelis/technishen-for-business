'use client'
import { useState, useContext } from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  TextField,
  MenuItem,
  IconButton,
  Button,
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { ThemeContext } from '@/context/ThemeContext'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'

const PersonalDetails = () => {
  const { theme } = useContext(ThemeContext)
  const [activeTab, setActiveTab] = useState(0)
  const { data: profile, isLoading } = useFetchData(
    GET_ENDPOINTS.BUSINESS_OWNER_PROFILE,
    'fetchBusinessOwner',
  )

  // console.log({ profile })

  const handleInputChange = (e) => {
    // setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // setProfile({ ...profile, ownerImagePreview: URL.createObjectURL(file) })
    }
  }

  const handleSave = () => {
    console.log('Saving profile', profile)
  }

  const menuItems = [
    'Personal Details',
    'Business Profile',
    'Business Customization',
  ]

  return (
    <Box>
      {/* <Paper elevation={3} sx={{ p: 4, borderRadius: "12px" }}> */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
        {menuItems[activeTab]}
      </Typography>

      {activeTab === 0 && (
        <>
          <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
            <Avatar
              src={
                // profile?.owner_image ||
                'https://technishenbackend.onrender.com' + profile?.owner_image
              }
              alt={profile?.first_name}
              sx={{ width: 80, height: 80, mr: 3 }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
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
              { label: 'First Name', name: 'first_name' },
              { label: 'Last Name', name: 'last_name' },
              {
                label: 'Gender',
                name: 'gender',
                type: 'select',
                options: ['Male', 'Female'],
              },
              { label: 'Nationality', name: 'nationality' },
              {
                label: 'Identity Type',
                name: 'id_type',
                type: 'select',
                options: ['Drivers License', 'Passport', 'National ID Card'],
              },
              { label: 'ID Number', name: 'id_number' },
              { label: 'Contact Number', name: 'phone_number' },
              // { label: 'Email', name: 'owner_email' },
              // { label: 'Password', name: 'password', type: 'password' },
              { label: 'Date of Birth (MM-DD-YYYY)', name: 'date_of_birth' },
            ].map(({ label, name, type, options }, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  label={label}
                  name={name}
                  value={profile?.[name]}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  select={type === 'select'}
                  type={type === 'password' ? 'password' : 'text'}
                  fullWidth
                  required
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
          sx={{
            backgroundColor: theme.primary_color,
            color: 'white',
          }}
        >
          Save
        </Button>
      </Box>
      {/* </Paper> */}
    </Box>
  )
}

export default PersonalDetails
