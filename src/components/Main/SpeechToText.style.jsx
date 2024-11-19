import styled, { css } from "styled-components";
import { COLOR } from "../../constants/color";

const commonStyle = css`
  border-radius: 25px;
  max-width: 317px;
  padding: 20px;
  font-weight: 700;
  font-size: 22px;
  position: relative;
`;

export const ChatAnswer = styled.div`
  ${commonStyle}
  background-color: ${COLOR.answerColor};
  color: white;

  &::after {
    content: "";
    position: absolute;
    top: 15px; /* 꼬리 위치 */
    left: -13px; /* 왼쪽 배치 */
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 20px solid ${COLOR.answerColor}; /* 꼬리 색상 */
  }
`;

export const ChatQuestion = styled.div`
  ${commonStyle}
  background-color: white;
  color: ${COLOR.questionFontColor};

  &::after {
    content: "";
    position: absolute;
    top: 15px; /* 꼬리 위치 */
    right: -13px; /* 왼쪽 배치 */
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 20px solid white; /* 꼬리 색상 */
  }
`;
