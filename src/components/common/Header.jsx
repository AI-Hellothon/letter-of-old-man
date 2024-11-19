import { ButtonContainer } from "../Common.style";

import letterImage from "../../images/Header/letter.png";
import settingImage from "../../images/Header/setting.png";

const Header = () => {
  return (
    <div
      style={{
        padding: 15,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <ButtonContainer>
        <img
          style={{ width: 53, height: 43 }}
          src={letterImage}
          alt="로고 이미지"
        />
      </ButtonContainer>
      <ButtonContainer>
        <img
          style={{ width: 29, height: 32 }}
          src={settingImage}
          alt="설정 이미지"
        />
      </ButtonContainer>
    </div>
  );
};

export default Header;
