// firebaseFunctions.js
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore'
import { db } from './firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const storage = getStorage()

export const generateChatId = (id1, id2) => {
  return [id1, id2].sort().join('_')
}

// export const generateChatId = (id1, id2) => {
//     const sortedIds = [id1, id2].sort();
//     return sortedIds.join('_');
//   };

export const sendMessage = async (senderId, receiverId, text) => {
  if (!text.trim()) return

  const chatId = generateChatId(senderId, receiverId)
  const messagesRef = collection(db, 'chats', chatId, 'messages')
  const chatDocRef = doc(db, 'chats', chatId)

  const messageData = {
    senderId,
    text,
    timestamp: serverTimestamp(),
  }

  await addDoc(messagesRef, messageData)
  const chatDocSnap = await getDoc(chatDocRef)
  let unreadCounts = {}
  if (chatDocSnap.exists()) {
    unreadCounts = chatDocSnap.data().unreadCounts || {}
  }
  unreadCounts[receiverId] = (unreadCounts[receiverId] || 0) + 1
  unreadCounts[senderId] = 0

  await updateDoc(chatDocRef, {
    lastMessage: messageData,
    unreadCounts: unreadCounts,
  })
}

export const uploadFileAndSendMessage = async (senderId, receiverId, file) => {
  if (!file) return

  const chatId = generateChatId(senderId, receiverId)
  const storageRef = ref(storage, `chats/${chatId}/${file.name}`)

  try {
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)

    const messageData = {
      senderId,
      file: {
        name: file.name,
        url: downloadURL,
      },
      timestamp: serverTimestamp(),
    }

    const messagesRef = collection(db, 'chats', chatId, 'messages')
    const chatDocRef = doc(db, 'chats', chatId)

    await addDoc(messagesRef, messageData)
    const chatDocSnap = await getDoc(chatDocRef)
    let unreadCounts = {}
    if (chatDocSnap.exists()) {
      unreadCounts = chatDocSnap.data().unreadCounts || {}
    }
    unreadCounts[receiverId] = (unreadCounts[receiverId] || 0) + 1
    unreadCounts[senderId] = 0

    await updateDoc(chatDocRef, {
      lastMessage: messageData,
      unreadCounts: unreadCounts,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const listenForMessages = (senderId, receiverId, callback) => {
  const chatId = generateChatId(senderId, receiverId)
  const messagesRef = collection(db, 'chats', chatId, 'messages')

  const q = query(messagesRef, orderBy('timestamp'))

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    callback(messages)
    updateDoc(doc(db, 'chats', chatId), {
      [`unreadCounts.${senderId}`]: 0,
    })
  })

  return unsubscribe
}

export const addUserToChat = async (userId, chatId) => {
  const userRef = doc(db, 'users', userId)
  await updateDoc(userRef, {
    [`chats.${chatId}`]: true,
  })
}

export const fetchUserChats = async (userId) => {
  const userDocRef = doc(db, 'users', userId)
  const userDocSnap = await getDoc(userDocRef)
  if (!userDocSnap.exists() || !userDocSnap.data().chats) {
    return []
  }
  const chatIds = Object.keys(userDocSnap.data().chats)
  const chats = []
  for (const chatId of chatIds) {
    const chatDocRef = doc(db, 'chats', chatId)
    const chatDocSnap = await getDoc(chatDocRef)
    if (chatDocSnap.exists()) {
      chats.push({ chatId, ...chatDocSnap.data() })
    }
  }
  return chats
}
