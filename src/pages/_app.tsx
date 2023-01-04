import { Source_Sans_Pro } from "@next/font/google";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster, toast, useToasterStore } from "react-hot-toast";

import "../styles/globals.css";

const ssp = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ssp-font",
});

export default function App({ Component, pageProps }: AppProps) {
  // https://github.com/timolins/react-hot-toast/issues/31#issuecomment-803359550
  const MAX_TOAST_LIMIT = 2;
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= MAX_TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);
  return (
    <main className={ssp.className}>
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      <Component {...pageProps} />
    </main>
  );
}
