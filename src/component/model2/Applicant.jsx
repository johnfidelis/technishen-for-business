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
} from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ListAltIcon from '@mui/icons-material/ListAlt'
import InboxIcon from '@mui/icons-material/Inbox'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/context/ThemeContext'
import { GET_RESOURCING_ENDPOINTS } from '@/constants/resouringEndpoints'
import { useFetchResourcingData } from '@/hooks/useResourcingApiService'

// Dummy data for table
const initialData = [
  {
    id: 3434,
    candidateName: 'Item One',
    currentMatch: 93,
    availability: 'Immediately',
    dateApplied: '2025-04-10',
    action: 'View',
  },
  {
    id: 2323,
    candidateName: 'Item Two',
    currentMatch: 60,
    availability: 'Immediately',
    dateApplied: '2025-04-09',
    action: 'View',
  },
  {
    id: 323233,
    candidateName: 'Item Three',
    currentMatch: 45,
    availability: 'In 30 days',
    dateApplied: '2025-04-08',
    action: 'View',
  },
  {
    id: 43233,
    candidateName: 'Item Four',
    currentMatch: 81,
    availability: 'Calendar Month',
    dateApplied: '2025-04-07',
    action: 'View',
  },
  {
    id: 52323,
    candidateName: 'Item Five',
    currentMatch: 32,
    availability: 'Immediately',
    dateApplied: '2025-04-06',
    action: 'View',
  },
  {
    id: 63233,
    candidateName: 'Item Six',
    currentMatch: 68,
    availability: 'Calendar Month',
    dateApplied: '2025-04-05',
    action: 'View',
  },
  {
    id: 73232,
    candidateName: 'Item Seven',
    currentMatch: 55,
    availability: 'Immediately',
    dateApplied: '2025-04-04',
    action: 'View',
  },
]

export default function Page({ id }) {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  const [data, setData] = useState(initialData)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { data: ticket, isLoading } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_A_POST_DETAILS(id),
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRowClick = (item) => {
    router.push(`/dashboard/resourcing/posts/open/candidate/${item.id}`)
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
              {[
                'Candidate Name',
                'Current Match',
                'Availability',
                'Date Applied',
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
                    {item.candidateName}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                      color:
                        item.currentMatch < 50
                          ? 'red'
                          : item.currentMatch <= 80
                            ? '#F5A623' // Yellow-ish
                            : '#1BA847', // Green
                    }}
                  >
                    {item.currentMatch}%
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.availability}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.dateApplied}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                      color: '#1976d2',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    onClick={() => console.log('Clicked Action for', item)}
                  >
                    {item.action}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
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
      </Box>
    </Box>
  )
}
