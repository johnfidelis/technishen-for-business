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

  console.log({ data })
  console.log(data?.businesses?.[0]?.owner?.first_name)

  useEffect(() => {
    if (!isLoading) {
      const hasBusinesses = data?.businesses?.length > 0

      // if (data?.businesses == null || data?.businesses == undefined) {
      //   router.replace('/login')
      // } else if (!hasBusinesses && data?.businesses !== null || data?.businesses !== undefined) {
      //   router.replace('/onboard')
      // }
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
          <TopBar
            ownerName={data?.businesses?.[0]?.owner?.first_name}
            ownerImage={
              'https://technishenbackend.onrender.com' +
                data?.businesses?.[0]?.owner?.owner_image ||
              'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
            }
          />
          <div style={{ marginTop: '100px' }}>{children}</div>
        </div>
      </div>
    </ThemeProvider>
  )
}
