import AppBar from "../../components/AppBar";
import LeftLane from "../../components/LeftLane";
import RightLane from "../../components/RightLane";

export default function TermsAndConditions() {
  return (
    <div className="flex flex-col max-h-[100vh] h-[100vh] max-w-[100vw] w-[100vw] overflow-y-hidden justify-center items-center">
      <div className="flex flex-col h-screen max-w-[1920px] w-[100vw]">
        <AppBar />
        <div className="flex flex-row h-[90vh]">
          <LeftLane />
          <TermsAndConditionsComponent />
          <RightLane />
        </div>
      </div>
    </div>
  );
}

const TermsAndConditionsComponent = () => {
  return (
    <div className="flex custom-scrollbar p-4 scrollbar flex-col items-start overflow-y-scroll scrollbar mt-2 w-full lg:w-1/2 h-[90vh]">
      <div className="content-container">
        <p className="content-head">Terms &amp; Conditions</p>
        <div className="content-seprater"></div>
        <p className="updated-date">Last updated on Apr 15th 2023</p>
        <p className="content-text">
          The Website Owner, including subsidiaries and affiliates (“Website” or “Website Owner” or “we” or “us” or “our”) provides the information contained on the website or any of the pages
          comprising the website (“website”) to visitors (“visitors”) (cumulatively referred to as “you” or “your” hereinafter) subject to the terms and conditions set out in these website terms and
          conditions, the privacy policy and any other relevant terms and conditions, policies and notices which may be applicable to a specific section or module of the website.
        </p>
        <p className="content-text">
          {`Welcome to our website. If you continue to browse and use this website you
          are agreeing to comply with and be bound by the following terms and
          conditions of use, which together with our privacy policy govern
          Arnab Bhattacharya''s relationship with you in
          relation to this website.`}
        </p>
        <p className="content-text">
          {`The term 'Arnab Bhattacharya' or 'us' or 'we' refers
        to the owner of the website whose registered/operational office is
        Subhaspally  nearShakti mandir club
        Kharagpur
        WEST BENGAL
        721301. The term 'you' refers to the user or viewer of our website.`}
        </p>
        <p className="content-text">
          <strong>The use of this website is subject to the following terms of use:</strong>
        </p>
        <ul className="unorder-list">
          <li className="list-item">
            <p className="content-text list-text">The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>
          </li>
          <li className="list-item">
            <p className="content-text list-text">
              Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or
              offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such
              inaccuracies or errors to the fullest extent permitted by law.
            </p>
          </li>
          <li className="list-item">
            <p className="content-text list-text">
              Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products,
              services or information available through this website meet your specific requirements.
            </p>
          </li>
          <li className="list-item">
            <p className="content-text list-text">
              This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is
              prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
            </p>
          </li>
          <li className="list-item">
            <p className="content-text list-text">All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.</p>
          </li>
          <li className="list-item">
            <p className="content-text list-text">Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</p>
          </li>
          <li className="list-item">
            <p className="content-text list-text">
              From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information.
            </p>
          </li>
          <li className="list-item">
            <p className="content-text list-text">You may not create a link to this website from another website or document without Arnab Bhattacharya’s prior written consent.</p>
          </li>
          <li className="list-item">
            <p className="content-text list-text">Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.</p>
          </li>
        </ul>
        <p className="content-text">
          We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of
          the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time
        </p>
      </div>
    </div>
  );
};
