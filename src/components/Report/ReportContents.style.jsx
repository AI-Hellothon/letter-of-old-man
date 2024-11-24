import styled from "styled-components";

import { STYLE } from "../../constants/style";
import { COLOR } from "../../constants/color";

export const ReportContentsContainer = styled.div`
  background-color: ${COLOR.white90};
  border-radius: ${STYLE.borderRadius}px;
  padding: 18px;
  box-shadow: 0px 4px 8.4px 2px ${COLOR.shadow};
  border: 0.2px solid ${COLOR.border};
`;

export const ReportContentsTitle = styled.div`
  color: ${COLOR.questionFontColor};
  font-size: 20px;
  border-bottom: 1px solid #eaeef3;
  padding-bottom: 12px;
`;

export const ReportContentsText = styled.span`
  color: ${COLOR.gray};
  font-size: 17px;
  text-align: center;
`;
