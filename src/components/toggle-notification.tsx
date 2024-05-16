"use client";

import { useEffect, useState } from "react";

import { BellOff, BellRing, Loader2 } from "lucide-react";

import {
  getCurrentPushSubscription,
  registerPushNotifications,
  unregisterPushNotifications,
} from "@/services/notification/push-service";

export function ToggleNotification() {
  const [hasActivePushSubscription, setHasActivePushSubscription] =
    useState<boolean>();

  const [loading, setLoading] = useState(false);

  const [confirmationMessage, setConfirmationMessage] = useState<string>();

  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription();
      setHasActivePushSubscription(!!subscription);
    }
    void getActivePushSubscription();
  }, []);

  async function setPushNotificationsEnabled(enabled: boolean) {
    if (loading) return;
    setLoading(true);
    setConfirmationMessage(undefined);

    try {
      if (enabled) {
        await registerPushNotifications();
      } else {
        await unregisterPushNotifications();
      }
      setConfirmationMessage(
        "Push notifications " + (enabled ? "enabled" : "disabled"),
      );
      setHasActivePushSubscription(enabled);
    } catch (error) {
      console.error(error);
      if (enabled && Notification.permission === "denied") {
        alert("Please enable push notifications in your browser settings");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (hasActivePushSubscription === undefined) return null;

  return (
    <div className="relative">
      {loading && (
        <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Loader2 />
        </span>
      )}
      {/* {confirmationMessage && (
        <DisappearingMessage className="absolute left-1/2 top-8 z-10 -translate-x-1/2 rounded-lg bg-white px-2 py-1 shadow-md dark:bg-black">
          {confirmationMessage}
        </DisappearingMessage>
      )} */}
      {hasActivePushSubscription ? (
        <span title="Disable push notifications on this device">
          <BellOff
            onClick={() => setPushNotificationsEnabled(false)}
            className={`cursor-pointer ${loading ? "opacity-10" : ""}`}
          />
        </span>
      ) : (
        <span title="Enable push notifications on this device">
          <BellRing
            onClick={() => setPushNotificationsEnabled(true)}
            className={`cursor-pointer ${loading ? "opacity-10" : ""}`}
          />
        </span>
      )}
    </div>
  );
}
