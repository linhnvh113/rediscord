// @ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope & typeof globalThis} */ (
  globalThis
);

sw.addEventListener("push", (event) => {
  const message = event.data?.json();
  const { title, body, icon, data } = message;

  console.log("Received push message", message);

  async function handlePushEvent() {
    const windowClients = await sw.clients.matchAll({ type: "window" });

    if (windowClients.length > 0) {
      const appInForeground = windowClients.some((client) => client.focused);

      if (appInForeground) {
        console.log("App is in foreground, don't show notification");
        return;
      }
    }

    await sw.registration.showNotification(title, {
      body,
      icon,
      data,
    });
  }

  event.waitUntil(handlePushEvent());
});

sw.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  notification.close();

  async function handleNotificationClick() {
    const windowClients = await sw.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });

    const { serverId, channelId } = notification.data;

    if (windowClients.length > 0) {
      await windowClients[0].focus();
      // windowClients[0].postMessage({ channelId });
    } else {
      sw.clients.openWindow(`/servers/${serverId}/channels/${channelId}`);
    }
  }

  event.waitUntil(handleNotificationClick());
});
