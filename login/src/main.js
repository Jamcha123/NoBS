import './style.css'
import * as THREE from 'three'
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'
import { createUserWithEmailAndPassword, deleteUser, getAuth, GithubAuthProvider, GoogleAuthProvider, linkWithPopup, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {} from 'firebase/firestore'

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
onAuthStateChanged(auth, (user) => {
    if(user != null){
        if(user.isAnonymous !== true){
            alert("not anonymous")
        }
    }
})

const github = new GithubAuthProvider()
github.addScope("https://github.com/Jamcha123/NoBS")

const google = new GoogleAuthProvider()

const login = document.getElementById("login")
const register = document.getElementById("register")
document.getElementById("GetRegister").addEventListener("click", async (e) => {
    e.preventDefault()
    login.style.display = "none"
    register.style.display = "flex"
})

document.getElementById("GetLogin").addEventListener("click", async (e) => {
    e.preventDefault()
    login.style.display = "flex"
    register.style.display = "none"
})

const [email1, email2] = [document.getElementById("email1"), document.getElementById("email2")]
const [pass1, pass2] = [document.getElementById("pass1"), document.getElementById("pass2")]
login.addEventListener("submit", (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email1.value, pass1.value).then((value) => {
        alert(value)
        window.location.href = "/dashboard.html"
    }).catch((err) => {
        alert(err)
    })

})
register.addEventListener("submit", (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email2.value, pass2.value).then((value) => {
        alert(value)
        window.location.href = "/dashboard.html"
    }).catch((err) => {
        alert(err)
    })
})

const [google1, google2] = [document.getElementById("google1"), document.getElementById("google2")]
const [github1, github2] = [document.getElementById("github1"), document.getElementById("github2")]

google1.addEventListener("click", (e) => {
    e.preventDefault()
    linkWithPopup(auth.currentUser, google).then((value) => {
        alert(value)
        window.location.href = "/dashboard.html"
    }).catch((err) => {
        alert(err)
    })
})

google2.addEventListener("click", (e) => {
    e.preventDefault()
    linkWithPopup(auth.currentUser, google).then((value) => {
        alert(value)
        window.location.href = "/dashboard.html"
    }).catch((err) => {
        alert(err)
    })
})

github1.addEventListener("click", (e) => {
    e.preventDefault()
    linkWithPopup(auth.currentUser, github).then((value) => {
        alert(value)
        window.location.href = "/dashboard.html"
    }).catch((err) => {
        alert(err)
    })
})
github2.addEventListener("click", (e) => {
    e.preventDefault()
    linkWithPopup(auth.currentUser, github).then((value) => {
        alert(value)
        window.location.href = "/dashboard.html"
    }).catch((err) => {
        alert(err)
    })
})

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 0, 30)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: true,
    depth: true
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

function AddStars(){
    const vertices = []
    for(let i = 0; i != 10000; i++){
        const x = THREE.MathUtils.randFloatSpread(2000)
        const y = THREE.MathUtils.randFloatSpread(2000)
        const z = THREE.MathUtils.randFloatSpread(2000)

        vertices.push(x, y, z)
    }

    const stargeometry = new THREE.BufferGeometry()
    stargeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))

    const starmaterial = new THREE.PointsMaterial({
        color: 0xffffff, 
        side: THREE.DoubleSide,
        size: 2
    })

    const star = new THREE.Points(stargeometry, starmaterial)
    star.name = "stars"
    scene.add(star)

    renderer.render(scene, camera)
}
AddStars()

function AddDonuts(x, y, z){
    const torusgeometry = new THREE.SphereGeometry(1, 32)

    const torusmaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        wireframe: true
    })
    const torus = new THREE.Mesh(torusgeometry, torusmaterial)
    torus.name = "1"
    torus.position.set(x, y, z)

    scene.add(torus)
    renderer.render(scene, camera)
}
Array(100).fill().forEach((e) => {
    const x = Math.floor(Math.random() * 500 + -250)
    const y = Math.floor(Math.random() * 500 + -250)
    const z = Math.floor(Math.random() * 500 + -250)

    AddDonuts(x, y, z)
})

function resize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}

function animate(){
    window.addEventListener("resize", resize)
    camera.rotation.x += 0.0005
    camera.rotation.y += 0.00005
    camera.rotation.z += 0.00005

    renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)