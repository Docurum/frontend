import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import successAnimation from "../../animations/89776-success-tick.json";
import failedAnimation from "../../animations/94303-failed.json";
import SEO from "../../components/SEO";

const EmailConfirmation = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    if (router.isReady) {
      const token = router.query.token as string;
      const confirmEmail = async (token: string) => {
        const prms = new Promise((resolve, reject) => {
          setTimeout(() => {
            if (token === "abc") {
              resolve("S");
            } else {
              reject("F");
            }
          }, 3000);
        });
        return prms;
      };
      confirmEmail(token)
        .then((val) => {
          if (val === "S") {
            setMessage("Your email has been successfully verified!");
            setIsVerified(true);
          }
        })
        .catch((e) => {
          setMessage("Your verification link has been expired!");
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [router]);

  const style = {
    backgroundImage: "radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )",
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full" style={style}>
        <SEO title="Email Confirmation - Docurum" />
        <div className="flex flex-col h-screen justify-center items-center">
          <div className="w-56 h-56 p-10">
            <div className="w-full h-full animate-pulse bg-gray-300 rounded-full"></div>
          </div>
          <div className=" w-full h-8 px-[15%]">
            <div className="h-full w-full animate-pulse bg-gray-300 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full" style={style}>
      <SEO title="Email Confirmation - Docurum" />
      <div className="flex flex-col h-screen justify-center items-center text-center">
        <div className="w-48 sm:w-56 h-18 sm:h-56">
          {isVerified ? (
            <>
              <Lottie loop={false} animationData={successAnimation} play />
            </>
          ) : (
            <>
              <Lottie loop={false} animationData={failedAnimation} play />
            </>
          )}
        </div>
        <div className="text-white text-2xl sm:text-3xl px-6 font-semibold">{message}</div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
