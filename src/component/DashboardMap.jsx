'use client'

import { useState, useMemo } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  OverlayView,
} from '@react-google-maps/api'
import EmployeeProfile from './modals/EmployeeProfile'
import CustomerProfile from './modals/CustomerProfile'
import { Cookies } from 'react-cookie'
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
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import profileAddIcon from '../assets/images/profileAddIcon.svg'

const DashboardMap = () => {
  const libraries = useMemo(() => ['places'], [])
  const cookies = new Cookies()
  const businessName = cookies.get('businessName')
  // 📍 Default Map Center
  const mapCenter = useMemo(() => ({ lat: -26.2041, lng: 28.0473 }), [])

  const { data: ticketsData, isLoading } = useFetchData(
    GET_ENDPOINTS.DASHBOARD_TICKETS,
    'allTickets',
  )

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
    () =>
      ticketsData?.map((ticket) => ({
        ticket_id: ticket.ticket_id,
        position: { lat: ticket.latitude, lng: ticket.longitude },
        image: ticket.employee_image,
        role: ticket.employee_role,
        name: ticket.caller_first_name + ' ' + ticket.caller_last_name,
        first_name: ticket.caller_first_name,
        last_name: ticket.caller_last_name,
        ticketType: ticket.ticket_type,
        email: ticket.caller_email,
        address: ticket.address,
        phone_number: ticket.caller_phone,
        gender: ticket.caller_gender,
        id: ticket.caller_id,
        user: ticket.ticket_type == 'Internal' ? 'employee' : 'customer',
      })) || [],
    [ticketsData],
  )

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries,
  })

  // 🔍 State for selected marker
  const [selectedMarker, setSelectedMarker] = useState(null)

  // ✅ Filter States
  const [showTickets, setShowTickets] = useState(false) // Show Available Tickets
  const [showTechnisen, setShowTechnisen] = useState(false) // Show only Technishen tickets

  // 📌 Modal States
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)

  // 🛠️ Apply Filters
  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      if (showTickets && !location.ticketAvailable) return false
      if (showTechnisen && location.company !== 'Technishen') return false
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
          height: '580px',
          borderRadius: '15px',
          border: '2px solid black',
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={'580px'} />
        {/* <Skeleton variant="text" width="60%" sx={{ mt: 2 }} /> */}
      </Box>
    )

  // 🔥 Handle Open Click
  const handleOpenClick = (selectedMarker) => {
    console.log('Selected Marker:', selectedMarker)
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
        zoom={10}
        center={mapCenter}
        mapContainerStyle={{
          width: '100%',
          height: '580px',
          borderRadius: '15px',
          border: '2px solid black',
        }}
        // onLoad={() => console.log('Google Map Loaded...')}
      >
        {/* ✅ Ensure `window.google.maps` is defined before using */}
        {/* {isLoaded && window.google && (
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
        )} */}
        {/* import {OverlayView} from "@react-google-maps/api"; */}
        {isLoaded && window.google && (
          <>
            {filteredLocations.map((location) => (
              <OverlayView
                key={location.id}
                position={location.position}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET} // Keeps it interactive
                getPixelPositionOffset={(width, height) => ({
                  x: -width / 2,
                  y: -height - 10,
                })} // Moves the icon above
              >
                <div
                  onClick={() => setSelectedMarker(location)}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {/* Image above */}
                  <Image
                    src={profileAddIcon}
                    alt={location.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      border: '2px solid white',
                      boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                    }}
                  />

                  {location?.user == 'employee' ? (
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        marginTop: '-5px',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'yellow',
                        borderRadius: '50%',
                        marginTop: '-5px',
                      }}
                    />
                  )}

                  {/* Small pointer icon below (optional) */}
                </div>
              </OverlayView>
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
              onClick={() => handleOpenClick(selectedMarker)}
              sx={{
                textAlign: 'center',
                borderRadius: '15px',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                display: 'flex',
                gap: 1,
                cursor: 'pointer',
              }}
            >
              <Image
                src={Img1}
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
        <Typography variant="body1">Map Legend</Typography>
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
                <Typography variant="body1">Show Available Tickets</Typography>
              }
            />
          </Grid>

          {/* ✅ Show Only Technishen Tickets Checkbox */}
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
                  {businessName || ''}
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
          type="customer"
          user={selectedMarker.id}
        />
      )}
      {employeeModalOpen && (
        <EmployeeProfile
          open={employeeModalOpen}
          onClose={() => setEmployeeModalOpen(false)}
          user={selectedMarker}
        />
      )}
    </Box>
  )
}

export default DashboardMap
