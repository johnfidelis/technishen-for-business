// 'use client'

// import React from 'react'
// import { TextField } from '@mui/material'

// const PriorityCalculator = ({ impact, urgency }) => {
//   const calculatePriority = () => {
//     if (impact === 'High' && urgency === 'High') {
//       return { level: 'Very High', color: '#FF3300' }
//     }
//     if (
//       (impact === 'High' && urgency === 'Medium') ||
//       (impact === 'Medium' && urgency === 'High')
//     ) {
//       return { level: 'High', color: '#FF3300' }
//     }
//     if (
//       (impact === 'High' && urgency === 'Low') ||
//       (impact === 'Medium' && urgency === 'Medium') ||
//       (impact === 'Medium' && urgency === 'Low') ||
//       (impact === 'Low' && urgency === 'High') ||
//       (impact === 'Low' && urgency === 'Medium')
//     ) {
//       return { level: 'Medium', color: '#CC00FF' }
//     }
//     if (impact === 'Low' && urgency === 'Low') {
//       return { level: 'Low', color: '#00FF00' }
//     }
//     return { level: '', color: 'black' }
//   }

//   const priorityResult = calculatePriority()

//   return (
//     <TextField
//       fullWidth
//       variant="outlined"
//       sx={{ mt: '1em' }}
//       InputProps={{
//         style: {
//           backgroundColor: '#E7EBF0',
//           color: priorityResult.color,
//           fontSize: '0.80em',
//           fontFamily: 'Inter, sans-serif',
//         },
//       }}
//       value={`Priority Level = ${priorityResult.level}`}
//     />
//   )
// }

// export default PriorityCalculator

'use client'

import React, { useEffect } from 'react'
import { TextField } from '@mui/material'

const PriorityCalculator = ({ impact, urgency, setPriority }) => {
  const calculatePriority = () => {
    if (impact === 'High' && urgency === 'High') {
      return { level: 'Very High', color: '#FF3300' }
    }
    if (
      (impact === 'High' && urgency === 'Medium') ||
      (impact === 'Medium' && urgency === 'High')
    ) {
      return { level: 'High', color: '#FF3300' }
    }
    if (
      (impact === 'High' && urgency === 'Low') ||
      (impact === 'Medium' && urgency === 'Medium') ||
      (impact === 'Medium' && urgency === 'Low') ||
      (impact === 'Low' && urgency === 'High') ||
      (impact === 'Low' && urgency === 'Medium')
    ) {
      return { level: 'Medium', color: '#CC00FF' }
    }
    if (impact === 'Low' && urgency === 'Low') {
      return { level: 'Low', color: '#00FF00' }
    }
    return { level: '', color: 'black' }
  }

  const priorityResult = calculatePriority()

  // Update parent state when values change
  useEffect(() => {
    setPriority(priorityResult)
  }, [impact, urgency])

  return (
    <TextField
      fullWidth
      variant="outlined"
      sx={{ mt: '1em' }}
      InputProps={{
        style: {
          backgroundColor: '#E7EBF0',
          color: priorityResult.color,
          fontSize: '0.80em',
          fontFamily: 'Inter, sans-serif',
        },
      }}
      value={`Priority Level = ${priorityResult.level}`}
    />
  )
}

export default PriorityCalculator
