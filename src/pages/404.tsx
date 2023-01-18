import Link from "next/link";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import winter404 from "../animations/85792-404-winter-snow-globe.json";
import summer404 from "../animations/96983-404-error.json";
import SEO from "../components/SEO";

const FourOhFour = () => {
  const [theme, setTheme] = useState<any>(summer404);
  useEffect(() => {
    // Winter theme for Dec, Jan and Feb
    if ([11, 0, 1].includes(new Date().getMonth())) {
      setTheme(winter404);
    }
  }, []);

  return (
    <div
      className="w-screen h-screen flex flex-col md:flex-row items-center justify-center gap-x-20 select-none overflow-hidden"
      style={{ backgroundImage: "radial-gradient( circle 588px at 31.7% 40.2%,  rgba(225,200,239,1) 21.4%, rgba(163,225,233,1) 57.1% )" }}
    >
      <SEO title="Page Not Found - Docurum" />
      <div className="w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
        <Lottie animationData={theme} play />
      </div>
      <div className="flex flex-col text-center gap-y-4 items-center justify-center">
        <div className="title-font md:mb-4 font-bold text-center flex flex-col justify-center items-center">
          <h1 className="text-8xl text-blue-600 pb-4">404</h1>
          <h1 className="text-3xl text-black tracking-wider">Page Not Found</h1>
        </div>
        <p className="px-10 md:px-0 md:mb-4 leading-relaxed text-gray-800 text-lg">...maybe the page you&apos;re looking for is not found or never existed.</p>
        <Link href="/home" type="button" className="text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 text-lg rounded-md font-medium">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default FourOhFour;
