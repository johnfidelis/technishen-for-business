'use client'

import { Box, Grid, Paper, Typography } from '@mui/material'
import { useContext, useEffect, useState, Suspense } from 'react'
import PersonalDetails from './personal-details/page'
import BusinessProfile from './business-profile/page'
import BusinessCustomization from './business-customization/page'
import { ThemeContext } from '@/context/ThemeContext'
import { useSearchParams } from 'next/navigation'
import AuditLogTable from './audit-log/page'

const SettingsLayoutContent = ({ activeSection = 0 }) => {
  const { theme } = useContext(ThemeContext)
  const searchParams = useSearchParams()
  const tabFromQuery = searchParams.get('tab')
  const initialTab = tabFromQuery ? parseInt(tabFromQuery) : 0
  const [activeTab, setActiveTab] = useState(activeSection)

  useEffect(() => {
    setActiveTab(initialTab) // Update tab when query changes
  }, [tabFromQuery])

  const menuItems = [
    { label: 'Personal Details' },
    { label: 'Business Profile' },
    { label: 'Business Customization' },
    { label: 'Activity Log' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <PersonalDetails />
      case 1:
        return <BusinessProfile />
      case 2:
        return <BusinessCustomization />
      case 3:
        return <AuditLogTable />
      default:
        return <PersonalDetails />
    }
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
      <Paper
        elevation={3}
        sx={{ p: 3, minHeight: '500px', borderRadius: '12px' }}
      >
        <Grid container spacing={4}>
          {/* Left Section - Navigation */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                backgroundColor: theme.primary_color || '#115093',
                height: '500px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              {menuItems.map((item, index) => (
                <Typography
                  key={index}
                  variant="h6"
                  sx={{
                    color: activeTab === index ? '#FFF' : 'gray',
                    fontWeight: activeTab === index ? 600 : 500,
                    cursor: 'pointer',
                    mb: 2,
                    textDecoration: 'none',
                  }}
                  onClick={() => setActiveTab(index)}
                >
                  {item.label}
                </Typography>
              ))}
            </Paper>
          </Grid>

          {/* Right Section - Content */}
          <Grid item xs={12} md={8}>
            {renderContent()}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

const SettingsLayout = ({ activeSection }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsLayoutContent activeSection={activeSection} />
    </Suspense>
  )
}

export default SettingsLayout
