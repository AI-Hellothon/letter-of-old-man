import { COLOR } from "../../constants/color";
import {
  Button,
  ModalButtonWrapper,
  ModalContainer,
  VoiceChoiceContainer,
  VoiceChoiceItem,
} from "./Modal.style";

import closeImage from "../../images/common/close.png";
import soundImage from "../../images/SpeechToText/sound.png";
import checkOnImage from "../../images/common/check-on.png";
import checkOffImage from "../../images/common/check-off.png";

import { useRecoilState } from "recoil";
import { isModalState } from "../../store/headerAtom";
import { ButtonContainer } from "../Common.style";
import { useState } from "react";

const Modal = () => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const [nowVoiceIndex, setNowVoiceIndex] = useState(1);

  const voices = [
    { text: "내 자녀 음성", voice: null },
    { text: "일반 남성 음성", voice: null },
    { text: "일반 여성 음성", voice: null },
    { text: "일반 아이 음성", voice: null },
  ];

  return (
    <ModalContainer>
      {/* 모달 헤더 */}
      <div
        style={{
          backgroundColor: COLOR.backgroundColor,
          padding: "72px 26px 42px 26px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ color: COLOR.questionFontColor, fontSize: "32px" }}>
          음성 설정
        </span>
        <ButtonContainer
          onClick={(e) => {
            setIsModal(false);
          }}
          style={{ color: COLOR.questionFontColor, alignItems: "center" }}
        >
          <img src={closeImage} alt="" />
        </ButtonContainer>
      </div>

      <div style={{ padding: "0px 26px" }}>
        {/* 음성 선택 */}
        <VoiceChoiceContainer>
          {voices.map((item, index) => {
            return (
              <VoiceChoiceItem>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={soundImage}
                    alt=""
                    style={{
                      backgroundColor: "#FFAC52",
                      padding: 6,
                      borderRadius: 10,
                    }}
                  />
                  <span
                    style={{
                      color: COLOR.questionFontColor,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
                {index == nowVoiceIndex ? (
                  <ButtonContainer>
                    <img src={checkOnImage} alt="" />
                  </ButtonContainer>
                ) : (
                  <ButtonContainer
                    onClick={(e) => {
                      setNowVoiceIndex(index);
                    }}
                  >
                    <img src={checkOffImage} alt="" />
                  </ButtonContainer>
                )}
              </VoiceChoiceItem>
            );
          })}
        </VoiceChoiceContainer>

        {/* button */}
        <ModalButtonWrapper>
          <Button
            style={{ backgroundColor: "white", color: COLOR.questionFontColor }}
            onClick={(e)=>{
                setIsModal(false);
            }}
          >
            취소
          </Button>
          <Button
            style={{ backgroundColor: COLOR.primaryColor, color: "white" }}
            onClick={(e)=>{
                setIsModal(false);
            }}
          >
            확인
          </Button>
        </ModalButtonWrapper>
      </div>
    </ModalContainer>
  );
};

export default Modal;
