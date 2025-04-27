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

// Dummy data for table
const initialData = [
  {
    id: 3434,
    title: 'Item One',
    count: 10,
    date: '2025-04-10',
    type: 'open',
    status: 'active',
  },
  {
    id: 2323,
    title: 'Item Two',
    count: 20,
    date: '2025-04-09',
    type: 'open',
    status: 'inactive',
  },
  {
    id: 323233,
    title: 'Item Three',
    count: 15,
    date: '2025-04-08',
    type: 'open',
    status: 'active',
  },
  {
    id: 43233,
    title: 'Item Four',
    count: 8,
    date: '2025-04-07',
    type: 'close',
    status: 'inactive',
  },
  {
    id: 52323,
    title: 'Item Five',
    count: 12,
    date: '2025-04-06',
    type: 'close',
    status: 'active',
  },
  {
    id: 63233,
    title: 'Item Six',
    count: 18,
    date: '2025-04-05',
    type: 'close',
    status: 'inactive',
  },
  {
    id: 73232,
    title: 'Item Seven',
    count: 5,
    date: '2025-04-04',
    type: 'open',
    status: 'active',
  },
]

export default function Page({ filter }) {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  const [data, setData] = useState(initialData)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

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
                'Job ID',
                'Job Title',
                'Numbe of Applicant',
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
            {data
              .filter((item) => item.type === filter)
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
                    IT-{item.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.count}
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
                      color:
                        item.type == 'open' && item.status === 'active'
                          ? '#1BA847'
                          : item.type == 'open' && item.status === 'inactive'
                            ? 'red'
                            : 'inherit',
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.type == 'open' && item.status === 'active'
                      ? 'Open - Active'
                      : item.type == 'open' && item.status === 'inactive'
                        ? 'Open - Inactive'
                        : 'Closed'}
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
