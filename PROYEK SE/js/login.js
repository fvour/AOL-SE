import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

window.validateLogin = async function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    // Try signing in with email and password
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login berhasil");
    window.location.href = "index.html";  // Redirect to the home page after login
  } catch (error) {
    alert("Login gagal: " + error.message);
  }
};