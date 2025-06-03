// import React, { useContext, useState } from 'react'
// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Skeleton,
// } from '@mui/material'
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
// import ListAltIcon from '@mui/icons-material/ListAlt'
// import InboxIcon from '@mui/icons-material/Inbox'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { ThemeContext } from '@/context/ThemeContext'
// import {
//   GET_RESOURCING_ENDPOINTS,
//   PATCH_ENDPOINTS,
// } from '@/constants/resouringEndpoints'
// import {
//   useFetchResourcingData,
//   usePatchResourcingData,
// } from '@/hooks/useResourcingApiService'
// import { formatDateTime } from '../utils/formatDateTime'
// import { SentimentDissatisfied } from '@mui/icons-material'
// import { toast } from 'react-toastify'
// import DateRangeInput from '../model1/DateRangeInput'

// export default function Page({ id }) {
//   const router = useRouter()
//   const { theme } = useContext(ThemeContext)

//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(5)

//   const [searchText, setSearchText] = useState('')
//   const [sortOption, setSortOption] = useState('Newest')
//   const [statusFilter, setStatusFilter] = useState('All')
//   const [startDate, setStartDate] = useState(null)
//   const [endDate, setEndDate] = useState(null)

//   const handleDateChange = (start, end) => {
//     setStartDate(start)
//     setEndDate(end)
//   }

//   const { data: applicant, isLoading } = useFetchResourcingData(
//     GET_RESOURCING_ENDPOINTS.GET_A_POST_APPLICANT(id),
//   )

//   const filteredData = applicant
//     ?.filter((item) => {
//       // Status filter
//       if (
//         statusFilter !== 'All' &&
//         item?.interview?.interview_status?.toLowerCase() !==
//           statusFilter.toLowerCase()
//       ) {
//         return false
//       }

//       // Search filter (name or job title)
//       const name =
//         `${item.applicant?.applicant_name}`.toLowerCase()
//       const job = item.job_post_title?.toLowerCase()
//       if (
//         searchText &&
//         !name.includes(searchText.toLowerCase()) &&
//         !job.includes(searchText.toLowerCase())
//       ) {
//         return false
//       }

//       // Date range filter
//       if (startDate && endDate) {
//         const interviewDate = new Date(item.interview?.scheduled_datetime)
//         const start = new Date(startDate)
//         const end = new Date(endDate)
//         if (interviewDate < start || interviewDate > end) {
//           return false
//         }
//       }

//       return true
//     })
//     ?.sort((a, b) => {
//       const dateA = new Date(a.interview?.scheduled_datetime)
//       const dateB = new Date(b.interview?.scheduled_datetime)
//       return sortOption === 'Newest' ? dateB - dateA : dateA - dateB
//     })

//   const [closeLoading, setCloseLoading] = useState(false)

//   const closeJob = usePatchResourcingData(
//     PATCH_ENDPOINTS.CLOSE_JOB(id),
//     'closeJob',
//   )

//   const handleSubmit = async () => {
//     const payload = {
//       status: 'close',
//     }
//     setCloseLoading(true)
//     closeJob.mutate(payload, {
//       onSuccess: () => {
//         toast.success('Job closed successfully!')
//         setOpenModal(false)
//         setRemarks('')
//         setStatus('')
//         setCloseLoading(false)
//       },
//       onError: (error) => {
//         setCloseLoading(false)
//         toast.error(error?.response?.data?.detail || 'Something went wrong')
//       },
//     })
//   }

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10))
//     setPage(0)
//   }

//   const handleRowClick = (item) => {
//     router.push(
//       // `/dashboard/resourcing/posts/open/candidate/${item.applicant_id}`,
//       `/dashboard/resourcing/posts/open/${id}/${item.applicant_id}`,
//     )
//   }

//   return (
//     <Box>
//       {/* Summary Cards */}
//       <Grid container spacing={2} mb={4}>
//         {[
//           {
//             title: 'Card 1 Title',
//             value: ' 1',
//             icon: <InsertDriveFileIcon sx={{ color: 'white' }} />,
//           },
//           {
//             title: 'Card 2 Title',
//             value: ' 2',
//             icon: <ListAltIcon sx={{ color: 'white' }} />,
//           },
//           {
//             title: 'Card 3 Title',
//             value: ' 3',
//             icon: <InboxIcon sx={{ color: 'white' }} />,
//           },
//         ].map((card, index) => (
//           <Grid item xs={12} sm={4} md={4} key={index}>
//             {/* <Link href={card.path}> */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 backgroundColor: theme.primary_color || '#115093',
//                 color: '#fff',
//                 padding: '10px',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//               }}
//             >
//               <Typography
//                 variant="body2"
//                 sx={{
//                   padding: '0.6vh 0vh',
//                 }}
//               >
//                 {card.title} <br /> {card.value}
//               </Typography>
//               {card.icon}
//             </Box>
//             {/* </Link> */}
//           </Grid>
//         ))}
//       </Grid>

//       {/* Filters */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           gap: 2,
//           mb: 4,
//           flexWrap: 'wrap',
//         }}
//       >
//         <TextField
//           label="Search"
//           variant="outlined"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           sx={{
//             flex: 1,
//             minWidth: '200px',
//             fontFamily: 'Inter, sans-serif',
//             '& .MuiInputBase-root': { borderRadius: 1 },
//           }}
//         />

//         <FormControl
//           variant="outlined"
//           sx={{
//             flex: 1,
//             minWidth: '150px',
//             fontFamily: 'Inter, sans-serif',
//             '& .MuiOutlinedInput-root': { borderRadius: 1 },
//           }}
//         >
//           <InputLabel>Sort</InputLabel>
//           <Select
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             label="Sort"
//           >
//             <MenuItem value="Newest">Newest</MenuItem>
//             <MenuItem value="Oldest">Oldest</MenuItem>
//           </Select>
//         </FormControl>

//         <DateRangeInput
//           startDate={startDate}
//           endDate={endDate}
//           onDateChange={handleDateChange}
//         />

//         <FormControl
//           variant="outlined"
//           sx={{
//             flex: 1,
//             minWidth: '150px',
//             fontFamily: 'Inter, sans-serif',
//             '& .MuiOutlinedInput-root': { borderRadius: 1 },
//           }}
//         >
//           <InputLabel>Status</InputLabel>
//           <Select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             label="Status"
//           >
//             <MenuItem value="All">All</MenuItem>
//             <MenuItem value="Pending">Pending</MenuItem>
//             <MenuItem value="Approved">Approved</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Table */}
//       <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {[
//                 'Candidate Name',
//                 'Current Match',
//                 'Availability',
//                 'Date Applied',
//                 'Action',
//               ].map((head, i) => (
//                 <TableCell
//                   key={i}
//                   sx={{
//                     fontSize: '0.80em',
//                     fontWeight: 300,
//                     fontFamily: 'Inter, sans-serif',
//                   }}
//                 >
//                   {head}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {isLoading ? (
//               // Show 5 skeleton rows to simulate loading
//               Array.from({ length: 5 }).map((_, index) => (
//                 <TableRow key={index}>
//                   {Array.from({ length: 5 }).map((_, cellIndex) => (
//                     <TableCell key={cellIndex}>
//                       <Skeleton variant="text" height={24} />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : filteredData?.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={5}
//                   sx={{ textAlign: 'center', padding: '2em' }}
//                 >
//                   <Box
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                   >
//                     <SentimentDissatisfied
//                       sx={{ fontSize: 50, color: 'gray' }}
//                     />
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontWeight: 400,
//                         fontSize: '1em',
//                         color: 'gray',
//                       }}
//                     >
//                       Empty
//                     </Typography>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredData
//                 ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 ?.map((item) => (
//                   <TableRow
//                     key={item.id}
//                     sx={{
//                       cursor: 'pointer',
//                       '&:hover': { backgroundColor: '#f5f5f5' },
//                     }}
//                   >
//                     <TableCell
//                       sx={{
//                         fontSize: '0.75em',
//                         fontWeight: 500,
//                         fontFamily: 'Inter, sans-serif',
//                       }}
//                     >
//                       {item?.applicant_name || '-'}
//                     </TableCell>
// <TableCell
//   sx={{
//     fontSize: '0.75em',
//     fontWeight: 500,
//     fontFamily: 'Inter, sans-serif',
//     color:
//       item.match_rate < 50
//         ? 'red'
//         : item.match_rate <= 80
//           ? '#F5A623' // Yellow-ish
//           : '#1BA847', // Green
//   }}
// >
//   {item.match_rate || 0}%
// </TableCell>

//                     <TableCell
//                       sx={{
//                         fontSize: '0.75em',
//                         fontWeight: 500,
//                         fontFamily: 'Inter, sans-serif',
//                         textTransform: 'capitalize',
//                       }}
//                     >
//                       {item.availability}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontSize: '0.75em',
//                         fontWeight: 500,
//                         fontFamily: 'Inter, sans-serif',
//                       }}
//                     >
//                       {formatDateTime(item.applied_at)}
//                     </TableCell>
// <TableCell
//   sx={{
//     fontSize: '0.75em',
//     fontWeight: 500,
//     fontFamily: 'Inter, sans-serif',
//     color: '#1976d2',
//     textDecoration: 'underline',
//     cursor: 'pointer',
//   }}
//   onClick={() => handleRowClick(item)}
// >
//   View
// </TableCell>
//                   </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 15]}
//           component="div"
//           count={filteredData?.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{
//             fontSize: '0.80em',
//             fontFamily: 'Inter, sans-serif',
//           }}
//         />
//       </TableContainer>

//       {/* Action Button */}
//   <Box sx={{ textAlign: 'right', mt: 3 }}>
//     <Button
//       variant="contained"
//       sx={{
//         borderRadius: '5px',
//         backgroundColor: theme.primary_color || '#115093',
//         color: '#fff',
//       }}
//       onClick={() => {
//         handleSubmit()
//       }}
//       disabled={closeLoading}
//     >
//       Close Post
//     </Button>
//   </Box>
// </Box>
//   )
// }

'use client'

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
  Skeleton,
  TablePagination,
} from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ListAltIcon from '@mui/icons-material/ListAlt'
import InboxIcon from '@mui/icons-material/Inbox'
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/context/ThemeContext'
import {
  GET_RESOURCING_ENDPOINTS,
  PATCH_ENDPOINTS,
} from '@/constants/resouringEndpoints'
import {
  useFetchResourcingData,
  usePatchResourcingData,
} from '@/hooks/useResourcingApiService'
import { toast } from 'react-toastify'
import { SentimentDissatisfied } from '@mui/icons-material'
import DateRangeInput from '../model1/DateRangeInput'
import { formatDateTime } from '../utils/formatDateTime'

export default function Page({ id }) {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [searchText, setSearchText] = useState('')
  const [sortOption, setSortOption] = useState('MatchHigh')
  const [statusFilter, setStatusFilter] = useState('All')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [closeLoading, setCloseLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [remarks, setRemarks] = useState('')
  const [status, setStatus] = useState('')

  const { data: applicant, isLoading } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_A_POST_APPLICANT(id),
  )

  const handleDateChange = (start, end) => {
    setStartDate(start)
    setEndDate(end)
  }

  const filteredData = applicant
    ?.filter((item) => {
      if (statusFilter !== 'All') {
        const [min, max] = statusFilter.split('-').map(Number)
        const rate = parseFloat(item.match_rate || 0) // make sure it's numeric
        if (rate < min || rate > max) return false
      }

      const name = `${item.applicant_name || ''}`.toLowerCase()
      const job = item.job_post_title?.toLowerCase()
      if (
        searchText &&
        !name.includes(searchText.toLowerCase())
        // &&
        // !job.includes(searchText.toLowerCase())
      ) {
        return false
      }

      if (startDate && endDate) {
        const interviewDate = new Date(item.interview?.scheduled_datetime)
        const start = new Date(startDate)
        const end = new Date(endDate)
        if (interviewDate < start || interviewDate > end) {
          return false
        }
      }

      return true
    })
    ?.sort((a, b) => {
      if (sortOption === 'Newest') {
        return (
          new Date(b.interview?.scheduled_datetime) -
          new Date(a.interview?.scheduled_datetime)
        )
      } else if (sortOption === 'Oldest') {
        return (
          new Date(a.interview?.scheduled_datetime) -
          new Date(b.interview?.scheduled_datetime)
        )
      } else if (sortOption === 'MatchHigh') {
        return parseFloat(b.match_rate || 0) - parseFloat(a.match_rate || 0)
      } else if (sortOption === 'MatchLow') {
        return parseFloat(a.match_rate || 0) - parseFloat(b.match_rate || 0)
      }
      return 0
    })

  const closeJob = usePatchResourcingData(
    PATCH_ENDPOINTS.CLOSE_JOB(id),
    'closeJob',
  )

  const handleSubmit = async () => {
    const payload = { status: 'close' }
    setCloseLoading(true)
    closeJob.mutate(payload, {
      onSuccess: () => {
        toast.success('Job closed successfully!')
        setOpenModal(false)
        setRemarks('')
        setStatus('')
        setCloseLoading(false)
      },
      onError: (error) => {
        setCloseLoading(false)
        toast.error(error?.response?.data?.detail || 'Something went wrong')
      },
    })
  }

  const handleChangePage = (_, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRowClick = (item) => {
    router.push(`/dashboard/resourcing/posts/open/${id}/${item.applicant_id}`)
  }

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          {
            title: 'Card 1 Title',
            value: '1',
            icon: <InsertDriveFileIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Card 2 Title',
            value: '2',
            icon: <ListAltIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Card 3 Title',
            value: '3',
            icon: <InboxIcon sx={{ color: 'white' }} />,
          },
        ].map((card, index) => (
          <Grid item xs={12} sm={4} key={index}>
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
              <Typography variant="body2">
                {card.title} <br /> {card.value}
              </Typography>
              {card.icon}
            </Box>
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

        <FormControl sx={{ flex: 1, minWidth: '150px' }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort"
          >
            <MenuItem value="MatchHigh"> High to Low</MenuItem>
            <MenuItem value="MatchLow"> Low to High</MenuItem>

            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </Select>
        </FormControl>

        <DateRangeInput
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />

        <FormControl sx={{ flex: 1, minWidth: '150px' }}>
          <InputLabel>Match Rate</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Match Rate"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="0-20">0 - 20%</MenuItem>
            <MenuItem value="20-40">20 - 40%</MenuItem>
            <MenuItem value="40-60">40 - 60%</MenuItem>
            <MenuItem value="60-80">60 - 80%</MenuItem>
            <MenuItem value="80-100">80 - 100%</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
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
                <TableCell key={i}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton height={24} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    py={4}
                  >
                    <SentimentDissatisfied
                      sx={{ fontSize: 50, color: 'gray' }}
                    />
                    <Typography color="gray">No candidates found</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{item.applicant_name || '-'}</TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                        color:
                          item.match_rate < 50
                            ? 'red'
                            : item.match_rate <= 80
                              ? '#F5A623' // Yellow-ish
                              : '#1BA847', // Green
                      }}
                    >
                      {item.match_rate || 0}%
                    </TableCell>
                    <TableCell>{item.availability || '-'}</TableCell>
                    <TableCell>{formatDateTime(item.applied_at)}</TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.75em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                        color: '#1976d2',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleRowClick(item)}
                    >
                      View
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredData?.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Box sx={{ textAlign: 'right', mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            borderRadius: '5px',
            backgroundColor: theme.primary_color || '#115093',
            color: '#fff',
          }}
          onClick={() => {
            handleSubmit()
          }}
          disabled={closeLoading}
        >
          Close Post
        </Button>
      </Box>
    </Box>
  )
}
