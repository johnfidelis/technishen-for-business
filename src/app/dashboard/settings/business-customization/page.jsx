"use client";
import { useState, useContext, useEffect } from 'react'
import { Box, Grid, Typography, Button, Avatar, TextField } from '@mui/material'
import { SketchPicker } from 'react-color'
import { usePatchData } from '@/hooks/useApiService'
import { PATCH_ENDPOINTS } from '@/constants/endpoints'
import { ThemeContext } from '@/context/ThemeContext'

const BusinessCustomization = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const patchThemeColor = usePatchData(
    PATCH_ENDPOINTS.CUSTOMIZE_UI,
    'customizeUI',
  )

  // Ensure colors are not undefined
  const [primaryColor, setPrimaryColor] = useState(
    theme?.primary_color || '#115093',
  )
  const [secondaryColor, setSecondaryColor] = useState(
    theme?.secondary_color || '#009688',
  )
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [primaryPickerVisible, setPrimaryPickerVisible] = useState(false)
  const [secondaryPickerVisible, setSecondaryPickerVisible] = useState(false)

  // Sync state with theme updates
  useEffect(() => {
    if (theme) {
      setPrimaryColor(theme.primary_color || '#115093')
      setSecondaryColor(theme.secondary_color || '#009688')
    }
  }, [theme])

  const handleLogoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    const formData = new FormData()
    if (primaryColor) formData.append('primary_color', primaryColor)
    if (secondaryColor) formData.append('secondary_color', secondaryColor)
    if (logoFile) formData.append('logo', logoFile)

    try {
      await patchThemeColor.mutateAsync(formData)
      setTheme({ primary_color: primaryColor, secondary_color: secondaryColor })
    } catch (error) {
      console.error('Failed to update theme:', error)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        {/* Primary Color Picker */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Primary Color
          </Typography>
          <Box
            sx={{
              width: 50,
              height: 50,
              backgroundColor: primaryColor,
              borderRadius: '50%',
              border: '2px solid #ccc',
              cursor: 'pointer',
              mb: 2,
            }}
            onClick={() => setPrimaryPickerVisible(!primaryPickerVisible)}
          />
          {primaryPickerVisible && (
            <SketchPicker
              color={primaryColor}
              onChangeComplete={(color) => setPrimaryColor(color.hex)}
            />
          )}
          <TextField
            label="Primary Color Hexcode"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </Grid>

        {/* Secondary Color Picker */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Secondary Color
          </Typography>
          <Box
            sx={{
              width: 50,
              height: 50,
              backgroundColor: secondaryColor,
              borderRadius: '50%',
              border: '2px solid #ccc',
              cursor: 'pointer',
              mb: 2,
            }}
            onClick={() => setSecondaryPickerVisible(!secondaryPickerVisible)}
          />
          {secondaryPickerVisible && (
            <SketchPicker
              color={secondaryColor}
              onChangeComplete={(color) => setSecondaryColor(color.hex)}
            />
          )}
          <TextField
            label="Secondary Color Hexcode"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </Grid>

        {/* Logo Upload */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upload Logo
          </Typography>
          <Box textAlign="center" mb={2}>
            <Avatar
              src={logoPreview}
              alt="Logo Preview"
              sx={{
                width: 120,
                height: 120,
                borderRadius: '10px',
                border: '2px solid #115093',
              }}
            />
          </Box>
          <input
            type="file"
            onChange={handleLogoChange}
            accept="image/*"
            style={{ margin: '10px 0' }}
          />
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: theme.primary_color,
            color: 'white',
            px: 4,
            py: 1.5,
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  )
}

export default BusinessCustomization
