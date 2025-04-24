import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import { GET_ENDPOINTS, PATCH_ENDPOINTS } from '@/constants/endpoints'
import { useFetchData, usePatchData } from '@/hooks/useApiService'
import { useRouter } from 'next/navigation'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import { MdBlock } from 'react-icons/md'
import { toast } from 'react-toastify'

const PenaltyTable = ({ role, setNumber, userType }) => {
  const getTargetKey = () =>
    userType === 'employee' ? 'target_employee' : 'target_customer'

  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('Newest')
  // const [roleFilter, setRoleFilter] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data: allEmployee, isLoading } = useFetchData(
    GET_ENDPOINTS.PUBLISHMENT_LOG(),
    { action: 'block' },
    'allEmployee',
  )

  const patchBlockAndUnblock = usePatchData(
    PATCH_ENDPOINTS.BLOCK_UNBLOCK_USER(),
    'blockandUnblock',
  )

  useEffect(() => {
    if (setNumber && typeof setNumber === 'function') {
      const fetchedNumber = allEmployee
        ? allEmployee.filter((employee) =>
            role ? employee.role === role : true,
          ).length
        : 0

      setNumber(fetchedNumber)
    }
  }, [allEmployee, role])

  const handleSearchChange = (event) => setSearchTerm(event.target.value)
  const handleSortChange = (event) => setSortOrder(event.target.value)
  // const handleRoleFilterChange = (event) => setRoleFilter(event.target.value)
  const handleChangePage = (_, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // const filteredEmployees = allEmployee
  //   ?.filter((employee) =>
  //     `${employee.first_name} ${employee.last_name}`
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()),
  //   )
  //   ?.filter((employee) => (role ? employee.role === role : true))
  //   ?.sort((a, b) =>
  //     sortOrder === 'Newest'
  //       ? b.timestamp.localeCompare(a.timestamp)
  //       : a.timestamp.localeCompare(b.timestamp),
  //   )

  const filteredEmployees = allEmployee
    ?.filter((employee) =>
      `${employee.first_name} ${employee.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
    ?.filter((employee) => (role ? employee.role === role : true))
    ?.filter((employee) => {
      if (!userType) return true
      if (userType === 'customer') return employee.target_customer !== null
      if (userType === 'employee') return employee.target_employee !== null
      return true
    })
    ?.sort((a, b) =>
      sortOrder === 'Newest'
        ? b.timestamp.localeCompare(a.timestamp)
        : a.timestamp.localeCompare(b.timestamp),
    )

  const handleUnblockEmployee = async (employeeId) => {
    const payload = {
      target_type: userType,
      target_id: employeeId,
      action: 'unblock',
      reason: '',
    }

    try {
      await patchBlockAndUnblock.mutateAsync(payload)
      toast.success('Employee unblocked successfully', {
        autoClose: 5000,
        hideProgressBar: true,
      })
    } catch (error) {
      toast.error('Failed to unblock employee', {
        autoClose: 5000,
        hideProgressBar: false,
      })
    }
  }

  const handleEnableEmployee = async (employeeId) => {
    const payload = {
      target_type: userType,
      target_id: employeeId,
      action: 'enable',
      reason: '',
    }

    try {
      await patchBlockAndUnblock.mutateAsync(payload)
      toast.success('Employee enabled successfully', {
        autoClose: 5000,
        hideProgressBar: true,
      })
    } catch (error) {
      toast.error('Failed to enable employee', {
        autoClose: 5000,
        hideProgressBar: false,
      })
    }
  }

  return (
    <>
      {/* Filters */}
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
          value={searchTerm}
          onChange={handleSearchChange}
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
        {/* <FormControl variant="outlined"   sx={{ flex: 1, minWidth: '200px', maxWidth: '330px', fontSize: '0.80em' }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={roleFilter}
            // onChange={handleRoleFilterChange}
            label="Role"
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Fulfiller">Fulfiller</MenuItem>
          </Select>
        </FormControl> */}
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {[
                'Profile Picture',
                'Name',
                'Email',
                'Role',
                'Last Activity',
                // 'Actions',
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
            {isLoading || isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredEmployees?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <SentimentDissatisfiedIcon
                      sx={{ fontSize: 50, color: 'gray' }}
                    />
                    <Typography>No employee found</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((employee) => (
                  <TableRow key={employee.id} sx={{ cursor: 'pointer' }} hover>
                    <TableCell
                      onClick={() =>
                        router.push(
                          `/dashboard/${userType}/sanctions/details/${employee?.[getTargetKey()]?.id}`,
                        )
                      }
                    >
                      <Avatar
                        src={`https://technishenbackend.onrender.com${employee?.[getTargetKey()]?.profile_picture}`}
                        alt={`${employee?.[getTargetKey()]?.first_name} ${employee?.[getTargetKey()]?.last_name}`}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(
                          `/dashboard/${userType}/sanctions/details/${employee?.[getTargetKey()]?.id}`,
                        )
                      }
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >{`${employee?.[getTargetKey()]?.first_name} ${employee?.[getTargetKey()]?.last_name}`}</TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(
                          `/dashboard/${userType}/sanctions/details/${employee?.[getTargetKey()]?.id}`,
                        )
                      }
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {employee?.[getTargetKey()]?.email}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(
                          `/dashboard/${userType}/sanctions/details/${employee?.[getTargetKey()]?.id}`,
                        )
                      }
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                        textTransform: 'capitalize',
                      }}
                    >
                      {employee?.[getTargetKey()]?.role || userType}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(
                          `/dashboard/${userType}/sanctions/details/${employee?.[getTargetKey()]?.id}`,
                        )
                      }
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                        textTransform: 'capitalize',
                      }}
                    >
                      {employee.action}
                    </TableCell>
                    {/* <TableCell>
                      {employee?.action === 'block' ? (
                        <Typography
                          variant="contained"
                          onClick={() =>
                            handleUnblockEmployee(
                              employee?.[getTargetKey()]?.id,
                            )
                          }
                          sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          Unblock
                          <MdBlock size={16} sx={{ color: '#1BA847' }} />
                        </Typography>
                      ) : employee?.action === 'disable' ? (
                        <Typography
                          variant="contained"
                          onClick={() =>
                            handleEnableEmployee(employee?.[getTargetKey()]?.id)
                          }
                          sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          Enable
                          <PersonOffIcon
                            sx={{ color: '#1BA847', fontSize: 16 }}
                          />
                        </Typography>
                      ) : null}
                    </TableCell> */}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredEmployees?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ fontSize: '0.80em', fontFamily: 'Inter, sans-serif' }}
        />
      </TableContainer>
    </>
  )
}

export default PenaltyTable
