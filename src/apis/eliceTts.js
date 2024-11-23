import { baseInstance } from "./util/instance";

const eliceTts = async (audio, text) => {
  const response = await baseInstance.post(
    "https://api-cloud-function.elice.io/fb0764c6-4aff-4e22-b93f-e51552fefde0/generate",
    { audio: audio, text: text },
    {
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_ELICE_API_KEY}`,
        "content-type": "multipart/form-data"
      },
    }
  );

  return response;
};

export default eliceTts;
