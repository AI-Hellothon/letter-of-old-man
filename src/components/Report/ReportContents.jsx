import { COLOR } from "../../constants/color";
import {
  ReportContentsContainer,
  ReportContentsText,
  ReportContentsTitle,
} from "./ReportContents.style";

const ReportContents = ({ title, contents }) => {
  return (
    <ReportContentsContainer>
      <div style={{ textAlign: "center", position: "relative" }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 9999,
            backgroundColor: COLOR.primaryColor,
            position: "absolute",
            top: 9,
          }}
        ></div>
        <ReportContentsTitle>{title}</ReportContentsTitle>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          paddingTop: 12
        }}
      >
        {contents.map((text, index) => {
          return <ReportContentsText key={index}>{text}</ReportContentsText>;
        })}
      </div>
    </ReportContentsContainer>
  );
};

export default ReportContents;
