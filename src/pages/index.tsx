import { useEffect, useRef, useState } from "react";

export default function Home() {
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
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowButton(false);
    }
  }, []);

  return (
    <>
      {showButton && (
        <button
          onClick={instalar}
          className="bg-orange-600 p-4 rounded absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          Install PWA
        </button>
      )}
    </>
  );
}
