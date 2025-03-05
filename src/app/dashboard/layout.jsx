'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SideBar from '@/component/SideBar'
import TopBar from '@/component/TopBar'
import { ThemeProvider } from '../../context/ThemeContext'
import { useFetchData } from '@/hooks/useApiService'
import { GET_ENDPOINTS } from '@/constants/endpoints'

export default function Layout({ children }) {
  const router = useRouter()


  const { data, isLoading } = useFetchData(
    GET_ENDPOINTS.BUSINESSES,
    'fetchBusinesses',
  )

  console.log({data})
  console.log(data?.businesses?.[0]?.owner?.first_name)

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
          <TopBar ownerName={data?.businesses?.[0]?.owner?.first_name }/>
          <div style={{ marginTop: '100px' }}>{children}</div>
        </div>
      </div>
    </ThemeProvider>
  )
}
