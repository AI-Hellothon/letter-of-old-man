import styled from "styled-components";
import { STLYE } from "../../constants/style";
import { COLOR } from "../../constants/color";

export const ContentsContainer = styled.div`
    background-color: white;
    padding: 14px;
    border-radius: ${STLYE.borderRadius}px;
    width: 100%;
`

export const Keyword = styled.span`
    background-color: white;
    border-radius: ${STLYE.borderRadius}px;
    font-size: 20px;
    border: 2px solid ${COLOR.primaryColor};
    padding: 14px 18px;
    color: ${COLOR.primaryColor};
`