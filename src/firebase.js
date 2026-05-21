import { initializeApp }
from "firebase/app"

import {
  getDatabase
}
from "firebase/database"

const firebaseConfig = {

  apiKey:
    "AIzaSyBjommPB5qSKzdD5o47DMY7C01L6YtbUtE",

  authDomain:
    "billmitra-f878a.firebaseapp.com",

  databaseURL:
    "https://billmitra-f878a-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId:
    "billmitra-f878a",

  storageBucket:
    "billmitra-f878a.firebasestorage.app",

  messagingSenderId:
    "957135133825",

  appId:
    "1:957135133825:web:f25fc5d815babfa8fb8180"
}

const app =
  initializeApp(firebaseConfig)

export const db =
  getDatabase(app)