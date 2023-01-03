import { NextPage } from "next";
import LogoWithText from "../components/Logo/LogoWithText";
import SEO from "../components/SEO";

const Home: NextPage = () => {
  return (
    <>
      <SEO />
      <LogoWithText />
      <h1 className="text-xl">Dennis Mitchell</h1>
    </>
  );
};

export default Home;
