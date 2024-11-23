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

const ChatLog = () => {
  const firstQuestion = `안녕하세요.\n무엇을 도와드릴까요?`;

  const chatData = [
    {
      index: 0,
      question:
        "안녕, 나는 오늘 오전에 현미밥과 나물 몇가지를 먹었어. 아주 맛있었다.",
      answer:
        "아, 그러시군요. 현미밥과 나물은 건강에 좋습니다. 밥을 먹고 나서는 어떤 활동을 하셨나요?",
    },
    {
      index: 1,
      question:
        "안녕, 나는 오늘 오전에 현미밥과 나물 몇가지를 먹었어. 아주 맛있었다.",
      answer:
        "아, 그러시군요. 현미밥과 나물은 건강에 좋습니다. 밥을 먹고 나서는 어떤 활동을 하셨나요?",
    },
    {
      index: 2,
      question:
        "안녕, 나는 오늘 오전에 현미밥과 나물 몇가지를 먹었어. 아주 맛있었다.",
      answer:
        "아, 그러시군요. 현미밥과 나물은 건강에 좋습니다. 밥을 먹고 나서는 어떤 활동을 하셨나요?",
    },
  ];

  return (
    <div>
      <PrevHeader text={"전체 대화"} />

      <div style={{ padding: STYLE.padding }}>
        <div
          style={{
            height: `calc(100vh - 200px)`,
            overflow: "auto"
          }}
        >
          {/* 첫 질문 */}
          <ChatAnswerContainer>
            <ChatAnswer style={{ whiteSpace: "pre-wrap" }}>
              {firstQuestion}
            </ChatAnswer>
          </ChatAnswerContainer>

          {/* 채팅 로그 */}
          {chatData.map((chat, index) => {
            const temp = chatData.find((item) => item.index == index);
            return (
              <div key={temp.index}>
                {/* 채팅 질문 */}
                <ChatQuestionContainer>
                  <ChatQuestion>{temp.question}</ChatQuestion>
                </ChatQuestionContainer>

                {/* 채팅 답변 */}
                <ChatAnswerContainer>
                  <ChatAnswer>{temp.answer}</ChatAnswer>
                </ChatAnswerContainer>
              </div>
            );
          })}
        </div>

        <ContentsSecond
          style={{ marginTop: 16 }}
          title={"오늘의 하루 자세히 보기"}
          contents={"자세히"}
        />
      </div>
    </div>
  );
};

export default ChatLog;
