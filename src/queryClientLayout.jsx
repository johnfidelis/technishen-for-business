'use client'
// import init from '@/config/_config'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import queryClient from './queryClient'
import init from './config'

export default function QueryClientLayout({ children }) {
  init()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  )
}
