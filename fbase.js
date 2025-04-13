// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyC5i0jM7jrHm14XiEOfRowEr-iqVFYkNXM",
    authDomain: "login-signup-page-88a23.firebaseapp.com",
    projectId: "login-signup-page-88a23",
    storageBucket: "login-signup-page-88a23.appspot.com",
    messagingSenderId: "842911703513",
    appId: "1:842911703513:web:6010a72a544591832cb9c8"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



  // Helper functions
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function validateMobile(mobile) {
    const regex = /^\d{10}$/;
    return regex.test(mobile);
  }
  
  // Login handler
  document.querySelector("#loginForm button").addEventListener("click", () => {
    const email = document.querySelector("#loginForm input[type='email']").value.trim();
    const password = document.querySelector("#loginForm input[type='password']").value.trim();
  
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        window.location.href = "homepage.html";
        console.log("Logged in user:", userCredential.user);
      })
      .catch((error) => {
        console.log("Login failed", error.message);
        alert("Login failed");
      });
  });
  
  // Signup handler
  document.querySelector("#signupForm button").addEventListener("click", () => {
    const inputs = document.querySelectorAll("#signupForm input");
    const firstName = inputs[0].value.trim();
    const email = inputs[5].value.trim();
    const password = inputs[6].value.trim();
    const mobile = inputs[4].value.trim();
    const termsAccepted = inputs[7].checked;
  
    if (!firstName || !email || !password || !mobile) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!validateMobile(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
  
    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }
  
    if (!termsAccepted) {
      alert("Please accept the Terms and Privacy Policy.");
      return;
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Signup successful!");
        console.log("Signed up user:", userCredential.user);
        showLogin();
      })
      .catch((error) => {
        alert("Signup failed: " + error.message);
      });
  });