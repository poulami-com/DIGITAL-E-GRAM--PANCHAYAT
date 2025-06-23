import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';

window.staffLogin = async function () {
  const email = document.getElementById("staffEmail").value;
  const password = document.getElementById("staffPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Staff logged in successfully");
    window.location.href = "staff-dashboard.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
}
