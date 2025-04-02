import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCSjIbyLJgOXjUux4y3MlD0PzrKkbMLrwQ',
  authDomain: 'technishen-b00bb.firebaseapp.com',
  projectId: 'technishen-b00bb',
  storageBucket: 'technishen-b00bb.firebasestorage.app',
  messagingSenderId: '318933586198',
  appId: '1:318933586198:web:d6775be4a288cc08dd4037',
  measurementId: 'G-YGMBGZ4W0T',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
