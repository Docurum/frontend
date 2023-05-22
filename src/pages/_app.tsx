import { Source_Sans_Pro } from "@next/font/google";
import { CookieSerializeOptions } from "cookie";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { useEffect, useState } from "react";
import GoogleOneTapLogin from "react-google-one-tap-login";
import { Toaster, toast, useToasterStore } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";
import capsEveryFirstLetter from "../utils/capsEveryFirstLetter";
import cookieOptions from "../utils/cookieOptions";
import { AppState } from "../context/app-context";

export function isJWTValid() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenDecodablePart = token.split(".")[1];
      const decoded = JSON.parse(Buffer.from(tokenDecodablePart, "base64").toString());
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        return true;
      }
    }
  }
  return false;
}

const ssp = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ssp-font",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000, // 5 minutes
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isWindowInit, setIsWindowInit] = useState<boolean>(false);

  useEffect(() => {
    if (!isJWTValid()) {
      // if (typeof window !== "undefined" && router.pathname !== "/") {
      let val = localStorage.getItem("token");
      if (val !== null) {
        toast.error("Session expired! Please Login");
      }
      if (val === null) {
        toast.success("Please Login");
      }
      //   router.replace("/login");
      // }
    }
    if (isJWTValid()) {
      // router.replace("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useEffect(() => {
    if (window) {
      setIsWindowInit(true);
      // Destroy the cookie that states that the one tap google
      // is closed manually by user and will not be invoked again !
      destroyCookie(null, "g_state");
    }
  }, []);

  const serializeAndSetCookie = (name: string, value: unknown, options: CookieSerializeOptions = {}) => {
    const stringValue = typeof value === "object" ? JSON.stringify(value) : String(value);
    if (typeof options.maxAge === "number") {
      options.expires = new Date(Date.now() + options.maxAge * 1000);
    }
    setCookie(null, "googleUser", stringValue, options);
    router.push("/login");
  };

  // https://github.com/timolins/react-hot-toast/issues/31#issuecomment-803359550
  const MAX_TOAST_LIMIT = 1;
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= MAX_TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <main className={ssp.className}>
      {/* Don't show google one tap on signup and login page */}
      {isWindowInit && (
        // !["signup", "login", "email-confirm", "forgot-password", "reset-password", "start-topic"].includes(router.asPath.slice(1).split("/")[0])
        // &&
        <GoogleOneTapLogin
          onError={(error) => {
            console.error(error);
            router.push("/login");
          }}
          onSuccess={(response) => {
            const user = {
              name: capsEveryFirstLetter(response.name.toLowerCase()),
              email: response.email,
              picture: response.picture,
            };
            serializeAndSetCookie("googleUser", user, cookieOptions);
          }}
          googleAccountConfigs={{ client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string }}
        />
      )}
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
        <NextNProgress color="#2548f5" height={5} />
        <AppState>
          <Component {...pageProps} />
        </AppState>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </main>
  );
}
