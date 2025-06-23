import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';

window.adminLogin = async function () {
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Admin logged in');
    window.location.href = 'admin-dashboard.html';
  } catch (error) {
    alert(error.message);
  }
}
