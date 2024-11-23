import styled from "styled-components";
import { COLOR } from "../../constants/color";

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 412px;
  height: 100vh;
  position: absolute;
  backdrop-filter: blur(5px);
  z-index: 10;
`;

export const VoiceChoiceContainer = styled.div`
  width: 100%;
  border-radius: 25px;
  background-color: ${COLOR.white90};
  padding: 8px 16px;
  margin-top: 8px;
  box-shadow: 0px 4px 8.4px 2px ${COLOR.shadow};
`;

export const VoiceChoiceItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 14px;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 18px;
`;

export const Button = styled.button`
  border: none;
  padding: 16px;
  font-size: 24px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8.4px 2px ${COLOR.shadow};
  flex: 1;

  &:hover {
    cursor: pointer;
  }
`;
