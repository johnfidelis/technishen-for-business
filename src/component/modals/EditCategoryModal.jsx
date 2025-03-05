'use client'
import { useState, useEffect, useContext, useMemo } from 'react'
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
import { toast } from 'react-toastify'
import { Cookies } from 'react-cookie'
import { PATCH_ENDPOINTS } from '@/constants/endpoints'
import { usePatchData } from '@/hooks/useApiService'

const EditCategoryModal = ({ open, onClose, category }) => {
  const cookies = new Cookies()
  const businessId = cookies.get('selectedBusinessId')
  const { theme } = useContext(ThemeContext)

  const patchUpdateCatalogRoleEndpoint = useMemo(() => {
    return PATCH_ENDPOINTS.UPDATE_CATALOG(category?.id)
  }, [category])

  const [serviceName, setServiceName] = useState('')
  const [description, setDescription] = useState('')
  const [serviceType, setServiceType] = useState('Customer')
  const [image, setImage] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)

  const { mutateAsync: updateCategory } = usePatchData(
    patchUpdateCatalogRoleEndpoint,
  )

  useEffect(() => {
    if (category) {
      console.log({ category })
      setServiceName(category.service_name || '')
      setDescription(category.description || '')
      setServiceType(category.service_type || '')
      setUploadedImage(category.service_images || '')
    }
  }, [category])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setUploadedImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!serviceName || !description || !serviceType) {
      toast.error('Please fill all the category fields.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('business', businessId)
      formData.append('service_name', serviceName)
      formData.append('description', description)
      formData.append('service_type', serviceType)
      if (image) formData.append('service_images', image)

        

      await updateCategory(formData)
      toast.success('Category updated successfully!')
      onClose()
    } catch (error) {
      console.error('Error updating category:', error)
      toast.error('Error. Please try again.')
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          right: 2,
          width: 450,
          height: '100%',
          backgroundColor: '#fff',
          boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
          color: 'black',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          display="flex"
          justifyContent="right"
          alignItems="center"
          sx={{ backgroundColor: theme.primary_color || '#115093' }}
        >
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: '1em' }}>
          <Typography variant="h6">Edit Category</Typography>
          <Divider
            sx={{ backgroundColor: theme.primary_color || '#115093', mt: 1 }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, p: '1em', overflowY: 'auto' }}>
          <TextField
            fullWidth
            label="Service Name"
            variant="outlined"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '5px',
                backgroundColor: theme.primary_color || '#115093',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                overflow: 'hidden',
                margin: 'auto',
              }}
              onClick={() => document.getElementById('category_image').click()}
            >
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded Category"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                serviceName?.slice(0, 2).toUpperCase() || 'IMG'
              )}
            </Box>
            <input
              id="category_image"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </Box>
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.primary_color || '#00D284',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#00A55A' },
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditCategoryModal
