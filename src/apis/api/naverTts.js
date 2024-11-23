import { baseInstance, ngrokInstance } from "../util/instance";

export const getNaverStt = async (index, text) => {
//   console.log("naver", index);
  const speaker = ["", "nara_call", "jinho", "nhajun"];

  try {
    const response = await ngrokInstance.get(
      `/naver?speaker=${speaker[index]}&text=${text}`,
      {
        responseType: "arraybuffer", // 음성 파일이 바이너리 데이터이므로 arraybuffer로 응답을 받습니다.
      }
    );

    // 음성 데이터를 Blob으로 변환
    const audioBlob = new Blob([response.data], { type: "audio/mp3" });

    // Blob을 URL로 변환하여 오디오 객체 생성
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    // 음성 파일 재생
    audio.play();

    return audio;
  } catch (error) {
    console.error("Error fetching TTS:", error);
  }
};
