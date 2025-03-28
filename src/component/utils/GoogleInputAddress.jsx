
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
