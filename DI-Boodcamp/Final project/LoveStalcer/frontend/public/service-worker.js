self.addEventListener('push', event => {
  let data = {};

  if (event.data) {
    const text = event.data.text();
    try {
      data = JSON.parse(text);
    } catch {
      data = {
        title: 'Push Notification',
        body: text || 'Нет данных',
      };
    }
  } else {
    data = {
      title: 'Push Notification',
      body: 'Нет данных',
    };
  }

  const options = {
    body: data.body || 'Нет текста уведомления',
    icon: '/icon.png',
    badge: '/badge.png',
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Уведомление', options)
  );
});