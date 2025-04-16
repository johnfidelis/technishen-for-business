// import React, { useState } from 'react';
// import { Typography, Menu, MenuItem } from '@mui/material';
// import { MdMail } from 'react-icons/md';
// import { useTheme } from '@mui/material/styles';

// const EmailLauncher = ({ email }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const theme = useTheme();

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const emailOptions = [
//     {
//       label: 'Gmail',
//       link: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
//     },
//     {
//       label: 'Outlook',
//       link: `https://outlook.live.com/owa/?path=/mail/action/compose&to=${email}`,
//     },
//     {
//       label: 'Default Mail App',
//       link: `mailto:${email}`,
//     },
//     {
//       label: 'Yahoo Mail',
//       link: `http://compose.mail.yahoo.com/?to=${email}`,
//     },
//   ];

//   const handleOptionClick = (link) => {
//     window.open(link, '_blank');
//     handleClose();
//   };

//   return (
//     <>
//       <Typography
//         variant="body2"
//         onClick={handleClick}
//         sx={{
//           color: theme.primary_color || '#115093',
//           display: 'flex',
//           alignItems: 'center',
//           gap: 0.6,
//           cursor: 'pointer',
//         }}
//       >
//         <MdMail size={16} /> Send Email
//       </Typography>

//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//         {emailOptions.map((option) => (
//           <MenuItem key={option.label} onClick={() => handleOptionClick(option.link)}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   );
// };

// export default EmailLauncher;

import React, { useState } from 'react'
import { Typography, Menu, MenuItem, Box } from '@mui/material'
import { MdMail } from 'react-icons/md'
import { useTheme } from '@mui/material/styles'

// Icons (you can replace each with its actual logo)
import GmailIcon from '../../assets/images/gmailicon.png'
import OutlookIcon from '../../assets/images/gmailicon.png'
import DefaultIcon from '../../assets/images/gmailicon.png'
import YahooIcon from '../../assets/images/gmailicon.png'

const EmailLauncher = ({ email }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const emailOptions = [
    {
      label: 'Gmail',
      icon: GmailIcon,
      link: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
    },
    {
      label: 'Outlook',
      icon: OutlookIcon,
      link: `https://outlook.live.com/owa/?path=/mail/action/compose&to=${email}`,
    },
    {
      label: 'Default Mail App',
      icon: DefaultIcon,
      link: `mailto:${email}`,
    },
    {
      label: 'Yahoo Mail',
      icon: YahooIcon,
      link: `http://compose.mail.yahoo.com/?to=${email}`,
    },
  ]

  const handleOptionClick = (link) => {
    window.open(link, '_blank')
    handleClose()
  }

  return (
    <>
      <Typography
        variant="body2"
        onClick={handleClick}
        sx={{
          color: theme.primary_color || '#115093',
          display: 'flex',
          alignItems: 'center',
          gap: 0.6,
          cursor: 'pointer',
        }}
      >
        <MdMail size={16} /> Send Email
      </Typography>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {emailOptions.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => handleOptionClick(option.link)}
          >
            <Box display="flex" alignItems="center" gap={1}>
              {/* <img
                src={option.icon}
                alt={option.label}
                style={{ width: 20, height: 20, objectFit: 'contain' }}
              /> */}
              {option.label}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default EmailLauncher
