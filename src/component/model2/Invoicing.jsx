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
import { ThemeContext } from '@/context/ThemeContext'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

// Dummy data for table
const invoiceData = [
  {
    invoiceId: 'INV-TC001',
    invoicingDate: '2025-04-10',
    supplier: 'John Fidelis',
    cutoffDate: '2025-09-10',
    invoiceFiles: 'invoice_TC001.pdf',
    status: 'Pending',
    paymentDate: null,
  },
  {
    invoiceId: 'INV-TC002',
    invoicingDate: '2025-04-09',
    supplier: 'Jame Brown',
    cutoffDate: '2025-09-10',
    invoiceFiles: 'invoice_TC002.pdf',
    status: 'Paid',
    paymentDate: '2025-04-12',
  },
  {
    invoiceId: 'INV-TC003',
    invoicingDate: '2025-04-08',
    supplier: 'Anna Smith',
    cutoffDate: '2025-09-10',
    invoiceFiles: 'invoice_TC003.pdf',
    status: 'Pending',
    paymentDate: null,
  },
  {
    invoiceId: 'INV-TC004',
    invoicingDate: '2025-04-07',
    supplier: 'John Doe',
    cutoffDate: '2025-09-10',
    invoiceFiles: 'invoice_TC004.pdf',
    status: 'Paid',
    paymentDate: '2025-04-11',
  },
  {
    invoiceId: 'INV-TC005',
    invoicingDate: '2025-04-06',
    supplier: 'Jane Doe',
    cutoffDate: '2025-09-10',
    invoiceFiles: 'invoice_TC005.pdf',
    status: 'Pending',
    paymentDate: null,
  },
  {
    invoiceId: 'INV-TC006',
    invoicingDate: '2025-04-05',
    supplier: 'Mark Smith',
    cutoffDate: '2025-09-10',
    invoiceFiles: 'invoice_TC006.pdf',
    status: 'Paid',
    paymentDate: '2025-04-10',
  },
  {
    invoiceId: 'INV-TC007',
    invoicingDate: '2025-04-04',
    supplier: 'Sarah Johnson',
    cutoffDate: '2025-09-10',
    invoiceFiles: 'invoice_TC007.pdf',
    status: 'Pending',
    paymentDate: null,
  },
]

export default function Page() {
  const { theme } = useContext(ThemeContext)
  const [data, setData] = useState(invoiceData)
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
    console.log('Clicked row:', item)
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
            <MenuItem value="Paid">Paid</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                'Invoice ID',

                'Invoicing Date',
                'Supplier',
                'Cutoff Date',
                'Invoice Files',

                'Status',
                'Payment Date',
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
                  key={item.invoiceId}
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
                    {item.invoiceId}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.invoicingDate}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.supplier}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.cutoffDate}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.invoiceFiles?.endsWith('.pdf') ? (
                      <>
                        <PictureAsPdfIcon color="error" />
                        <InsertDriveFileIcon sx={{ color: '#1D6F42' }} />
                      </>
                    ) : item.invoiceFiles?.endsWith('.xlsx') ||
                      item.invoiceFiles?.endsWith('.xls') ? (
                      <>
                        <PictureAsPdfIcon color="error" />
                        <InsertDriveFileIcon sx={{ color: '#1D6F42' }} />
                      </>
                    ) : (
                      item.invoiceFiles
                    )}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                      color:
                        item.status === 'Pending'
                          ? 'goldenrod'
                          : item.status === 'Paid'
                            ? '#1BA847'
                            : 'inherit',
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.status}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.paymentDate == null ? '--/--/----' : item.paymentDate}
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
    </Box>
  )
}
