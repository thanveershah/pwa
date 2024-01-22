import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "../firebase/firebase";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
          alert(permission);
          // Check if permission is granted before retrieving the token
          //   if (permission === "granted") {
          //   }
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BN6LatOOuE5GzfqN9Rng0OUnC_DHmZ3ExELm5MzI3NdTx12Z0E3KB9TArQHTB-mGrTtDoNxQVre267U9xqyJ8Is",
          });
          alert(currentToken);

          if (currentToken) {
            setToken(currentToken);
          } else {
            alert(
              "No registration token available. Request permission to generate one."
            );
          }
        }
      } catch (error) {
        console.log("An error occurred while retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
