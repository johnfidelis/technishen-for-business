'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import TechnisenLogo from '../assets/images/logoBlue.png'

export default function Home() {
  const router = useRouter()

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/dashboard')
  //   }, 3000)
  // }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/dashboard')
    }, 3000)

    return () => clearTimeout(timeout) // Cleanup to prevent memory leaks
  }, [router])

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 1, 1] }}
          transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            src={TechnisenLogo}
            width={100}
            height={100}
            alt="Technisen Logo"
            style={{ width: '100%', margin: 'auto', maxHeight: '50px' }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
