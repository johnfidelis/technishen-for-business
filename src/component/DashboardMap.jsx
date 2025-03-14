'use client'

import { useState, useMemo } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import EmployeeProfile from './modals/EmployeeProfile'
import CustomerProfile from './modals/CustomerProfile'

// import CustomerProfile from './modals/CustomerProfile'
import Image from 'next/image'
import Img1 from '../assets/images/jay1.jpeg'
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Skeleton,
} from '@mui/material'

const DashboardMap = () => {
  const libraries = useMemo(() => ['places'], [])

  // 📍 Default Map Center
  const mapCenter = useMemo(() => ({ lat: -26.2041, lng: 28.0473 }), [])

  // 🎯 Google Map Options
  // const mapOptions = useMemo(
  //   () => ({
  //     disableDefaultUI: true,
  //     clickableIcons: true,
  //     scrollwheel: true,
  //   }),
  //   [],
  // )

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: false, // Enable default UI for full-screen button
      clickableIcons: true,
      scrollwheel: true,
      mapTypeControl: true, // Allow switching between Map & Satellite view
      fullscreenControl: true, // Enable Full-screen button
    }),
    [],
  )

  // 🏷️ Locations on the map
  const locations = useMemo(
    () => [
      {
        id: 1,
        position: { lat: -26.2044, lng: 28.0456 },
        image: Img1,
        name: 'David Tsogolo',
        company: 'Tsogolo Technology',
        role: 'Laptop Engineer',
        ticketAvailable: false,
        user: 'customer',
      },
      {
        id: 2,
        position: { lat: -26.2155, lng: 28.1073 },
        image: Img1,
        name: 'Sammie Google',
        company: 'Google',
        role: 'Electrical Engineer',
        ticketAvailable: true,
        user: 'customer',
      },
      {
        id: 3,
        position: { lat: -26.212, lng: 28.1403 },
        image: Img1,
        name: 'David Technisen',
        company: 'Technisen',
        role: 'Software Engineer',
        ticketAvailable: true,
        user: 'employee',
      },
    ],
    [],
  )

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries,
  })

  // 🔍 State for selected marker
  const [selectedMarker, setSelectedMarker] = useState(null)

  // ✅ Filter States
  const [showTickets, setShowTickets] = useState(false) // Show Available Tickets
  const [showTechnisen, setShowTechnisen] = useState(false) // Show only Technisen tickets

  // 📌 Modal States
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)

  // 🛠️ Apply Filters
  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      if (showTickets && !location.ticketAvailable) return false
      if (showTechnisen && location.company !== 'Technisen') return false
      return true
    })
  }, [showTickets, showTechnisen, locations])

  // ❌ Prevent access to `window.google.maps` if not loaded
  if (!isLoaded)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{
          marginTop: 10,
          width: '100%',
          height: '500px',
          borderRadius: '15px',
          border: '2px solid black',
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={'500px'} />
        {/* <Skeleton variant="text" width="60%" sx={{ mt: 2 }} /> */}
      </Box>
    )

  // 🔥 Handle Open Click
  const handleOpenClick = () => {
    if (selectedMarker?.user === 'customer') {
      setCustomerModalOpen(true)
    } else if (selectedMarker?.user === 'employee') {
      setEmployeeModalOpen(true)
    }
  }

  return (
    <Box style={{ marginTop: '24px' }}>
      {/* 🗺️ Google Map */}
      <GoogleMap
        options={mapOptions}
        zoom={12}
        center={mapCenter}
        mapContainerStyle={{
          width: '100%',
          height: '500px',
          borderRadius: '15px',
          border: '2px solid black',
        }}
        // onLoad={() => console.log('Google Map Loaded...')}
      >
        {/* ✅ Ensure `window.google.maps` is defined before using */}
        {isLoaded && window.google && (
          <>
            {filteredLocations.map((location) => (
              <Marker
                key={location.id}
                position={location.position}
                icon={{
                  url: location.image.src,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                onClick={() => setSelectedMarker(location)}
              />
            ))}
          </>
        )}

        {/* 🏠 InfoWindow on Marker Click */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <Box
              onClick={handleOpenClick}
              sx={{
                textAlign: 'center',
                borderRadius: '15px',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                display: 'flex',
                gap: 1,
              }}
            >
              <Image
                src={selectedMarker.image}
                alt={selectedMarker.name}
                style={{
                  width: '60px',
                  height: '60px',
                  border: '2px solid white',
                }}
              />
              <div>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    // color: '#333',
                    textAlign: 'start',
                  }}
                >
                  {selectedMarker.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#333', textAlign: 'start' }}
                >
                  {selectedMarker.role}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#115093',
                    textAlign: 'start',
                    textTransform: 'capitalize',
                  }}
                >
                  {selectedMarker.user} Details
                </Typography>
              </div>
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* 🎯 Map Legend & Filters */}
      <Box sx={{ mt: 2, textAlign: 'start' }}>
        <Typography sx={{ fontWeight: 400 }}>Map Legend</Typography>
        <Grid container justifyContent="start">
          {/* ✅ Show Available Tickets Checkbox */}
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showTickets}
                  onChange={() => setShowTickets(!showTickets)}
                />
              }
              label={
                <Typography sx={{ fontWeight: 400, fontSize: '0.8em' }}>
                  Show Available Tickets
                </Typography>
              }
            />
          </Grid>

          {/* ✅ Show Only Technisen Tickets Checkbox */}
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showTechnisen}
                  onChange={() => setShowTechnisen(!showTechnisen)}
                />
              }
              label={
                <Typography sx={{ fontWeight: 400, fontSize: '0.8em' }}>
                  Technisen
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </Box>

      {/* 🎭 Modals */}
      {/* {customerModalOpen && <CustomerProfile open={customerModalOpen} onClose={() => setCustomerModalOpen(false)} />} */}
      {customerModalOpen && (
        <CustomerProfile
          open={customerModalOpen}
          onClose={() => setCustomerModalOpen(false)}
        />
      )}
      {employeeModalOpen && (
        <EmployeeProfile
          open={employeeModalOpen}
          onClose={() => setEmployeeModalOpen(false)}
        />
      )}
    </Box>
  )
}

export default DashboardMap
