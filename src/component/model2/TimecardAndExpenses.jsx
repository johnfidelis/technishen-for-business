import React, { useContext, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
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
  TablePagination,
  Skeleton,
} from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ListAltIcon from '@mui/icons-material/ListAlt'
import InboxIcon from '@mui/icons-material/Inbox'
import Link from 'next/link'
import { ThemeContext } from '@/context/ThemeContext'
import { useRouter } from 'next/navigation'
import { useFetchResourcingData } from '@/hooks/useResourcingApiService'
import { GET_RESOURCING_ENDPOINTS } from '@/constants/resouringEndpoints'
import { SentimentDissatisfied } from '@mui/icons-material'

export default function Page({ filteJobCompleted }) {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // const { data, isLoading } = useFetchResourcingData(
  //   GET_RESOURCING_ENDPOINTS.GET_TIMECARD_AND_EXPENSES,
  // )

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Build query string
  const queryParams = new URLSearchParams()

  if (search) queryParams.append('search', search)
  if (status !== 'All') queryParams.append('status', status)
  if (startDate) queryParams.append('start_date', startDate)
  if (endDate) queryParams.append('end_date', endDate)

  const queryString = queryParams.toString()

  // API call with dynamic query
  const { data, isLoading } = useFetchResourcingData(
    `${GET_RESOURCING_ENDPOINTS.GET_TIMECARD_AND_EXPENSES}?${queryString}`,
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRowClick = (item) => {
    router.push(`/dashboard/resourcing/timecard/${item.id}`)
  }

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          {
            title: 'Card 1 Title',
            value: ' 1',
            icon: <InsertDriveFileIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Card 2 Title',
            value: ' 2',
            icon: <ListAltIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Card 3 Title',
            value: ' 3',
            icon: <InboxIcon sx={{ color: 'white' }} />,
          },
        ].map((card, index) => (
          <Grid item xs={12} sm={4} md={4} key={index}>
            {/* <Link href={card.path}> */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.primary_color || '#115093',
                color: '#fff',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  padding: '0.6vh 0vh',
                }}
              >
                {card.title} <br /> {card.value}
              </Typography>
              {card.icon}
            </Box>
            {/* </Link> */}
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
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
            sx={{ flex: 1, minWidth: '200px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            type="date"
            label="Start Date"
            variant="outlined"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ flex: 1, minWidth: '200px' }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            type="date"
            label="End Date"
            variant="outlined"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ flex: 1, minWidth: '200px' }}
            InputLabelProps={{ shrink: true }}
          />

          <FormControl variant="outlined" sx={{ flex: 1, minWidth: '150px' }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="submitted">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Declined</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                'Timecard No',
                'Timecard Owner',
                'Job Title',
                'Start Date',
                'End Date',
                'Notes',
                'Total Hours',
                'Overtime Hours',
                'Status',
                'Action',
              ].map((head, i) => (
                <TableCell
                  key={i}
                  sx={{
                    fontSize: '0.80em',
                    fontWeight: 300,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Skeleton width={'100%'} height={40} />
                </TableCell>
              </TableRow>
            ) : data?.length > 0 ? (
              data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    <TableCell>{item.timecard_number}</TableCell>
                    <TableCell>
                      {item?.creator_first_name || item?.creator_last_name
                        ? `${item?.creator_first_name || ''} ${item?.creator_last_name || ''}`.trim()
                        : '-'}
                    </TableCell>
                    <TableCell>{item.job_title || '-'}</TableCell>
                    <TableCell>{item.job_offer_start}</TableCell>
                    <TableCell>{item.job_offer_end}</TableCell>
                    <TableCell>{item.notes || '-'}</TableCell>
                    <TableCell>
                      {item.total_hours - item.overtime_hours}
                    </TableCell>
                    <TableCell>{item.overtime_hours || '0.00'}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          item.status === 'submitted'
                            ? 'goldenrod'
                            : item.status === 'approved'
                              ? '#1BA847'
                              : 'inherit',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.primary_color || '#115093',
                        textDecoration: 'underline',
                      }}
                    >
                      View
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No timecards found.
                  <SentimentDissatisfied
                    sx={{ ml: 1, verticalAlign: 'middle' }}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data?.length}
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
    </Box>
  )
}
