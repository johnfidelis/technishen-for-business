'use client'
import { useState, useContext, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { SketchPicker } from 'react-color'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/component/utils/cropImage'
import { useDeleteData, usePatchData } from '@/hooks/useApiService'
import { DELETE_ENDPOINTS, PATCH_ENDPOINTS } from '@/constants/endpoints'
import { ThemeContext } from '@/context/ThemeContext'
import { toast } from 'react-toastify'

const BusinessCustomization = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const patchThemeColor = usePatchData(
    PATCH_ENDPOINTS.CUSTOMIZE_UI,
    'customizeUI',
  )
  const resetTheme = useDeleteData(DELETE_ENDPOINTS.RESET_THEME, 'resetTheme')

  const [primaryColor, setPrimaryColor] = useState(
    theme?.primary_color || '#115093',
  )
  const [secondaryColor, setSecondaryColor] = useState(
    theme?.secondary_color || '#009688',
  )

  // Logo cropping states
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(() =>
    theme?.logo ? `https://technishenbackend.onrender.com${theme.logo}` : null,
  )
  useEffect(() => {
    if (theme?.logo) {
      setLogoPreview(`https://technishenbackend.onrender.com${theme.logo}`)
    }
  }, [theme?.logo])
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0) // Rotation support
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const [openCropModal, setOpenCropModal] = useState(false)
  const [isGrayscale, setIsGrayscale] = useState(false) // Toggle for black & white filter
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    if (theme) {
      setPrimaryColor(theme.primary_color || '#115093')
      setSecondaryColor(theme.secondary_color || '#009688')
    }
  }, [theme])

  const handleLogoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      // setLogoFile(file) // Save original file
      setLogoPreview(URL.createObjectURL(file)) // Preview before cropping
      setOpenCropModal(true) // Open cropper
    }
  }

  const handleCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels)
  }

  const handleSaveCroppedImage = async () => {
    if (!logoPreview || !croppedAreaPixels) return

    try {
      const croppedCanvas = await getCroppedImg(
        logoPreview,
        croppedAreaPixels,
        rotation,
      )

      croppedCanvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], 'cropped-logo.png', {
            type: 'image/png',
          })

          console.log({ croppedFile })

          setLogoFile(croppedFile) // Save cropped version
          setLogoPreview(URL.createObjectURL(croppedFile)) // Update preview
          setOpenCropModal(false)
        }
      }, 'image/png')
    } catch (error) {
      console.error('Error cropping image:', error)
    }
  }

  const handleSave = async () => {
    setSaveLoading(true) // Start loading
    const formData = new FormData()
    if (primaryColor) formData.append('primary_color', primaryColor)
    if (secondaryColor) formData.append('secondary_color', secondaryColor)
    if (logoFile) formData.append('logo', logoFile)

    try {
      await patchThemeColor.mutateAsync(formData)
      setTheme({ primary_color: primaryColor, secondary_color: secondaryColor })
      toast.success('Customization saved successfully!') // Success message
    } catch (error) {
      toast.error('Failed to save customization!') // Error message
      console.error('Failed to update theme:', error)
    } finally {
      setSaveLoading(false) // Stop loading
    }
  }

  const handleReset = async () => {
    setLoading(true) // Start loading
    try {
      await resetTheme.mutateAsync()
      toast.success('Theme reset successfully!') // Success message
    } catch (error) {
      toast.error('Failed to reset theme!') // Error message
      console.error('Failed to reset theme:', error)
    } finally {
      setLoading(false) // Stop loading
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
          <SketchPicker
            color={primaryColor}
            onChangeComplete={(color) => setPrimaryColor(color.hex)}
          />
        </Grid>

        {/* Secondary Color Picker */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Secondary Color
          </Typography>
          <SketchPicker
            color={secondaryColor}
            onChangeComplete={(color) => setSecondaryColor(color.hex)}
          />
        </Grid>

        {/* Logo Upload with Cropping */}
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
                filter: isGrayscale ? 'grayscale(100%)' : 'none',
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

      <Grid item xs={12} textAlign="center">
        <Button
          variant="contained"
          onClick={handleReset}
          disabled={loading}
          sx={{
            backgroundColor: theme.primary_color || '#115093',
            color: 'white',
            mt: 4,
            mr: 2,
          }}
        >
          {loading ? 'Resetting...' : 'Reset'}
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saveLoading}
          sx={{
            backgroundColor: theme.primary_color || '#115093',
            color: 'white',
            mt: 4,
          }}
        >
          {saveLoading ? 'Saving...' : 'Save Customization'}
        </Button>
      </Grid>

      {/* Logo Cropping Dialog */}
      <Dialog
        open={openCropModal}
        onClose={() => setOpenCropModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ position: 'relative', height: 400 }}>
          <Cropper
            image={logoPreview}
            crop={crop}
            zoom={zoom}
            rotation={rotation} // Enable rotation
            aspect={1} // Maintain a square aspect ratio
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation} // Handle rotation change
            onCropComplete={handleCropComplete}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCropModal(false)}>Cancel</Button>

          {/* Black & White Button */}
          <Button
            onClick={handleSaveCroppedImage}
            variant="contained"
            color="primary"
          >
            Crop & Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BusinessCustomization
