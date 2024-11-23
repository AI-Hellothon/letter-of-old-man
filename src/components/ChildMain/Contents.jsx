import { COLOR } from "../../constants/color";
import { ContentsContainer } from "./ChildMain.style";

const Contents = ({ style, image, title, contents }) => {
  return (
    <div style={style}>
      <ContentsContainer>
        <div style={{ display: "flex", gap: 12 }}>
          <img src={image} alt="" />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: COLOR.questionFontColor,
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {title}
            </span>
            <span style={{ color: COLOR.gray, fontSize: 15 }}>{contents}</span>
          </div>
        </div>
      </ContentsContainer>
    </div>
  );
};

export default Contents;
