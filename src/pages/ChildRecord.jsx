import PrevHeader from "../components/common/PrevHeader";
import { ButtonContainer } from "../components/Common.style";

import soundLargeImage from "../images/SpeechToText/sound-large.png";
import mikeImage from "../images/SpeechToText/mike.png";

import { COLOR } from "../constants/color";
import { STYLE } from "../constants/style";

import { useState, useEffect, useRef } from "react";
import { postRecord } from "../apis/api/record";

const ChildRecord = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(""); // 녹음된 파일의 URL 저장
  const mediaRecorderRef = useRef(null); // MediaRecorder 객체를 참조하기 위한 ref
  const audioChunksRef = useRef([]); // 녹음된 데이터 청크를 저장

  const text =
    "안녕하세요 반갑습니다\n저녁은 드셨나요?\n오늘 하루 어때셨나요?\n정말 잘하셨어요!\n뭐하고 계신가요?\n약 드셨습니까?\n제 생각에 나무는 산입니다\n노래가 정말 좋습니다\n창밖을 보세요 눈이 오네요 깔깔";

    useEffect(() => {
      // 녹음 시작
      if (isRecording) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = []; // 기존 청크 초기화
    
            mediaRecorder.ondataavailable = (event) => {
              // 녹음된 데이터 청크 저장
              if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
              }
            };
    
            mediaRecorder.onstop = async () => {
              // 녹음이 중지된 후 청크를 Blob으로 변환
              const audioBlob = new Blob(audioChunksRef.current, {
                type: "audio/wav",
              });
    
              // Blob을 URL로 변환하여 재생할 수 있도록 함
              const audioURL = URL.createObjectURL(audioBlob);
              setAudioURL(audioURL);
    
              // Blob -> Base64 변환
              const reader = new FileReader();
              reader.readAsDataURL(audioBlob);
              reader.onloadend = async () => {
                const base64Audio = reader.result.split(",")[1]; // Base64 데이터만 추출
                const fileName = `도연`;
    
                try {
                  // 서버에 Base64 데이터를 전송
                  const response = await postRecord(base64Audio, fileName);
                  console.log("Server Response:", response);
                } catch (error) {
                  console.error("Error posting audio to server:", error);
                }
              };
            };
    
            mediaRecorder.start(); // 녹음 시작
          })
          .catch((error) => {
            console.error("Error accessing microphone:", error);
          });
      } else {
        // 녹음 중지
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          mediaRecorderRef.current = null;
        }
      }
    }, [isRecording]);

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
            boxShadow: `0px 4px 8.4px 2px ${COLOR.shadow}`
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

      <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
        {isRecording ? (
          <ButtonContainer
            style={{
              backgroundColor: COLOR.primaryColor,
              width: 98,
              height: 98,
              zIndex: 10,
              position: "relative",
            }}
            onClick={() => {
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
            onClick={() => {
              setIsRecording(true);
            }}
          >
            <img src={mikeImage} alt="" />
          </ButtonContainer>
        )}
      </div>

      {/* 녹음된 오디오 재생 */}
      {/* {audioURL && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <audio controls src={audioURL}></audio>
        </div>
      )} */}
    </div>
  );
};

export default ChildRecord;
