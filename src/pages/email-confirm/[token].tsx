import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

import successAnimation from "../../animations/89776-success-tick.json";
import failedAnimation from "../../animations/94303-failed.json";

const EmailConfirmation = () => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
          console.log(val);
          if (val === "S") {
            setIsVerified(true);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [router]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="h-screen w-full bg-red-100">
      <div className="flex flex-col h-screen justify-center items-center">
        {isVerified ? (
          <>
            <div className="w-36 h-36">
              <Lottie loop={false} animationData={successAnimation} play />
            </div>
            <div>Your email has beed successfully verified!</div>
          </>
        ) : (
          <>
            <div className="w-36 h-36">
              <Lottie loop={false} animationData={failedAnimation} play />
            </div>
            <div>Your verification link has been expired!</div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmation;
