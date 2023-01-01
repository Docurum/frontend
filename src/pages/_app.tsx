import { Source_Sans_Pro } from "@next/font/google";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const ssp = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ssp-font",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={ssp.className}>
      <Component {...pageProps} />
    </main>
  );
}
