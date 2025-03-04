import React, { useState } from 'react'
import {
  Avatar,
  Box,
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
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { useFetchData } from '@/hooks/useApiService'
import { useRouter } from 'next/navigation'

const EmployeeTable = ({role}) => {
   const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('Newest')
  // const [roleFilter, setRoleFilter] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data: allEmployee, isLoading } = useFetchData(
    GET_ENDPOINTS.ALL_EMPLOYEE,
    'allEmployee',
  )

  const handleSearchChange = (event) => setSearchTerm(event.target.value)
  const handleSortChange = (event) => setSortOrder(event.target.value)
  // const handleRoleFilterChange = (event) => setRoleFilter(event.target.value)
  const handleChangePage = (_, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredEmployees = allEmployee
    ?.filter((employee) =>
      `${employee.first_name} ${employee.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
    ?.filter((employee) => (role ? employee.role === role : true))
    ?.sort((a, b) =>
      sortOrder === 'Newest'
        ? b.hire_date.localeCompare(a.hire_date)
        : a.hire_date.localeCompare(b.hire_date),
    )

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
        <FormControl variant="outlined" sx={{ flex: 1, minWidth: '150px' }}>
          <InputLabel>Sort</InputLabel>
          <Select value={sortOrder} onChange={handleSortChange} label="Sort">
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl variant="outlined" sx={{ flex: 1, minWidth: '150px' }}>
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
      <TableContainer component={Paper} sx={{ borderRadius: '0.5em' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {[
                'Profile Picture',
                'Name',
                'Email',
                'Position',
                'Phone Number',
                'Date of Hire',
                'Status',
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontSize: '0.80em',
                    fontWeight: 500,
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
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredEmployees?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
                  <TableRow
                    key={employee.id}
                    sx={{ cursor: 'pointer' }}
                    onClick={() =>
                      router.push(`/dashboard/employee/${employee.id}`)
                    }
                    hover
                  >
                    <TableCell>
                      <Avatar
                        src={`https://technishenbackend.onrender.com${employee.profile_picture}`}
                        alt={`${employee.first_name} ${employee.last_name}`}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >{`${employee.first_name} ${employee.last_name}`}</TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {employee.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {employee.position}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {employee.phone_number}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {employee.hire_date}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 700,
                        fontFamily: 'Inter, sans-serif',
                        color:
                          employee.status === 'Accepted'
                            ? '#1BA847'
                            : '#FFC107',
                        textDecoration: 'underline',
                      }}
                    >
                      {employee.status === 'Accepted'
                        ? 'Account Linked'
                        : 'Invitation Sent'}
                    </TableCell>
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

export default EmployeeTable
