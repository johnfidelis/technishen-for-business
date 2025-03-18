import React, { useState, useCallback, useContext, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Box,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Skeleton,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteWithConfirmation from './DeleteWithConfirmation'
import InfoIcon from '@mui/icons-material/Info'
import { useFetchData, useDeleteData } from '@/hooks/useApiService'
import { GET_ENDPOINTS, DELETE_ENDPOINTS } from '@/constants/endpoints'
import { ThemeContext } from '@/context/ThemeContext'
import { useRouter } from 'next/navigation'
import EditCategoryModal from './modals/EditCategoryModal'
import { SentimentDissatisfied } from '@mui/icons-material'

/**
 * @param {Object} props
 * @param {"Customer" | "Employee"} props.catalogType - The type of catalog (customer or employee).
 */
const CatalogTable = ({ catalogType, setNumber }) => {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  const { data, isLoading } = useFetchData(
    GET_ENDPOINTS.ALL_CATEGORIES,
    'allCategories',
  )

  useEffect(() => {
    if (setNumber && typeof setNumber === 'function') {
      const fetchedNumber = data
        ? data.filter((category) => category.service_type === catalogType)
            .length
        : 0

      setNumber(fetchedNumber)
    }
  }, [data, catalogType])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filter, setFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('Newest')

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleSortChange = (event) => setSortOrder(event.target.value)

  // const handleEdit = useCallback((category) => {
  //   console.log('Editing:', category)
  // }, [])
  const handleEdit = useCallback((category) => {
    setSelectedCategory(category)
    setEditModalOpen(true)
  }, [])

  const handleCloseModal = () => {
    setEditModalOpen(false)
    setSelectedCategory(null)
  }

  const handleDelete = useCallback((id) => {
    // console.log('Deleting category with ID:', id)
    deleteCategory(id)
  }, [])

  const filteredData = data
    ?.filter((category) => category.service_type === catalogType)
    ?.filter((category) =>
      category.service_name.toLowerCase().includes(filter.toLowerCase()),
    )
    ?.sort((a, b) =>
      sortOrder === 'Newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt),
    )

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          mb: 4,
          flexWrap: 'wrap',
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ flex: 1, minWidth: '200px' }}
        />
        <FormControl
          variant="outlined"
          sx={{
            flex: 1,
            minWidth: '200px',
            maxWidth: '330px',
            fontSize: '0.80em',
          }}
        >
          {/* <InputLabel>Sort</InputLabel> */}
          <TextField
            select
            value={sortOrder}
            onChange={handleSortChange}
            label="Sort"
          >
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </TextField>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '0.5em' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Display</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub-Categories</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                {[...Array(6)].map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ) : filteredData?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  sx={{ textAlign: 'center', padding: '2em' }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <SentimentDissatisfied
                      sx={{ fontSize: 50, color: 'gray' }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 300, fontSize: '1em', color: 'gray' }}
                    >
                      No data found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => (
                  <TableRow key={category.id} sx={{ cursor: 'pointer' }} hover>
                    <TableCell>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 300,
                          color: 'white',
                          background: category.service_images
                            ? ''
                            : theme.primary_color,
                        }}
                      >
                        {category.service_images ? (
                          <img
                            src={
                              'https://technishenbackend.onrender.com' +
                              category.service_images
                            }
                            alt="Icon"
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                          />
                        ) : (
                          category.service_name?.slice(0, 2).toUpperCase()
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{category.service_name}</TableCell>
                    <TableCell>
                      {category?.associated_sub_services?.length}
                    </TableCell>
                    <TableCell
                      style={{
                        color: category.status ? 'green' : 'red',
                      }}
                    >
                      {category.status ? 'Active' : 'Inactive'}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      <Tooltip
                        title={
                          <span
                            style={{
                              fontSize: '0.85em',
                              lineHeight: 1.5,
                            }}
                          >
                            {category.description}
                          </span>
                        }
                        placement="top"
                        arrow
                        sx={{
                          backgroundColor: theme.primary_color,
                          color: '#fff',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.85em',
                        }}
                      >
                        <IconButton size="small">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details" arrow>
                        <IconButton>
                          <VisibilityIcon
                            onClick={() =>
                              router.push(`/dashboard/catalog/${category?.id}`)
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <IconButton onClick={() => handleEdit(category)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <DeleteWithConfirmation
                        id={category.id}
                        handleDeleteCategory={handleDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredData?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredData?.length === 0 ? (
        <Typography align="center" my={4}>
          No data available.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '0.5em' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>Display</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sub-Categories</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => (
                  <TableRow key={category.id} sx={{ cursor: 'pointer' }} hover>
                    <TableCell>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 300,
                          color: 'white',
                          background: category.service_images
                            ? ''
                            : theme.primary_color,
                        }}
                      >
                        {category.service_images ? (
                          <img
                            src={category.service_images}
                            alt="Icon"
                            style={{ width: '100%', height: '100%' }}
                          />
                        ) : (
                          category.service_name?.slice(0, 2).toUpperCase()
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{category.service_name}</TableCell>
                    <TableCell>
                      {category?.associated_sub_services?.length}
                    </TableCell>
                    <TableCell
                      style={{ color: category.status ? 'green' : 'red' }}
                    >
                      {category.status ? 'Active' : 'Inactive'}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      <Tooltip
                        title={
                          <span style={{ fontSize: '0.85em', lineHeight: 1.5 }}>
                            {category.description}
                          </span>
                        }
                        placement="top"
                        arrow
                        sx={{
                          backgroundColor: theme.primary_color,
                          color: '#fff',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.85em',
                        }}
                      >
                        <IconButton size="small">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details" arrow>
                        <IconButton>
                          <VisibilityIcon
                            onClick={() =>
                              router.push(`/dashboard/catalog/${category?.id}`)
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <IconButton onClick={() => handleEdit(category)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <DeleteWithConfirmation
                        id={category.id}
                        handleDeleteCategory={handleDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={filteredData?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )} */}

      <EditCategoryModal
        open={editModalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
      />
    </Box>
  )
}

export default CatalogTable
