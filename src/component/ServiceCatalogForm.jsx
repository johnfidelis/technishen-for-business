import React, { useState, useContext } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { ThemeContext } from '@/context/ThemeContext'
import { Cookies } from 'react-cookie'
import { useCreateData } from '@/hooks/useApiService'
import { POST_ENDPOINTS } from '@/constants/endpoints'
import { toast } from 'react-toastify'

const ServiceCatalog = () => {
  const { theme } = useContext(ThemeContext)
  const cookies = new Cookies()
  const businessId = cookies.get('selectedBusinessId')
  const createCategoryAndSubCategory = useCreateData(
    POST_ENDPOINTS.CREATE_CATEGORY_AND_SUB_CATEGORY,
    'createCategoryAndSubCategory',
  )
  const [categoryType, setCategoryType] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [description, setDescription] = useState('')
  const [categoryIcon, setCategoryIcon] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [subCategory, setSubCategory] = useState({
    sub_service_name: '',
    cost: '',
    allow_remote_work: '',
    price_type: '',
    price_visibility: '',
    status: '',
    sub_service_image: null,
  })
  const [uploadedImage2, setUploadedImage2] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCategoryTypeChange = (event) => {
    setCategoryType(event.target.value)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setCategoryIcon(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubCategoryChange = (event) => {
    setSubCategory({ ...subCategory, [event.target.name]: event.target.value })
  }

  const handleSubCategoryImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSubCategory((prev) => ({
        ...prev,
        sub_service_image: file,
      }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage2(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    const categoryFormData = new FormData()
    categoryFormData.append('business', businessId)
    categoryFormData.append('service_name', serviceName)
    categoryFormData.append('description', description)
    categoryFormData.append('service_type', categoryType)
    categoryFormData.append(
      'sub_service[sub_service_name]',
      subCategory?.sub_service_name,
    )
    categoryFormData.append('sub_service[cost]', subCategory?.cost)
    categoryFormData.append(
      'sub_service[allow_remote_work]',
      subCategory?.allow_remote_work,
    )
    categoryFormData.append('sub_service[status]', subCategory?.status)
    categoryFormData.append('sub_service[price_type]', subCategory?.price_type)
    categoryFormData.append(
      'sub_service[price_visibility]',
      subCategory?.price_visibility,
    )
    categoryFormData.append(
      'sub_service[sub_service_images]',
      subCategory?.sub_service_image,
    )
    if (categoryIcon) categoryFormData.append('service_images', categoryIcon)

    createCategoryAndSubCategory.mutate(categoryFormData, {
      onSuccess: async () => {
        toast.success('Created.', {
          autoClose: 5000,
          hideProgressBar: true,
        })
        onClose()
      },
      onError: () => {
        toast.error('Error.', {
          autoClose: 5000,
          hideProgressBar: true,
        })
      },
    })
    // console.log({ categoryFormData, subCategory })
  }

  return (
    <>
      <Grid container spacing={4}>
        {/* Category Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Category Details
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Service Type*</InputLabel>
            <Select value={categoryType} onChange={handleCategoryTypeChange}>
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Service Name"
            variant="outlined"
            required
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            required
            multiline
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box
            sx={{
              width: 'full-width',
              height: 100,
              borderRadius: '5px',
              backgroundColor: '#f0f0f0', // Default background color
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1rem',
              color: 'white',
              background: theme.primary_color,
              overflow: 'hidden',
              margin: 'auto',
              cursor: 'pointer',
              mb: 2,
            }}
            onClick={() => document.getElementById('service_images').click()}
          >
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded Subcategory Icon"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              serviceName?.slice(0, 2).toUpperCase() || 'IMG'
            )}
          </Box>
          {/* Image Upload */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ background: theme.primary_color }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {/* {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  borderRadius: 5,
                }}
              />
            )} */}
          </Box>
        </Grid>

        {/* Subcategory Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Subcategory Details
          </Typography>
          <TextField
            fullWidth
            name="sub_service_name"
            label="Sub-Category Name *"
            variant="outlined"
            value={subCategory.sub_service_name}
            onChange={handleSubCategoryChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="cost"
            label="Cost *"
            variant="outlined"
            value={subCategory.cost}
            onChange={handleSubCategoryChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="allow_remote_work"
            label="Allow Remote Work *"
            variant="outlined"
            select
            value={subCategory.allow_remote_work}
            onChange={handleSubCategoryChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            fullWidth
            name="price_type"
            label="Price Type *"
            variant="outlined"
            select
            value={subCategory.price_type}
            onChange={handleSubCategoryChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Fixed">Fixed</MenuItem>
            <MenuItem value="Hourly">Hourly</MenuItem>
          </TextField>

          <Box
            sx={{
              width: 'full-width',
              height: 100,
              borderRadius: '5px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1rem',
              color: 'white',
              background: theme.primary_color,
              overflow: 'hidden',
              margin: 'auto',
              cursor: 'pointer',
              mb: 2,
              mt: 3,
            }}
            onClick={() =>
              document.getElementById('sub_service_images').click()
            } // Triggers file input on click
          >
            {uploadedImage2 ? (
              <img
                src={uploadedImage2}
                alt="Uploaded Subcategory Icon"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              subCategory?.sub_service_name?.slice(0, 2).toUpperCase() || 'IMG'
            )}
          </Box>

          <Button
            variant="contained"
            component="label"
            sx={{
              marginTop: '16px',
              fontFamily: 'Inter, sans-serif',
              background: theme.primary_color,
              width: '13em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto',
            }}
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
            <input
              id="sub_service_images"
              name="sub_service_images"
              type="file"
              accept="image/*"
              onChange={handleSubCategoryImageChange}
              style={{
                display: 'none', // Completely hides the file input
              }}
            />
          </Button>
        </Grid>

        {/* Status and Price Visibility */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '3em',
          }}
        >
          <TextField
            fullWidth
            name="price_visibility"
            label="Price Visibility *"
            variant="outlined"
            select
            value={subCategory.price_visibility}
            onChange={handleSubCategoryChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            fullWidth
            name="status"
            label="Status *"
            variant="outlined"
            select
            value={subCategory.status}
            onChange={handleSubCategoryChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                maxWidth: 400,
                height: '17em',
                padding: 2,
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 2,
                  }}
                >
                  <AddCircleOutlineIcon
                    sx={{ fontSize: '3rem', color: '#6F7071' }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  style={{
                    color: '#6F7071',
                    fontSize: '0.8rem',
                    fontWeight: 400,
                  }}
                >
                  You are about to create a new category within the system.
                  Please make sure that you have entered all the fields
                  correctly. Categories with an "active" status will be visible
                  immediately to users.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.primary_color,
            width: '15em',
            height: '3em',
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Creating' : 'Create Category'}
        </Button>
      </Box>
    </>
  )
}

export default ServiceCatalog
