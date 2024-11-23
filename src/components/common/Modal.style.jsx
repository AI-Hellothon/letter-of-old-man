import styled from "styled-components";

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
  background-color: white;
  padding: 16px;
  margin-top: 8px;
`;

export const VoiceChoiceItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 0px;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

export const ModalButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-top: 16px;
`

export const Button = styled.button`
  border: none;
  padding: 16px;
  font-size: 24px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex:1;

  &:hover {
    cursor: pointer;
  }
`