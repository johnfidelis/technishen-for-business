import React, { useEffect, useState } from 'react'
import {
  Box,
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
  Paper,
  TablePagination,
  Skeleton,
  Typography,
} from '@mui/material'
import { SentimentDissatisfied } from '@mui/icons-material'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import { useRouter } from 'next/navigation'
import VisibilityIcon from '@mui/icons-material/Visibility'

const FulfillerGroupTable = ({ setNumber }) => {
  const router = useRouter()
  const { data: groups, isLoading } = useFetchData(
    GET_ENDPOINTS.ALL_FULFILLER_GROUPS(),
    'allFulfilerGroups',
  )

  useEffect(() => {
    if (setNumber && typeof setNumber === 'function') {
      // Ensure outsourcedTicketsData and ticketCounts exist before calculation
      const fetchedNumber = groups?.length || 0
      setNumber(fetchedNumber)
    }
  }, [groups])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('Newest')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleSearchChange = (e) => setSearchTerm(e.target.value)
  const handleSortChange = (e) => setSortOrder(e.target.value)
  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredGroups = groups
    ?.filter((group) =>
      group.group_name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    ?.sort((a, b) => {
      return sortOrder === 'Newest'
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at)
    })

  return (
    <>
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
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flex: 1, minWidth: '200px' }}
        />
        <FormControl
          variant="outlined"
          sx={{
            flex: 1,
            minWidth: '200px',
            maxWidth: '330px',
            fontSize: '0.80em',
          }}
        >
          {/* <InputLabel>Sort</InputLabel> */}
          <TextField
            select
            value={sortOrder}
            onChange={handleSortChange}
            label="Sort"
          >
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </TextField>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {[
                'Group Name',
                'Total Fulfillers',
                'Total Services',
                'Sub Services',
                'Created',
                'Last Updated',
              ].map((head) => (
                <TableCell
                  key={head}
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
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  {Array(6).fill(
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>,
                  )}
                </TableRow>
              ))
            ) : filteredGroups?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
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
                      No groups found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredGroups
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((group) => (
                  <TableRow
                    key={group.id}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                    hover
                  >
                    <TableCell
                      onClick={() =>
                        router.push(
                          `/dashboard/employee/fulfilers/group/categories/${group.id}`,
                        )
                      }
                    >
                      {group.group_name}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {group?.employees?.length}

                      <VisibilityIcon
                        style={{ cursor: 'pointer', color: 'gray' }}
                        onClick={() =>
                          router.push(
                            `/dashboard/employee/fulfilers/group/${group.id}`,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: 'center' }}
                      onClick={() =>
                        router.push(
                          `/dashboard/employee/fulfilers/group/categories/${group.id}`,
                        )
                      }
                    >
                      {group?.services?.length}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: 'center' }}
                      onClick={() =>
                        router.push(
                          `/dashboard/employee/fulfilers/group/categories/${group.id}`,
                        )
                      }
                    >
                      {group?.sub_services?.length}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(
                          `/dashboard/employee/fulfilers/group/categories/${group.id}`,
                        )
                      }
                    >
                      {new Date(group.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(
                          `/dashboard/employee/fulfilers/group/categories/${group.id}`,
                        )
                      }
                    >
                      {new Date(group.updated_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredGroups?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ fontSize: '0.80em', fontFamily: 'Inter, sans-serif' }}
        />
      </TableContainer>
    </>
  )
}

export default FulfillerGroupTable
