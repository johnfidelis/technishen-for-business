import React, { useState, useEffect } from 'react'
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Skeleton,
} from '@mui/material'
import { SentimentDissatisfied, Edit as EditIcon } from '@mui/icons-material'
import DeleteWithConfirmation from './DeleteWithConfirmation'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import EditSubCategoryModal from './modals/EditSubCategoryModal'

const OpenSubcategories = ({ categoryId, onServiceNameChange }) => {
  const { data: subCategories, isLoading } = useFetchData(
    GET_ENDPOINTS.SUB_CATEGORY(categoryId),
  )

  useEffect(() => {
    if (subCategories?.length > 0) {
      onServiceNameChange(subCategories[0]?.service_name || '')
    }
  }, [subCategories, onServiceNameChange])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [theme, setTheme] = useState({ primary_color: '#115093' })
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [isEditModalOpen, setEditModalOpen] = useState(false)

  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleEditSubCategory = (subCategory) => {
    setSelectedSubCategory(subCategory)
    setEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setEditModalOpen(false)
    setSelectedSubCategory(null)
  }

  const handleDeleteSubCategory = (id) => {
    console.log('Delete SubCategory with ID:', id)
  }

  return (
    <div>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : subCategories?.length === 0 ? (
        <Typography variant="h6" align="center">
          No subcategories found.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '0.5em' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}> 
              <TableRow>
                {[
                  'Display',
                  'Sub Category',
                  'Price Type',
                  'Visibility',
                  'Cost',
                  'Status',
                  'Actions',
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontSize: '0.80em',
                      fontWeight: 300,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subCategory) => (
                  <TableRow key={subCategory.id} hover>
                    <TableCell>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '5px',
                          backgroundColor: subCategory.sub_service_images
                            ? ''
                            : theme.primary_color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          color: 'white',
                          overflow: 'hidden',
                        }}
                      >
                        {subCategory.sub_service_images ? (
                          <img
                            src={`https://technishenbackend.onrender.com${subCategory.sub_service_images}`}
                            alt="Subcategory Icon"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          subCategory.sub_service_name
                            ?.slice(0, 2)
                            .toUpperCase()
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{subCategory.sub_service_name}</TableCell>
                    <TableCell>{subCategory.price_type}</TableCell>
                    <TableCell>
                      {subCategory.price_visibility ? 'On' : 'Off'}
                    </TableCell>
                    <TableCell sx={{ color: 'green' }}>
                      {subCategory.cost}
                    </TableCell>
                    <TableCell
                      sx={{ color: subCategory.status ? 'green' : 'red' }}
                    >
                      {subCategory.status ? 'Active' : 'Inactive'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEditSubCategory(subCategory)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <DeleteWithConfirmation
                        id={subCategory.id}
                        handleDeleteCategory={handleDeleteSubCategory}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={subCategories?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
      {isEditModalOpen && (
        <EditSubCategoryModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          subCategory={selectedSubCategory}
        />
      )}
    </div>
  )
}

export default OpenSubcategories
