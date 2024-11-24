import styled from "styled-components";
import { STYLE } from "../../constants/style";
import { COLOR } from "../../constants/color";

export const ContentsContainer = styled.div`
  background-color: white;
  padding: 18px;
  border-radius: ${STYLE.borderRadius}px;
  width: 100%;
  box-shadow: 0px 4px 8.4px 2px ${COLOR.shadow};
`;

export const ContentsWrapper = styled.div`
  margin-left: 4px;
  display: flex;
  gap: 16px;
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
