import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyDy97aMnjllNKM_X2ekls4BDQSlNY8Zbck",
  authDomain: "englabsoft.firebaseapp.com",
  projectId: "englabsoft",
  storageBucket: "englabsoft.appspot.com",
  messagingSenderId: "118256039576",
  appId: "1:118256039576:web:fe0dc8bd7658fbde1382ed"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}