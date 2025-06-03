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

// Dummy data for table
const initialData = [
  {
    id: 1,
    timecardNo: 'TC001',
    title: 'Item One',
    name: 'John Fidelis',
    date: '2025-04-10',
    endDate: '2025-09-10',
    rate: '900',
    totalHours: 120,
    approver: 'Michael Scott',
    isJobCompleted: false,
    status: 'Pending',
    action: 'View',
  },
  {
    id: 2,
    timecardNo: 'TC002',
    title: 'Item Two',
    name: 'Jame Brown',
    date: '2025-04-09',
    endDate: '2025-09-10',
    rate: '400',
    totalHours: 90,
    approver: 'Pam Beesly',
    isJobCompleted: true,
    status: 'Approved',
    action: 'View',
  },
  {
    id: 3,
    timecardNo: 'TC003',
    title: 'Item Three',
    name: 'Anna Smith',
    date: '2025-04-08',
    endDate: '2025-09-10',
    rate: '200',
    totalHours: 60,
    approver: 'Jim Halpert',
    isJobCompleted: false,
    status: 'Pending',
    action: 'View',
  },
  {
    id: 4,
    timecardNo: 'TC004',
    title: 'Item Four',
    name: 'John Doe',
    date: '2025-04-07',
    endDate: '2025-09-10',
    rate: '100',
    totalHours: 40,
    approver: 'Dwight Schrute',
    isJobCompleted: false,
    status: 'Approved',
    action: 'View',
  },
  {
    id: 5,
    timecardNo: 'TC005',
    title: 'Item Five',
    name: 'Jane Doe',
    date: '2025-04-06',
    endDate: '2025-09-10',
    rate: '190',
    totalHours: 70,
    approver: 'Stanley Hudson',
    isJobCompleted: true,
    status: 'Pending',
    action: 'View',
  },
  {
    id: 6,
    timecardNo: 'TC006',
    title: 'Item Six',
    name: 'Mark Smith',
    date: '2025-04-05',
    endDate: '2025-09-10',
    rate: '480',
    totalHours: 100,
    approver: 'Phyllis Vance',
    isJobCompleted: true,
    status: 'Approved',
    action: 'View',
  },
  {
    id: 7,
    timecardNo: 'TC007',
    title: 'Item Seven',
    name: 'Sarah Johnson',
    date: '2025-04-04',
    endDate: '2025-09-10',
    rate: '1200',
    totalHours: 150,
    approver: 'Toby Flenderson',
    isJobCompleted: true,
    status: 'Pending',
    action: 'View',
  },
]

export default function Page({ filteJobCompleted }) {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { data, isLoading } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_TIMECARD_AND_EXPENSES,
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
        />

        <FormControl variant="outlined" sx={{ flex: 1, minWidth: '150px' }}>
          <InputLabel>Sort</InputLabel>
          <Select defaultValue="Newest" label="Sort">
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search by dates"
          variant="outlined"
          value="Date Range"
          sx={{ flex: 1, minWidth: '250px' }}
          InputProps={{ readOnly: true }}
        />

        <FormControl variant="outlined" sx={{ flex: 1, minWidth: '150px' }}>
          <InputLabel>Status</InputLabel>
          <Select defaultValue="All" label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
        {/* <Table>
          <TableHead>
            <TableRow>
              {[
                'Timecard No',
                'Name',
                'Start Date',
                'End Date',
                'Total Amount',
                'Total Hours',
                'Approver',
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow
                  key={item.id}
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
                    {item.timecardNo}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.date}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.endDate}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.rate}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.totalHours}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.approver}
                  </TableCell>
                  {item.isJobCompleted == false ? (
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                        color:
                          item.status === 'Pending'
                            ? 'goldenrod'
                            : item.status === 'Approved'
                              ? '#1BA847'
                              : 'inherit',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.status}
                    </TableCell>
                  ) : (
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                        color: '#1BA847',

                        textTransform: 'capitalize',
                      }}
                    >
                      Completed
                    </TableCell>
                  )}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                      color: theme.primary_color || '#115093',
                      textDecoration: 'underline',
                    }}
                  >
                    View
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table> */}

        <Table>
          <TableHead>
            <TableRow>
              {[
                'Timecard No',
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
                <TableCell colSpan={9} align="center">
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
                    <TableCell>{item.job_title || '-'}</TableCell>
                    <TableCell>{item.job_offer_start}</TableCell>
                    <TableCell>{item.job_offer_end}</TableCell>
                    <TableCell>{item.notes || '-'}</TableCell>
                    <TableCell>{item.total_hours}</TableCell>
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
