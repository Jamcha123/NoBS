import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import {initializeAppCheck, ReCaptchaEnterpriseProvider} from 'firebase/app-check'
import { getFirestore } from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCkx-d2l8i3bKYpylwLRiILl8nz9eH8T0E",
    authDomain: "nobias-cc487.firebaseapp.com",
    projectId: "nobias-cc487",
    storageBucket: "nobias-cc487.firebasestorage.app",
    messagingSenderId: "548125799355",
    appId: "1:548125799355:web:06adbe84ae25bacc1d0a9e",
    measurementId: "G-SZTFYVR9GV"
}

const app = initializeApp(config)

const appcheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6Lep1MgrAAAAANy9KG_ji-dWa5ozf7QXjDcfULMi"),
    isTokenAutoRefreshEnabled: true
})

const auth = getAuth(app)
auth.useDeviceLanguage()

signInAnonymously(auth)

onAuthStateChanged(auth, async (user) => {
    if(user == null){
        console.log("user, not found")
    }else{
        console.log("user, logged in")
    }
})

const db = getFirestore(app)