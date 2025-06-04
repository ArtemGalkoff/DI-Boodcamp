self.addEventListener('push', event => {
  let data = {};

  if (event.data) {
    const text = event.data.text();
    try {
      data = JSON.parse(text);
    } catch {
      data = {
        title: 'Push Notification',
        body: text || 'No data',
      };
    }
  } else {
    data = {
      title: 'Push Notification',
      body: 'No data',
    };
  }

  const options = {
    body: data.body || 'No text',
    icon: '/icon.png',
    badge: '/badge.png',
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', options)
  );
});