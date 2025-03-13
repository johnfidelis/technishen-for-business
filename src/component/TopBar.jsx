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
import BusinessIcon from '@mui/icons-material/Business'
import SettingsIcon from '@mui/icons-material/Settings'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { ThemeContext } from '@/context/ThemeContext'

const SIDEBAR_WIDTH = 250 // Adjust this to your sidebar width

const TopBar = ({ ownerName, ownerImage }) => {
  const { theme } = useContext(ThemeContext)

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
        <Typography
          variant="h6"
          sx={{
            fontSize: '18px',
            color: 'white',
            fontWeight: 400,
            pl: 4,
          }}
        >
          {getTimeBasedGreeting()}, {ownerName || 'Technishen'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={
              ownerImage ||
              'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
            }
            alt="Profile Picture"
            sx={{ width: 32, height: 32 }}
          />
          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            endIcon={<ArrowDropDownIcon />}
            sx={{ color: 'white', fontWeight: 400, textTransform: 'none' }}
          >
            {ownerName || 'Menu'}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            sx={{ mt: 2 }}
          >
            <MenuItem component={Link} href="/dashboard/settings?tab=0">
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem component={Link} href="/dashboard/settings?tab=1">
              <ListItemIcon>
                <BusinessIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Business Settings</ListItemText>
            </MenuItem>
            <MenuItem component={Link} href="/dashboard/settings?tab=2">
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Business Customization</ListItemText>
            </MenuItem>
            <MenuItem component={Link} href="">
              <ListItemIcon>
                <CreditCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Manage Billing</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleLogout}>
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
