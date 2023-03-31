import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClinicAppBar from "../../components/ClinicAppBar";

const ClinicPage = () => {
  const [clinicId, setClinicId] = useState("");
  const router = useRouter();
  useEffect(() => {
    let id = router.query.id?.toString() as string;
    setClinicId(id);
    console.log("Router :", router.query);
  }, [router]);

  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <ClinicAppBar clinicId={clinicId} />
        <div className="flex flex-row h-[90vh]"></div>
      </div>
    </div>
  );
};
export default ClinicPage;
