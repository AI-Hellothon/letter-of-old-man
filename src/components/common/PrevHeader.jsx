import prevImage from "../../images/common/prev.png";
import { ButtonContainer } from "../Common.style";
import { COLOR } from "../../constants/color";
import { useNavigate } from "react-router-dom";

const PrevHeader = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: 15,
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}
    >
      <ButtonContainer onClick={(e)=>{
        navigate(-1);
      }}>
        <img src={prevImage} alt="" />
      </ButtonContainer>
      <span style={{ color: COLOR.questionFontColor, fontSize: 24 }}>
        {text}
      </span>
    </div>
  );
};

export default PrevHeader;
