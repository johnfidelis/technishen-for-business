// 'use client'
// import React, { useRef, useEffect } from 'react'
// import { TextField, Box } from '@mui/material'
// import { useJsApiLoader } from '@react-google-maps/api'

// const parseAddress = (place) => {
//   const components = place?.address_components || []
//   const location = place?.geometry?.location || {}

//   const parsedAddress = {
//     street: '',
//     city: '',
//     state: '',
//     country: '',
//     postalCode: '',
//     latitude: location?.lat() || null,
//     longitude: location?.lng() || null,
//   }

//   components.forEach((component) => {
//     const types = component.types
//     if (types.includes('street_number')) {
//       parsedAddress.street = component.long_name + ' ' + parsedAddress.street
//     }
//     if (types.includes('route')) {
//       parsedAddress.street += component.long_name
//     }
//     if (types.includes('locality')) {
//       parsedAddress.city = component.long_name
//     }
//     if (types.includes('administrative_area_level_1')) {
//       parsedAddress.state = component.long_name
//     }
//     if (types.includes('country')) {
//       parsedAddress.country = component.long_name
//     }
//     if (types.includes('postal_code')) {
//       parsedAddress.postalCode = component.long_name
//     }
//   })

//   return parsedAddress
// }

// const AddressAutocomplete = ({
//   handleAddressUpdate,
//   label,
//   error,
//   helperText,
//   value,
//   onChange,
//   clearInput,
// }) => {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
//     libraries: ['places'], // Ensure 'places' library is included
//   })

//   const autocompleteRef = useRef(null)
//   const inputRef = useRef(null)

//   const handlePlaceSelect = () => {
//     if (autocompleteRef.current) {
//       const place = autocompleteRef.current.getPlace()
//       const parsedAddress = parseAddress(place)
//       handleAddressUpdate(parsedAddress)
//       if (onChange) {
//         onChange(parsedAddress.street || '') // Update the input field with the street name
//       }
//     }
//   }

//   const initializeAutocomplete = () => {
//     if (inputRef.current && !autocompleteRef.current) {
//       if (window.google && window.google.maps && window.google.maps.places) {
//         autocompleteRef.current = new window.google.maps.places.Autocomplete(
//           inputRef.current,
//           {
//             types: ['geocode'], // Geocode for detailed addresses
//             componentRestrictions: { country: 'ZA' }, // Restrict to South Africa
//           },
//         )
//         autocompleteRef.current.addListener('place_changed', handlePlaceSelect)
//       } else {
//         console.error('Google Maps Places API is not loaded.')
//       }
//     }
//   }

//   // Function to clear the input field

//   const clearAddress = () => {
//     if (inputRef.current) {
//       inputRef.current.value = ''
//       handleAddressUpdate({})
//       if (onChange) {
//         onChange('')
//       }
//     }
//   }

//   React.useEffect(() => {
//     if (isLoaded) {
//       initializeAutocomplete()
//     }

//     // Cleanup on unmount
//     return () => {
//       if (autocompleteRef.current) {
//         window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
//       }
//     }
//   }, [isLoaded])

//   useEffect(() => {
//     if (clearInput) {
//       clearInput.current = clearAddress // Assign clear function to ref
//     }
//   }, [clearInput])

//   if (!isLoaded) {
//     return <div>Loading...</div>
//   }

//   return (
//     <Box>
//       <TextField
//         fullWidth
//         label={label}
//         error={!!error}
//         helperText={helperText}
//         defaultValue={value}
//         InputLabelProps={{
//           shrink: true,
//         }}
//         inputRef={inputRef} // Attach ref to the input element
//       />
//     </Box>
//   )
// }

// export default AddressAutocomplete

'use client'
import React, { useRef, useEffect, useState } from 'react'
import { TextField, Box } from '@mui/material'
import { useJsApiLoader } from '@react-google-maps/api'

const parseAddress = (place) => {
  const components = place?.address_components || []
  const location = place?.geometry?.location || {}

  return {
    street: components.find((c) => c.types.includes('route'))?.long_name || '',
    city: components.find((c) => c.types.includes('locality'))?.long_name || '',
    state:
      components.find((c) => c.types.includes('administrative_area_level_1'))
        ?.long_name || '',
    country:
      components.find((c) => c.types.includes('country'))?.long_name || '',
    postalCode:
      components.find((c) => c.types.includes('postal_code'))?.long_name || '',
    latitude: location?.lat() || null,
    longitude: location?.lng() || null,
  }
}

const AddressAutocomplete = ({
  handleAddressUpdate,
  label,
  error,
  helperText,
  defaultValue,
  clearInput,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: ['places'],
  })

  const autocompleteRef = useRef(null)
  const inputRef = useRef(null)
  const [inputKey, setInputKey] = useState(Date.now()) // Force re-render with defaultValue

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace()
      const parsedAddress = parseAddress(place)
      handleAddressUpdate(parsedAddress)
    }
  }

  const initializeAutocomplete = () => {
    if (inputRef.current && !autocompleteRef.current) {
      if (window.google?.maps?.places) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ['geocode'],
            componentRestrictions: { country: 'ZA' },
          },
        )
        autocompleteRef.current.addListener('place_changed', handlePlaceSelect)
      }
    }
  }

  const clearAddress = () => {
    handleAddressUpdate({})
    setInputKey(Date.now()) // Force re-render to reset defaultValue
  }

  useEffect(() => {
    if (isLoaded) initializeAutocomplete()

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [isLoaded])

  useEffect(() => {
    if (clearInput) clearInput.current = clearAddress
  }, [clearInput])

  if (!isLoaded) return <div>Loading...</div>

  return (
    <Box>
      <TextField
        key={inputKey} // Key forces re-render when changed
        fullWidth
        label={label}
        error={!!error}
        helperText={helperText}
        defaultValue={defaultValue}
        InputLabelProps={{ shrink: true }}
        inputRef={inputRef}
      />
    </Box>
  )
}

export default AddressAutocomplete
