import React, { useContext, useState } from 'react'
import {
  Box,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  MenuItem,
  Chip,
  Divider,
  Button,
} from '@mui/material'
import { ThemeContext } from '@/context/ThemeContext'

const initialSelectedCategories = [
  'Anti-Virus',
  'Software',
  'PWA',
  'Email Config',
  'E-Commerce',
]

const suggestedCategories = [
  'IT Support',
  'Anti-Virus',
  'Server Support',
  'Security Patch',
]

const CreateJob = () => {
  const { theme } = useContext(ThemeContext)
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [projectLocation, setProjectLocation] = useState('')
  const [candidateCountry, setCandidateCountry] = useState('Any')
  const [workingConditions, setWorkingConditions] = useState('')
  const [jobTypes, setJobTypes] = useState('')
  const [workingHours, setWorkingHours] = useState('')
  const [customTime, setCustomTime] = useState({ start: '', end: '' })
  const [availablePositions, setAvailablePositions] = useState('')
  const [currency, setCurrency] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const [selectedCategories, setSelectedCategories] = useState(
    initialSelectedCategories,
  )

  // Handle delete action
  const handleDelete = (category) => {
    setSelectedCategories((prev) => prev.filter((item) => item !== category))
  }

  const handleCategoryAdd = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleCategoryRemove = (categoryToRemove) => {
    setSelectedCategories(
      selectedCategories.filter((cat) => cat !== categoryToRemove),
    )
  }

  const handleWorkingHoursChange = (e) => {
    setWorkingHours(e.target.value)
  }

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Job Title"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Company"
            fullWidth
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Project Location"
            fullWidth
            value={projectLocation}
            onChange={(e) => setProjectLocation(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}>Candidate Country of Origin</Typography>
            <RadioGroup
              row
              value={candidateCountry}
              onChange={(e) => setCandidateCountry(e.target.value)}
            >
              <FormControlLabel value="Any" control={<Radio />} label="Any" />
              <FormControlLabel
                value="Specify"
                control={<Radio />}
                label="Specify Country of Origin"
              />
            </RadioGroup>
          </FormControl>
          {candidateCountry === 'Specify' && (
            <TextField
              placeholder="Candidate Country of Origin"
              fullWidth
              sx={{ mt: 2, mb: 3 }}
              onChange={(e) => setCandidateCountry(e.target.value)}
            />
          )}

          <TextField
            sx={{ mb: 3 }}
            select
            label="Working Conditions"
            name="working_conditions"
            value={workingConditions}
            onChange={(e) => setWorkingConditions(e.target.value)}
            fullWidth
            required
          >
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="On-site">On-site</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
          </TextField>

          <TextField
            sx={{ mb: 3 }}
            select
            label="Job Types"
            name="job_types"
            value={jobTypes}
            onChange={(e) => setJobTypes(e.target.value)}
            fullWidth
            required
          >
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>

          <TextField
            label="Enter a date range"
            fullWidth
            placeholder="MM/DD/YYYY - MM/DD/YYYY"
            sx={{ mb: 3 }}
          />

          <FormControl component="fieldset">
            <Typography sx={{ mb: 1 }}>Working Hours</Typography>
            <RadioGroup
              row
              value={workingHours}
              onChange={handleWorkingHoursChange}
            >
              <FormControlLabel
                value="8:00 - 17:00 Hrs"
                control={<Radio />}
                label="8:00 - 17:00 Hrs"
              />
              <FormControlLabel
                value="Custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          {workingHours === 'Custom' && (
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <TextField
                placeholder="Start Time"
                fullWidth
                value={customTime.start}
                onChange={(e) =>
                  setCustomTime({ ...customTime, start: e.target.value })
                }
              />
              <TextField
                placeholder="End Time"
                fullWidth
                value={customTime.end}
                onChange={(e) =>
                  setCustomTime({ ...customTime, end: e.target.value })
                }
              />
            </Box>
          )}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Available Positions"
            type="number"
            fullWidth
            value={availablePositions}
            onChange={(e) => setAvailablePositions(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              select
              label="Currency"
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value="R">R</MenuItem>
              <MenuItem value="$">$</MenuItem>
              <MenuItem value="€">€</MenuItem>
            </TextField>
            <TextField
              label="Hourly Rate"
              fullWidth
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </Box>

          <TextField
            label="Experience Level"
            fullWidth
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box sx={{ p: 2, backgroundColor: '#E8E8E8', borderRadius: '10px' }}>
            {/* Selected Categories Section */}
            <Box
              sx={{
                mt: 2,
                m: 1,
                p: 2,
                backgroundColor: 'white',
                borderRadius: '5px',
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search Candidat Skillset"
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '5px',
                  mb: 2,
                  input: { padding: '10px' },
                }}
              />
              <Typography variant="body1" sx={{ mb: 1 }}>
                List of Selected Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {selectedCategories.map((category, index) => (
                  <Chip
                    key={index}
                    label={category}
                    onDelete={() => handleDelete(category)}
                    sx={{
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      '& .MuiChip-deleteIcon': { color: '#FFFFFF' },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Suggested Categories Section */}
            <Box
              sx={{
                mt: 2,
                m: 1,
                p: 1,
                backgroundColor: 'white',
                borderRadius: '5px',
              }}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>
                Suggested List of Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {suggestedCategories.map((category, index) => (
                  <Chip
                    key={index}
                    label={category}
                    sx={{
                      backgroundColor: '#B0BEC5',
                      color: '#FFFFFF',
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />
        </Grid>

        <Grid xs={12} md={12}>
          <TextField
            label="Job Description"
            fullWidth
            multiline
            rows={4}
            sx={{ ml: 4 }}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'end' }}>
        <Button
          variant="contained"
          sx={{
            mt: 4,
            backgroundColor: theme.primary_color || '#115093',
            color: 'white',
            '&:hover': { backgroundColor: theme.primary_color || '#115093' },
          }}
          disabled
        >
          Create Post
        </Button>
      </Box>
    </Box>
  )
}

export default CreateJob
