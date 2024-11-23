import prevImage from "../../images/common/prev.png";
import { ButtonContainer } from "../Common.style";
import { COLOR } from "../../constants/color";

const PrevHeader = ({ text }) => {
  return (
    <div
      style={{
        padding: 15,
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}
    >
      <ButtonContainer>
        <img src={prevImage} alt="" />
      </ButtonContainer>
      <span style={{ color: COLOR.questionFontColor, fontSize: 24 }}>
        {text}
      </span>
    </div>
  );
};

export default PrevHeader;
