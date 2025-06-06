import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const phone = document.getElementById("signup-phone").value;
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirmpw").value;

    if (!name || !email || !phone || !password || !confirm) {
      alert("Semua kolom harus diisi.");
      return;
    }

    if (password !== confirm) {
      alert("Password dan konfirmasi tidak cocok.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        createdAt: new Date().toISOString()
      });

      alert("Registrasi berhasil!");
      window.location.href = "../html/login.html";
    } catch (error) {
      console.error("Error saat registrasi:", error);
      alert("Registrasi gagal: " + error.message);
    }
  });
});
