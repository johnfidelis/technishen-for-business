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
  const { data, isLoading } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_INTERVIEWS,
  )

  const [searchText, setSearchText] = useState('')
  const [sortOption, setSortOption] = useState('Newest')
  const [statusFilter, setStatusFilter] = useState('All')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleDateChange = (start, end) => {
    setStartDate(start)
    setEndDate(end)
  }

  // Filter only 'invited' interviews
  const interviews = data?.filter(
    (datum) => datum?.interview?.status?.toLowerCase() === 'invited',
  )

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

  const filteredInterviews = data
    ?.filter(
      (datum) =>
        datum?.interview?.status?.toLowerCase() === 'invited' ||
        datum?.interview?.status?.toLowerCase() === 'confirmed' ||
        datum?.interview?.status?.toLowerCase() === 'declined',
    )
    ?.filter((datum) => datum?.job_offer_status === null)
    ?.filter((datum) => {
      const nameMatch =
        `${datum.applicant?.first_name} ${datum.applicant?.last_name}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      const jobMatch = datum.job_post_title
        ?.toLowerCase()
        .includes(searchText.toLowerCase())
      return nameMatch || jobMatch
    })
    ?.filter((datum) => {
      if (statusFilter === 'All') return true
      return (
        datum.interview?.status?.toLowerCase() === statusFilter.toLowerCase()
      )
    })
    ?.filter((datum) => {
      if (!startDate || !endDate) return true
      const interviewDate = new Date(datum.interview?.scheduled_datetime)
      return (
        interviewDate >= new Date(startDate) &&
        interviewDate <= new Date(endDate)
      )
    })
    ?.sort((a, b) => {
      if (sortOption === 'Newest' || sortOption === 'Oldest') {
        const aDate = new Date(a.interview?.scheduled_datetime)
        const bDate = new Date(b.interview?.scheduled_datetime)
        return sortOption === 'Newest' ? bDate - aDate : aDate - bDate
      } else if (sortOption === 'online' || sortOption === 'in-person') {
        // Sort by interview mode: bring selected mode first
        const aMode = a.interview?.interview_mode?.toLowerCase() || ''
        const bMode = b.interview?.interview_mode?.toLowerCase() || ''
        if (aMode === sortOption && bMode !== sortOption) return -1
        if (aMode !== sortOption && bMode === sortOption) return 1
        return 0 // keep relative order if both match or don't match
      }
      return 0 // fallback no sorting
    })

  // ?.sort((a, b) => {
  //   const aDate = new Date(a.interview?.scheduled_datetime)
  //   const bDate = new Date(b.interview?.scheduled_datetime)
  //   return sortOption === 'Newest' ? bDate - aDate : aDate - bDate
  // })

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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ flex: 1, minWidth: '200px' }}
        />

        <FormControl variant="outlined" sx={{ flex: 1, minWidth: '150px' }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort"
          >
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
            <MenuItem value="online">Online Interview</MenuItem>
            <MenuItem value="in-person">In-Person Interview</MenuItem>
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
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="invited">Invited</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="declined">Declined</MenuItem>
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
            ) : filteredInterviews?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <SentimentDissatisfied />
                  No interviews found.
                </TableCell>
              </TableRow>
            ) : (
              filteredInterviews
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
          count={filteredInterviews?.length}
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
