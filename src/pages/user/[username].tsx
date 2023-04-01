import { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import LeftLane from "../../components/LeftLane";
import User from "../../components/User";
import { useRouter } from "next/router";

export default function UserPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    let unique_id = router.query.username?.toString();
    setUsername(unique_id!);
  }, [router]);
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <User username={username} />
          {/* <ProfileRightSection /> */}
        </div>
      </div>
    </div>
  );
}
