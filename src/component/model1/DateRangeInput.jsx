import React, { useState } from 'react'
import { Box, TextField, IconButton, InputAdornment } from '@mui/material'
import { DateRangePicker } from 'react-date-range'
import { MdClear } from 'react-icons/md' // Import Clear Icon
import 'react-date-range/dist/styles.css' // Main style file
import 'react-date-range/dist/theme/default.css' // Theme CSS file

const DateRangeInput = ({ startDate, endDate, onDateChange }) => {
  const [showPicker, setShowPicker] = useState(false)

  // Handle date selection
  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection
    onDateChange(startDate, endDate) // Pass selected dates to parent
    setShowPicker(false) // Close picker on selection
  }

  // Handle clearing the date range
  const handleClear = () => {
    onDateChange(null, null) // Reset dates to null
  }

  // Format value for the input field
  const formatDateRange = () => {
    if (!startDate && !endDate) return '' // Default empty value
    const start = startDate ? startDate.toLocaleDateString() : 'Start Date'
    const end = endDate ? endDate.toLocaleDateString() : 'End Date'
    return `${start} - ${end}`
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minWidth: '330px',
        maxWidth: '330px',
      }}
    >
      <TextField
        label="Select Date Range"
        value={formatDateRange()}
        onClick={() => setShowPicker(!showPicker)}
        InputProps={{
          readOnly: true, // Prevent manual editing
          // Add clear icon as adornment
          endAdornment: (startDate || endDate) && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} size="small">
                <MdClear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          position: 'relative',
          width: '100%',
          minWidth: '330px',
          maxWidth: '330px',
        }}
      />

      {/* Date Range Picker */}
      {showPicker && (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 10,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
          // style={{ flex: 1, minWidth: '330px', maxWidth: '330px', fontSize: '0.80em' }}
        >
          <DateRangePicker
            ranges={[
              {
                startDate: startDate || new Date(),
                endDate: endDate || new Date(),
                key: 'selection',
              },
            ]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            rangeColors={['#115093']} // Customize the color
          />
        </Box>
      )}
    </Box>
  )
}

export default DateRangeInput
