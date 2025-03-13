// import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import './typography.css'
import QueryClientLayout from '@/queryClientLayout'
import 'react-phone-number-input/style.css'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

export const metadata = {
  title: 'Technishen',
  description: 'Technishen for Business',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientLayout>{children}</QueryClientLayout>
      </body>
    </html>
  )
}
