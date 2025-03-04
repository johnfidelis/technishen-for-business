'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Cookies } from 'react-cookie'
import SideBar from '@/component/SideBar'
import TopBar from '@/component/TopBar'
import { ThemeProvider } from '../../context/ThemeContext'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'

export default function Layout({ children }) {
  const router = useRouter()
  const cookies = new Cookies()

  const { data, isLoading } = useFetchData(
    GET_ENDPOINTS.BUSINESSES,
    'fetchBusinesses',
  )

  useEffect(() => {
    if (!isLoading) {
      const hasBusinesses = data?.businesses?.length > 0

      if (!hasBusinesses) {
        router.replace('/onboard')
      }
    }
  }, [data, isLoading, router])

  return (
    <ThemeProvider>
      <div className="flex flex-grow w-full">
        <SideBar />
        <div className="grow-1 w-full bg-white min-h-screen">
          <TopBar />
          <div style={{ marginTop: '100px' }}>{children}</div>
        </div>
      </div>
    </ThemeProvider>
  )
}
