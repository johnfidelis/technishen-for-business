'use client'

import { useContext, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Rating,
  Chip,
  TextField,
  TablePagination,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/system'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ThemeContext } from '@/context/ThemeContext'
import { CheckCircleOutline } from '@mui/icons-material'
import UserProfile from './modals/UserProfile'

// Styled Components
const StyledBox = styled(Box)({
  width: '98%',
  padding: '20px',
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  margin: 'auto',
  fontFamily: 'Inter, sans-serif',
})

const StyledTableCell = styled(TableCell)({
  fontWeight: 500,
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.8em',
  padding: '10px',
})

const StyledAccordion = styled(Accordion)({
  borderRadius: '8px',
  marginBottom: '10px',
  '&:before': { display: 'none' },
})

const StyledAccordionSummary = styled(AccordionSummary)({
  borderBottom: '1px solid #E0E0E0',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 'bold',
})

const StyledAccordionDetails = styled(AccordionDetails)({
  padding: '16px',
})

const StyledDetailBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  border: '1px solid #E0E0E0',
  padding: '16px',
  borderRadius: '8px',

  marginBottom: '12px',
})

const StyledDetailSection = styled(Box)({
  width: '45%',
  marginBottom: '12px',
})

const StyledDetailTypography = styled(Typography)({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  color: '#333',
  marginBottom: '8px',
  fontSize: '0.8em',
})

const StyledDetailText = styled(Typography)({
  fontFamily: 'Inter, sans-serif',
  color: '#555',
  marginBottom: '8px',
  fontSize: '0.8em',
})

const StyledDetailDescription = styled(Typography)({
  fontFamily: 'Inter, sans-serif',
  color: '#666',
  marginBottom: '8px',
  fontSize: '0.8em',
  lineHeight: '1.6',
})

const SkillChip = styled(Chip)({
  color: '#FFFFFF',
  fontWeight: 500,
  borderRadius: '20px',
  fontSize: '0.8em',
  '& .MuiChip-label': {
    padding: '10px 16px',
  },
})

const ViewEffectiveAssignment = () => {
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState(false)

  // Toggle modal visibility
  const handleModalOpen = () => setOpen(true)
  const handleModalClose = () => setOpen(false)
  const { theme } = useContext(ThemeContext)

  const handleAccordionChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

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
      {/* Candidate Info Section */}
      <Box className="mb-8 text-left flex flex-wrap">
        {/* Avatar */}
        <Box className="flex items-center">
          <Avatar
            alt="Candidate"
            src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
            sx={{
              width: 400,
              height: 300,
              borderRadius: '12px',
              marginRight: '16px',
            }}
          />
        </Box>

        {/* Content */}
        <Box>
          {/* First Candidate Info */}
          <Box className="flex flex-col" style={{ gap: '10%' }}>
            <Box>
              <Typography
                sx={{
                  mb: 1,
                  letterSpacing: '0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <strong>Candidate Name:</strong> David Willie
                <VisibilityIcon
                  sx={{ fontSize: '18px', cursor: 'pointer', color: 'gray' }}
                  onClick={handleModalOpen} // Show modal on click
                />
              </Typography>

              <Typography
                sx={{ fontSize: '14px', mb: 0.5, letterSpacing: '0.5px' }}
              >
                <strong>Current Role:</strong> Full Stack Engineer
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography sx={{ fontSize: '14px', letterSpacing: '0.5px' }}>
                  <strong>Rating:</strong>
                </Typography>
                <Rating value={4.9} precision={0.1} readOnly sx={{ mx: 1 }} />
                <Typography sx={{ fontSize: '14px', letterSpacing: '0.5px' }}>
                  (4.9/5)
                </Typography>
              </Box>
            </Box>

            {/* Select Dropdown */}
          </Box>
          <FormControl sx={{ mt: 2, minWidth: '600px' }}>
            <Select
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              value=""
            >
              <MenuItem value="">Effective Assignment</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box>
        <Box sx={{ mt: 4, textAlign: 'left', mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#333',
              fontSize: '1.25em',
              mb: 2,
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
            }}
          >
            Current Role
          </Typography>
          <hr />
        </Box>
        <TextField fullWidth label="Rate" disabled value="500" />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          <Box sx={{ width: 'calc(50% - 8px)' }}>
            <TextField
              fullWidth
              disabled
              label="Start Date"
              value="29 April 2022, 00:00AM"
            />
          </Box>
          <Box sx={{ width: 'calc(50% - 8px)' }}>
            <TextField
              fullWidth
              disabled
              label="End Date"
              value="29 July 2022, 00:00AM"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Typography sx={{ fontSize: '14px', mt: 1, letterSpacing: '0.5px' }}>
            <strong>Developer Note:</strong> For Current Role, user can edit
            “Rate” and “End Date”. User cannot edit “Start Date”.
          </Typography>

          <Box sx={{ alignSelf: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.primary_color,
                color: '#fff',
                '&:hover': {
                  backgroundColor: theme.primary_color,
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ mt: 4, textAlign: 'left', mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#333',
              fontSize: '1.25em',
              mb: 2,
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
            }}
          >
            Performance
          </Typography>
          <hr />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography>Rate the candidate</Typography>
          <Rating value={3} precision={1} /> (4.9/5)
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Review"
          disabled
          value="Review are written here"
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Typography sx={{ fontSize: '14px', mt: 1, letterSpacing: '0.5px' }}>
            <strong>Developer Note:</strong> For Performance, user can edit the
            rating starts and also edit the “Review”.
          </Typography>

          <Box sx={{ alignSelf: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.primary_color,
                color: '#fff',
                '&:hover': {
                  backgroundColor: theme.primary_color,
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Accordion Sections */}
      {/* Professional Summary */}

      <Box>
        <Box sx={{ mt: 4, textAlign: 'left', mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#333',
              fontSize: '1.25em',
              mb: 2,
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
            }}
          >
            Candidate: Profile
          </Typography>
          <hr />
        </Box>
        <StyledAccordion
          expanded={expanded === 'panel1'}
          onChange={handleAccordionChange('panel1')}
        >
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>
                Professional Summary
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '14px', color: 'gray' }}>
                About Candidate
              </Typography>
            </Box>
          </StyledAccordionSummary>

          <StyledAccordionDetails>
            <TextField
              fullWidth
              multiline
              disabled
              minRows={4}
              value="David is an experienced Software Developer and UI/UX Designer who bridges design and development..."
            />
          </StyledAccordionDetails>
        </StyledAccordion>

        {/* Candidate Resume */}
        <StyledAccordion
          expanded={expanded === 'panel2'}
          onChange={handleAccordionChange('panel2')}
        >
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>
                Candidate Resume
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '14px', color: 'gray' }}>
                Professional Experience
              </Typography>
            </Box>
          </StyledAccordionSummary>

          <StyledAccordionDetails>
            {/* Experience 1 */}
            <StyledDetailBox>
              <StyledDetailSection>
                <StyledDetailTypography>Job Position</StyledDetailTypography>
                <TextField fullWidth disabled value="Lead Developer" />
              </StyledDetailSection>

              <StyledDetailSection>
                <StyledDetailTypography>Company</StyledDetailTypography>
                <TextField fullWidth disabled value="Tsogolo Technologies" />
              </StyledDetailSection>

              <StyledDetailSection>
                <StyledDetailTypography>Start Date</StyledDetailTypography>
                <TextField fullWidth disabled value="January 2017" />
              </StyledDetailSection>

              <StyledDetailSection>
                <StyledDetailTypography>End Date</StyledDetailTypography>
                <TextField fullWidth disabled value="Present" />
              </StyledDetailSection>

              <StyledDetailSection sx={{ width: '100%' }}>
                <StyledDetailTypography>Job Description</StyledDetailTypography>
                <TextField
                  fullWidth
                  multiline
                  disabled
                  minRows={4}
                  value={`David led a team, built features, handled version control.

Core Duties include:
- Daily software development and updates
- Version control management
- UI designs implementation`}
                />
              </StyledDetailSection>
            </StyledDetailBox>
            <hr style={{ margin: '10px 0px' }} />
            {/* Experience 2 */}
            <StyledDetailBox>
              <StyledDetailSection>
                <StyledDetailTypography>Job Position</StyledDetailTypography>
                <TextField fullWidth disabled value="Software Engineer" />
              </StyledDetailSection>

              <StyledDetailSection>
                <StyledDetailTypography>Company</StyledDetailTypography>
                <TextField fullWidth disabled value="The Black Ones" />
              </StyledDetailSection>

              <StyledDetailSection>
                <StyledDetailTypography>Start Date</StyledDetailTypography>
                <TextField fullWidth disabled value="January 2013" />
              </StyledDetailSection>

              <StyledDetailSection>
                <StyledDetailTypography>End Date</StyledDetailTypography>
                <TextField fullWidth disabled value="December 2016" />
              </StyledDetailSection>

              <StyledDetailSection sx={{ width: '100%' }}>
                <StyledDetailTypography>Job Description</StyledDetailTypography>
                <TextField
                  fullWidth
                  multiline
                  disabled
                  minRows={4}
                  value={`Developed scalable apps, version management, UI implementation.

Core Duties include:
- Daily app updates
- Source control and deployments
- UI design to code conversion`}
                />
              </StyledDetailSection>
            </StyledDetailBox>
          </StyledAccordionDetails>
        </StyledAccordion>

        {/* Skillset */}
        <StyledAccordion
          expanded={expanded === 'panel3'}
          onChange={handleAccordionChange('panel3')}
        >
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>Skillset</Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '14px', color: 'gray' }}>
                Technical Skills
              </Typography>
            </Box>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Box className="flex flex-wrap gap-2" style={{ gap: '10px' }}>
              {[
                'Javascript',
                'Angular',
                'React',
                'Vue',
                'Node JS',
                'Version Control',
                'Next JS',
                'HTML5',
                'CSS',
                'Bootstrap CSS',
                'Tailwind CSS',
              ].map((skill, index) => (
                <SkillChip
                  key={index}
                  label={
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      {skill}
                      <CheckCircleOutline fontSize="small" />
                    </Box>
                  }
                  style={{
                    color: 'white',
                    backgroundColor: theme.primary_color || '#115093',
                  }}
                />
              ))}
            </Box>
          </StyledAccordionDetails>
        </StyledAccordion>

        {/* External Verfication */}
        <StyledAccordion
          expanded={expanded === 'panel4'}
          onChange={handleAccordionChange('panel4')}
        >
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>
                External Verification
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '14px', color: 'gray' }}>
                Verification Details
              </Typography>
            </Box>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
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
                      Verified By
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.80em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Watermark Number
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.80em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Date Issued
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.80em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      documentType: 'Lexis Ref',
                      name: '71247417897',
                      dateIssued: 'May 2023',
                    },
                    {
                      documentType: 'Verify ID',
                      name: '0258737923',
                      dateIssued: 'May 2023',
                    },
                  ].map((verification, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ minWidth: 180 }}>
                        {verification.documentType}
                      </TableCell>
                      <TableCell sx={{ minWidth: 180 }}>
                        {verification.name}
                      </TableCell>
                      <TableCell sx={{ minWidth: 180 }}>
                        {verification.dateIssued}
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
                      >
                        View
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={4}
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
          </StyledAccordionDetails>
        </StyledAccordion>

        {/* Supporting Documents */}
        <StyledAccordion
          expanded={expanded === 'panel5'}
          onChange={handleAccordionChange('panel5')}
        >
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>
                Supporting Documents
              </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '14px', color: 'gray' }}>
                Attachments
              </Typography>
            </Box>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
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
                      Document Type
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.80em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.80em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Date Issued
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.80em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Expiry Date
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.80em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      documentType: 'ID',
                      name: 'Jay Fidelis',
                      dateIssued: 'May 2023',
                      expiryDate: 'May 2025',
                    },
                    {
                      documentType: 'Passport',
                      name: 'Jay Fidelis',
                      dateIssued: 'May 2023',
                      expiryDate: 'May 2025',
                    },
                    {
                      documentType: 'Degree',
                      name: 'Jay Fidelis',
                      dateIssued: 'May 2023',
                      expiryDate: 'May 2025',
                    },
                    {
                      documentType: 'Certificate',
                      name: 'Jay Fidelis',
                      dateIssued: 'May 2023',
                      expiryDate: 'May 2025',
                    },
                    {
                      documentType: `Driver's Liences`,
                      name: 'Jay Fidelis',
                      dateIssued: 'May 2023',
                      expiryDate: 'May 2025',
                    },
                  ].map((verification, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ minWidth: 180 }}>
                        {verification.documentType}
                      </TableCell>
                      <TableCell sx={{ minWidth: 180 }}>
                        {verification.name}
                      </TableCell>
                      <TableCell sx={{ minWidth: 180 }}>
                        {verification.dateIssued}
                      </TableCell>
                      <TableCell sx={{ minWidth: 180 }}>
                        {verification.expiryDate}
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
                      >
                        View
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={4}
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
          </StyledAccordionDetails>
        </StyledAccordion>
      </Box>
      <UserProfile open={open} onClose={handleModalClose} />
    </Box>
  )
}

export default ViewEffectiveAssignment
