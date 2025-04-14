function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'flex';
  }
  
  function showLogin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'flex';
  }

  import { auth } from './fbase.js';
  import {
    signOut,
    onAuthStateChanged
  } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
  
  // Auto-redirect to login if user not logged in (for homepage.html)
  onAuthStateChanged(auth, (user) => {
    const onHomepage = window.location.pathname.includes("homepage.html");
    if (onHomepage && !user) {
      window.location.href = "index.html";
    }
  });
  
  // Logout function
  function logoutUser() {
    signOut(auth)
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert("Logout failed: " + error.message);
      });
  }
  
  // Attach logout button listener
  document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logoutUser);
    }
  });
  