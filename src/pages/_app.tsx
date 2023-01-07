import { Source_Sans_Pro } from "@next/font/google";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Toaster, toast, useToasterStore } from "react-hot-toast";
import GoogleOneTapLogin from "react-google-one-tap-login";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import nookies from "nookies";
import { CookieSerializeOptions, serialize } from "cookie";
import { useRouter } from "next/router";

import "../styles/globals.css";

const ssp = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ssp-font",
});

const capitalizeEveryFirstLetter = (s: string): string => {
  const arr = s.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
};

const cookieOptions: CookieSerializeOptions = {
  maxAge: 10,
  httpOnly: false,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: true,
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isWindowInit, setIsWindowInit] = useState<boolean>(false);

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
    setCookie(null, "googleUser", stringValue, cookieOptions);
    router.push("/login");
  };

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
      {isWindowInit && !["signup", "login"].includes(router.asPath.slice(1)) && (
        <GoogleOneTapLogin
          onError={(error) => console.error(error)}
          onSuccess={(response) => {
            const user = {
              name: capitalizeEveryFirstLetter(response.name.toLowerCase()),
              email: response.email,
              picture: response.picture,
            };
            serializeAndSetCookie("googleUser", user, cookieOptions);
          }}
          googleAccountConfigs={{ client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string }}
        />
      )}
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      <Component {...pageProps} />
    </main>
  );
}
