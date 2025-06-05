import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userIdDisplay").innerText = user.uid;

    document.getElementById("sendChat").addEventListener("click", async () => {
      const msg = document.getElementById("chatInput").value;
      if (msg.trim() !== "") {
        await addDoc(collection(db, "users", user.uid, "chatbot_history"), {
          message: msg,
          sender: "user",
          timestamp: serverTimestamp()
        });
        alert("Chat tersimpan!");
      }
    });

    document.getElementById("saveJourney").addEventListener("click", async () => {
      const mood = document.getElementById("moodInput").value;
      const note = document.getElementById("noteInput").value;
      if (mood.trim() !== "") {
        await addDoc(collection(db, "users", user.uid, "journey_tracking"), {
          date: new Date().toISOString().slice(0, 10),
          mood,
          notes: note
        });
        alert("Journey tersimpan!");
      }
    });
  } else {
    window.location.href = "login.html";
  }
});
