'use client'
import React from 'react'
import {
  Drawer,
  Box,
} from '@mui/material'
import Image from 'next/image'
import TechnisenLogo from '../assets/images/logoBlue.png'
import BusinessSelector from './BusinessSelector'
import SidebarMenu from './SidebarMenu'


const drawerWidth = 260

const SideBar = ({ activePage, setActivePage }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          color: '#000000',
        },
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: 'white',
          textAlign: 'center',
          py: 1.6,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Image
          src={TechnisenLogo}
          width={100}
          height={100}
          alt="Technishen Logo"
          style={{ width: '80%', margin: 'auto', maxHeight: '50px' }}
        />
      </Box>

      <Box
        sx={{
          p: 2,
          backgroundColor: 'white',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          borderBottomLeftRadius: '20px',
        }}
      >
        <BusinessSelector
        //   businesses={businesses}
        //   selectedBusiness={selectedBusiness}
        //   setSelectedBusiness={setSelectedBusiness}
        />
      </Box>

      <SidebarMenu />
    </Drawer>
  )
}

export default SideBar
