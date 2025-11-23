import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // getDatabase import

// TODO: https://firebase.google.com/docs/web/setup?hl=ko
// 가이드에 따라 firebase config를 설정합니다.
const firebaseConfig = {
    apiKey: "AIzaSyAkgF8w55_9wpDSK4W7LXVcqkEJ9UNnXkU",
    authDomain: "mobile-wedding-invitatio-30c9f.firebaseapp.com",
    databaseURL: "https://mobile-wedding-invitatio-30c9f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mobile-wedding-invitatio-30c9f",
    storageBucket: "mobile-wedding-invitatio-30c9f.firebasestorage.app",
    messagingSenderId: "926543100436",
    appId: "1:926543100436:web:08aff8b21bad501a910501"
};


export const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp); // Realtime Database 인스턴스 생성
