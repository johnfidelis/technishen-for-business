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

// Dummy data for table
const initialData = [
  {
    id: 1,
    title: 'Item One',
    candidate: 'John Fidelis',
    date: '2025-04-10',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Item Two',
    candidate: 'Jame Brown',
    date: '2025-04-09',
    status: 'Inactive',
  },
  {
    id: 3,
    title: 'Item Three',
    candidate: ' Anna Smith',
    date: '2025-04-08',
    status: 'Active',
  },
  {
    id: 4,
    title: 'Item Four',
    candidate: 'John Doe',
    date: '2025-04-07',
    status: 'Inactive',
  },
  {
    id: 5,
    title: 'Item Five',
    candidate: 'Jane Doe',
    date: '2025-04-06',
    status: 'Active',
  },
  {
    id: 6,
    title: 'Item Six',
    candidate: 'Mark Smith',
    date: '2025-04-05',
    status: 'Inactive',
  },
  {
    id: 7,
    title: 'Item Seven',
    candidate: 'Sarah Johnson',
    date: '2025-04-04',
    status: 'Active',
  },
]

export default function Page() {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { data, isLoading } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_INTERVIEWS,
  )

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
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Job Title', 'Candidates', 'Date and Time', 'Status'].map(
                (head, i) => (
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
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Skeleton width={'100%'} height={40} />
                </TableCell>
              </TableRow>
            ) : interviews?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <SentimentDissatisfied />
                  No interviews found.
                </TableCell>
              </TableRow>
            ) : (
              interviews
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
                    <TableCell sx={{ fontSize: '0.75em', fontWeight: 500 }}>
                      {new Date(
                        item?.interview?.scheduled_datetime,
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        color: theme.primary_color || '#115093',
                        textDecoration: 'underline',
                      }}
                      onClick={() => handleRowClick(item)}
                    >
                      <a
                        // href={item.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Interview
                      </a>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={interviews?.length}
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
      {/* <Box sx={{ textAlign: 'right', mt: 3 }}>
        <Button variant="contained" color="primary">
          Add New Item
        </Button>
      </Box> */}
    </Box>
  )
}
