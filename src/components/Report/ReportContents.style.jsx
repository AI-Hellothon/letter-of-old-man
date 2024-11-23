import styled from "styled-components";

import { STYLE } from "../../constants/style";
import { COLOR } from "../../constants/color";

export const ReportContentsContainer = styled.div`
  background-color: white;
  border-radius: ${STYLE.borderRadius}px;
  padding: 18px;
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
