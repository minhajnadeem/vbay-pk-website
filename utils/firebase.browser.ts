import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getMessaging,
  getToken,
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

export type PushNotificationsInitResult =
  | { status: "granted"; fcmToken: string }
  | { status: "unsupported" }
  | { status: "permission_denied" }
  | { status: "permission_default" }
  | { status: "misconfigured"; reason: "missing_vapid_key" }
  | { status: "token_error"; error: unknown };

export async function initializePushNotifications(
  onForegroundMessage?: (payload: MessagePayload) => void,
  options?: { requestPermission?: boolean },
): Promise<PushNotificationsInitResult> {
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
      status: permission === "denied" ? "permission_denied" : "permission_default",
    };
  }

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  if (!vapidKey) {
    console.error(
      "FCM: set NEXT_PUBLIC_FIREBASE_VAPID_KEY (Firebase Console → Project settings → Cloud Messaging → Web push certificates).",
    );
    return { status: "misconfigured", reason: "missing_vapid_key" };
  }

  const serviceWorkerRegistration = await registerMessagingServiceWorker();
  const messaging = getMessaging(app);

  let fcmToken: string;
  try {
    fcmToken = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration,
    });
  } catch (error) {
    console.error("FCM getToken failed:", error);
    return { status: "token_error", error };
  }

  if (!fcmToken) {
    return { status: "token_error", error: new Error("Empty FCM token") };
  }

  if (onForegroundMessage) {
    onMessage(messaging, onForegroundMessage);
  }

  if (process.env.NODE_ENV === "development") {
    console.info("FCM device token (paste into Firebase Console → Send test message):", fcmToken);
  }

  return { status: "granted", fcmToken };
}

export {
  app,
  db,
};