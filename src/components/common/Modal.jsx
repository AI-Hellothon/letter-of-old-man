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
import { isModalState, speakerIndexState } from "../../store/headerAtom";
import { ButtonContainer } from "../Common.style";
import { useState } from "react";
import { STYLE } from "../../constants/style";

const Modal = () => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const [speakerIndex, setSpeakerIndex] = useRecoilState(speakerIndexState);

  const voices = [
    { text: "내 자녀 음성", voice: null },
    { text: "일반 여성 음성", voice: null },
    { text: "일반 남성 음성", voice: null },
    { text: "일반 아이 음성", voice: null },
  ];

  return (
    <ModalContainer>
      {/* 모달 헤더 */}
      <div
        style={{
          backgroundColor: `${COLOR.backgroundColor}F9`,
          padding: `15px ${STYLE.padding}px`,
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
          <img style={{width: 25, height: 25}} src={closeImage} alt="" />
        </ButtonContainer>
      </div>

      <div style={{ padding: "0px 30px", marginTop: 44 }}>
        {/* 음성 선택 */}
        <VoiceChoiceContainer>
          {voices.map((item, index) => {
            return (
              <VoiceChoiceItem key={index}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 0px",
                  }}
                >
                  <img
                    src={soundImage}
                    alt=""
                    style={{
                      backgroundColor: "#FFAC52",
                      borderRadius: 10,
                      padding: 6,
                    }}
                  />
                  <span
                    style={{
                      color: COLOR.questionFontColor,
                      whiteSpace: "nowrap",
                      fontSize: 20,
                    }}
                  >
                    {item.text}
                  </span>
                </div>
                {index == speakerIndex ? (
                  <ButtonContainer>
                    <img src={checkOnImage} alt="" />
                  </ButtonContainer>
                ) : (
                  <ButtonContainer
                    onClick={(e) => {
                      setSpeakerIndex(index);
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
            style={{
              backgroundColor: COLOR.white90,
              color: COLOR.questionFontColor,
              border: `0.2px solid ${COLOR.border}`,
            }}
            onClick={(e) => {
              setIsModal(false);
            }}
          >
            취소
          </Button>
          <Button
            style={{ backgroundColor: COLOR.primaryColor, color: "white" }}
            onClick={(e) => {
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
