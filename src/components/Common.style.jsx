import styled from "styled-components";
import { COLOR } from "../constants/color";

export const ButtonContainer = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export const ShadowButtonContainer = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8.4px 2px ${COLOR.shadow};

  &:hover {
    cursor: pointer;
  }
`;
