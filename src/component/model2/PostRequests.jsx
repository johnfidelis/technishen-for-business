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
    jobType: 'Full-Time',
    jobTitle: 'Software Engineer',
    company: 'TechCorp',
    availablePositions: 10,
    workingHours: '9am - 5pm',
    experienceLevel: 'Mid-level',
    projectLocation: 'Lagos, Nigeria',
    selectedCategories: ['Engineering', 'Development'],
    dateCreated: '2025-04-10',
    status: 'active',
  },
  {
    id: 2323,
    jobType: 'Part-Time',
    jobTitle: 'UI/UX Designer',
    company: 'Designify',
    availablePositions: 3,
    workingHours: 'Flexible',
    experienceLevel: 'Entry-level',
    projectLocation: 'Remote',
    selectedCategories: ['Design', 'Creatives'],
    dateCreated: '2025-04-09',
    status: 'inactive',
  },
  {
    id: 323233,
    jobType: 'Contract',
    jobTitle: 'Project Manager',
    company: 'BuildIt',
    availablePositions: 2,
    workingHours: '8am - 4pm',
    experienceLevel: 'Senior',
    projectLocation: 'Abuja, Nigeria',
    selectedCategories: ['Management'],
    dateCreated: '2025-04-08',
    status: 'active',
  },
  {
    id: 43233,
    jobType: 'Remote',
    jobTitle: 'Content Writer',
    company: 'WordSmiths',
    availablePositions: 5,
    workingHours: 'Flexible',
    experienceLevel: 'Entry-level',
    projectLocation: 'Remote',
    selectedCategories: ['Writing', 'Marketing'],
    dateCreated: '2025-04-07',
    status: 'inactive',
  },
  {
    id: 52323,
    jobType: 'Full-Time',
    jobTitle: 'Business Analyst',
    company: 'MarketMinds',
    availablePositions: 4,
    workingHours: '9am - 6pm',
    experienceLevel: 'Mid-level',
    projectLocation: 'Port Harcourt, Nigeria',
    selectedCategories: ['Business', 'Finance'],
    dateCreated: '2025-04-06',
    status: 'active',
  },
  {
    id: 63233,
    jobType: 'Internship',
    jobTitle: 'Marketing Intern',
    company: 'AdSpace',
    availablePositions: 6,
    workingHours: '10am - 4pm',
    experienceLevel: 'Intern',
    projectLocation: 'Lagos, Nigeria',
    selectedCategories: ['Marketing', 'Sales'],
    dateCreated: '2025-04-05',
    status: 'inactive',
  },
  {
    id: 73232,
    jobType: 'Contract',
    jobTitle: 'Data Analyst',
    company: 'DataDive',
    availablePositions: 2,
    workingHours: '9am - 3pm',
    experienceLevel: 'Junior',
    projectLocation: 'Remote',
    selectedCategories: ['Data', 'Analytics'],
    dateCreated: '2025-04-04',
    status: 'active',
  },
]

export default function Page() {
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
    // router.push(`/dashboard/resourcing/posts/open/${item.id}`)
  }

  return (
    <Box>
      {/* Summary Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          {
            title: 'Total Request',
            value: ' 1',
            icon: <InsertDriveFileIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Declined  Request',
            value: ' 2',
            icon: <ListAltIcon sx={{ color: 'white' }} />,
          },
          {
            title: 'Average Request Per Month',
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
                'Job Type',
                'Job Title',
                'Company',
                'Available Positions',
                'Working Hours',
                'Experience Level',
                'Project Location',
                'Selected Categories',
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
                  {/* Job Type */}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.jobType}
                  </TableCell>

                  {/* Job Title */}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.jobTitle}
                  </TableCell>

                  {/* Company */}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.company}
                  </TableCell>

                  {/* Available Positions */}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.availablePositions}
                  </TableCell>

                  {/* Working Hours */}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.workingHours}
                  </TableCell>

                  {/* Experience Level */}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.experienceLevel}
                  </TableCell>

                  {/* Project Location */}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.projectLocation}
                  </TableCell>

                  {/* Selected Categories */}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.selectedCategories.join(', ')}
                  </TableCell>

                  {/* Date Created */}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item.dateCreated}
                  </TableCell>

                  {/* Status with Approve and Decline Buttons */}
                  <TableCell
                    sx={{
                      fontSize: '0.75em',
                      fontWeight: 500,
                      fontFamily: 'Inter, sans-serif',
                      textTransform: 'capitalize',
                      display: 'flex',
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: '#1BA847',
                        color: '#fff',
                        textTransform: 'none',
                        mr: 1,
                        fontSize: '0.7em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                        '&:hover': {
                          backgroundColor: '#15963b',
                        },
                      }}
                      // onClick={() => handleApprove(item)}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: 'red',
                        color: '#fff',
                        textTransform: 'none',
                        fontSize: '0.7em',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif',
                        '&:hover': {
                          backgroundColor: '#cc0000',
                        },
                      }}
                      // onClick={() => handleDecline(item)}
                    >
                      Decline
                    </Button>
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
