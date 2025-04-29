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
  const [uploadError, setUploadError] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

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
        setUploadProgress(0)
        await uploadFileAndSendMessage(
          senderId,
          receiverId,
          file,
          (progress) => {
            setUploadProgress(progress)
          },
        )
        setFile(null)
        setUploadProgress(0)
      } catch (error) {
        console.error('File upload error:', error)
        // setUploadError('Failed to upload file. Please try again.')
        setUploadProgress(0)
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
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadError(null) // Clear any previous error
    }
  }

  const handleClearFile = () => {
    setFile(null)
    setFilePreview(null)
    setUploadError(null)
    setUploadProgress(0)
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
              flexDirection: msg.senderId === senderId ? 'row-reverse' : 'row',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            {/* Message Bubble */}

            {msg.file && msg.file.url ? (
              <Box
                sx={{
                  maxWidth: '70%',
                  ml: msg.senderId === senderId ? 1 : 0,
                  mr: msg.senderId !== senderId ? 1 : 0,
                  backgroundColor:
                    msg.senderId === senderId ? theme.primary_color : '#E0E0E0',
                  color: msg.senderId === senderId ? '#fff' : '#000',
                  borderRadius: 1,
                  p: 1,
                  fontSize: '0.85em',
                  wordBreak: 'break-word', // Prevent long text from breaking layout
                }}
              >
                <img
                  src={msg.file.url}
                  alt={msg.file.name}
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  maxWidth: '70%',
                  ml: msg.senderId === senderId ? 1 : 0,
                  mr: msg.senderId !== senderId ? 1 : 0,
                  backgroundColor:
                    msg.senderId === senderId ? theme.primary_color : '#E0E0E0',
                  color: msg.senderId === senderId ? '#fff' : '#000',
                  borderRadius: 1,
                  p: 1.5,
                  fontSize: '0.85em',
                  wordBreak: 'break-word', // Prevent long text from breaking layout
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
            )}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Divider */}
      <Box
        sx={{
          height: '1px',
          backgroundColor: theme.primary_color || '#115093',
          width: '100%',
        }}
      />

      {uploadError && (
        <Typography color="error" sx={{ p: 1, fontSize: '0.8em' }}>
          {uploadError}
        </Typography>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <Typography color="primary" sx={{ p: 1, fontSize: '0.8em' }}>
          Uploading: {Math.round(uploadProgress)}%
        </Typography>
      )}

      {filePreview && (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          {file.type.startsWith('image/') ? (
            <img
              src={filePreview}
              alt="Preview"
              style={{ maxHeight: '50px', maxWidth: '50px', mr: 1 }}
            />
          ) : file.type === 'application/pdf' ? (
            <PictureAsPdfIcon sx={{ fontSize: 40, mr: 1 }} />
          ) : (
            <AttachmentIcon sx={{ fontSize: 40, mr: 1 }} />
          )}
          <Typography
            variant="body2"
            sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {file.name}
          </Typography>
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
          disabled={uploadProgress > 0}
          sx={{
            backgroundColor: theme.primary_color || '#115093',
            color: '#fff',
            ml: 1,
            '&:hover': { backgroundColor: theme.primary_color },
            ...(uploadProgress > 0 && { opacity: 0.5, cursor: 'not-allowed' }),
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatTab
