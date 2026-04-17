importScripts("https://www.gstatic.com/firebasejs/12.9.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.9.0/firebase-messaging-compat.js");

const swUrl = new URL(self.location.href);
const firebaseConfig = {
  apiKey: swUrl.searchParams.get("apiKey") || undefined,
  authDomain: swUrl.searchParams.get("authDomain") || undefined,
  projectId: swUrl.searchParams.get("projectId") || undefined,
  storageBucket: swUrl.searchParams.get("storageBucket") || undefined,
  messagingSenderId: swUrl.searchParams.get("messagingSenderId") || undefined,
  appId: swUrl.searchParams.get("appId") || undefined,
};

if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.projectId ||
  !firebaseConfig.messagingSenderId ||
  !firebaseConfig.appId
) {
  // Keep the worker alive but skip FCM setup if config is missing.
  console.error("FCM service worker is missing Firebase config query params.");
} else {
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || "New notification";
    const options = {
      body: payload.notification?.body || "",
      icon: "/android-chrome-192x192.png",
    };

    self.registration.showNotification(title, options);
  });
}
