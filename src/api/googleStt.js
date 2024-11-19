import { baseInstance } from "./util/instance";

const googleSpeechToText = async (base64Audio) => {
  const response = await baseInstance.post(
    `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
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
  return response
};

export default googleSpeechToText;
