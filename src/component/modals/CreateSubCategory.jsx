import React, { useState, useContext } from 'react'
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Divider,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ThemeContext } from '@/context/ThemeContext'
import { useCreateData } from '@/hooks/useApiService'
import { POST_ENDPOINTS } from '@/constants/endpoints'
import { toast } from 'react-toastify'

const CreateSubCategory = ({ open, onClose, serviceId }) => {
  const { theme } = useContext(ThemeContext)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [subCategoryData, setSubCategoryData] = useState({
    sub_service_name: '',
    cost: '',
    allow_remote_work: '',
    status: 'Active',
    price_type: 'Fixed',
    price_visibility: 'Yes',
    sub_service_images: null,
  })
  const [loading, setLoading] = useState(false)

  const createData = useCreateData(
    POST_ENDPOINTS.CREATE_SUB_CATALOG(serviceId),
    'createSubCatalog',
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setSubCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSubCategoryData((prevData) => ({
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

  const handleSave = () => {
    console.log({ subCategoryData })
    const formDataObject = new FormData()
    Object.entries(subCategoryData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        formDataObject.append(key, value)
      }
    })
    setLoading(true)
    createData.mutate(formDataObject, {
      onSuccess: async () => {
        toast.success('Successful!.', {
          autoClose: 5000,
          hideProgressBar: true,
        })
        setSubCategoryData({
          sub_service_name: '',
          cost: '',
          allow_remote_work: '',
          status: 'Active',
          price_type: 'Fixed',
          price_visibility: 'Yes',
          sub_service_images: null,
        })
        setUploadedImage(null)
        setLoading(false)
        onClose()
      },
      onError: () => {
        toast.error('Error!.', {
          autoClose: 5000,
          hideProgressBar: true,
        })
        setLoading(false)
      },
    })
  }

  const modalStyle = {
    position: 'absolute',
    right: '2px',
    transform: 'translate(0, 0)',
    width: '450px',
    height: '100%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
  }

  const headerStyle = {
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    p: '1em',
  }

  const bodyStyle = {
    overflowY: 'auto',
    flexGrow: 1,
    p: '1em',
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="right"
          alignItems="center"
          style={{ backgroundColor: theme.primary_color }}
        >
          <IconButton
            onClick={onClose}
            sx={{ color: 'white', fontSize: '1em' }}
          >
            Close
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={headerStyle}>
          <Typography variant="h6">Create Sub-Category</Typography>
          <Divider
            sx={{
              backgroundColor: theme.primary_color,
              mt: 1,
            }}
          />
        </Box>
        <Box sx={bodyStyle}>
          {[
            { name: 'sub_service_name', label: 'Sub-Category *' },
            { name: 'cost', label: 'Cost *' },
          ].map(({ name, label }) => (
            <TextField
              key={name}
              fullWidth
              name={name}
              label={label}
              variant="outlined"
              value={subCategoryData[name]}
              onChange={handleChange}
              sx={{
                mb: 2,
                input: { color: '#333' },
                label: { color: '#333' },
              }}
            />
          ))}

          {[
            {
              name: 'price_visibility',
              label: 'Price Visibility *',
              options: ['Yes', 'No'],
            },
            {
              name: 'allow_remote_work',
              label: 'Allow Remote Work *',
              options: ['Yes', 'No'],
            },
            {
              name: 'price_type',
              label: 'Price Type *',
              options: ['Fixed', 'Hourly'],
            },
            {
              name: 'status',
              label: 'Status *',
              options: ['Active', 'In-active'],
            },
          ].map(({ name, label, options }) => (
            <TextField
              key={name}
              fullWidth
              name={name}
              label={label}
              variant="outlined"
              select
              value={subCategoryData[name]}
              onChange={handleChange}
              sx={{
                mb: 2,
                input: { color: '#333' },
                label: { color: '#333' },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ))}

          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '5px',
              backgroundColor: theme.primary_color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 400,
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
              subCategoryData?.sub_service_name?.slice(0, 2).toUpperCase() ||
              'IMG'
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
              onClick={handleSave}
              disabled={loading}
              sx={{ background: theme.primary_color }}
            >
              {loading ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                'Save Sub-Category'
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateSubCategory
