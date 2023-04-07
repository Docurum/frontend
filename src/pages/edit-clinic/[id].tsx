import React, { useEffect, useState } from "react";
import MobileEditClinic from "../../components/MobileEditClinic";
import {
  GetClinicByIdQuery,
  GetClinicsQuery,
  IClinicType,
  getClinicById,
} from "../../api/clinic";
import { useRouter } from "next/router";
import AppBar from "../../components/AppBar";
import BottomNavBar from "../../components/BottomNavBar";

function MobileEditClinicPage() {
  const clinics = GetClinicsQuery();
  const [clinicId, setClinicId] = useState("");
  const router = useRouter();
  const getclinic = GetClinicByIdQuery(clinicId);

  useEffect(() => {
    let id = router.query.id?.toString() as string;
    if (id) {
      setClinicId(id);
      const data = getClinicById(id);
      console.log(data);
    }
    console.log("Router :", router.query);
    console.log("Clinic :", getclinic);
  }, [router.query]);

  useEffect(() => {
    getclinic.refetch();
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicId]);
  if(getclinic.isLoading){
    return <div>Loading...</div>
  }
  if(getclinic.isSuccess){
  return (
    <div>
      <AppBar/>
      <MobileEditClinic data={getclinic.data} />
      <BottomNavBar/>
    </div>
  );
  }
  
}

export default MobileEditClinicPage;
