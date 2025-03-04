import React, { useState } from 'react'
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TablePagination,
  Typography,
  Skeleton,
} from '@mui/material'
import { SentimentDissatisfied } from '@mui/icons-material'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { useFetchData } from '@/hooks/useApiService'
import { useRouter } from 'next/navigation'

const CustomersTable = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('Newest')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { data: customers, isLoading } = useFetchData(
    GET_ENDPOINTS.ALL_CUSTOMER,
    'allCustomer',
  )
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSortChange = (event) => {
    setSortOrder(event.target.value)
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

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
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '0.5em' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {[
                'Profile Picture',
                'Name',
                'Email',
                'Business Name',
                'Phone Number',
                'Address',
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
            {isLoading ? (
              <TableRow>
                {[...Array(7)].map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ) : customers?.length === 0 ? (
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
                      sx={{ fontWeight: 400, fontSize: '1em', color: 'gray' }}
                    >
                      No Customers found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              customers
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer) => (
                  <TableRow
                    key={customer.id}
                    sx={{ cursor: 'pointer' }}
                    onClick={() =>
                      router.push(`/dashboard/customer/${customer.id}`)
                    }
                    hover
                  >
                    <TableCell>
                      <Avatar
                        src={
                          'https://technishenbackend.onrender.com' +
                          customer.profile_picture
                        }
                        alt={customer.first_name}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: '0.75em', fontWeight: 500 }}
                    >{`${customer.first_name} ${customer.last_name}`}</TableCell>
                    <TableCell sx={{ fontSize: '0.75em', fontWeight: 500 }}>
                      {customer.email}
                    </TableCell>
                    <TableCell>
                      {customer.business_name || 'Not a business'}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75em', fontWeight: 500 }}>
                      {customer.phone_number}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75em', fontWeight: 500 }}>
                      {customer.address}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        color:
                          customer.status === 'Accepted'
                            ? '#1BA847'
                            : '#FFC107',
                        textDecoration: 'underline',
                      }}
                    >
                      {customer.status === 'Accepted'
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
          count={customers?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ fontSize: '0.80em', fontFamily: 'Inter, sans-serif' }}
        />
      </TableContainer>
    </Box>
  )
}

export default CustomersTable
