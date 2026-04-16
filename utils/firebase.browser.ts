import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getMessaging,
  isSupported,
  onMessage,
  type MessagePayload,
} from "firebase/messaging";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app =
  getApps().length === 0 ? initializeApp(clientCredentials) : getApp();
const db = getFirestore(app);

async function registerMessagingServiceWorker() {
  return navigator.serviceWorker.register("/firebase-messaging-sw.js");
}

export async function initializePushNotifications(
  onForegroundMessage?: (payload: MessagePayload) => void,
  options?: { requestPermission?: boolean },
) {
  if (typeof window === "undefined") {
    return { status: "unsupported" as const };
  }
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    return { status: "unsupported" as const };
  }
  if (!(await isSupported())) {
    return { status: "unsupported" as const };
  }

  const requestPermission = options?.requestPermission ?? true;
  const permission =
    Notification.permission === "granted"
      ? "granted"
      : requestPermission
        ? await Notification.requestPermission()
        : Notification.permission;
  if (permission !== "granted") {
    return {
      status: permission === "denied" ? ("permission_denied" as const) : ("permission_default" as const),
    };
  }

  await registerMessagingServiceWorker();
  const messaging = getMessaging(app);

  if (onForegroundMessage) {
    onMessage(messaging, onForegroundMessage);
  }

  return { status: "granted" as const };
}

export {
  app,
  db,
};