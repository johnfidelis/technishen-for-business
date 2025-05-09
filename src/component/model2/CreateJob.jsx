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
import {
  useCreateResourcingData,
  useFetchResourcingData,
} from '@/hooks/useResourcingApiService'
import {
  GET_RESOURCING_ENDPOINTS,
  POST_ENDPOINTS,
} from '@/constants/resouringEndpoints'
import { toast } from 'react-toastify'
import countryList from '../utils/countryList'
import { Cookies } from 'react-cookie'

const CreateJob = () => {
  const { theme } = useContext(ThemeContext)
  const cookies = new Cookies()
  const businessName = cookies.get('businessName')
  const { data: suggestedCategories, isLoading: loadSkill } =
    useFetchResourcingData(GET_RESOURCING_ENDPOINTS.GET_A_SKILL)
  const [isLoading, setIsLoading] = useState(false)

  const resetForm = () => {
    setSelectedCategories([])
    setJobTitle('')
    setProjectLocation('')
    setExperienceLevel('')
    setCandidateCountry('Any')
    setWorkingConditions('')
    setJobTypes('')
    setCustomTime({ start: '', end: '' })
    setCustomWorkTime('')
    setWorkingHours('8:00 - 17:00 Hrs')
    setJobDescription('')
    setAvailablePositions('')
    setHourlyRate('')
    setCurrency('')
  }

  const [jobTitle, setJobTitle] = useState()
  const [company, setCompany] = useState()
  const [projectLocation, setProjectLocation] = useState()
  const [candidateCountry, setCandidateCountry] = useState('Any')
  const [workingConditions, setWorkingConditions] = useState()
  const [jobTypes, setJobTypes] = useState()
  const [customTime, setCustomTime] = useState({
    start: '',
    end: '',
  })
  const [workingHours, setWorkingHours] = useState()
  const [customWorkTime, setCustomWorkTime] = useState('')
  const [availablePositions, setAvailablePositions] = useState()
  const [currency, setCurrency] = useState()
  const [hourlyRate, setHourlyRate] = useState()
  const [experienceLevel, setExperienceLevel] = useState()
  const [jobDescription, setJobDescription] = useState()
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSelect = (category) => {
    if (!selectedCategories.some((item) => item.id === category.id)) {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleDelete = (categoryToDelete) => {
    setSelectedCategories((prev) =>
      prev?.filter((category) => category.id !== categoryToDelete.id),
    )
  }

  const isSelected = (category) =>
    selectedCategories.some((item) => item.id === category.id)

  const filteredSuggested = suggestedCategories?.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCategoryAdd = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleCategoryRemove = (categoryToRemove) => {
    setSelectedCategories(
      selectedCategories?.filter((cat) => cat !== categoryToRemove),
    )
  }

  const handleWorkingHoursChange = (e) => {
    setWorkingHours(e.target.value)
  }

  const createPost = useCreateResourcingData(POST_ENDPOINTS.POST_A_JOB, 'posts')

  const handleSubmit = async () => {
    setIsLoading(true)
    const payload = {
      desired_skill_set: selectedCategories.map((cat) => cat.id),
      job_title: jobTitle,
      company_name: businessName,
      location: projectLocation,
      experience_level: experienceLevel,
      applicant_country: candidateCountry,
      work_type: workingConditions,
      employment_type: jobTypes,
      start_date: customTime.start,
      end_date: customTime.end,
      work_hours: workingHours === 'Custom' ? customWorkTime : workingHours,
      job_description: jobDescription,
      available_positions: Number(availablePositions),
      hourly_rate: Number(hourlyRate),
      status: 'pending',
      currency: currency,
    }

    createPost.mutate(payload, {
      onSuccess: () => {
        toast.success('Created successfully!')
        resetForm()
        setIsLoading(false)
      },
      onError: (error) => {
        toast.error('Failed to create: ' + error.message)
        setIsLoading(false)
      },
    })
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
            value={businessName}
            // onChange={(e) => setCompany(e.target.value)}
            sx={{ mb: 3 }}
            aria-readonly
            disabled
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          {/* <TextField
            label="Company"
            fullWidth
            value={businessName}
            // onChange={(e) => setCompany(e.target.value)}
            aria-readonly
            sx={{ mb: 3 }}
               variant="outlined"
            InputLabelProps={{ shrink: true }}
          /> */}
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
                value="Afghanistan"
                control={<Radio />}
                label="Specify Country of Origin"
              />
            </RadioGroup>
          </FormControl>
          {candidateCountry != 'Any' && (
            <TextField
              select
              label="Candidate Country of Origin"
              // value={formData.nationality}
              onChange={(e) => setCandidateCountry(e.target.value)}
              fullWidth
              sx={{ mt: 2, mb: 3 }}
            >
              {countryList.map((country) => (
                <MenuItem key={country.name} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
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
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="on-site">On-site</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
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
            <MenuItem value="full-time">Full-time</MenuItem>
            <MenuItem value="part-time">Part-time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
          </TextField>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={customTime.start}
              onChange={(e) =>
                setCustomTime({ ...customTime, start: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={customTime.end}
              onChange={(e) =>
                setCustomTime({ ...customTime, end: e.target.value })
              }
              fullWidth
            />
          </Box>

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
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Enter Working Hours (e.g., '9:00 - 17:00' or '40 hours a week')"
                placeholder="e.g., 9:00 - 17:00 or 40 hours a week"
                value={customWorkTime}
                onChange={(e) => setCustomWorkTime(e.target.value)}
                sx={{ mb: 3 }}
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
              <MenuItem value="USD">US-Dollar</MenuItem>
              <MenuItem value="EUR">EURO</MenuItem>
              <MenuItem value="R">Rand</MenuItem>
            </TextField>
            <TextField
              label="Hourly Rate"
              fullWidth
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              select
              label="Experience Level"
              name="Experience Level"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value="entry">Entry Level</MenuItem>
              <MenuItem value="mid">Mid Level</MenuItem>
              <MenuItem value="senior">Senior Level</MenuItem>
            </TextField>
          </Box>

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '5px',
                  mb: 2,
                  input: { padding: '10px' },
                }}
              />
              <Typography variant="body1" sx={{ mb: 1 }}>
                List of Selected Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {selectedCategories?.length > 0 ? (
                  selectedCategories?.map((category) => (
                    <Chip
                      key={category.id}
                      label={category.name}
                      onDelete={() => handleDelete(category)}
                      sx={{
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                        '& .MuiChip-deleteIcon': { color: '#FFFFFF' },
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    No skill selected.
                  </Typography>
                )}
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
                Suggested Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {filteredSuggested?.length > 0 ? (
                  filteredSuggested?.map((category) => (
                    <Chip
                      key={category.id}
                      label={category.name}
                      onClick={() => handleSelect(category)}
                      disabled={isSelected(category)}
                      sx={{
                        backgroundColor: isSelected(category)
                          ? '#78909C'
                          : '#B0BEC5',
                        color: '#FFFFFF',
                        cursor: isSelected(category)
                          ? 'not-allowed'
                          : 'pointer',
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    No skills found.
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* <Box sx={{ p: 2, backgroundColor: '#E8E8E8', borderRadius: '10px' }}>
     
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
                List of Selected Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {selectedCategories?.map((category, index) => (
                  <Chip
                    key={category.id}
                    label={category.name}
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
                Suggested Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {suggestedCategories?.map((category, index) => (
                  <Chip
                    key={category.id}
                    label={category.name}
                    sx={{
                      backgroundColor: '#B0BEC5',
                      color: '#FFFFFF',
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box> */}

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
          onClick={handleSubmit}
          loading={isLoading}
        >
          Create Post
        </Button>
      </Box>
    </Box>
  )
}

export default CreateJob
