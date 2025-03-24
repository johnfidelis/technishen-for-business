import React, { useState } from 'react'
import {
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { useFetchData } from '@/hooks/useApiService'
import { useRouter } from 'next/navigation'

const BookingsTable = ({ customerId, ticketType }) => {
  const router = useRouter()
  const endpoint =
    ticketType === 'External' || ticketType === 'customer'
      ? GET_ENDPOINTS.CUSTOMER_TICKET_HISTORY(customerId)
      : GET_ENDPOINTS.EMPLOYEE_TICKET_HISTORY(customerId)

  // Fetch data using the selected endpoint
  const { data: bookings, isLoading } = useFetchData(endpoint)
  console.log({ bookings })

  const rows = [
    {
      caller: 'Vivica Samkelo',
      category: 'IT',
      subCategory: 'Software',
      dateTime: '29/05/2023 02:39 PM',
      type: 'Internal',
      status: 'Open',
    },
    {
      caller: 'John Doe',
      category: 'HR',
      subCategory: 'Recruitment',
      dateTime: '01/06/2023 10:15 AM',
      type: 'External',
      status: 'Closed',
    },
    {
      caller: 'Jane Smith',
      category: 'Finance',
      subCategory: 'Audit',
      dateTime: '15/07/2023 01:45 PM',
      type: 'Internal',
      status: 'Open',
    },
    // Add more sample data if needed
  ]

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box style={{ marginTop: '50px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          mb: 4,
          flexWrap: 'wrap',
        }}
      >
        {/* Search */}
        <TextField
          label="Search"
          variant="outlined"
          sx={{ flex: 1, minWidth: '200px' }}
        />

        {/* Sort */}
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
          <TextField label="Sort " select>
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </TextField>
        </FormControl>

        {/* Search by dates */}
        <TextField
          label="Search by dates"
          variant="outlined"
          value="29 April 2022 - 30 May 2023"
          sx={{ flex: 1, minWidth: '250px' }}
          InputProps={{ readOnly: true }}
        />

        {/* Status */}
        <FormControl
          variant="outlined"
          sx={{
            flex: 1,
            minWidth: '200px',
            maxWidth: '330px',
            fontSize: '0.80em',
          }}
        >
          <InputLabel>Status</InputLabel>
          <Select defaultValue="Open" label="Status">
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Bookings Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '0.5em' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Ticket Number</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub-Category</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings?.tickets
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ticket, index) => (
                <TableRow
                  key={index}
                  onClick={() =>
                    router.push(`/dashboard/ticket/i/${ticket.id}`)
                  }
                  hover
                >
                  <TableCell>{ticket.ticket_number}</TableCell>
                  <TableCell>{ticket.service}</TableCell>
                  <TableCell>{ticket.sub_service}</TableCell>
                  <TableCell>{ticket.address}</TableCell>
                  <TableCell>{ticket.assigned_to.name}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={bookings?.tickets?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  )
}

export default BookingsTable
