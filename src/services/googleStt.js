// Function to convert audio blob to base64 encoded string
export const audioBlobToBase64 = (blob) => {
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

export const startRecording = async () => {
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
              const chatResponse = await postChat(tts);
              // console.log(chatResponse.data?.choices[0]?.message?.content)

              setChatResult([
                ...chatResult,
                chatResponse.data?.choices[0]?.message?.content,
              ]);
            } catch (e) {
              setChatResult([...chatResult, "죄송하지만 다시 요청해주세요."]);
              throw new Error("엘리스 채팅 오류: ", e);
            } finally {
              setIsChatLoading(false);
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

export const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      // console.log('Recording stopped');
      setRecording(false);
    }
  };

export const ttsHandler = (text) => {
    const tts = new SpeechSynthesisUtterance(text);
    tts.rate = 2;
    tts.pitch = 0.5;
    window.speechSynthesis.speak(tts);
  };