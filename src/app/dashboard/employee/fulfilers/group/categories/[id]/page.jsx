'use client'
import React, { useContext, useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  TablePagination,
  Skeleton,
  Avatar,
  Modal,
  CircularProgress,
  Grid,
  Autocomplete,
  IconButton,
} from '@mui/material'
import { SentimentDissatisfied } from '@mui/icons-material'
import { useCreateData, useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS, POST_ENDPOINTS } from '@/constants/endpoints'
import { ThemeContext } from '@/context/ThemeContext'
import { toast } from 'react-toastify'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Page() {
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  const { id } = useParams()
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const shouldFetch = debouncedQuery?.trim()?.length > 0
  const [openFulfillerGroup, setOpenFulfillerGroup] = useState([])
  const { data, isLoading } = useFetchData(
    GET_ENDPOINTS.GET_FULFILLER_GROUP(id),
  )

  useEffect(() => {
    setOpenFulfillerGroup(data?.services)
  }, [data])
  const [selectedId, setSelectedId] = useState(null)

  const addAndRemoveExpert = useCreateData(
    POST_ENDPOINTS.ADD_CATEGORY_TO_GROUP(id, 'add'),
    'addAndRemoveExpert',
  )

  const { data: catalog, isLoading: loadCatalog } = useFetchData(
    GET_ENDPOINTS.ALL_CATEGORIES,
  )

  const [loading, setLoading] = useState(false)
  const [selectedCaller, setSelectedCaller] = useState(null)

  const [options, setOptions] = useState([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setSelectedCaller(null) // optional: clear selection on close
  }
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const [query, setQuery] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    const transformedOptions = catalog?.flatMap((catalog) => [
      {
        id: catalog.id,
        name: catalog.service_name,
        type: 'category', // To identify this as a service
        is_sub_service: false,
        sub_services: catalog.associated_sub_services,
      },
      ...catalog.associated_sub_services.map((subService) => ({
        id: subService.id,
        name: subService.sub_service_name,
        type: 'sub-category', // To identify this as a sub-service
        parent_service: catalog.service_name,
      })),
    ])
    setOptions(transformedOptions)
  }, [catalog])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleInputChange = (event, value) => {
    setQuery(value)
  }

  const handleGroupSelection = async (selected) => {
    setSelectedId(selected?.id)
    const payload = {
      services: selectedCaller?.type === 'category' ? [selectedCaller?.id] : [],
      sub_services:
        selectedCaller?.type === 'sub-category' ? [selectedCaller?.id] : [],
    }
    addAndRemoveExpert.mutate(payload, {
      onSuccess: async () => {
        toast.success('Sent.', {
          autoClose: 5000,
          hideProgressBar: true,
        })
      },
      onError: () => {
        toast.error('Error.', {
          autoClose: 5000,
          hideProgressBar: true,
        })
      },
    })
  }

  return (
    <Box
      sx={{
        width: '98%',
        p: '2em',
        backgroundColor: '#FFFFFF',
        borderRadius: '0.625em',
        minHeight: '60vh',
        margin: 'auto',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Box>
          <Button
            variant="contained"
            onClick={() => router.back()}
            sx={{
              backgroundColor: theme.primary_color,
              color: '#FFF',
              textTransform: 'none',
              fontSize: '0.7em',
              fontWeight: 400,
              padding: '0.375rem 0.75em',
            }}
          >
            &larr; Back
          </Button>
          <Typography
            variant="h6"
            sx={{
              color: '#000000',
              fontSize: '1.5em',
              mb: 3,
              mt: 3,
              textAlign: 'left',
              fontWeight: 500,
              height: '20px',
            }}
          >
            Catalogues in {data?.group_name} Experts
          </Typography>
        </Box>
        <hr />
      </Box>
      <Box sx={{ mb: 4 }}>
        <>
          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{ backgroundColor: theme.primary_color || '#115093' }}
            >
              Add Catalogues to {data?.group_name}
            </Button>
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: '0.5em' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '0.80em', fontWeight: 300 }}>
                    Profile Picture
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.80em', fontWeight: 300 }}>
                    Categories
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.80em', fontWeight: 300 }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.80em', fontWeight: 300 }}>
                    Sub Categories
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.80em', fontWeight: 300 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="circular" width={50} height={50} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : openFulfillerGroup?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
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
                          sx={{
                            fontWeight: 400,
                            fontSize: '1em',
                            color: 'gray',
                          }}
                        >
                          Empty
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  openFulfillerGroup?.map((item) => (
                    <TableRow
                      key={item?.id}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#f5f5f5' },
                      }}
                    >
                      <TableCell>
                        <Avatar
                          src={item?.profile_picture}
                          alt={item?.service_name || item?.sub_service_name}
                          sx={{ width: 50, height: 50, borderRadius: '50%' }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.75em', fontWeight: 500 }}>
                        {item?.service_name || item?.sub_service_name}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.75em', fontWeight: 500 }}>
                        {item?.status}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.75em', fontWeight: 500 }}>
                        {item?.associated_sub_services?.length}
                        <IconButton>
                          <VisibilityIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              router.push(`/dashboard/catalog/${item?.id}`)
                            }
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            // fontSize: '0.80em',
                            color: '#FF4C3B',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          <DeleteIcon
                            sx={{ fontSize: '2em', marginLeft: '4px' }}
                          />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 15]}
              count={data?.employees?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                fontSize: '0.80em',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </TableContainer>
        </>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            p: 4,
            borderRadius: '8px',
            width: 400,
            height: 'auto',
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select Catalog
          </Typography>

          <Autocomplete
            options={options}
            onChange={(_, value) => setSelectedCaller(value)}
            getOptionLabel={(option) => option?.name || 'No name'}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Catalog"
                variant="outlined"
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterOptions={(x) => x} // Allow filtering as search by default
            renderOption={(props, option) => (
              <li {...props}>
                <Typography variant="body2">
                  {option?.name}{' '}
                  {option?.type === 'category'
                    ? '(Category)'
                    : option?.type === 'sub-category'
                      ? `(Sub-category of ${option.parent_service})`
                      : ''}
                </Typography>
              </li>
            )}
            sx={{ width: '100%', mb: 3 }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleGroupSelection}
                disabled={!selectedCaller}
                sx={{ width: '100%', backgroundColor: theme.primary_color }}
              >
                {loading ? <CircularProgress size={24} /> : 'Add Catalogue'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}
