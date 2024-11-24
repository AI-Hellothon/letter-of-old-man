import { STYLE } from "../constants/style";
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
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import ChildHeader from "../components/common/ChildHeader";

const ChildMain = () => {
  const keywordText = ["#등산", "#맛집", "#통증"];

  const navigate = useNavigate();

  return (
    <>
      <ChildHeader />
      <div style={{ padding: `0px ${STYLE.padding}px` }}>
        {/* 이미지 부분 */}
        <div
          style={{
            backgroundImage: `url(${picaChuImage})`,
            backgroundSize: "cover",
            width: "232px",
            height: "268px",
            margin: "auto",
            borderRadius: STYLE.borderRadius,
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
            title={"커스텀 음성"}
            contents={"부모님을 위해 녹음하기"}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              console.log("hi")
              navigate("/child/record");
            }}
          ></Contents>

          <ContentsSecond
            title={"오늘의 하루 요약"}
            contents={"자세히"}
            onClick={(e) => {
              navigate("/child/report");
            }}
          ></ContentsSecond>
        </div>
      </div>
    </>
  );
};

export default ChildMain;
