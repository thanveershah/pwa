// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";

// const messaging = getMessaging();
// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/firebase-logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./firebase-messaging-sw.js")
//     .then(function (registration) {
//       console.log("Registration successful, scope is:", registration.scope);
//     })
//     .catch(function (err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// }

importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAO6HW2QE4ledhYkCSlz6uBJS83ODgf81E",
  authDomain: "pwa-web-66f70.firebaseapp.com",
  projectId: "pwa-web-66f70",
  storageBucket: "pwa-web-66f70.appspot.com",
  messagingSenderId: "784756455578",
  appId: "1:784756455578:web:31edc272675028be68c723",
  measurementId: "G-EENM3XBELB",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
