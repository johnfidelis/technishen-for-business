// Project: Chat Application
'use client'

import { useState, useContext, useEffect, useRef } from 'react'
import { Box, Typography, TextField, Button, IconButton } from '@mui/material'
import AttachmentIcon from '@mui/icons-material/Attachment'
import SendIcon from '@mui/icons-material/Send'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ImageIcon from '@mui/icons-material/Image'
import ClearIcon from '@mui/icons-material/Clear'
import { ThemeContext } from '@/context/ThemeContext'
import { db } from '@/config/firebase'
import {
  sendMessage,
  listenForMessages,
  uploadFileAndSendMessage,
} from '@/config/firebaseFunctions'

const ChatTab = () => {
  const [senderId, setSenderId] = useState('ghhhdffdf')
  const [receiverId, setReceiverId] = useState('cffdfdfdf')
  const { theme } = useContext(ThemeContext)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (senderId && receiverId) {
      const unsubscribe = listenForMessages(
        senderId,
        receiverId,
        (newMessages) => {
          setMessages(newMessages)
        },
      )
      return () => unsubscribe()
    }
  }, [senderId, receiverId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }
  }, [file])

  const handleSendMessage = async () => {
    if (file) {
      try {
        await uploadFileAndSendMessage(senderId, receiverId, file)
        setFile(null)
      } catch (error) {
        console.error('File upload error:', error)
      }
    } else if (message.trim()) {
      try {
        await sendMessage(senderId, receiverId, message)
        setMessage('')
      } catch (error) {
        console.error('Message send error:', error)
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleClearFile = () => {
    setFile('')
  }

  // useEffect(() => {
  //   if (senderId && receiverId) {
  //     const unsubscribe = listenForMessages(
  //       senderId,
  //       receiverId,
  //       (newMessages) => {
  //         setMessages(newMessages)
  //       },
  //     )
  //     return () => unsubscribe()
  //   }
  // }, [senderId, receiverId])

  // const handleSendMessage = async () => {
  //   setMessage('')
  //   if (message.trim()) {
  //     try {
  //       await sendMessage(senderId, receiverId, message)
  //     } catch (error) {
  //       console.error('Error sending message:', error)

  //     }
  //   }
  // }

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
              flexDirection: msg.senderId === senderId ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            {/* Message Bubble */}
            <Box
              sx={{
                maxWidth: '70%',
                ml: msg.senderId === senderId ? 1 : 0,
                mr: msg.senderId !== senderId ? 1 : 0,
                backgroundColor:
                  msg.senderId === senderId ? theme.primary_color : '#E0E0E0',
                color: msg.senderId === senderId ? '#fff' : '#000',
                borderRadius: 2,
                p: 1.5,
                fontSize: '0.85em',
              }}
            >
              {msg.text}
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  fontSize: '0.75em',
                  color: msg.senderId === senderId ? '#B0BEC5' : '#6C757D',
                  mt: 0.5,
                }}
              >
                {msg.timestamp?.toDate().toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Divider */}
      <Box
        sx={{
          height: '1px',
          backgroundColor: theme.primary_color || '#115093',
          width: '100%',
        }}
      />

      {filePreview && (
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
          {file.type.startsWith('image/') ? (
            <img
              src={filePreview}
              alt="Preview"
              style={{ maxHeight: '50px', maxWidth: '50px' }}
            />
          ) : (
            <PictureAsPdfIcon />
          )}
          <IconButton onClick={handleClearFile}>
            <ClearIcon />
          </IconButton>
        </Box>
      )}

      {/* Input Field */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <Button
          variant="outlined"
          component="label"
          sx={{
            fontSize: '0.85em',
            textTransform: 'none',
            color: theme.primary_color || '#115093',
            borderColor: theme.primary_color || '#115093',
            mr: 1,
          }}
        >
          <AttachmentIcon />
          <input hidden type="file" onChange={handleFileChange} />
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
            backgroundColor: theme.primary_color || '#115093',
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
