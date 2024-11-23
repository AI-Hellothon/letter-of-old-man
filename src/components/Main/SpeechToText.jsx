import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

import postChat from "../../apis/eliceChat";

import {
  ChatAnswer,
  ChatAnswerContainer,
  ChatQuestion,
  ChatQuestionContainer,
} from "./SpeechToText.style";

import { ButtonContainer } from "../Common.style";
import { COLOR } from "../../constants/color";

import soundImage from "../../images/SpeechToText/sound.png";
import logoWhiteImage from "../../images/SpeechToText/logo-white.png";
import textImage from "../../images/SpeechToText/text.png";
import soundLargeImage from "../../images/SpeechToText/sound-large.png";
import closeImage from "../../images/common/close.png";
import textWhiteImage from "../../images/SpeechToText/text-white.png";

import { FONT } from "../../constants/font";
import googleSpeechToText from "../../apis/googleStt";
import { saveChat } from "../../apis/api/chat";

// Function to convert audio blob to base64 encoded string
const audioBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      const base64Audio = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      resolve(base64Audio);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
};

const SpeechToText = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [transcription, setTranscription] = useState([]);
  const [chatResult, setChatResult] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [chatText, setChatText] = useState("");

  const messageEndRef = useRef(null);

  const firstQuestion = `안녕하세요.\n무엇을 도와드릴까요?`;

  // Cleanup function to stop recording and release media resources
  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaRecorder]);

  // 채팅 스크롤 맨 아래로 내리는 로직
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatResult, transcription]);

  const requestEliceChat = async (text) => {
    try {
      const chatResponse = await postChat(text);
      // console.log(chatResponse.data?.choices[0]?.message?.content)

      return chatResponse.data?.choices[0]?.message?.content;
    } catch (e) {
      return "죄송하지만 다시 요청해주세요.";
      throw new Error("엘리스 채팅 오류: ", e);
    }
  };

  const requestEliceChatResultHandler = (chat) => {
    setChatResult([...chatResult, chat]);
    setIsChatLoading(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.start();
      // console.log('Recording started');

      // Event listener to handle data availability
      recorder.addEventListener("dataavailable", async (event) => {
        // console.log('Data available event triggered');
        const audioBlob = event.data;

        const base64Audio = await audioBlobToBase64(audioBlob);
        //console.log('Base64 audio:', base64Audio);

        try {
          const startTime = performance.now();

          const response = await googleSpeechToText(base64Audio);

          const endTime = performance.now();
          const elapsedTime = endTime - startTime;

          //console.log('API response:', response);
          // console.log("Time taken (ms):", elapsedTime);

          if (response.data.results && response.data.results.length > 0) {
            const tts = response.data.results[0].alternatives[0].transcript;
            // console.log(tts);
            setTranscription([...transcription, tts]);
            setIsChatLoading(true);

            try {
              const chatResponse = await requestEliceChat(tts);

              requestEliceChatResultHandler(chatResponse);

              const res = await saveChat({
                question: tts,
                answer: chatResponse,
              });
            } catch (error) {
              requestEliceChatResultHandler(`tts save chat Error: ${error}`);
            }
          } else {
            console.log(
              "No transcription results in the API response:",
              response.data
            );
            setTranscription([
              ...transcription,
              "녹음이 실패했습니다.\n다시 시도해주세요.",
            ]);
          }
        } catch (error) {
          console.error("Error with Google Speech-to-Text API:", error);
        }
      });

      setRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error getting user media:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      // console.log('Recording stopped');
      setRecording(false);
    }
  };

  const ttsHandler = (text) => {
    const tts = new SpeechSynthesisUtterance(text);
    tts.rate = 2;
    tts.pitch = 0.5;
    window.speechSynthesis.speak(tts);
  };

  const mode4 = (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "calc(100vh - 73px)",
      }}
    >
      {/* 채팅 영역 */}
      <div style={{ overflow: "auto" }}>
        {/* 처음 질문 */}
        <ChatAnswerContainer>
          <ChatAnswer style={{ whiteSpace: "pre-wrap" }}>
            {firstQuestion}
          </ChatAnswer>
          <ButtonContainer
            style={{
              backgroundColor: COLOR.answerColor,
              padding: 10,
            }}
            onClick={(e) => {
              ttsHandler(firstQuestion);
            }}
          >
            <img src={soundImage} alt="음성 재생 이미지" />
          </ButtonContainer>
        </ChatAnswerContainer>

        {transcription.map((item, index) => {
          return (
            <div key={index}>
              {/* 채팅 질문 */}
              <ChatQuestionContainer>
                <ChatQuestion>{transcription[index]}</ChatQuestion>
              </ChatQuestionContainer>

              {/* 채팅 답변 */}
              <ChatAnswerContainer>
                {/* 채팅 답변이 오지 않을때 빈 채팅을 보여주지 않기 위한 로직 */}
                {index < chatResult.length && (
                  <>
                    <ChatAnswer>{chatResult[index]}</ChatAnswer>
                    <ButtonContainer
                      style={{
                        backgroundColor: COLOR.answerColor,
                        padding: 10,
                      }}
                      onClick={(e) => {
                        ttsHandler(chatResult[index]);
                      }}
                    >
                      <img src={soundImage} alt="음성 재생 이미지" />
                    </ButtonContainer>
                  </>
                )}
              </ChatAnswerContainer>
            </div>
          );
        })}
        {/* 채팅 기다리는 중 로직 */}
        {isChatLoading && (
          <ChatAnswerContainer>
            <ChatAnswer>답변을 기다리는 중입니다.</ChatAnswer>
          </ChatAnswerContainer>
        )}

        <div ref={messageEndRef}></div>
      </div>

      {/* 음성 받는 영역 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "18% 0",
          overflow: "hidden",
        }}
      >
        {recording ? (
          // 음성 받는 상태
          <>
            {/* 사운드 버튼 */}
            <ButtonContainer
              style={{
                backgroundColor: COLOR.primaryColor,
                width: 130,
                height: 130,
                zIndex: 10,
                position: "relative",
              }}
              onClick={(e) => {
                stopRecording();
              }}
            >
              <img
                style={{ width: 74, height: 74 }}
                src={soundLargeImage}
                alt="음성 입력 버튼"
              />

              {/* ~가 듣고 있는 중 텍스트 */}
              <span
                style={{
                  position: "absolute",
                  whiteSpace: "nowrap",
                  bottom: -25,
                  color: COLOR.questionFontColor,
                  backgroundColor: "white",
                  borderRadius: 25,
                  fontWeight: 700,
                  fontSize: FONT.defaultSize,
                  padding: 10,
                }}
              >{`00가 듣고 있는 중이에요`}</span>
            </ButtonContainer>

            {/* 버튼 감싸고 있는 원 */}
            <div
              style={{
                backgroundColor: COLOR.primaryColor15,
                width: 330,
                height: 330,
                borderRadius: "50%",
                position: "absolute",
              }}
            ></div>
            <div
              style={{
                backgroundColor: COLOR.primaryColor15,
                width: 198,
                height: 198,
                borderRadius: "50%",
                position: "absolute",
              }}
            ></div>
          </>
        ) : // 채팅 클릭시
        isChat ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <div
              style={{
                backgroundColor: COLOR.primaryColor,
                width: 130,
                height: 130,
                zIndex: 10,
                borderRadius: "50%",
                position: "absolute",
              }}
            ></div>
            <div
              style={{
                padding: 18,
                width: "100%",
                zIndex: 20,
                backgroundColor: "white",
                borderRadius: 28,
                display: "flex",
                gap: 18,
              }}
            >
              <ButtonContainer
                onClick={(e) => {
                  setIsChat(false);
                }}
              >
                <img src={closeImage} alt="" />
              </ButtonContainer>
              <input
                style={{
                  border: "none",
                  fontSize: 20,
                  width: "70%",
                }}
                type="text"
                onChange={(e) => {
                  setChatText(e.target.value);
                  // console.log(chatText);
                }}
                value={chatText}
              />
              <ButtonContainer
                style={{
                  backgroundColor: COLOR.primaryColor,
                  width: 51,
                  height: 51,
                }}
                onClick={async (e) => {
                  setTranscription([...transcription, chatText]);
                  setIsChatLoading(true);

                  const chatResponse = await requestEliceChat(chatText);

                  requestEliceChatResultHandler(chatResponse);
                  try {
                    const res = await saveChat({
                      question: chatText,
                      answer: chatResponse,
                    });
                    setChatText("");
                  } catch (error) {
                    throw new Error(`채팅 인풋 Error: ${error}`);
                  }
                }}
              >
                <img src={textWhiteImage} alt="" />
              </ButtonContainer>
            </div>

            {/* 주변원 */}
            <div
              style={{
                backgroundColor: COLOR.primaryColor15,
                width: 330,
                height: 330,
                borderRadius: "50%",
                position: "absolute",
              }}
            ></div>
            <div
              style={{
                backgroundColor: COLOR.primaryColor15,
                width: 198,
                height: 198,
                borderRadius: "50%",
                position: "absolute",
              }}
            ></div>
          </div>
        ) : (
          // 음성 받지 않는 상태
          <ButtonContainer
            style={{
              backgroundColor: COLOR.primaryColor,
              width: 130,
              height: 130,
            }}
            onClick={(e) => {
              startRecording();
            }}
          >
            <img
              style={{ width: 81, height: 63 }}
              src={logoWhiteImage}
              alt="음성 입력 버튼"
            />
          </ButtonContainer>
        )}
        {/* text 입력 받는 버튼 */}
        {!recording && !isChat && (
          <ButtonContainer
            style={{
              backgroundColor: "white",
              width: 72,
              height: 72,
              position: "absolute",
              right: "6%",
            }}
            onClick={(e) => {
              setIsChat(true);
            }}
          >
            <img src={textImage} alt="텍스트 입력 버튼" />
          </ButtonContainer>
        )}
      </div>
    </div>
  );

  return mode4;
};
export default SpeechToText;
