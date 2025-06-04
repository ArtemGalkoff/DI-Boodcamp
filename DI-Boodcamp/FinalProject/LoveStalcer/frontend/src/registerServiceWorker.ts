const VAPID_PUBLIC_KEY = 'BBHcAJ4ppCksSopUh_osOXQ_nAUW4uklMaIoZY_a1koPZ1UszEz7olv3aZwMwNkEY4Vncg6ZtfwqjStZHPu1z6Q';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function registerServiceWorker() {
  const rawUserId = localStorage.getItem('userId');
  const userId = rawUserId ? Number(rawUserId) : null;

  if (!userId) {
    return;
  }

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');

        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
          });

          await fetch('/api/push/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, subscription }),
          });
        }
      } catch (error) {
        console.log('error')
      }
    });
  }
}