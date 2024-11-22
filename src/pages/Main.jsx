import { useRecoilState } from "recoil";
import SpeechToText from "../components/Main/SpeechToText";
import { isModalState } from "../store/headerAtom";

const Main = () => {
  return (
    <div style={{ width: "100%" }}>
      <SpeechToText></SpeechToText>
    </div>
  );
};

export default Main;
