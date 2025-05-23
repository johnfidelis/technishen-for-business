'use client'

import React, { useContext, useEffect, useState } from 'react'
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
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Modal,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/system'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ThemeContext } from '@/context/ThemeContext'
import { CheckCircleOutline, SentimentDissatisfied } from '@mui/icons-material'
import UserProfile from './modals/UserProfile'
import {
  useCreateResourcingData,
  useFetchResourcingData,
} from '@/hooks/useResourcingApiService'
import {
  GET_RESOURCING_ENDPOINTS,
  POST_ENDPOINTS,
} from '@/constants/resouringEndpoints'

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

 const modalStyle = {
    position: 'absolute',
    right: '2px',
    transform: 'translate(0, 0)',
    width: '450px',
    height: '100%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
  }

const CandidateProfile = ({ jobPostId, applicantId }) => {
  const [expanded, setExpanded] = useState(false)
  const [openOfferModal, setOpenOfferModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [contractFile, setContractFile] = useState(null)
  const [message, setMessage] = useState('')
  // const [isLoading, setIsLoading] = useState(false)

  const { data: applicant, isLoading } = useFetchResourcingData(
    GET_RESOURCING_ENDPOINTS.GET_APPLICANT_DETAILS(jobPostId, applicantId),
  )

  const sendJobOffer = useCreateResourcingData(
    POST_ENDPOINTS.SEND_JOB_OFFER(applicant?.application_info?.application_id),
    'sendJobOffer',
  )

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed!')
      return
    }
    setContractFile(file)
  }

  const handleSubmit = async () => {
    if (!contractFile) {
      toast.error('Please upload a PDF contract file.')
      return
    }

    const formData = new FormData()
    formData.append('contract_file', contractFile)
    if (message) {
      formData.append('message', message)
    }

    // setIsLoading(true)

    sendJobOffer.mutate(formData, {
      onSuccess: () => {
        toast.success('Job Offer Sent!')
        setContractFile(null)
        setMessage('')
        // setIsLoading(false)
        onClose()
      },
      onError: (error) => {
        toast.error(error?.response?.data?.detail || 'Something went wrong')
        // setIsLoading(false)
      },
    })
  }

  const [supportingDocuments, setSupportingDocuments] = useState([])

  useEffect(() => {
    if (applicant) {
      setSupportingDocuments([
        {
          nameOfDocument: 'CV',
          document: applicant?.applicant_profile?.cv,
        },
        {
          nameOfDocument: 'Certificate',
          document: applicant?.applicant_profile?.certificate,
        },
        {
          nameOfDocument: 'ID Document',
          document: applicant?.applicant_profile?.id_document,
        },
        {
          nameOfDocument: 'Proof of Address',
          document: applicant?.applicant_profile?.proof_of_address,
        },
      ])
    }
  }, [applicant])

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
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width={400}
              height={300}
              sx={{ borderRadius: '12px', marginRight: '16px' }}
            />
          ) : (
            <Avatar
              alt={`${applicant?.applicant_profile?.first_name} ${applicant?.applicant_profile?.last_name}`}
              src={applicant?.applicant_profile?.profile_picture}
              sx={{
                width: 400,
                height: 300,
                borderRadius: '12px',
                marginRight: '16px',
              }}
            />
          )}
        </Box>

        {/* Content */}
        {isLoading ? (
          <Skeleton variant="text" width={600} height={100} />
        ) : (
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
                  <strong>Candidate Name:</strong>{' '}
                  {applicant?.applicant_profile?.first_name}{' '}
                  {applicant?.applicant_profile?.last_name}
                  {/* <VisibilityIcon
                    sx={{ fontSize: '18px', cursor: 'pointer', color: 'gray' }}
                    onClick={handleModalOpen} // Show modal on click
                  /> */}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '14px',
                    mb: 0.5,
                    letterSpacing: '0.5px',
                    textTransform: 'capitalize',
                  }}
                >
                  <strong>Current Role:</strong>{' '}
                  {applicant?.applicant_profile?.work_experiences?.[0]
                    ?.company_name || 'Not specified'}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Typography sx={{ fontSize: '14px', letterSpacing: '0.5px' }}>
                    <strong>Rating:</strong>
                  </Typography>
                  <Rating
                    value={applicant?.applicant_profile?.rating || 0}
                    precision={0.1}
                    readOnly
                    sx={{ mx: 1 }}
                  />
                  <Typography sx={{ fontSize: '14px', letterSpacing: '0.5px' }}>
                    ({applicant?.applicant_profile?.rating?.toFixed(1) || '0.0'}
                    /5)
                  </Typography>
                </Box>
              </Box>

              {/* Second Candidate Info */}
              <Box>
                <Typography
                  sx={{ fontSize: '14px', mb: 0.5, letterSpacing: '0.5px' }}
                >
                  <strong>Applied For:</strong>{' '}
                  {applicant?.application_info?.job_title || '-'}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '14px',
                    mb: 0.5,
                    letterSpacing: '0.5px',
                    textTransform: 'capitalize',
                  }}
                >
                  <strong>Availability:</strong>{' '}
                  {applicant?.application_info?.availability || 'Not provided'}
                </Typography>

                <Typography
                  sx={{ fontSize: '14px', mb: 0.5, letterSpacing: '0.5px' }}
                >
                  <strong>Current Match:</strong>{' '}
                  <span style={{ color: 'green' }}>
                    {applicant?.application_info?.match_rate || 0}%
                  </span>
                </Typography>
              </Box>

              {/* Select Dropdown */}
            </Box>

            {/* Show Scheduled Time */}
            {applicant?.applicant_profile?.interviewTime && (
              <Typography sx={{ fontSize: '14px', mt: 2 }}>
                <strong>Scheduled Meeting Time:</strong>{' '}
                {applicant?.applicant_profile?.interviewTime}
              </Typography>
            )}

            {applicant?.application_info?.interview_status == null && (
              <Box sx={{ display: 'flex', mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: theme.primary_color,
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: theme.primary_color,
                    },
                  }}
                  onClick={handleModalOpen}
                >
                  Schedule Interview
                </Button>
              </Box>
            )}

            {applicant?.application_info?.interview_status == 'invited' && (
              <Box sx={{ display: 'flex', gap: '1em', mt: 2 }}>
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
                  Join Interview
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: theme.primary_color,
                    color: theme.primary_color,
                    '&:hover': {
                      borderColor: theme.primary_color,
                      backgroundColor: theme.primary_color,
                      color: '#fff',
                    },
                  }}
                >
                  Reschedule
                </Button>
              </Box>
            )}

            {applicant?.application_info?.interview_status == 'passed' && (
              <Box sx={{ display: 'flex', gap: '1em', mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setOpenOfferModal(true)}
                  sx={{
                    backgroundColor: theme.primary_color,
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: theme.primary_color,
                    },
                  }}
                >
                  Send Job Offer
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>

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
          {isLoading ? (
            <Skeleton variant="text" width={'100%'} height={100} />
          ) : (
            <TextField
              fullWidth
              multiline
              disabled
              minRows={4}
              value={applicant?.applicant_profile?.professional_summary || ''}
            />
          )}
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
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Skeleton variant="text" width={'100%'} height={100} />
            </Box>
          ) : applicant?.applicant_profile?.work_experiences?.length > 0 ? (
            applicant?.applicant_profile?.work_experiences.map((exp, index) => (
              <React.Fragment key={exp.id}>
                <StyledDetailBox>
                  <StyledDetailSection>
                    <StyledDetailTypography>
                      Job Position
                    </StyledDetailTypography>
                    <TextField fullWidth disabled value={exp.job_title} />
                  </StyledDetailSection>

                  <StyledDetailSection>
                    <StyledDetailTypography>Company</StyledDetailTypography>
                    <TextField fullWidth disabled value={exp.company_name} />
                  </StyledDetailSection>

                  <StyledDetailSection>
                    <StyledDetailTypography>Start Date</StyledDetailTypography>
                    <TextField
                      fullWidth
                      disabled
                      value={new Date(exp.start_date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                        },
                      )}
                    />
                  </StyledDetailSection>

                  <StyledDetailSection>
                    <StyledDetailTypography>End Date</StyledDetailTypography>
                    <TextField
                      fullWidth
                      disabled
                      value={
                        exp.is_current
                          ? 'Present'
                          : new Date(exp.end_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                            })
                      }
                    />
                  </StyledDetailSection>

                  <StyledDetailSection sx={{ width: '100%' }}>
                    <StyledDetailTypography>
                      Job Description
                    </StyledDetailTypography>
                    <TextField
                      fullWidth
                      multiline
                      disabled
                      minRows={4}
                      value={exp.description || 'No description provided.'}
                    />
                  </StyledDetailSection>
                </StyledDetailBox>

                {index !==
                  applicant?.applicant_profile?.work_experiences.length - 1 && (
                  <hr style={{ margin: '10px 0px' }} />
                )}
              </React.Fragment>
            ))
          ) : (
            <Typography>No experience provided by this candidate.</Typography>
          )}
        </StyledAccordionDetails>
      </StyledAccordion>

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
          {isLoading ? (
            <Skeleton variant="text" width={'100%'} height={100} />
          ) : (
            <Box className="flex flex-wrap gap-2" style={{ gap: '10px' }}>
              {applicant?.applicant_profile?.technical_skills?.length > 0 ? (
                applicant?.applicant_profile?.technical_skills?.map((skill) => (
                  <SkillChip
                    key={skill.id}
                    label={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                      >
                        {`${skill.skill_name} (${skill.proficiency})`}
                        <CheckCircleOutline fontSize="small" />
                      </Box>
                    }
                    style={{
                      color: 'white',
                      backgroundColor: theme.primary_color || '#115093',
                    }}
                  />
                ))
              ) : (
                <Typography>No technical skills provided.</Typography>
              )}
            </Box>
          )}
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
          <TableContainer
            component={Paper}
            sx={{ borderRadius: '0.5em', mt: 2 }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Verifier By</TableCell>
                  <TableCell>ID Verified</TableCell>
                  <TableCell>Address Verified</TableCell>
                  <TableCell>Education Verified</TableCell>
                  <TableCell>Criminal Record Passed</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Verified At</TableCell>
                  <TableCell>Remarks</TableCell>
                  <TableCell>Report</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      sx={{ textAlign: 'center', padding: '2em' }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Skeleton width={'100%'} height={40} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : applicant?.applicant_profile?.verification != null ? (
                  <TableRow hover>
                    <TableCell>
                      {applicant?.applicant_profile?.verification.verifier_name}
                    </TableCell>
                    <TableCell>
                      {applicant?.applicant_profile?.verification.id_verified
                        ? 'Yes'
                        : 'No'}
                    </TableCell>
                    <TableCell>
                      {applicant?.applicant_profile?.verification
                        .address_verified
                        ? 'Yes'
                        : 'No'}
                    </TableCell>
                    <TableCell>
                      {applicant?.applicant_profile?.verification
                        .education_verified
                        ? 'Yes'
                        : 'No'}
                    </TableCell>
                    <TableCell>
                      {applicant?.applicant_profile?.verification
                        .criminal_record_check_passed
                        ? 'Yes'
                        : 'No'}
                    </TableCell>
                    <TableCell>
                      {applicant?.applicant_profile?.verification.status}
                    </TableCell>
                    <TableCell>
                      {applicant?.applicant_profile?.verification.verified_at
                        ? new Date(
                            applicant?.applicant_profile?.verification.verified_at,
                          ).toLocaleString()
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {applicant?.applicant_profile?.verification.remarks ||
                        '—'}
                    </TableCell>
                    <TableCell>
                      {applicant?.applicant_profile?.verification
                        .verification_report ? (
                        <Button
                          variant="outlined"
                          size="small"
                          component="a"
                          href={
                            applicant?.applicant_profile?.verification
                              .verification_report
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View File
                        </Button>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
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
                          sx={{
                            fontWeight: 400,
                            fontSize: '1em',
                            color: 'gray',
                          }}
                        >
                          No Verification Record Available
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Skeleton variant="text" width={'100%'} height={40} />
                    </TableCell>
                  </TableRow>
                ) : supportingDocuments?.length > 0 ? (
                  supportingDocuments
                    // .filter(doc => doc.document) // Only show available documents
                    .map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ minWidth: 180 }}>
                          {doc.nameOfDocument}
                        </TableCell>
                        <TableCell sx={{ minWidth: 180 }}>
                          {applicant?.applicant_profile?.first_name}{' '}
                          {applicant?.applicant_profile?.last_name}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: '0.75em',
                            fontWeight: 500,
                            fontFamily: 'Inter, sans-serif',
                            color: theme.primary_color,
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
                          onClick={() => window.open(doc.document, '_blank')}
                        >
                          View
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No supporting documents found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={supportingDocuments?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ fontSize: '0.80em', fontFamily: 'Inter, sans-serif' }}
            />
          </TableContainer>
        </StyledAccordionDetails>
      </StyledAccordion>
      {/* Supporting Documents */}

      <StyledAccordion
        expanded={expanded === 'panel6'}
        onChange={handleAccordionChange('panel6')}
      >
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box>
            <Typography sx={{ fontWeight: 'bold' }}>Certificates</Typography>
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
                    Issuer
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Loading certifications...
                    </TableCell>
                  </TableRow>
                ) : applicant?.applicant_profile?.certifications?.length > 0 ? (
                  applicant?.applicant_profile?.certifications.map(
                    (cert, index) => (
                      <TableRow key={cert.id || index}>
                        <TableCell sx={{ minWidth: 180 }}>
                          {cert.title || '-'}
                        </TableCell>
                        <TableCell sx={{ minWidth: 180 }}>
                          {cert.issuer || '-'}
                        </TableCell>
                        <TableCell sx={{ minWidth: 180 }}>
                          {cert.issue_date
                            ? new Date(cert.issue_date).toLocaleDateString()
                            : '-'}
                        </TableCell>
                        <TableCell sx={{ minWidth: 180 }}>
                          {cert.expiration_date
                            ? new Date(
                                cert.expiration_date,
                              ).toLocaleDateString()
                            : '-'}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: '0.75em',
                            fontWeight: 500,
                            fontFamily: 'Inter, sans-serif',
                            color: theme.primary_color,
                            textDecoration: 'underline',
                            cursor: cert.credential_url
                              ? 'pointer'
                              : 'not-allowed',
                            opacity: cert.credential_url ? 1 : 0.5,
                          }}
                          onClick={() =>
                            cert.credential_url &&
                            window.open(cert.credential_url, '_blank')
                          }
                        >
                          View
                        </TableCell>
                      </TableRow>
                    ),
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No certifications available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={applicant?.applicant_profile?.certifications?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ fontSize: '0.80em', fontFamily: 'Inter, sans-serif' }}
            />
          </TableContainer>
        </StyledAccordionDetails>
      </StyledAccordion>
      <UserProfile
        open={open}
        onClose={handleModalClose}
        user={applicant}
        applicationId={applicant?.application_info?.application_id}
      />

    <Modal open={openOfferModal} onClose={() => setOpenOfferModal(false)}>
      <Box sx={modalStyle}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="right"
          alignItems="center"
          sx={{ backgroundColor: theme.primary_color }}
        >
          <IconButton
            onClick={() => setOpenOfferModal(false)}
            sx={{ color: 'white', fontSize: '1em' }}
          >
            Close <CloseIcon />
          </IconButton>
        </Box>

        {/* Profile Info */}
        <Box sx={{ p: '1em' }}>
          <Box display="flex" alignItems="center" gap="1em">
            <Avatar
              sx={{ width: '3.75em', height: '3.75em' }}
              src={applicant?.applicant_profile?.profile_picture}
            />
            <Box>
              <Typography sx={{ fontWeight: 400, fontSize: '1.125em' }}>
                {applicant?.applicant_profile?.first_name +
                  ' ' +
                  applicant?.applicant_profile?.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Send job offer with optional message and contract file
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Form Section */}
        <Box sx={{ overflowY: 'auto', flexGrow: 1, p: '1em' }}>
          <TextField
            fullWidth
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: 'application/pdf' }}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Optional Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: theme?.primary_color,
                color: '#fff',
                '&:hover': { backgroundColor: theme?.primary_color },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Send Offer'
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
    </Box>
  )
}

export default CandidateProfile
