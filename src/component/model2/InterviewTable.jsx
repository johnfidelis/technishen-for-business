import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { useFetchResourcingData } from '@/hooks/useResourcingApiService'
import { GET_RESOURCING_ENDPOINTS } from '@/constants/resouringEndpoints'
import { SentimentDissatisfied } from '@mui/icons-material'
import DateRangeInput from '../model1/DateRangeInput'

export default function Page() {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  // const { data, isLoading } = useFetchResourcingData(
  //   GET_RESOURCING_ENDPOINTS.GET_INTERVIEWS,
  // )

  // const [searchText, setSearchText] = useState('')
  // const [sortOption, setSortOption] = useState('Newest')
  // const [statusFilter, setStatusFilter] = useState('All')
  // const [startDate, setStartDate] = useState(null)
  // const [endDate, setEndDate] = useState(null)

  const [status, setStatus] = useState('All')
  const [interviewMode, setInterviewMode] = useState('All')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // Build query string
  const queryParams = new URLSearchParams()

  // if (status !== 'All') queryParams.append('status', status)
  if (status !== 'All') {
    queryParams.append('status', status)
  } else {
    queryParams.append('status', 'invited')
    queryParams.append('status', 'confirmed')
    queryParams.append('status', 'declined')
  }
  if (interviewMode !== 'All')
    queryParams.append('interview_mode', interviewMode)
  if (firstName) queryParams.append('search', firstName)

  if (startDate) queryParams.append('start_date', startDate)
  if (endDate) queryParams.append('end_date', endDate)

  const queryString = queryParams.toString()

  const { data, isLoading } = useFetchResourcingData(
    `${GET_RESOURCING_ENDPOINTS.GET_INTERVIEWS}?${queryString}`,
  )

  const handleDateChange = (start, end) => {
    setStartDate(start)
    setEndDate(end)
  }

  // Filter only 'invited' interviews
  // const interviews = data?.filter(
  //   (datum) => datum?.interview?.status?.toLowerCase() === 'invited',
  // )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRowClick = (item) => {
    router.push(
      `/dashboard/resourcing/interviews/${item.interview.application}`,
    )
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
          sx={{ flex: 1, minWidth: '150px' }}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
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
            <MenuItem value="invited">Pending</MenuItem>
            <MenuItem value="confirmed">Approved</MenuItem>
            <MenuItem value="declined">Rejected</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ flex: 1, minWidth: '150px' }}>
          <InputLabel>Interview Mode</InputLabel>
          <Select
            value={interviewMode}
            label="Interview Mode"
            onChange={(e) => setInterviewMode(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="in-person">In Person</MenuItem>
            <MenuItem value="online">Online</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                'Job Title',
                'Candidates',
                'Mode',
                'Date and Time',
                'Status',
                '',
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
                <TableCell colSpan={6} align="center">
                  <Skeleton width={'100%'} height={40} />
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <SentimentDissatisfied />
                  No interviews found.
                </TableCell>
              </TableRow>
            ) : (
              data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow
                    key={item.id}
                    // onClick={() => handleRowClick(item)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    <TableCell sx={{ fontSize: '0.75em', fontWeight: 500 }}>
                      {item.job_post_title}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75em', fontWeight: 500 }}>
                      {item.applicant?.first_name} {item.applicant?.last_name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                      }}
                    >
                      {item?.interview?.interview_mode}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.75em', fontWeight: 500 }}>
                      {new Date(
                        item?.interview?.scheduled_datetime,
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        color:
                          item.interview?.status?.toLowerCase() === 'confirmed'
                            ? 'green'
                            : item.interview?.status?.toLowerCase() ===
                                'declined'
                              ? 'red'
                              : '',
                      }}
                    >
                      {item.interview?.status}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        color:
                          item.interview?.status?.toLowerCase() === 'confirmed'
                            ? theme.primary_color || '#115093'
                            : '',
                        textDecoration:
                          item.interview?.status?.toLowerCase() === 'confirmed'
                            ? 'underline'
                            : '',
                      }}
                      onClick={
                        item.interview?.status?.toLowerCase() === 'confirmed'
                          ? () => handleRowClick(item)
                          : ''
                      }
                    >
                      {item.interview?.status?.toLowerCase() === 'invited' &&
                        '  Awaiting Confirmation'}
                      {item.interview?.status?.toLowerCase() ===
                        'confirmed' && (
                        <a
                          // href={item.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.interview?.interview_mode?.toLowerCase() ===
                          'online'
                            ? 'Join Online Interview'
                            : 'Start In-Person Interview'}
                        </a>
                      )}
                    </TableCell>
                  </TableRow>
                ))
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
