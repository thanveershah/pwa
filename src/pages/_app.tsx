import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getMessaging, getToken } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";

// const firebaseConfig = {
//   apiKey: "AIzaSyAO6HW2QE4ledhYkCSlz6uBJS83ODgf81E",
//   authDomain: "pwa-web-66f70.firebaseapp.com",
//   projectId: "pwa-web-66f70",
//   storageBucket: "pwa-web-66f70.appspot.com",
//   messagingSenderId: "784756455578",
//   appId: "1:784756455578:web:31edc272675028be68c723",
//   measurementId: "G-EENM3XBELB",
// };

export default function App({ Component, pageProps }: AppProps) {
  const handleDeepLinking = () => {
    const currentUrl = window.location.href;

    if (currentUrl.includes("yourpwacustomscheme")) {
      const route = currentUrl.replace("yourpwacustomscheme://", "");
      window.location.href = `/${route}`;
    }
  };

  useEffect(() => {
    // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    // const messaging = getMessaging(app);
    // getToken(messaging, {
    //   vapidKey:
    //     "BN6LatOOuE5GzfqN9Rng0OUnC_DHmZ3ExELm5MzI3NdTx12Z0E3KB9TArQHTB-mGrTtDoNxQVre267U9xqyJ8Is",
    // })
    //   .then((currentToken) => {
    //     if (currentToken) {
    //       console.log("Token Exist");
    //     } else {
    //       console.log(
    //         "No registration token available. Request permission to generate one."
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("An error occurred while retrieving token. ", err);
    //   });

    handleDeepLinking();
  }, []);

  return <Component {...pageProps} />;
}
