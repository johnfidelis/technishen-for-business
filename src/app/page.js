// 'use client'
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { CircularProgress } from '@mui/material'
// import Image from 'next/image'
// import TechnisenLogo from '../assets/images/logoBlue.png'

// export default function Home() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // router.push('/dashboard')
//   }, [])

//   return (
//     <div
//       style={{
//         display: 'flex',
//         height: '100vh',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'column',
//       }}
//     >
//       {loading && (
//         <>
//           <CircularProgress />
//           <p
//             style={{ marginTop: '10px', fontSize: '1.2rem', fontWeight: '500' }}
//           >
//             <Image
//               src={TechnisenLogo}
//               width={100}
//               height={100}
//               alt="Technishen Logo"
//               style={{ width: '80%', margin: 'auto', maxHeight: '50px' }}
//             />
//           </p>
//         </>
//       )}
//     </div>
//   )
// }

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import TechnisenLogo from '../assets/images/logoBlue.png'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //     // router.push("/dashboard");
  //   }, 2000); // Simulating loading before redirect
  // }, []);

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
          // initial={{ opacity: 0, scale: 0.5 }}
          // animate={{ opacity: 1, scale: 1 }}
          // transition={{ duration: 0.5, ease: "easeInOut" }}
          // exit={{ opacity: 0, scale: 0.5 }}

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
        {/* <CircularProgress style={{ marginTop: "10px" }} /> */}
      </AnimatePresence>
    </div>
  )
}
