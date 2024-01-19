import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const handleDeepLinking = () => {
    const currentUrl = window.location.href;

    if (currentUrl.includes("yourpwacustomscheme")) {
      const route = currentUrl.replace("yourpwacustomscheme://", "");
      window.location.href = `/${route}`;
    }
  };

  useEffect(() => {
    handleDeepLinking();
  }, []);

  return <Component {...pageProps} />;
}
