import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Firestore import 추가

// TODO: https://firebase.google.com/docs/web/setup?hl=ko
// 가이드에 따라 firebase config를 설정합니다.
const firebaseConfig = {
    apiKey: "AIzaSyAkgF8w55_9wpDSK4W7LXVcqkEJ9UNnXkU",
    authDomain: "mobile-wedding-invitatio-30c9f.firebaseapp.com",
    projectId: "mobile-wedding-invitatio-30c9f",
    storageBucket: "mobile-wedding-invitatio-30c9f.firebasestorage.app",
    messagingSenderId: "926543100436",
    appId: "1:926543100436:web:08aff8b21bad501a910501"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp); // Firestore 인스턴스 생성 및 export
