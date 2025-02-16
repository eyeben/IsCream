/* eslint-env serviceworker */
/* global importScripts, firebase, self, console */
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCP8mGauQdH-F9Wb6_r6ZDH7CcANiOEmjE",
  authDomain: "ssafy-449307.firebaseapp.com",
  projectId: "ssafy-449307",
  storageBucket: "ssafy-449307.firebasestorage.app",
  messagingSenderId: "500251459785",
  appId: "1:500251459785:web:957c50a189ad224f450d18"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.notification.body,
      icon: "/firebase-logo.png",
      badge: "/firebase-logo.png"
    };
    event.waitUntil(
      self.registration.showNotification(data.notification.title, options)
    );
  }
});

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
