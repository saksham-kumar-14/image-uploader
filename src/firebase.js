import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDCXt4w6g1J5C5X8nCrxjWQp5GGSFXvwUk",
  authDomain: "image-uploader-60578.firebaseapp.com",
  projectId: "image-uploader-60578",
  storageBucket: "image-uploader-60578.appspot.com",
  messagingSenderId: "853652019746",
  appId: "1:853652019746:web:b38ab5072b558f824a487b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
