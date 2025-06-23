import { auth, db } from './firebase.js';
import {
  getDocs, collection, updateDoc, doc
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';

// Ensure user is authenticated
onAuthStateChanged(auth, user => {
  if (!user) {
    alert("Unauthorized access. Redirecting to login.");
    window.location.href = "staff-login.html";
  } else {
    loadServices();
    loadApplications();
  }
});

// Load available services
async function loadServices() {
  const snapshot = await getDocs(collection(db, "services"));
  const container = document.getElementById("serviceList");
  container.innerHTML = '';
  snapshot.forEach(docSnap => {
    const service = docSnap.data();
    container.innerHTML += `
      <div class="service-box">
        <p><strong>${service.title}</strong>: ${service.desc}</p>
      </div>
    `;
  });
}

// Load user applications
async function loadApplications() {
  const snapshot = await getDocs(collection(db, "applications"));
  const container = document.getElementById("apps");
  container.innerHTML = '';
  snapshot.forEach(docSnap => {
    const app = docSnap.data();
    container.innerHTML += `
      <div class="application-box">
        <p><strong>Service:</strong> ${app.service}</p>
        <p><strong>Status:</strong> ${app.status}</p>
        <button onclick="updateStatus('${docSnap.id}', 'Processing')">Mark as Processing</button>
        <button onclick="updateStatus('${docSnap.id}', 'Completed')">Mark as Completed</button>
      </div>
    `;
  });
}

window.updateStatus = async function (appId, status) {
  const ref = doc(db, "applications", appId);
  await updateDoc(ref, { status });
  loadApplications();
}

window.logout = async function () {
  await signOut(auth);
  window.location.href = "staff-login.html";
}
