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
import { useFetchResourcingData } from '@/hooks/useResourcingApiService'
import { GET_RESOURCING_ENDPOINTS } from '@/constants/resouringEndpoints'
import { SentimentDissatisfied } from '@mui/icons-material'
import DateRangeInput from '../model1/DateRangeInput'

export default function Page({ filter }) {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  // const [data, setData] = useState(initialData)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('Newest')
  const [status, setStatus] = useState('All')

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleDateChange = (start, end) => {
    setStartDate(start)
    setEndDate(end)
  }

  const { data, isLoading: loadPost } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_A_POST,
  )
  // const filteredData = data
  //   ?.filter((item) => {
  //     const matchesStatus = status === 'All' || item.status === status
  //     const matchesSearch =
  //       item.job_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       item.company?.toLowerCase().includes(searchQuery.toLowerCase())

  //     const jobDate = new Date(item.created_at || item.start_date)
  //     const matchesDate =
  //       (!startDate || jobDate >= new Date(startDate)) &&
  //       (!endDate || jobDate <= new Date(endDate))
  //     return matchesStatus && matchesSearch && matchesDate
  //   })
  //   ?.sort((a, b) => {
  //     const dateA = new Date(a.created_at)
  //     const dateB = new Date(b.created_at)
  //     return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB
  //   })

  const filteredData = data
    ?.filter((item) => {
      const matchesStatus =
        status === 'All'
          ? ['declined', 'pending'].includes(item.is_approved)
          : item.is_approved === status
      const matchesSearch =
        item.job_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company?.toLowerCase().includes(searchQuery.toLowerCase())

      const jobDate = new Date(item.created_at || item.start_date)
      const matchesDate =
        (!startDate || jobDate >= new Date(startDate)) &&
        (!endDate || jobDate <= new Date(endDate))

      return matchesStatus && matchesSearch && matchesDate
    })
    ?.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB
    })

  const paginatedData = filteredData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRowClick = (item) => {
    router.push(`/dashboard/resourcing/posts/requests/${item.id}`)
  }

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          {
            title: 'Total Request',
            value: ' 1',
            icon: <InsertDriveFileIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Declined  Request',
            value: ' 2',
            icon: <ListAltIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Average Request Per Month',
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <FormControl variant="outlined" sx={{ flex: 1, minWidth: '150px' }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sort"
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="pending">Job Requests</MenuItem>
            <MenuItem value="declined">Decline Jobs</MenuItem>
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
                'Job Type',
                'Job Title',
                'Company',
                'Available Positions',
                'Working Hours',
                'Experience Level',
                'Project Location',
                'Selected Categories',
                'Date Created',
                'Status',
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
            {/* Check if data is loading */}
            {loadPost ? (
              // Show loading skeleton rows when isLoading is true
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width="80%" />
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
                  <TableCell>
                    <Skeleton variant="text" width="80%" />
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
            ) : // Render actual data when isLoading is false
            paginatedData?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11} // Adjust column span based on the number of columns
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
              // If data exists, map through the filtered items
              paginatedData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                      textTransform: 'capitalize',
                    }}
                  >
                    {/* Job Type */}
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.post_number}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.work_type}
                    </TableCell>

                    {/* Job Title */}
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.job_title}
                    </TableCell>

                    {/* Company */}
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.company_name}
                    </TableCell>

                    {/* Available Positions */}
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.available_positions}
                    </TableCell>

                    {/* Working Hours */}
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.work_hours}
                    </TableCell>

                    {/* Experience Level */}
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.experience_level}
                    </TableCell>

                    {/* Project Location */}
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.location}
                    </TableCell>

                    {/* Selected Categories */}
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {item.desired_skill_set.map((cat) => cat.name).join(', ')}
                    </TableCell>

                    {/* Date Created */}
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {new Date(item.created_at).toLocaleDateString()}
                    </TableCell>

                    {/* Status with Approve and Decline Buttons */}
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                        textTransform: 'capitalize',
                        display: 'flex',
                      }}
                    >
                      {item.is_approved === 'pending' ? (
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: '#1BA847',
                            color: '#fff',
                            textTransform: 'none',
                            mr: 1,
                            fontSize: '0.7em',
                            fontWeight: 500,
                            fontFamily: 'Inter, sans-serif',
                            '&:hover': {
                              backgroundColor: '#15963b',
                            },
                          }}
                          // onClick={() => handleApprove(item)}
                        >
                          Update
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: 'red',
                            color: '#fff',
                            textTransform: 'none',
                            mr: 1,
                            fontSize: '0.7em',
                            fontWeight: 500,
                            fontFamily: 'Inter, sans-serif',
                            '&:hover': {
                              backgroundColor: 'red',
                            },
                          }}
                        >
                          Reapply
                        </Button>
                      )}

                      {/* <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: 'red',
                          color: '#fff',
                          textTransform: 'none',
                          fontSize: '0.7em',
                          fontWeight: 500,
                          fontFamily: 'Inter, sans-serif',
                          '&:hover': {
                            backgroundColor: '#cc0000',
                          },
                        }}
                        // onClick={() => handleDecline(item)}
                      >
                        Delete
                      </Button> */}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={paginatedData?.length}
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
