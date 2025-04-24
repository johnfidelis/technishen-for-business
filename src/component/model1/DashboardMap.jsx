'use client'

import { useState, useMemo, useContext, useEffect } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  OverlayView,
} from '@react-google-maps/api'
import EmployeeProfile from './modals/EmployeeProfile'
import CustomerProfile from './modals/CustomerProfile'
import EmployeeCustomerProfile from './modals/EmployeeCustomerProfile'
import { Cookies } from 'react-cookie'
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Skeleton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from '@mui/material'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'
import profileAddIcon from '../../assets/images/profileAddIcon.svg'
import { ThemeContext } from '@/context/ThemeContext'
import CloseIcon from '@mui/icons-material/Close'
import { SentimentDissatisfied } from '@mui/icons-material'

const DashboardMap = () => {
  const libraries = useMemo(() => ['places'], [])
  const cookies = new Cookies()
  const businessName = cookies.get('businessName')
  const { theme } = useContext(ThemeContext)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const { data: allBusiness, isLoading: loadBusinesses } = useFetchData(
    GET_ENDPOINTS.BUSINESSES,
    'fetchBusinesses',
  )
  const [selectedBusiness, setSelectedBusiness] = useState('')
  const [businessDetails, setBusinessDetails] = useState(null)
  const [openCompany, setOpenCompany] = useState(false)

  useEffect(() => {
    if (!loadBusinesses && Array.isArray(allBusiness?.businesses)) {
      const storedBusinessId = cookies.get('selectedBusinessId')
      const matchedBusiness = allBusiness.businesses.find(
        (biz) => biz.id === storedBusinessId,
      )

      if (matchedBusiness) {
        setSelectedBusiness(storedBusinessId)
        setBusinessDetails(matchedBusiness)
        console.log({ matchedBusiness })
      } else if (allBusiness.businesses.length > 0) {
        const firstBusiness = allBusiness.businesses[0]
        setSelectedBusiness(firstBusiness.id)
        setBusinessDetails(firstBusiness)
      }
    }
  }, [allBusiness, loadBusinesses, cookies])
  // 📍 Default Map Center

  const { data: ticketsData, isLoading } = useFetchData(
    GET_ENDPOINTS.DASHBOARD_TICKETS(),
    'allTickets',
  )
  console.log({ businessDetails })

  const mapCenter = useMemo(() => {
    if (loadBusinesses) return { lat: -26.2041, lng: 28.0473 } // Default fallback

    return {
      lat: businessDetails?.latitude,
      lng: businessDetails?.longitude,
    }
  }, [businessDetails])

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
      ticketsData?.assigned_tickets?.map((ticket) => ({
        ticket_id: ticket.ticket_id,
        position: { lat: ticket.latitude, lng: ticket.longitude },
        image: ticket.profile_picture,
        role: ticket.employee_role,
        name: ticket.first_name + ' ' + ticket.last_name,
        first_name: ticket.first_name,
        last_name: ticket.last_name,
        ticketType: ticket.ticket_type,
        email: ticket.email,
        address: ticket.address,
        phone_number: ticket.phone_number,
        gender: ticket.gender,
        id: ticket.id,
        user: ticket.ticket_type == 'Internal' ? 'employee' : 'customer',
      })) || [],
    [ticketsData],
  )

  // const locations = useMemo(() => {
  //   const allTickets = [
  //     ...(ticketsData?.assigned_tickets || []).map((ticket) => ({
  //       ticket_id: ticket.ticket_id,
  //       position: { lat: ticket.latitude, lng: ticket.longitude },
  //       image: ticket.employee_image || profileAddIcon,
  //       role: ticket.employee_role,
  //       name: ticket.caller_first_name + ' ' + ticket.caller_last_name,
  //       first_name: ticket.caller_first_name,
  //       last_name: ticket.caller_last_name,
  //       ticketType: ticket.ticket_type,
  //       email: ticket.caller_email,
  //       address: ticket.address,
  //       phone_number: ticket.caller_phone,
  //       gender: ticket.caller_gender,
  //       id: ticket.caller_id,
  //       user:
  //         ticket.ticket_type === 'Internal'
  //           ? 'employee'
  //           : ticket.ticket_type === 'External'
  //             ? 'customer'
  //             : 'outsourced',
  //     })),

  //     ...(ticketsData?.outsourced_tickets || []).map((ticket) => {
  //       const [first_name = 'not found', last_name = 'not found'] =
  //         ticket.caller_name?.split(' ') || []
  //       return {
  //         ticket_id: ticket.ticket_id,
  //         position: { lat: ticket.latitude, lng: ticket.longitude },
  //         image: ticket.employee_image || profileAddIcon,
  //         role: ticket.role,
  //         name: ticket.caller_name || 'not found',
  //         first_name,
  //         last_name,
  //         ticketType: ticket.ticket_type,
  //         email: 'not found',
  //         address: ticket.address || 'not found',
  //         phone_number: 'not found',
  //         gender: 'not found',
  //         id: ticket.caller_id,
  //         user: 'outsourced',
  //       }
  //     }),
  //   ]

  //   return allTickets
  // }, [ticketsData])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries,
  })

  // 🔍 State for selected marker
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [showCustomers, setShowCustomers] = useState(true)
  const [showEmployees, setShowEmployees] = useState(true)
  const [showOutsourced, setShowOutsourced] = useState(true)
  const [tableOpen, setTableOpen] = useState(false)

  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      if (!showCustomers && location.user === 'customer') return false
      if (!showEmployees && location.user === 'employee') return false
      if (!showOutsourced && location.user === 'outsourced') return false
      return true
    })
  }, [showCustomers, showEmployees, showOutsourced, locations])

  // Paginate filtered locations
  const paginatedLocations = useMemo(() => {
    return filteredLocations.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    )
  }, [filteredLocations, page, rowsPerPage])

  // 📌 Modal States
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)

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
    } else if (
      selectedMarker?.user == 'outsourced' &&
      selectedMarker?.role == 'Employee'
    ) {
      setEmployeeModalOpen(true)
    } else if (
      selectedMarker?.user == 'outsourced' &&
      selectedMarker?.role == 'Customer'
    ) {
      setCustomerModalOpen(true)
    }
  }

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

  const headerStyle = {
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    p: '1em',
  }

  const handleRowClick = (location) => {
    setSelectedMarker(location)
  }

  const bodyStyle = {
    overflowY: 'auto',
    flexGrow: 1,
    pl: '1em',
    pr: '1em',
  }
  return (
    <Box style={{ marginTop: '24px' }}>
      {/* 🗺️ Google Map */}
      <Box sx={{ textAlign: 'right', bordder: 'solid red' }}>
        <Button
          style={{ backgroundColor: theme?.primary_color, margin: '10px 0px' }}
          variant="contained"
          onClick={() => setTableOpen(true)}
        >
          Ticket List
        </Button>
      </Box>
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
        {/* import {OverlayView} from "@react-google-maps/api"; */}
        {isLoaded && window.google && (
          <>
            {filteredLocations.map((location) => (
              <OverlayView
                // key={location.id}
                // key={`${location.ticket_id}-${location.id}-${location.user}`}
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
                  <img
                    src={location?.image || profileAddIcon}
                    // src='https://technishenbackend.onrender.com/images/employees/WhatsApp_Image_2025-03-20_at_15.58.21.jpeg'
                    alt={location.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      border: '2px solid white',
                      boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                    }}
                  />

                  {location?.user === 'employee' ? (
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#FF4C3B',
                        borderRadius: '50%',
                        marginTop: '-5px',
                      }}
                    />
                  ) : location?.user === 'customer' ? (
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'yellow',
                        borderRadius: '50%',
                        marginTop: '-5px',
                      }}
                    />
                  ) : location?.user === 'outsourced' ? (
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'blue',
                        borderRadius: '50%',
                        marginTop: '-5px',
                      }}
                    />
                  ) : (
                    ''
                  )}
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
              <img
                src={selectedMarker?.image || profileAddIcon}
                // src='https://technishenbackend.onrender.com/images/employees/WhatsApp_Image_2025-03-20_at_15.58.21.jpeg'
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
                  checked={showCustomers}
                  onChange={() => setShowCustomers(!showCustomers)}
                />
              }
              label={
                <Typography variant="body1">Show Customer Tickets</Typography>
              }
            />
          </Grid>

          {/* ✅ Show Only Technishen Tickets Checkbox */}
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showEmployees}
                  onChange={() => setShowEmployees(!showEmployees)}
                />
              }
              label={
                <Typography sx={{ fontWeight: 400, fontSize: '0.8em' }}>
                  {/* {businessName || ''} */}
                  Show Employee Tickets
                </Typography>
              }
            />
          </Grid>
          {/* <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showOutsourced}
                  onChange={() => setShowOutsourced(!showOutsourced)}
                />
              }
              label={
                <Typography sx={{ fontWeight: 400, fontSize: '0.8em' }}>
              
                  Show Outsourced Tickets
                </Typography>
              }
            />
          </Grid> */}
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
        // <EmployeeProfile
        //   open={employeeModalOpen}
        //   onClose={() => setEmployeeModalOpen(false)}
        //   user={selectedMarker}
        // />
        <EmployeeCustomerProfile
          open={employeeModalOpen}
          onClose={() => setEmployeeModalOpen(false)}
          userId={selectedMarker?.id}
        />
      )}

      <Modal open={tableOpen} onClose={() => setTableOpen(false)}>
        <Box sx={modalStyle}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{ backgroundColor: theme.primary_color || '#115093' }}
          >
            <IconButton
              onClick={() => setTableOpen(false)}
              sx={{ color: 'white', fontSize: '1em' }}
            >
              {''}
            </IconButton>
            <IconButton
              onClick={() => setTableOpen(false)}
              sx={{ color: 'white', fontSize: '1em' }}
            >
              Close
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={headerStyle}>
            <Typography variant="h6" gutterBottom>
              Ticket List
            </Typography>
          </Box>
          <Box sx={bodyStyle}>
            {/* <TableContainer component={Paper} sx={{ borderRadius: '0.1em' }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isLoaded ? (
                    <TableRow>
                      {[...Array(4)].map((_, index) => (
                        <TableCell key={index}>
                          <Skeleton variant="text" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ) : paginatedLocations?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
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
                              fontWeight: 300,
                              fontSize: '1em',
                              color: 'gray',
                            }}
                          >
                            No Ticket found
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedLocations.map((location) => (
                      <TableRow
                        key={location.id}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleRowClick(location)}
                      >
                        <TableCell>
                          <img
                            src={location?.image || profileAddIcon}
                            alt={location.name}
                            style={{
                              borderRadius: '100%',
                              height: '40px',
                              width: '40px',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.75em', fontWeight: 300 }}>
                          {location.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.75em', fontWeight: 300 }}>
                          {location.email}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: '0.75em',
                            fontWeight: 300,
                            textTransform: 'capitalize',
                          }}
                        >
                          {location.user}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={filteredLocations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> 
            </TableContainer> */}

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    Array.from({ length: rowsPerPage }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell colSpan={3}>
                          <Skeleton variant="rectangular" height={40} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : paginatedLocations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <SentimentDissatisfied
                          color="disabled"
                          fontSize="large"
                        />
                        <Typography variant="body2" color="textSecondary">
                          No Tickets Found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedLocations.map((location, index) => (
                      <TableRow
                        key={index}
                        hover
                        onClick={() => handleRowClick(location)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>{location.name}</TableCell>

                        <TableCell>{location.email}</TableCell>
                        <TableCell>{location.ticketType}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={filteredLocations.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
              />
            </TableContainer>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default DashboardMap
