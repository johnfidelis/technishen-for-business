'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'
import { ThemeContext } from '@/context/ThemeContext'
import CandidateProfile from '@/component/model2/CandidateProfile'

const Page = ({ onBack }) => {
  const { theme } = useContext(ThemeContext)
  const [number, setNumber] = useState(0)
  const router = useRouter()

  // Get both IDs from the dynamic route
  const params = useParams()
  const jobPostId = params.id
  const applicantId = params.applicant_id

  useEffect(() => {
    console.log('params', params)
    console.log('Job Post ID:', jobPostId)
    console.log('Applicant ID:', applicantId)
  }, [jobPostId, applicantId])

  const [serviceName, setServiceName] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const handleCreateSubCategory = () => {
    setOpenModal(true)
  }

  return (
    <Box
      sx={{
        width: '98%',
        p: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        minHeight: '60vh',
        margin: 'auto',
      }}
    >
      <Box sx={{ mb: 4, textAlign: 'left' }}>
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
          Applicants
        </Typography>
        <hr />
      </Box>

      {/* Pass both IDs if needed */}
      <CandidateProfile jobPostId={jobPostId} applicantId={applicantId} />
    </Box>
  )
}

export default Page
