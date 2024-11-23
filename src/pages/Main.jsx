import { useRecoilState } from "recoil";
import SpeechToText from "../components/Main/SpeechToText";
import { isModalState } from "../store/headerAtom";
import Header from "../components/common/Header";

const Main = () => {
  return (
    <>
      <Header />
      <div style={{ width: "100%" }}>
        <SpeechToText></SpeechToText>
      </div>
    </>
  );
};

export default Main;
