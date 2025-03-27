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
  MenuItem,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ThemeContext } from '@/context/ThemeContext'
import { toast } from 'react-toastify'
import { Cookies } from 'react-cookie'
import { PATCH_ENDPOINTS } from '@/constants/endpoints'
import { usePatchData } from '@/hooks/useApiService'

const EditSubCategoryModal = ({ open, onClose, subCategory }) => {
  const cookies = new Cookies()
  const businessId = cookies.get('selectedBusinessId')
  const { theme } = useContext(ThemeContext)

  const patchUpdateSubCategoryEndpoint = useMemo(() => {
    return PATCH_ENDPOINTS.UPDATE_SUB_CATALOG(subCategory?.id)
  }, [subCategory])

  const [formData, setFormData] = useState({
    sub_service_name: '',
    cost: '',
    status: 'Active',
    price_type: 'Fixed',
    price_visibility: 'Yes',
    sub_service_images: null,
  })
  const [uploadedImage, setUploadedImage] = useState(null)

  const { mutateAsync: updateSubCategory } = usePatchData(
    patchUpdateSubCategoryEndpoint,
  )

  useEffect(() => {
    if (subCategory) {
      console.log({ subCategory })
      setFormData({
        sub_service_name: subCategory.sub_service_name || '',
        cost: subCategory.cost || '',
        status: subCategory.status ? 'Active' : 'In-active',
        price_type: subCategory.price_type || 'Fixed',
        price_visibility: subCategory.price_visibility || 'Yes',
        // sub_service_images: subCategory.sub_service_images || '',
        sub_service_images:
          subCategory.sub_service_images == null
            ? null
            : 'https://technishenbackend.onrender.com' +
                subCategory.sub_service_images || '',
      })
      setUploadedImage(
        subCategory.sub_service_images == null
          ? null
          : 'https://technishenbackend.onrender.com' +
              subCategory.sub_service_images || '',
      )
    }
  }, [subCategory])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        sub_service_images: file,
      }))

      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!formData.sub_service_name || !formData.cost) {
      toast.error('Please fill all the required fields.')
      return
    }

    try {
      const submissionData = new FormData()
      submissionData.append('business', businessId)
      submissionData.append('sub_service_name', formData.sub_service_name)
      submissionData.append('cost', formData.cost)
      submissionData.append('status', formData.status)
      submissionData.append('price_type', formData.price_type)
      submissionData.append('price_visibility', formData.price_visibility)
      if (formData.sub_service_images)
        submissionData.append('sub_service_images', formData.sub_service_images)

      await updateSubCategory(submissionData)
      toast.success('Sub-category updated successfully!')
      onClose()
    } catch (error) {
      console.error('Error updating sub-category:', error)
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
          sx={{ backgroundColor: theme.primary_color }}
        >
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: '1em' }}>
          <Typography variant="h6">Edit Sub-Category</Typography>
          <Divider
            sx={{ backgroundColor: theme.primary_color || '#115093', mt: 1 }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, p: '1em', overflowY: 'auto' }}>
          <TextField
            fullWidth
            name="sub_service_name"
            label="Sub-Category Name *"
            variant="outlined"
            value={formData.sub_service_name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="cost"
            label="Cost *"
            variant="outlined"
            value={formData.cost}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="status"
            label="Status *"
            variant="outlined"
            select
            value={formData.status}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="In-active">In-active</MenuItem>
          </TextField>
          <TextField
            fullWidth
            name="price_type"
            label="Price Type *"
            variant="outlined"
            select
            value={formData.price_type}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Fixed">Fixed</MenuItem>
            <MenuItem value="Variable">Variable</MenuItem>
          </TextField>
          <TextField
            fullWidth
            name="price_visibility"
            label="Price Visibility *"
            variant="outlined"
            select
            value={formData.price_visibility}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '5px',
              backgroundColor: theme.primary_color || '#115093',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 300,
              fontSize: '1rem',
              color: 'white',
              overflow: 'hidden',
              margin: 'auto',
              cursor: 'pointer',
            }}
            onClick={() =>
              document.getElementById('sub_service_images').click()
            }
          >
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded Subcategory Icon"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              formData?.sub_service_name?.slice(0, 2).toUpperCase() || 'IMG'
            )}
          </Box>
          <input
            id="sub_service_images"
            name="sub_service_images"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.primary_color || '#00D284',
                color: '#FFFFFF',
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

export default EditSubCategoryModal
