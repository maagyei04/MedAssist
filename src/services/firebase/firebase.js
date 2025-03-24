import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyA1BthyqzHEm6tgynG563Iy1wiRVFRJoDg',
  authDomain: 'medassist-367eb.firebaseapp.com',
  projectId: 'medassist-367eb',
  storageBucket: 'medassist-367eb.firebasestorage.app',
  messagingSenderId: '78124466702',
  appId: '1:78124466702:web:cc5b325500c3bf8272f25f',
  measurementId: 'G-79JBH0H60W'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)


export { db, auth, storage }

