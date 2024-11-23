import PrevHeader from "../components/common/PrevHeader";
import ReportContents from "../components/Report/ReportContents";
import ContentsSecond from "../components/ChildMain/ContentsSecond";

import { STYLE } from "../constants/style";
import { ReportContentsWrapper } from "../components/Report/Report.style";

const Report = () => {
  const reportData = [
    { title: "일상생활", contents: ["내용1", "내용2", "내용3"] },
    { title: "일상생활", contents: ["내용1", "내용2"] },
    { title: "일상생활", contents: ["내용1"] },
    { title: "일상생활", contents: ["내용1", "내용2", "내용3"] },
    { title: "일상생활", contents: ["내용1", "내용2", "내용3"] },
  ];
  return (
    <div>
      <PrevHeader text={"오늘 하루 요약"} />

      <div style={{ padding: STYLE.padding }}>
        <ReportContentsWrapper>
          {reportData.map((item, index) => {
            return (
              <ReportContents
                title={item.title}
                contents={item.contents}
                key={index}
              />
            );
          })}
        </ReportContentsWrapper>

        <ContentsSecond
          style={{ marginTop: 16 }}
          title={"오늘의 하루 자세히 보기"}
          contents={"자세히"}
        />
      </div>
    </div>
  );
};

export default Report;
