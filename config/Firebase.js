import firebase from 'firebase'

// const firebaseConfig = {
//     apiKey: "AIzaSyAcXjQACiSWFFHbJuHIEeDtgc2Cmmri5oM",
//     authDomain: "meditation-app-34538.firebaseapp.com",
//     databaseURL: "https://meditation-app-34538.firebaseio.com",
//     projectId: "meditation-app-34538",
//     storageBucket: "meditation-app-34538.appspot.com",
//     messagingSenderId: "869508202761",
//     appId: "1:869508202761:web:44ed26c6f624ded27113d8",
//     measurementId: "G-VX90RN1JRC"
// }


const firebaseConfig = {
    apiKey: "AIzaSyAI7EGfN7HWQNzIgWvdOkkos2wCxc9w_BM",
    authDomain: "meditationapp-16293.firebaseapp.com",
    databaseURL: "https://meditationapp-16293.firebaseio.com",
    projectId: "meditationapp-16293",
    storageBucket: "meditationapp-16293.appspot.com",
    messagingSenderId: "901562483987",
    appId: "1:901562483987:web:776ef3bb4ab2d1917086e6",
    measurementId: "G-Q3YGG1EHWC"
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)
export default Firebase
