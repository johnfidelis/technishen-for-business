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

import { ThemeContext } from '@/context/ThemeContext'
import { useFetchResourcingData } from '@/hooks/useResourcingApiService'
import { GET_RESOURCING_ENDPOINTS } from '@/constants/resouringEndpoints'
import { SentimentDissatisfied } from '@mui/icons-material'

export default function Page({ filter }) {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { data, isLoading } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_INTERVIEWS,
  )

  // Filter only 'invited' interviews
  // const interviews = data?.filter(
  //   (datum) => datum?.interview?.status?.toLowerCase() === 'passed',
  // )
  // Filter only 'invited' interviews
  const interviews = data?.filter(
    (datum) =>
      ['passed', 'confirmed'].includes(
        datum?.interview?.status?.toLowerCase(),
      ) && datum?.job_offer_status === 'accepted',
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
      `/dashboard/resourcing/posts/open/${item.job_post_id}/${item.applicant.id}`,
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
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
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
                'Job Post Date',
                'Interview Date',
                'Offer',
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Skeleton width={'100%'} height={40} />
                </TableCell>
              </TableRow>
            ) : (
              interviews
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item) => {
                  const fullName = `${item?.applicant?.first_name || ''} ${item?.applicant?.last_name || ''}`
                  const date = new Date(
                    item?.scheduled_datetime,
                  ).toLocaleString()
                  const endDate = new Date(item?.updated_at).toLocaleString()

                  return (
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
                        {item.job_post_title}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '0.75em',
                          fontWeight: 500,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {fullName}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '0.75em',
                          fontWeight: 500,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {new Date(item.interview?.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '0.75em',
                          fontWeight: 500,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {new Date(
                          item.interview?.scheduled_datetime,
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '0.75em',
                          fontWeight: 500,
                          fontFamily: 'Inter, sans-serif',
                          color:
                            item?.job_offer_status == 'sent'
                              ? 'green'
                              : 'black',
                          textTransform: 'capitalize',
                        }}
                      >
                        {item?.job_offer_status || 'Not sent'}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '0.75em',
                          fontWeight: 500,
                          fontFamily: 'Inter, sans-serif',
                          color: '#FFC107',
                          textTransform: 'capitalize',
                        }}
                      >
                        {/* {item.interview?.status} */}
                        Passed
                      </TableCell>
                    </TableRow>
                  )
                })
            )}

            {!isLoading && interviews?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No invited interviews found.
                  <SentimentDissatisfied />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={interviews?.length || 0}
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
