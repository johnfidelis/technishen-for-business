// 'use client'
// import React, { useState, useEffect, useContext } from 'react'
// import {
//   Box,
//   Typography,
//   TextField,
//   Grid,
//   Button,
//   IconButton,
//   Avatar,
// } from '@mui/material'
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
// import EditIcon from '@mui/icons-material/Edit'
// import { useFetchData, usePatchData } from '@/hooks/useApiService'
// import { GET_ENDPOINTS, PATCH_ENDPOINTS } from '@/constants/endpoints'
// import { Cookies } from 'react-cookie'
// import { ThemeContext } from '@/context/ThemeContext'

// const BusinessProfileSettings = () => {
//   const { theme } = useContext(ThemeContext)
//   const patchBusinessInfo = usePatchData(
//     PATCH_ENDPOINTS.UPDATE_BUSINESS,
//     'updateBusiness',
//   )
//   const [profile, setProfile] = useState({})
//   const cookies = new Cookies()
//   const businessId = cookies.get('selectedBusinessId')
//   const { data, isLoading } = useFetchData(
//     GET_ENDPOINTS.UPDATE_BUSINESS,
//     'fetchBusinesses',
//   )

//   useEffect(() => {
//     const business = data?.businesses?.find((b) => b.id === businessId)
//     console.log({ business })

//     setProfile({
//       // buildingName: business.building_name || "",
//       businessEmail: business.business_email || '',
//       businessName: business.business_name || '',
//       businessType: business.business_type || '',
//       city: business.city || '',
//       companySize: business.company_size || '',
//       country: business.country || '',
//       countryBuilding: business.country_building || '',
//       industry: business.industry || '',
//       // logo: business.logo || "",
//       stateOrRegion: business.state_or_region || '',
//       supportEmail: business.support_email || '',
//       taxNumber: business.tax_number || '',
//       tradingAddress: business.trading_address || '',
//       tradingName: business.trading_name || '',
//       unitNumber: business.unit_number || '',
//       website: business.website || '',
//     })
//   }, [data, businessId])

//   const [logoPreview, setLogoPreview] = useState(null)

//   const handleInputChange = (event) => {
//     const { name, value } = event.target
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }))
//   }

//   const handleLogoChange = (event) => {
//     const file = event.target.files[0]
//     if (file) {
//       setLogoPreview(URL.createObjectURL(file))
//     }
//   }

//   const handleSave = async () => {
//     try {
//       await patchBusinessInfo.mutateAsync(formData)
//     } catch (error) {
//       console.error('Failed to update :', error)
//     }
//   }

//   return (
//     <Box>
//       <Typography variant="h5" sx={{ fontWeight: 300, mb: 4 }}>
//         Business Profile
//       </Typography>
//       <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
//         <Avatar
//           src={logoPreview}
//           alt={profile.businessName}
//           sx={{ width: 80, height: 80, mr: 3 }}
//         />
//         <Box>
//           <Typography variant="h6" sx={{ fontWeight: 300 }}>
//             {profile.businessName || 'Business Name'}
//           </Typography>
//           <IconButton component="label">
//             <PhotoCameraIcon />
//             <input
//               hidden
//               accept="image/*"
//               type="file"
//               onChange={handleLogoChange}
//             />
//           </IconButton>
//         </Box>
//       </Box>

//       <Grid container spacing={2}>
//         {Object.entries(profile).map(
//           ([key, value]) =>
//             key !== 'logo' && (
//               <Grid item xs={12} sm={6} key={key}>
//                 <TextField
//                   label={key
//                     .replace(/([A-Z])/g, ' $1')
//                     .replace(/^./, (str) => str.toUpperCase())}
//                   name={key}
//                   value={value}
//                   onChange={handleInputChange}
//                   fullWidth
//                   required
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Grid>
//             ),
//         )}
//       </Grid>

//       <Box sx={{ mt: 4, textAlign: 'center' }}>
//         <Button
//           variant="contained"
//           startIcon={<EditIcon />}
//           onClick={handleSave}
//           sx={{ backgroundColor: '#115093', color: 'white' }}
//         >
//           Save
//         </Button>
//       </Box>
//     </Box>
//   )
// }

// export default BusinessProfileSettings

'use client'
import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Avatar,
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import EditIcon from '@mui/icons-material/Edit'
import { useFetchData, usePatchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS, PATCH_ENDPOINTS } from '@/constants/endpoints'
import { Cookies } from 'react-cookie'
import { ThemeContext } from '@/context/ThemeContext'

const BusinessProfileSettings = () => {
  const { theme } = useContext(ThemeContext)
  const patchBusinessInfo = usePatchData(
    PATCH_ENDPOINTS.UPDATE_BUSINESS(),
    'updateBusiness',
  )
  const cookies = new Cookies()
  const businessId = cookies.get('selectedBusinessId')

  const { data, isLoading } = useFetchData(
    GET_ENDPOINTS.BUSINESSES,
    'fetchBusinesses',
  )

  const [profile, setProfile] = useState({
    businessEmail: '',
    businessName: '',
    businessType: '',
    city: '',
    companySize: '',
    country: '',
    countryBuilding: '',
    industry: '',
    stateOrRegion: '',
    supportEmail: '',
    taxNumber: '',
    tradingAddress: '',
    tradingName: '',
    unitNumber: '',
    website: '',
    logo: null, // Ensure logo is included
  })

  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)

  useEffect(() => {
    if (data?.businesses && businessId) {
      const business = data.businesses.find((b) => b.id === businessId)
      if (business) {
        setProfile((prev) => ({
          ...prev,
          businessEmail: business.business_email || '',
          businessName: business.business_name || '',
          businessType: business.business_type || '',
          city: business.city || '',
          companySize: business.company_size || '',
          country: business.country || '',
          countryBuilding: business.country_building || '',
          industry: business.industry || '',
          stateOrRegion: business.state_or_region || '',
          supportEmail: business.support_email || '',
          taxNumber: business.tax_number || '',
          tradingAddress: business.trading_address || '',
          tradingName: business.trading_name || '',
          unitNumber: business.unit_number || '',
          website: business.website || '',
          logo: business.logo || null,
        }))
        setLogoPreview(
          `https://technishenbackend.onrender.com${business.logo}` || null,
        )
      }
    }
  }, [data, businessId])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      Object.entries(profile).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value)
      })

      if (logoFile) {
        formData.append('logo', logoFile) // Attach the new logo
      }

      await patchBusinessInfo.mutateAsync(formData)

      alert('Business profile updated successfully!')
    } catch (error) {
      console.error('Failed to update:', error)
      alert('Error updating business profile. Please try again.')
    }
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 300, mb: 4 }}>
        Business Profile
      </Typography>
      <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
        <Avatar
          src={logoPreview}
          alt={profile.businessName || 'Business Logo'}
          sx={{ width: 80, height: 80, mr: 3 }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 300 }}>
            {profile.businessName || 'Business Name'}
          </Typography>
          <IconButton component="label">
            <PhotoCameraIcon />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleLogoChange}
            />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {Object.entries(profile).map(
          ([key, value]) =>
            key !== 'logo' && (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  label={key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            ),
        )}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleSave}
          disabled
          sx={{ backgroundColor: theme?.primary_color, color: 'white' }}
        >
          Cannot be edited
        </Button>
      </Box>
    </Box>
  )
}

export default BusinessProfileSettings
