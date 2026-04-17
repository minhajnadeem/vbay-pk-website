"use client";

import { useEffect, useState } from "react";
import type { MessagePayload } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { initializePushNotifications } from "@/utils/firebase.browser";

export function ClientProviders() {
  const [showEnableNotifications, setShowEnableNotifications] = useState(false);
  const [isEnablingNotifications, setIsEnablingNotifications] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const onForegroundMessage = (payload: MessagePayload) => {
    const title = payload.notification?.title ?? "New notification";
    const body = payload.notification?.body;
    const image = payload.notification?.image;
    const link = payload.fcmOptions?.link ?? payload.data?.link ?? payload.data?.url;

    if (!body) {
      return;
    }

    toast.custom(
      (t) => (
        <div
          className={`w-[min(92vw,360px)] rounded-xl border border-black/10 bg-white p-3 shadow-lg transition ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0 rounded-full bg-black/5 p-2 text-sm">🔔</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{title}</p>
              <p className="mt-1 text-xs text-muted">{body}</p>
            </div>
          </div>

          {image && (
            <img
              src={image}
              alt={title}
              className="mt-3 h-28 w-full rounded-lg object-cover"
            />
          )}

          {link && (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  window.location.href = link;
                  toast.dismiss(t.id);
                }}
                className="rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-800"
              >
                Open
              </button>
            </div>
          )}
        </div>
      ),
      { duration: 5000 },
    );
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    if (Notification.permission === "granted") {
      initializePushNotifications(onForegroundMessage, { requestPermission: false })
        .then((result) => {
          if (result.status === "misconfigured") {
            console.warn("Push notifications: add NEXT_PUBLIC_FIREBASE_VAPID_KEY to enable FCM.");
            return;
          }
          if (result.status === "token_error") {
            console.warn("Push notifications: could not obtain FCM token.", result.error);
            return;
          }
          if (result.status !== "granted") {
            console.warn("Push notifications init status:", result.status);
          }
        })
        .catch((error) => {
          console.warn("Push notifications could not be initialized:", error);
        });
      return;
    }

    if (Notification.permission === "default" && !dismissed) {
      setShowEnableNotifications(true);
    }
  }, [dismissed]);

  const handleEnableNotifications = async () => {
    setIsEnablingNotifications(true);
    try {
      const result = await initializePushNotifications(onForegroundMessage, {
        requestPermission: true,
      });

      if (result.status === "granted") {
        toast.success("Notifications enabled");
        setShowEnableNotifications(false);
        if (process.env.NODE_ENV === "development") {
          console.info("FCM token:", result.fcmToken);
        }
        return;
      }

      if (result.status === "misconfigured") {
        toast.error("Push is not configured (missing web push key).");
        return;
      }

      if (result.status === "token_error") {
        toast.error("Could not register for push notifications");
        return;
      }

      if (result.status === "permission_denied") {
        toast.error("Notification permission is blocked in browser settings");
      } else if (result.status === "unsupported") {
        toast.error("Push notifications are not supported in this browser");
      } else {
        toast("Please allow notification permission to enable alerts", { icon: "🔔" });
      }
    } catch (error) {
      console.warn("Push notifications could not be initialized:", error);
      toast.error("Unable to enable notifications");
    } finally {
      setIsEnablingNotifications(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2800 }} />
      {showEnableNotifications && (
        <div className="fixed right-3 top-[7.25rem] z-40 sm:right-6 sm:top-[6.75rem]">
          <div className="max-w-xs rounded-xl border border-black/10 bg-white/95 p-3 shadow-lg backdrop-blur">
            <p className="text-xs text-foreground">
              Turn on notifications for new products and deals.
            </p>
            <div className="mt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setDismissed(true);
                  setShowEnableNotifications(false);
                }}
                className="rounded-md px-2 py-1 text-xs text-muted transition hover:bg-black/5 hover:text-foreground"
                aria-label="Dismiss notification prompt"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={handleEnableNotifications}
                disabled={isEnablingNotifications}
                className="rounded-md bg-black px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isEnablingNotifications ? "Enabling..." : "Enable"}
              </button>
            </div>
          </div>
        </div>
      )}
      <CartDrawer />
    </>
  );
}
