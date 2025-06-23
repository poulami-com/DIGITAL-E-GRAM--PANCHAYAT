import { auth, db } from './firebase.js';
import {
  collection, addDoc, getDocs, doc, updateDoc
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';

window.createService = async function () {
  const title = document.getElementById('serviceTitle').value;
  const desc = document.getElementById('serviceDesc').value;
  await addDoc(collection(db, "services"), { title, desc });
  alert("Service added!");
}

async function loadApplications() {
  const apps = await getDocs(collection(db, "applications"));
  const list = document.getElementById("applicationsList");
  list.innerHTML = '';
  apps.forEach(app => {
    const data = app.data();
    list.innerHTML += `
      <div>
        <p>${data.service} - ${data.status}</p>
        <button onclick="updateStatus('${app.id}', 'Approved')">Approve</button>
        <button onclick="updateStatus('${app.id}', 'Rejected')">Reject</button>
      </div>`;
  });
}

window.updateStatus = async function (id, status) {
  const ref = doc(db, "applications", id);
  await updateDoc(ref, { status });
  loadApplications();
}

window.logout = async function () {
  await signOut(auth);
  window.location.href = "admin-login.html";
}

loadApplications();
