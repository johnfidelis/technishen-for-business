// 'use client'

// import React, { useContext, useEffect, useState } from 'react'
// import {
//   Box,
//   TableContainer,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TablePagination,
//   Skeleton,
//   Typography,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Switch,
// } from '@mui/material'
// import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
// import { useFetchData } from '@/hooks/useApiService'
// import { GET_ENDPOINTS } from '@/constants/endpoints'
// import DateRangeInput from './DateRangeInput'
// import { useRouter } from 'next/navigation'
// import { ThemeContext } from '@/context/ThemeContext'
// import { formatDateTime } from '../utils/formatDateTime'
// import { SentimentDissatisfied } from '@mui/icons-material'

// const TicketTable = ({ filterType, setNumber }) => {
//   const router = useRouter()
//   const { theme } = useContext(ThemeContext)
//   const [showOutsourced, setShowOutsourced] = useState(false)

//   const [ticketCounts, setTicketCounts] = useState({
//     unassigned: 0,
//     assigned: 0,
//     open: 0,
//     resolved: 0,
//     all: 0,
//   })

//   // Fetch tickets based on the toggle state
//   const { data: ticketsData, isLoading } = useFetchData(
//     GET_ENDPOINTS.ALL_TICKETS(),
//     'allTickets',
//   )

//   useEffect(() => {
//     if (ticketsData) {
//       const unassignedTickets = ticketsData.unassigned_tickets || []
//       const assignedTickets = ticketsData.assigned_tickets || []
//       const allTickets = [...unassignedTickets, ...assignedTickets]
//       setTicketCounts({
//         unassigned: ticketsData.unassigned_tickets?.length || 0,
//         assigned: ticketsData.assigned_tickets?.length || 0,
//         // open: (ticketsData.assigned_tickets || []).filter(
//         //   (ticket) => ticket.status === 'Open',
//         // )?.length,
//         open: allTickets.filter((ticket) => ticket.status === 'Open').length,
//         resolved: (ticketsData.assigned_tickets || []).filter(
//           (ticket) => ticket.status === 'Resolved',
//         )?.length,
//         all:
//           (ticketsData.unassigned_tickets?.length || 0) +
//           (ticketsData.assigned_tickets?.length || 0),
//       })
//     }
//   }, [ticketsData])

//   const { data: outsourcedTicketsData, isLoading: outsourcedLoading } =
//     useFetchData(
//       GET_ENDPOINTS.ALL_OUTSOURCED_TICKETS(),

//       'allOutsourcedTickets',
//     )

//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortOrder, setSortOrder] = useState('')
//   const [status, setStatus] = useState('')
//   const [startDate, setStartDate] = useState(null)
//   const [endDate, setEndDate] = useState(null)
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(5)

//   const handleDateChange = (start, end) => {
//     setStartDate(start)
//     setEndDate(end)
//   }

//   let ticketList = []
//   if (ticketsData) {
//     const unassignedTickets = ticketsData.unassigned_tickets || []
//     const assignedTickets = ticketsData.assigned_tickets || []
//     const allTickets = [...unassignedTickets, ...assignedTickets]
//     switch (filterType) {
//       case 'unassigned':
//         ticketList = ticketsData.unassigned_tickets || []
//         break
//       case 'assigned':
//         ticketList = ticketsData.assigned_tickets || []
//         break
//       case 'open':
//         ticketList = allTickets.filter((ticket) => ticket.status === 'Open')
//         break
//       case 'resolved':
//         ticketList = (ticketsData.assigned_tickets || []).filter(
//           (ticket) => ticket.status === 'Resolved',
//         )
//         break
//       case 'all':
//         ticketList = [
//           ...(ticketsData.unassigned_tickets || []),
//           ...(ticketsData.assigned_tickets || []),
//         ]
//         break
//       default:
//         ticketList = []
//     }
//   }

//   ticketList = ticketList.filter((ticket) =>
//     ticket.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   if (status) {
//     ticketList = ticketList.filter((ticket) => ticket.status === status)
//   }

//   ticketList.sort((a, b) =>
//     sortOrder === 'Newest'
//       ? new Date(b.created_at) - new Date(a.created_at)
//       : new Date(a.created_at) - new Date(b.created_at),
//   )

//   const handleChangePage = (event, newPage) => setPage(newPage)
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10))
//     setPage(0)
//   }

//   // useEffect(() => {
//   //   // Fetch data or calculate value
//   //   const fetchedNumber = outsourcedTicketsData?.length + ticketCounts?.[filterType];

//   //   // Send value to the parent
//   //   setNumber(fetchedNumber);
//   // }, [setNumber]);

//   useEffect(() => {
//     if (setNumber && typeof setNumber === 'function') {
//       // Ensure outsourcedTicketsData and ticketCounts exist before calculation
//       const fetchedNumber =
//         (outsourcedTicketsData?.length || 0) + (ticketCounts?.[filterType] || 0)
//       setNumber(fetchedNumber)
//     }
//   }, [outsourcedTicketsData, ticketCounts])

//   return (
//     <Box>
//       {/* Filters */}

//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           gap: '1em',
//           mb: '2em',
//           flexWrap: 'wrap',
//         }}
//       >
//         <TextField
//           label="Search"
//           variant="outlined"
//           fullWidth
//           value={searchQuery}
//           placeholder="Search"
//           onChange={(e) => setSearchQuery(e.target.value)}
//           sx={{
//             flex: 1,
//             minWidth: '200px',
//             maxWidth: '330px',
//             fontSize: '0.80em',
//           }}
//         />

//         <DateRangeInput
//           startDate={startDate}
//           endDate={endDate}
//           onDateChange={handleDateChange}
//         />

//         <TextField
//           label="Status"
//           variant="outlined"
//           fullWidth
//           select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           sx={{
//             flex: 1,
//             minWidth: '200px',
//             maxWidth: '330px',
//             fontSize: '0.80em',
//           }}
//         >
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="Open">Open</MenuItem>
//           <MenuItem value="Closed">Closed</MenuItem>
//         </TextField>
//       </Box>

//       {/* Toggle for Outsourced Tickets */}
//       <FormControlLabel
//         control={
//           <Switch
//             checked={showOutsourced}
//             onChange={() => setShowOutsourced((prev) => !prev)}
//             sx={{
//               '& .MuiSwitch-switchBase.Mui-checked': {
//                 color: theme?.primary_color,
//               },
//               // '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//               //   backgroundColor: 'goldenrod',
//               // },
//             }}
//           />
//         }
//         label={
//           <Typography variant="caption">
//             Show Outsourced Tickets
//             {showOutsourced
//               ? `(${outsourcedTicketsData?.length || 0})`
//               : `(${ticketCounts?.[filterType] || 0})`}
//           </Typography>
//         }
//       />

//       {/* Table */}
//       {showOutsourced && (
//         <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
//           <Table>
//             <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//               <TableRow>
//                 {[
//                   'Ticket Number',
//                   'Caller',

//                   'Category',
//                   'Sub-Category',
//                   'Date and Time',
//                   'Type',
//                   'Priority',
//                   'Status',
//                 ].map((header) => (
//                   <TableCell
//                     key={header}
//                     sx={{
//                       fontSize: '0.80em',
//                       fontWeight: 300,
//                       fontFamily: 'Inter, sans-serif',
//                     }}
//                   >
//                     {header}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {isLoading ? (
//                 [...Array(rowsPerPage)].map((_, index) => (
//                   <TableRow key={index}>
//                     {[...Array(8)].map((_, i) => (
//                       <TableCell key={i}>
//                         <Skeleton variant="text" />
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : outsourcedTicketsData?.length === 0 ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={8}
//                     sx={{ textAlign: 'center', padding: '2em' }}
//                   >
//                     <Box
//                       display="flex"
//                       flexDirection="column"
//                       alignItems="center"
//                     >
//                       <SentimentDissatisfied
//                         sx={{ fontSize: 50, color: 'gray' }}
//                       />
//                       <Typography
//                         variant="body2"
//                         sx={{ fontWeight: 300, fontSize: '1em', color: 'gray' }}
//                       >
//                         No tickets available.
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 outsourcedTicketsData
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((ticket) => (
//                     <TableRow
//                       key={ticket.id}
//                       onClick={() =>
//                         router.push(
//                           `/dashboard/ticket/i/outsource/${ticket.id}`,
//                         )
//                       }
//                       hover
//                     >
//                       <TableCell>{ticket.ticket_number}</TableCell>
//                       <TableCell>{ticket?.caller_name}</TableCell>

//                       <TableCell>{ticket.service_name}</TableCell>
//                       <TableCell>{ticket.sub_service_name}</TableCell>
//                       <TableCell>{formatDateTime(ticket.created_at)}</TableCell>
//                       <TableCell>{ticket.ticket_type}</TableCell>
//                       <TableCell>{ticket.priority_level}</TableCell>
//                       <TableCell>{ticket.status}</TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15]}
//             component="div"
//             count={ticketList?.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       )}

//       {!showOutsourced && (
//         <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
//           <Table>
//             <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//               <TableRow>
//                 {[
//                   'Ticket Number',
//                   'Caller',
//                   'Fulfiler',
//                   'Category',
//                   'Sub-Category',
//                   'Date and Time',
//                   'Type',
//                   'Priority',
//                   'Status',
//                 ].map((header) => (
//                   <TableCell
//                     key={header}
//                     sx={{
//                       fontSize: '0.80em',
//                       fontWeight: 300,
//                       fontFamily: 'Inter, sans-serif',
//                     }}
//                   >
//                     {header}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {isLoading ? (
//                 [...Array(rowsPerPage)].map((_, index) => (
//                   <TableRow key={index}>
//                     {[...Array(9)].map((_, i) => (
//                       <TableCell key={i}>
//                         <Skeleton variant="text" />
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : ticketList?.length === 0 ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={9}
//                     sx={{ textAlign: 'center', padding: '2em' }}
//                   >
//                     <Box
//                       display="flex"
//                       flexDirection="column"
//                       alignItems="center"
//                     >
//                       <SentimentDissatisfied
//                         sx={{ fontSize: 50, color: 'gray' }}
//                       />
//                       <Typography
//                         variant="body2"
//                         sx={{ fontWeight: 300, fontSize: '1em', color: 'gray' }}
//                       >
//                         No tickets available.
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 ticketList
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((ticket) => (
//                     <TableRow
//                       key={ticket.id}
//                       onClick={() =>
//                         router.push(`/dashboard/ticket/i/${ticket.id}`)
//                       }
//                       hover
//                     >
//                       <TableCell>{ticket.ticket_number}</TableCell>
//                       <TableCell>
//                         {ticket.caller_first_name} {ticket.caller_last_name}
//                       </TableCell>
//                       <TableCell>
//                         {ticket?.assigned_to_first_name
//                           ? `${ticket?.assigned_to_first_name} ${ticket?.assigned_to_last_name}`
//                           : '-'}
//                       </TableCell>
//                       <TableCell>{ticket.service_name}</TableCell>
//                       <TableCell>{ticket.sub_service_name}</TableCell>
//                       <TableCell>{formatDateTime(ticket.created_at)}</TableCell>
//                       <TableCell>{ticket.ticket_type}</TableCell>
//                       <TableCell>{ticket.priority_level}</TableCell>
//                       <TableCell>{ticket.status}</TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15]}
//             component="div"
//             count={ticketList.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       )}
//     </Box>
//   )
// }

// export default TicketTable

'use client'

import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Skeleton,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { useRouter } from 'next/navigation'
import { ThemeContext } from '@/context/ThemeContext'
import { formatDateTime } from '../utils/formatDateTime'
import { SentimentDissatisfied } from '@mui/icons-material'

const TicketTable = ({ filterType, setNumber }) => {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  const [showOutsourced, setShowOutsourced] = useState(false)

  // State for filters
  const [searchQuery, setSearchQuery] = useState('')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Build query parameters
  const buildQueryParams = () => {
    const params = new URLSearchParams()

    if (searchQuery) params.append('search', searchQuery)
    if (status) params.append('status', status)
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)

    return params.toString()
  }

  // Fetch tickets based on the toggle state and filters
  const queryString = buildQueryParams()
  const { data: ticketsData, isLoading } = useFetchData(
    `${GET_ENDPOINTS.ALL_TICKETS()}?${queryString}`,
    'allTickets',
  )

  const { data: outsourcedTicketsData, isLoading: outsourcedLoading } =
    useFetchData(
      `${GET_ENDPOINTS.ALL_OUTSOURCED_TICKETS()}?${queryString}`,
      'allOutsourcedTickets',
    )

  // Calculate ticket counts
  const [ticketCounts, setTicketCounts] = useState({
    unassigned: 0,
    assigned: 0,
    open: 0,
    resolved: 0,
    all: 0,
  })

  useEffect(() => {
    if (ticketsData) {
      const unassignedTickets = ticketsData.unassigned_tickets || []
      const assignedTickets = ticketsData.assigned_tickets || []
      const allTickets = [...unassignedTickets, ...assignedTickets]

      setTicketCounts({
        unassigned: unassignedTickets.length,
        assigned: assignedTickets.length,
        open: allTickets.filter((ticket) => ticket.status === 'Open').length,
        resolved: assignedTickets.filter(
          (ticket) => ticket.status === 'Resolved',
        ).length,
        all: allTickets.length,
      })
    }
  }, [ticketsData])

  // Filter tickets based on filterType
  const getFilteredTickets = () => {
    if (!ticketsData) return []

    const unassignedTickets = ticketsData.unassigned_tickets || []
    const assignedTickets = ticketsData.assigned_tickets || []
    const allTickets = [...unassignedTickets, ...assignedTickets]

    switch (filterType) {
      case 'unassigned':
        return unassignedTickets
      case 'assigned':
        return assignedTickets
      case 'open':
        return allTickets.filter((ticket) => ticket.status === 'Open')
      case 'resolved':
        return assignedTickets.filter((ticket) => ticket.status === 'Resolved')
      case 'all':
        return allTickets
      default:
        return []
    }
  }

  const filteredTickets = getFilteredTickets()
  const paginatedTickets = filteredTickets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )

  const handleChangePage = (event, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Update parent with ticket counts
  useEffect(() => {
    if (setNumber && typeof setNumber === 'function') {
      const fetchedNumber =
        (showOutsourced ? outsourcedTicketsData?.length || 0 : 0) +
        (ticketCounts?.[filterType] || 0)
      setNumber(fetchedNumber)
    }
  }, [
    outsourcedTicketsData,
    ticketCounts,
    filterType,
    showOutsourced,
    setNumber,
  ])

  return (
    <Box>
      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1em',
          mb: '2em',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          placeholder="Search by ticket number"
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setPage(0)
          }}
          sx={{
            flex: 1,
            minWidth: '200px',
            maxWidth: '330px',
            fontSize: '0.80em',
          }}
        />

        <TextField
          type="date"
          label="Start Date"
          variant="outlined"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value)
            setPage(0)
          }}
          sx={{ flex: 1, minWidth: '200px' }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          type="date"
          label="End Date"
          variant="outlined"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value)
            setPage(0)
          }}
          sx={{ flex: 1, minWidth: '200px' }}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl
          sx={{
            flex: 1,
            minWidth: '200px',
            maxWidth: '330px',
          }}
        >
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(0)
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
            <MenuItem value="Booked">Booked</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Toggle for Outsourced Tickets */}
      <FormControlLabel
        control={
          <Switch
            checked={showOutsourced}
            onChange={() => {
              setShowOutsourced((prev) => !prev)
              setPage(0)
            }}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: theme?.primary_color,
              },
            }}
          />
        }
        label={
          <Typography variant="caption">
            Show Outsourced Tickets
            {showOutsourced
              ? ` (${outsourcedTicketsData?.length || 0})`
              : ` (${ticketCounts?.[filterType] || 0})`}
          </Typography>
        }
      />

      {/* Table */}
      {showOutsourced ? (
        <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                {[
                  'Ticket Number',
                  'Caller',
                  'Category',
                  'Sub-Category',
                  'Date and Time',
                  'Type',
                  'Priority',
                  'Status',
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontSize: '0.80em',
                      fontWeight: 300,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {outsourcedLoading ? (
                [...Array(rowsPerPage)].map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(8)].map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : outsourcedTicketsData?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
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
                        sx={{ fontWeight: 300, fontSize: '1em', color: 'gray' }}
                      >
                        No outsourced tickets found.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                outsourcedTicketsData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      onClick={() =>
                        router.push(
                          `/dashboard/ticket/i/outsource/${ticket.id}`,
                        )
                      }
                      hover
                    >
                      <TableCell>{ticket.ticket_number}</TableCell>
                      <TableCell>{ticket?.caller_name}</TableCell>
                      <TableCell>{ticket.service_name}</TableCell>
                      <TableCell>{ticket.sub_service_name}</TableCell>
                      <TableCell>{formatDateTime(ticket.created_at)}</TableCell>
                      <TableCell>{ticket.ticket_type}</TableCell>
                      <TableCell>{ticket.priority_level}</TableCell>
                      <TableCell>{ticket.status}</TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={outsourcedTicketsData?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                {[
                  'Ticket Number',
                  'Caller',
                  'Fulfiler',
                  'Category',
                  'Sub-Category',
                  'Date and Time',
                  'Type',
                  'Priority',
                  'Status',
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontSize: '0.80em',
                      fontWeight: 300,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                [...Array(rowsPerPage)].map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(9)].map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredTickets.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
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
                        sx={{ fontWeight: 300, fontSize: '1em', color: 'gray' }}
                      >
                        No tickets found matching your criteria.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTickets.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    onClick={() =>
                      router.push(`/dashboard/ticket/i/${ticket.id}`)
                    }
                    hover
                  >
                    <TableCell>{ticket.ticket_number}</TableCell>
                    <TableCell>
                      {ticket.caller_first_name} {ticket.caller_last_name}
                    </TableCell>
                    <TableCell>
                      {ticket?.assigned_to_first_name
                        ? `${ticket?.assigned_to_first_name} ${ticket?.assigned_to_last_name}`
                        : '-'}
                    </TableCell>
                    <TableCell>{ticket.service_name}</TableCell>
                    <TableCell>{ticket.sub_service_name}</TableCell>
                    <TableCell>{formatDateTime(ticket.created_at)}</TableCell>
                    <TableCell>{ticket.ticket_type}</TableCell>
                    <TableCell>{ticket.priority_level}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={filteredTickets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Box>
  )
}

export default TicketTable
