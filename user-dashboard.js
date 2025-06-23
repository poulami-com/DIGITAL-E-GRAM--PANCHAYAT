import { auth, db } from './firebase.js';
import {
  collection, getDocs, addDoc, query, where
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js';

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loadServices();
    loadMyApps();
  } else {
    window.location.href = "user-auth.html";
  }
});

async function loadServices() {
  const services = await getDocs(collection(db, "services"));
  const list = document.getElementById("serviceList");
  list.innerHTML = '';
  services.forEach(doc => {
    const data = doc.data();
    list.innerHTML += `
      <div>
        <p>${data.title}: ${data.desc}</p>
        <button onclick="applyService('${doc.id}', '${data.title}')">Apply</button>
      </div>`;
  });
}

window.applyService = async function (serviceId, serviceName) {
  await addDoc(collection(db, "applications"), {
    userId: currentUser.uid,
    service: serviceName,
    status: "Pending"
  });
  alert("Applied successfully");
  loadMyApps();
}

async function loadMyApps() {
  const q = query(collection(db, "applications"), where("userId", "==", currentUser.uid));
  const snapshot = await getDocs(q);
  const list = document.getElementById("userApps");
  list.innerHTML = '';
  snapshot.forEach(doc => {
    const app = doc.data();
    list.innerHTML += `<p>${app.service} - ${app.status}</p>`;
  });
}

window.logout = async function () {
  await signOut(auth);
  window.location.href = "user-auth.html";
}
