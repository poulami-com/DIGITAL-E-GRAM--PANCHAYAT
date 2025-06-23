import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';

window.register = async function () {
  const email = document.getElementById('userEmail').value;
  const password = document.getElementById('userPassword').value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registered successfully");
  } catch (e) {
    alert(e.message);
  }
}

window.login = async function () {
  const email = document.getElementById('userEmail').value;
  const password = document.getElementById('userPassword').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in");
    window.location.href = "user-dashboard.html";
  } catch (e) {
    alert(e.message);
  }
}
