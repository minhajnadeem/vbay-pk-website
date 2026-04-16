importScripts("https://www.gstatic.com/firebasejs/12.9.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.9.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA92vAJtv2iWXGBV9UIz8IcTBPWhLo5fr4",
  authDomain: "vbay-pk-db05a.firebaseapp.com",
  projectId: "vbay-pk-db05a",
  storageBucket: "vbay-pk-db05a.firebasestorage.app",
  messagingSenderId: "15108143563",
  appId: "1:15108143563:web:a36213e970217207f61e4e",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "New notification";
  const options = {
    body: payload.notification?.body || "",
    icon: "/android-chrome-192x192.png",
  };

  self.registration.showNotification(title, options);
});
