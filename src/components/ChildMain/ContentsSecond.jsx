import { COLOR } from "../../constants/color";
import { ContentsContainer, ContentsWrapper } from "./ChildMain.style";

import detailImage from "../../images/ChildMain/detail.png"
import linkImage from "../../images/ChildMain/link.png";

const ContentsSecond = ({ style, title, contents, onClick }) => {
  return (
    <ContentsContainer
      style={{
        ...style,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}

      onClick={onClick}
    >
      <ContentsWrapper>
        <img style={{ width: 38, height: 38 }} src={detailImage} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: COLOR.questionFontColor,
              fontSize: 18,
            }}
          >
            {title}
          </span>
          <span style={{ color: COLOR.gray, fontSize: 15 }}>{contents}</span>
        </div>
      </ContentsWrapper>

      <img style={{ width: 25, height: 23, marginRight: 18 }} src={linkImage} alt="" />
    </ContentsContainer>
  );
};

export default ContentsSecond;
