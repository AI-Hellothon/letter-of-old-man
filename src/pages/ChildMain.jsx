import { STLYE } from "../constants/style";
import { COLOR } from "../constants/color";

import picaChuImage from "../images/ChildMain/picachu.png";
import nowImage from "../images/ChildMain/now.png";
import keywordImage from "../images/ChildMain/keyword.png";
import detailImage from "../images/ChildMain/detail.png";
import linkImage from "../images/ChildMain/link.png";

import settingWhiteImage from "../images/common/settingWhite.png";

import { ButtonContainer } from "../components/Common.style";
import Contents from "../components/ChildMain/Contents";
import { Keyword } from "../components/ChildMain/ChildMain.style";
import ContentsSecond from "../components/ChildMain/ContentsSecond";

const ChildMain = () => {
  const keywordText = ["#등산", "#맛집", "#통증"];

  return (
    <div style={{ padding: `0px ${STLYE.padding}px` }}>
      {/* 이미지 부분 */}
      <div
        style={{
          backgroundImage: `url(${picaChuImage})`,
          backgroundSize: "cover",
          width: "232px",
          height: "268px",
          margin: "auto",
          borderRadius: STLYE.borderRadius,
          position: "relative",
        }}
      >
        <ButtonContainer
          style={{
            width: 57,
            height: 57,
            backgroundColor: COLOR.primaryColor,
            position: "absolute",
            right: -8,
            bottom: -2,
          }}
        >
          <img src={settingWhiteImage} alt="" />
        </ButtonContainer>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Contents
          style={{ marginTop: 24 }}
          image={nowImage}
          title={"2024.12.24"}
          contents={"최근 접속 날짜"}
        ></Contents>

        <Contents
          image={keywordImage}
          title={"주요 키워드"}
          contents={"3개로 간추려 보았어요"}
        ></Contents>

        {/* 키워드 */}
        <div style={{ display: "flex", gap: 12 }}>
          {keywordText.map((item, index) => {
            return <Keyword key={index}>{item}</Keyword>;
          })}
        </div>

        <ContentsSecond
          image={detailImage}
          title={"오늘의 하루 자세히 보기"}
          contents={"자세히"}
        ></ContentsSecond>
      </div>
    </div>
  );
};

export default ChildMain;
