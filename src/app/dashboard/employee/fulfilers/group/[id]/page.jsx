'use client'

import React, { useContext, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Skeleton,
  TablePagination,
} from '@mui/material'
import { MdInfoOutline } from 'react-icons/md'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import SentimentDissatisfied from '@mui/icons-material/SentimentDissatisfied'
import { ThemeContext } from '@/context/ThemeContext'
import { useCreateData, useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS, POST_ENDPOINTS } from '@/constants/endpoints'

const Page = () => {
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  const { id } = useParams()
  const [groupId, setGroupId] = useState(null)

  const { data: employeeData, isLoading } = useFetchData(
    GET_ENDPOINTS.GET_FULFILLER_GROUP(id),
  )

  const createData = useCreateData(
    POST_ENDPOINTS.ADD_EMPLOYEE_TO_FULFILER_GROUP(groupId),
    'businessProfile',
  )

  const onSelectGroup = async (employeeId) => {
    setGroupId(employeeData?.id)
    createData.mutate(
      {
        employees: [employeeId],
        action: 'remove',
      },
      {
        onSuccess: async () => {
          toast.success('Successful!.', {
            autoClose: 5000,
            hideProgressBar: true,
          })
          onClose()
        },
        onError: () =>
          toast.error('Error!.', {
            autoClose: 5000,
            hideProgressBar: true,
          }),
      },
    )
  }

  const [employeePage, setEmployeePage] = useState(0)
  const [employeeRowsPerPage, setEmployeeRowsPerPage] = useState(5)

  const handleEmployeePageChange = (_, newPage) => {
    setEmployeePage(newPage)
  }

  const handleEmployeeRowsPerPageChange = (event) => {
    setEmployeeRowsPerPage(parseInt(event.target.value, 10))
    setEmployeePage(0)
  }

  return (
    <Box
      sx={{
        width: '98%',
        p: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        minHeight: '60vh',
        margin: 'auto',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Box>
        <Button
          variant="contained"
          onClick={() => router.back()}
          sx={{
            backgroundColor: theme.primary_color || '#115093',
            color: '#FFF',
            textTransform: 'none',
            fontSize: '0.7em',
            fontWeight: 300,
            padding: '0.375rem 0.75em',
          }}
        >
          &larr; Back
        </Button>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            sx={{
              color: '#333',
              fontSize: '1.25em',
              mb: 2,
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
            }}
          >
            Fulfillers in {employeeData?.group_name || 'Group'}
            <Tooltip
              title={`This page displays all fulfillers who are part of the ${employeeData?.group_name || ''} Group. Use this view to manage group members or update group assignments.`}
              arrow
            >
              <IconButton size="small">
                <MdInfoOutline style={{ fontSize: '1.2em', color: '#666' }} />
              </IconButton>
            </Tooltip>
          </Typography>
          {/* <Button
            variant="contained"
            sx={{ backgroundColor: theme.primary_color }}
            startIcon={<AddIcon />}
          >
            Add Employee to Fulfiller Group
          </Button> */}
        </Box>
      </Box>
      <hr style={{ margin: '0.625rem 0' }} />
      <TableContainer component={Paper} sx={{ borderRadius: '0.5em' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {[
                'Profile Picture',
                'Name',
                'Email',
                'Position',
                'Phone Number',
                'Action',
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
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array(6).fill(
                    <TableCell>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>,
                  )}
                </TableRow>
              ))
            ) : employeeData?.employees?.length === 0 ? (
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
                      No employees found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              employeeData?.employees
                ?.slice(
                  employeePage * employeeRowsPerPage,
                  employeePage * employeeRowsPerPage + employeeRowsPerPage,
                )
                .map((employee) => (
                  <TableRow key={employee?.id} sx={{ cursor: 'pointer' }} hover>
                    <TableCell
                      onClick={() =>
                        router.push(`/dashboard/employee/${employee.id}`)
                      }
                    >
                      <Avatar
                        src={
                          'https://technishenbackend.onrender.com' +
                          employee.profile_picture
                        }
                        alt={employee.first_name}
                      />
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(`/dashboard/employee/${employee.id}`)
                      }
                    >{`${employee?.first_name} ${employee?.last_name}`}</TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(`/dashboard/employee/${employee.id}`)
                      }
                    >
                      {employee?.email}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(`/dashboard/employee/${employee.id}`)
                      }
                    >
                      {employee?.position}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(`/dashboard/employee/${employee.id}`)
                      }
                    >
                      {employee?.phone_number}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          // fontSize: '0.80em',
                          color: 'red',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                        onClick={() => onSelectGroup(employee.id)}
                      >
                        Remove{' '}
                        <DeleteIcon
                          sx={{ fontSize: '1em', marginLeft: '4px' }}
                        />
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          count={employeeData?.employees?.length || 0}
          rowsPerPage={employeeRowsPerPage}
          page={employeePage}
          onPageChange={handleEmployeePageChange}
          onRowsPerPageChange={handleEmployeeRowsPerPageChange}
          sx={{ fontSize: '0.80em', fontFamily: 'Inter, sans-serif' }}
        />
      </TableContainer>
    </Box>
  )
}

export default Page
