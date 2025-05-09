import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  TablePagination,
  Skeleton,
} from '@mui/material'
import { useMemo, useState } from 'react'

import { useFetchResourcingData } from '@/hooks/useResourcingApiService'
import { GET_RESOURCING_ENDPOINTS } from '@/constants/resouringEndpoints'
import { SentimentDissatisfied } from '@mui/icons-material'

export default function AuditLogTable() {
  const { data: log, isLoading: loadLog } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_AUDIT_LOG,
  )
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: '0.80em',
                  fontWeight: 300,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                User
              </TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>User Agent</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadLog ? (
              Array.from({ length: rowsPerPage }).map((_, idx) => (
                <TableRow key={idx}>
                  {Array.from({ length: 6 }).map((__, i) => (
                    <TableCell key={i}>
                      <Skeleton variant="text" width="100%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : log && log.length > 0 ? (
              log
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((entry) => (
                  <TableRow
                    key={entry.id}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                      textTransform: 'capitalize',
                    }}
                    hover
                  >
                    <TableCell>
                      {entry.user_first_name} {entry.user_last_name}
                    </TableCell>
                    <TableCell>{entry.action}</TableCell>
                    <TableCell>{entry.user_email}</TableCell>
                    <TableCell>{entry.ip_address}</TableCell>
                    <TableCell>{entry.user_agent}</TableCell>
                    <TableCell>
                      {new Date(entry.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    py={3}
                  >
                    <SentimentDissatisfied
                      sx={{ fontSize: 40, color: '#ccc' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      No logs found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={log?.length}
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
