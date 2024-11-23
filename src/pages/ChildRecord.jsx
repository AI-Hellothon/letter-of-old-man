import PrevHeader from "../components/common/PrevHeader";
import { ButtonContainer } from "../components/Common.style";

import soundLargeImage from "../images/SpeechToText/sound-large.png";
import mikeImage from "../images/SpeechToText/mike.png";

import { COLOR } from "../constants/color";
import { STYLE } from "../constants/style";

import { useState } from "react";

const ChildRecord = () => {
  const [isRecording, setIsRecording] = useState(false);

  const text =
    "안녕하세요 반갑습니다\n저녁은 드셨나요?\n오늘 하루 어때셨나요?\n정말 잘하셨어요!\n뭐하고 계신가요?\n약 드셨습니까?\n제 생각에 나무는 산입니다\n노래가 정말 좋습니다\n창밖을 보세요 눈이 오네요 깔깔";

  return (
    <div>
      <PrevHeader text={"커스텀 음성"}></PrevHeader>
      <div style={{ padding: STYLE.padding }}>
        <div
          style={{
            borderRadius: STYLE.borderRadius,
            backgroundColor: "white",
            textAlign: "center",
            padding: 16,
          }}
        >
          <span
            style={{
              color: COLOR.questionFontColor,
              fontSize: 20,
              whiteSpace: "pre-wrap",
            }}
          >
            {text}
          </span>

          {/* 줄 */}
          <div
            style={{
              backgroundColor: "#eee",
              height: 1,
              width: "100%",
              margin: "12px 0",
            }}
          ></div>

          <div>
            <span style={{ color: COLOR.gray }}>
              아래 버튼을 누르고 소리내어
              <br /> 문장을 읽어보세요
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30, display:"flex", justifyContent:"center"}}>
        {isRecording ? (
          <ButtonContainer
            style={{
              backgroundColor: COLOR.primaryColor,
              width: 98,
              height: 98,
              zIndex: 10,
              position: "relative",
            }}
            onClick={(e) => {
              setIsRecording(false);
            }}
          >
            <span
              style={{
                position: "absolute",
                top: -30,
                color: COLOR.questionFontColor,
              }}
            >
              녹음 중...
            </span>
            <img src={soundLargeImage} alt="" />
          </ButtonContainer>
        ) : (
          <ButtonContainer
            style={{
              backgroundColor: COLOR.primaryColor,
              width: 98,
              height: 98,
              zIndex: 10,
            }}
            onClick={(e) => {
              setIsRecording(true);
            }}
          >
            <img src={mikeImage} alt="" />
          </ButtonContainer>
        )}
      </div>
    </div>
  );
};

export default ChildRecord;
