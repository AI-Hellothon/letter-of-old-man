import axios from "axios";
import React, { useState, useEffect } from "react";

import postChat from "../../api/eliceChat";

import { ChatAnswer, ChatQuestion } from "./SpeechToText.style";

import { ButtonContainer } from "../Common.style";
import { COLOR } from "../../constants/color";

import soundImage from "../../images/SpeechToText/sound.png";
import logoWhiteImage from "../../images/SpeechToText/logo-white.png";
import textImage from "../../images/SpeechToText/text.png";
import soundLargeImage from "../../images/SpeechToText/sound-large.png";
import { FONT } from "../../constants/font";

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
  const [transcription, setTranscription] = useState("");
  const [chatResult, setChatResult] = useState("");

  // Cleanup function to stop recording and release media resources
  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaRecorder]);

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

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

          const response = await axios.post(
            `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
            {
              config: {
                encoding: "WEBM_OPUS",
                sampleRateHertz: 48000,
                languageCode: "ko-KR",
              },
              audio: {
                content: base64Audio,
              },
            }
          );

          const endTime = performance.now();
          const elapsedTime = endTime - startTime;

          //console.log('API response:', response);
          // console.log("Time taken (ms):", elapsedTime);

          if (response.data.results && response.data.results.length > 0) {
            const tts = response.data.results[0].alternatives[0].transcript;
            setTranscription(tts);

            const chatResponse = await postChat(tts);

            setChatResult(chatResponse.data?.choices[0]?.message?.content);
          } else {
            console.log(
              "No transcription results in the API response:",
              response.data
            );
            setTranscription("No transcription available");
          }
        } catch (error) {
          console.error(
            "Error with Google Speech-to-Text API:",
            error.response.data
          );
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 22px",
            gap: 12,
          }}
        >
          <ChatAnswer>안녕</ChatAnswer>
          <ButtonContainer
            style={{
              backgroundColor: COLOR.answerColor,
              padding: 10,
            }}
          >
            <img src={soundImage} alt="음성 재생 이미지" />
          </ButtonContainer>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px 22px 10px 22px",
            boxShadow: 1,
          }}
        >
          <ChatQuestion>그래 안녕</ChatQuestion>
        </div>
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
                  padding: 10
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
        {!recording && (
          <ButtonContainer
            style={{
              backgroundColor: "white",
              width: 72,
              height: 72,
              position: "absolute",
              right: "6%",
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
