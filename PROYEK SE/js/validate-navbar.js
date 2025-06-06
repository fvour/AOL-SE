import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

window.addEventListener("DOMContentLoaded", () => {
  const userNav = document.getElementById("userNav");
  const loginNav = document.getElementById("loginNav");
  const username = document.getElementById("username");

  // Check if the user is logged in
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is logged in, display userNav and hide loginNav
      userNav.style.display = 'block';  // Show user dropdown
      loginNav.style.display = 'none';  // Hide login link

      // Update username with display name or email
      username.textContent = user.displayName || user.email || "User";

      // Optionally, redirect to another page after login if required
      // window.location.href = "home.html";
    } else {
      // If no user is logged in, show the login link
      userNav.style.display = 'none';
      loginNav.style.display = 'block';
    }
  });
});
