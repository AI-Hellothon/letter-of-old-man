import { baseInstance } from "./util/instance";

const eliceTts = async (audioFile, text) => {
  // FormData 객체 생성
  const formData = new FormData();

  // audioFile은 실제 파일 객체여야 함
  formData.append("audio", audioFile);
  formData.append("text", text);

  //   console.log(audioFile, text);

  // 요청 보내기
  const response = await baseInstance.post(
    "https://api-cloud-function.elice.io/fb0764c6-4aff-4e22-b93f-e51552fefde0/generate",
    formData,
    {
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_ELICE_API_KEY}`,
        "content-type": "multipart/form-data", // Content-Type을 FormData로 설정
      },
      // 이것이 몹시 히트,,
      responseType: "arraybuffer",
    }
  );

  return response;
};

export default eliceTts;
