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
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/context/ThemeContext'
import { GET_RESOURCING_ENDPOINTS } from '@/constants/resouringEndpoints'
import { useFetchResourcingData } from '@/hooks/useResourcingApiService'
import { SentimentDissatisfied } from '@mui/icons-material'
import DateRangeInput from '../model1/DateRangeInput'

export default function Page({ filter }) {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  // const [data, setData] = useState(initialData)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('Newest')
  const [statusFilter, setStatusFilter] = useState('All')

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleDateChange = (start, end) => {
    setStartDate(start)
    setEndDate(end)
  }

  const { data, isLoading: loadPost } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_A_POST,
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRowClick = (item) => {
    router.push(`/dashboard/resourcing/posts/open/${item.id}`)
  }

  const filteredData = (data || [])
    .filter((item) => {
      // const isApproved = item?.is_approved === true
      const isFilter = item?.status === filter
      const matchesStatus =
        statusFilter === 'All'
          ? ['approved'].includes(item.is_approved)
          : item.is_approved === statusFilter.toLowerCase()

      const matchesSearch = item?.job_title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
      // const matchesStatus =
      //   statusFilter === 'All'
      //     ? true
      //     : item.status === statusFilter.toLowerCase()

      const jobDate = new Date(item.created_at || item.start_date)
      const matchesDate =
        (!startDate || jobDate >= new Date(startDate)) &&
        (!endDate || jobDate <= new Date(endDate))

      return isFilter && matchesSearch && matchesStatus && matchesDate
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at || a.start_date)
      const dateB = new Date(b.created_at || b.start_date)
      return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB
    })

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FormControl variant="outlined" sx={{ flex: 1, minWidth: '150px' }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sortOrder}
            label="Sort"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </Select>
        </FormControl>

        <DateRangeInput
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />

        <FormControl variant="outlined" sx={{ flex: 1, minWidth: '150px' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            {/* <MenuItem value="Inactive">Inactive</MenuItem> */}
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                'Job ID',
                'Job Title',
                'Numbe of Applicant/Positions',
                'Start - End Date ',
                'Status',
              ]?.map((head, i) => (
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
            {loadPost ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width="40%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="50%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="30%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="40%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="20%" />
                  </TableCell>
                </TableRow>
              ))
            ) : // Render actual data when isLoading is false
            filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10} // Adjust column span based on the number of columns
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
              filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item) => (
                  <TableRow
                    key={item?.post_number}
                    onClick={() => handleRowClick(item)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item?.post_number}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item?.job_title}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item?.total_applications || 0}(applicants) -{' '}
                      {item?.available_positions}(positions)
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item?.start_date} - {item?.end_date}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                        color:
                          item.status === 'open'
                            ? '#1BA847'
                            : item.status === 'closed'
                              ? 'red'
                              : 'inherit',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.status === 'open'
                        ? 'Open - Active'
                        : item.status === 'closed'
                          ? 'Open - Inactive'
                          : 'Closed'}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredData?.length}
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

      {/* Action Button */}
      <Box sx={{ textAlign: 'right', mt: 3 }}>
        <Link href="/dashboard/resourcing/create">
          <Button
            variant="contained"
            sx={{
              borderRadius: '5px',
              backgroundColor: theme.primary_color || '#115093',
              color: '#fff',
            }}
          >
            Add New Item
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
