import { baseInstance } from "./util/instance";
import { v4 as uuidv4 } from "uuid";

const postChat = async (messages) => {
  let sessId;
  if (sessionStorage.getItem("sessId")) {
    sessId = sessionStorage.getItem("sessId");
  } else {
    sessId = uuidv4();
    sessionStorage.setItem("sessId", sessId);
  }
  // console.log(sessId);
  const response = await baseInstance.post(
    `https://api-cloud-function.elice.io/5a327f26-cc55-45c5-92b7-e909c2df0ba4/v1/chat/completions`,
    {
      messages: [
        {
          role: "user",
          content: `${messages} 그리고 조건이 있어. 첫 째, 마크다운형식으로 보내지 말아줘. 둘 째, 출처를 적지 말아줘`,
        },
      ],
      sess_id: sessId,
      model: "helpy-pro",
    },
    {
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_ELICE_API_KEY}`,
      },
    }
  );
  return response;
};

export default postChat;
