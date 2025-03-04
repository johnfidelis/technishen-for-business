'use client'

import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { ThemeContext } from '@/context/ThemeContext'

const SIDEBAR_WIDTH = 250 // Adjust this to your sidebar width

const TopBar = () => {
  const { theme } = useContext(ThemeContext)
  const [ownerName, setOwnerName] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    return hour < 12
      ? 'Good Morning'
      : hour < 16
        ? 'Good Afternoon'
        : 'Good Evening'
  }

  const handleLogout = () => {
    // Clear all cookies
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)
    })

    // Redirect to login
    router.push('/login')
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.primary_color,
        boxShadow: 'none',
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`, // Ensure TopBar does not overlap SideBar
        ml: `${SIDEBAR_WIDTH}px`, // Moves the TopBar to the right
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
          {getTimeBasedGreeting()}, {ownerName || ''}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            alt="Profile Picture"
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            endIcon={<ArrowDropDownIcon />}
            sx={{ color: 'white', fontWeight: 500, textTransform: 'none' }}
          >
            {ownerName || 'Menu'}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            sx={{ mt: 2 }}
          >
            <MenuItem component={Link} href="/dashboard">
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>
            <MenuItem  onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
