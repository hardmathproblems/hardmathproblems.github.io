function duolingoAlert(){
    alert('Be Warned...');
    alert('This Is A Point Of No Return...');
};

function figureItOut(){
    $('#figure-it-out').html('Womp Womp');
    setTimeout(() => {
        $('#figure-it-out').html('Or Just Make One?');
    }, 2500)
};

function teacherMode(){
    $('#games-area').css('display', 'none')
};
// Cobblesteve dont recode the function its fine dont screw it up
document.addEventListener('keydown', function(event) {
    if (event.key === 'n' || event.key === 'N') {
        teacherMode();
    }
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2of1NPQzclRE9LGLcPQTzknyJFHRZECQ",
  authDomain: "excellent-guard-435619-i4.firebaseapp.com",
  projectId: "excellent-guard-435619-i4",
  storageBucket: "excellent-guard-435619-i4.appspot.com",
  messagingSenderId: "464990060717",
  appId: "1:464990060717:web:60b6d20588c64f56d20624",
  measurementId: "G-KMH6PS08ZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);