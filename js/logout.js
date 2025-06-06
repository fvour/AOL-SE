import { auth } from "./firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Function to log out the user
window.logout = async function() {
  try {
    // Sign out the user from Firebase
    await signOut(auth);
    alert("You have logged out successfully.");
    // Redirect to the login page after logout
    window.location.href = "login.html";
  } catch (error) {
    alert("Error logging out: " + error.message);
  }
};

// Add event listener for the logout button click
document.getElementById("logout").addEventListener("click", logout);
