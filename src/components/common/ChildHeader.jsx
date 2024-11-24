import { ButtonContainer } from "../Common.style";

import letterImage from "../../images/Header/letter.png";
import settingImage from "../../images/Header/setting.png";
import { useRecoilState } from "recoil";
import { isModalState } from "../../store/headerAtom";
import { STYLE } from "../../constants/style";

const ChildHeader = () => {
  const [isModal, setIsModal] = useRecoilState(isModalState);

  return (
    <div
      style={{
        padding: `20px ${STYLE.padding}px 15px 22px`,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <ButtonContainer>
        <img
          style={{ width: 50, height: 40 }}
          src={letterImage}
          alt="로고 이미지"
        />
      </ButtonContainer>
    </div>
  );
};

export default ChildHeader;
