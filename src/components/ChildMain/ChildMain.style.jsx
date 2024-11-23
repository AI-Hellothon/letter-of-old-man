import styled from "styled-components";
import { STYLE } from "../../constants/style";
import { COLOR } from "../../constants/color";

export const ContentsContainer = styled.div`
  background-color: white;
  padding: 14px;
  border-radius: ${STYLE.borderRadius}px;
  width: 100%;
  box-shadow: 5px 5px 12px -9px ${COLOR.questionFontColor};
`;

export const ContentsWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Keyword = styled.span`
  background-color: white;
  border-radius: ${STYLE.borderRadius}px;
  font-size: 20px;
  border: 2px solid ${COLOR.primaryColor};
  padding: 14px 18px;
  color: ${COLOR.primaryColor};
`;
