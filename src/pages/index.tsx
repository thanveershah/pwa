import { useEffect, useRef } from "react";

export default function Home() {
  const beforeInstallPrompt = useRef(null);

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

  function instalar() {
    if (beforeInstallPrompt.current) {
      // @ts-ignore
      beforeInstallPrompt.current?.prompt();
      beforeInstallPrompt.current = null;
    }
  }

  return (
    <>
      <button
        onClick={instalar}
        className="bg-orange-600 p-20 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        PWA
      </button>
    </>
  );
}
