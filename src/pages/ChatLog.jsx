import { useEffect, useState } from "react";
import ContentsSecond from "../components/ChildMain/ContentsSecond";
import { ButtonContainer } from "../components/Common.style";
import PrevHeader from "../components/common/PrevHeader";
import {
  ChatAnswer,
  ChatAnswerContainer,
  ChatQuestion,
  ChatQuestionContainer,
} from "../components/Main/SpeechToText.style";
import { COLOR } from "../constants/color";
import { STYLE } from "../constants/style";
import getCurrentDate from "../utils/getCurrentDate";
import { getChat } from "../apis/api/chat";

const ChatLog = () => {
  const firstQuestion = `안녕하세요.\n무엇을 도와드릴까요?`;

  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // 채팅 데이터 불러오기
  useEffect(() => {
    const currentDate = getCurrentDate();

    const fetchChatLog = async (date) => {
      try {
        const res = await getChat(date);
        setChatData(res.data);
      } catch (error) {
        console.error("Failed to fetch chat data", error);
      } finally {
        setLoading(false); // 로딩 완료 상태
      }
    };

    fetchChatLog(currentDate);
  }, []);

  if (loading) {
    // 로딩 중일 때 보여줄 UI
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PrevHeader text={"전체 대화"} />

      <div style={{ padding: `10px ${STYLE.padding}px` }}>
        <div
          style={{
            height: `calc(100vh - 100px)`,
            overflow: "auto",
          }}
        >
          {/* 첫 질문 */}
          <ChatAnswerContainer>
            <ChatAnswer style={{ whiteSpace: "pre-wrap" }}>
              {firstQuestion}
            </ChatAnswer>
          </ChatAnswerContainer>

          {/* 채팅 로그 */}
          {chatData.map((chat, index) => (
            <div key={index}>
              {/* 채팅 질문 */}
              <ChatQuestionContainer>
                <ChatQuestion>{chat.question}</ChatQuestion>
              </ChatQuestionContainer>

              {/* 채팅 답변 */}
              <ChatAnswerContainer>
                <ChatAnswer>{chat.answer}</ChatAnswer>
              </ChatAnswerContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatLog;
