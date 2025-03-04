'use client'

import { useState, useContext } from 'react'
import { Box, Typography, TextField, Button, IconButton } from '@mui/material'
import AttachmentIcon from '@mui/icons-material/Attachment'
import SendIcon from '@mui/icons-material/Send'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { ThemeContext } from '@/context/ThemeContext'

const ChatTab = () => {
  const { theme } = useContext(ThemeContext)

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { type: 'admin', content: 'Hello Vivica', time: 'Today 08:30' },
    { type: 'user', content: 'Good Day Admin', time: 'Today 08:32' },
    {
      type: 'admin',
      content:
        'Find the attached document, it is a list of today’s invoice with additional material you requested.',
      time: 'Today 08:35',
    },
    { type: 'file', name: 'Client list.pdf', time: 'Today 08:36' },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        { type: 'user', content: message, time: 'Now' },
      ])
      setMessage('')
    }
  }

  return (
    <Box
      sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: msg.type === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            {/* Message Bubble */}
            <Box
              sx={{
                maxWidth: '70%',
                ml: msg.type === 'user' ? 1 : 0,
                mr: msg.type !== 'user' ? 1 : 0,
                backgroundColor:
                  msg.type === 'user' ? theme.primary_color : '#E0E0E0',
                color: msg.type === 'user' ? '#fff' : '#000',
                borderRadius: 2,
                p: 1.5,
                fontSize: '0.85em',
              }}
            >
              {msg.type === 'file' ? (
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    p: 1,
                    border: `1px solid ${theme.primary_color}`,
                    borderRadius: 2,
                  }}
                >
                  <PictureAsPdfIcon
                    sx={{ color: '#FF5252', fontSize: '2em', mr: 1 }}
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.85em',
                        fontWeight: 300,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {msg.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ fontSize: '0.75em', color: '#6C757D' }}
                    >
                      {msg.time}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <>
                  {msg.content}
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      fontSize: '0.75em',
                      color: msg.type === 'user' ? '#B0BEC5' : '#6C757D',
                      mt: 0.5,
                    }}
                  >
                    {msg.time}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Divider */}
      <Box
        sx={{
          height: '1px',
          backgroundColor: theme.primary_color,
          width: '100%',
        }}
      />

      {/* Input Field */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <Button
          variant="outlined"
          component="label"
          sx={{
            fontSize: '0.85em',
            textTransform: 'none',
            color: theme.primary_color,
            borderColor: theme.primary_color,
            mr: 1,
          }}
        >
          <AttachmentIcon />
          <input hidden type="file" />
        </Button>
        <TextField
          fullWidth
          placeholder="Type your message..."
          size="small"
          multiline
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ '& .MuiInputBase-input': { fontSize: '0.85em' } }}
        />
        <IconButton
          onClick={handleSendMessage}
          sx={{
            backgroundColor: theme.primary_color,
            color: '#fff',
            ml: 1,
            '&:hover': { backgroundColor: theme.primary_color },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatTab
