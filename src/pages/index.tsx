import firebaseApp from "@/utils/firebase/firebase";
import useFcmToken from "@/utils/hooks/useFormToken";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect, useRef, useState } from "react";

// import { getMessaging, onMessage } from "firebase/messaging";

// const messaging = getMessaging();

export default function Home() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const [showButton, setShowButton] = useState(true);
  const beforeInstallPrompt = useRef<null | any>(null);

  useEffect(() => {
    function eventHandler(event: null) {
      beforeInstallPrompt.current = event;
    }

    function errorHandler(event: string) {
      console.log("error: " + event);
    }

    // @ts-ignore
    window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);
  }, []);

  async function instalar() {
    if (beforeInstallPrompt.current) {
      await beforeInstallPrompt.current?.prompt();
      beforeInstallPrompt.current = null;
    }
  }

  useEffect(() => {
    // onMessage(messaging, (payload) => {
    //   console.log("Message received. ", payload);
    // });
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowButton(false);
    }
  }, []);

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }

  return (
    <>
      {showButton ? (
        <button
          onClick={instalar}
          className="bg-orange-600 p-4 rounded absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          Install PWA
        </button>
      ) : (
        <p className="p-4 rounded absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          PWA Installed Successfully
        </p>
      )}

      <button onClick={requestPermission}>
        Request Notification Permission
      </button>
    </>
  );
}
