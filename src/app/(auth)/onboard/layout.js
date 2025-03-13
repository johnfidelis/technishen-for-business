'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Container,
  Paper,
  Grid,
  Divider,
} from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import BackgroundBox from '@/component/BackgroundBox'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'

import Step1 from './step1/page'
import Step2 from './step2/page'
import Step3 from './step3/page'
import Step4 from './step4/page'

const steps = [
  'Personal Details',
  'Business Information',
  'Business Address',
  'Finish',
]

const Layout = () => {
  const [activeStep, setActiveStep] = useState(0)

  const { data, isLoading } = useFetchData(
    GET_ENDPOINTS.BUSINESS_OWNER_PROFILE,
    'fetchBusinessOwner',
  )

  useEffect(() => {
    if (!isLoading && data) {
      try {
        console.log({ data })
        if (data?.first_name === '') {
          setActiveStep(0)
        } else if (data?.first_name !== '') {
          setActiveStep(1)
        }
      } catch (error) {
        console.error('Error fetching business owner profile:', error)
        setActiveStep(0)
      }
    }
  }, [data, isLoading])

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)

  return (
    <BackgroundBox>
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: '#B4E4FF',
              padding: '16px 24px',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AssignmentIcon
              sx={{ color: '#115093', fontSize: '32px', mr: 1 }}
            />
            <Typography variant="h4" sx={{ color: '#115093', fontWeight: 400 }}>
              REGISTRATION
            </Typography>
          </Box>

          {/* Stepper & Content */}
          <Grid
            container
            spacing={3}
            sx={{ p: '40px 60px', minHeight: '650px' }}
          >
            {/* Stepper */}
            <Grid item xs={12} md={3}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label} completed={index < activeStep}>
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontSize: '1em',
                          color: index <= activeStep ? '#115093' : '#ccc',
                          fontWeight: index <= activeStep ? 'bold' : 'normal',
                          margin: '20px 0px',
                        },
                        '& .MuiStepIcon-root': {
                          color: index <= activeStep ? '#115093' : '#ccc',
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>

            {/* Divider */}
            <Divider orientation="vertical" flexItem />

            {/* Step Content */}
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  minHeight: '550px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {activeStep === 0 && <Step1 handleNext={handleNext} />}
                {activeStep === 1 && (
                  <Step2 handleNext={handleNext} handleBack={handleBack} />
                )}
                {activeStep === 2 && (
                  <Step3 handleNext={handleNext} handleBack={handleBack} />
                )}
                {activeStep === 3 && <Step4 handleBack={handleBack} />}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </BackgroundBox>
  )
}

export default Layout
