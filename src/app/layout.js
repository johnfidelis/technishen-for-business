// // import { Geist, Geist_Mono } from 'next/font/google'
// import './globals.css'
// import './typography.css'
// import QueryClientLayout from '@/queryClientLayout'
// import 'react-phone-number-input/style.css'

// // const geistSans = Geist({
// //   variable: '--font-geist-sans',
// //   subsets: ['latin'],
// // })

// // const geistMono = Geist_Mono({
// //   variable: '--font-geist-mono',
// //   subsets: ['latin'],
// // })

// export const metadata = {
//   title: 'Technishen',
//   description: 'Technishen for Business',
// }
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//       // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <QueryClientLayout>{children}</QueryClientLayout>
//       </body>
//     </html>
//   )
// }

import './globals.css'
// import './typography.css'
import QueryClientLayout from '@/queryClientLayout'
import 'react-phone-number-input/style.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Technishen',
  description: 'Technishen for Business',
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Add the weights you need
  variable: '--font-inter', // Ensure this matches your CSS usage
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
      
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
  
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-toastify/9.1.3/ReactToastify.min.css"
        />
      </head> */}
      <body className={inter.variable}>
        <QueryClientLayout>{children}</QueryClientLayout>
      </body>
    </html>
  )
}
