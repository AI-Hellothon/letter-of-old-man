import PrevHeader from "../components/common/PrevHeader";
import ReportContents from "../components/Report/ReportContents";
import ContentsSecond from "../components/ChildMain/ContentsSecond";

import { STYLE } from "../constants/style";
import { ReportContentsWrapper } from "../components/Report/Report.style";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReport } from "../apis/api/report";
import getCurrentDate from "../utils/getCurrentDate";

const Report = () => {
  const navigate = useNavigate();

  const [reportData, setReportData] = useState([]); 
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const currentDate = getCurrentDate();
    const fetchReportData = async (date) => {
      try {
        const res = await getReport(date);
        const data = res.data;

        setReportData([
          { title: "일상 생활", contents: data.life.split("-") },
          { title: "건강 상태", contents: data.health.split("-") },
          { title: "식습관 및 영양", contents: data.food.split("-") },
          { title: "취미 및 여가활동", contents: data.hobby.split("-") },
          { title: "기타", contents: data.etc.split("-") },
        ]);
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchReportData(currentDate);
  }, []);

  return (
    <div>
      <PrevHeader text={"오늘 하루 요약"} />

      <div style={{ padding: STYLE.padding }}>
        {loading ? ( // 로딩 중일 때 로딩 화면 표시
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>Loading...</p>
          </div>
        ) : (
          <>
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
              title={"전체 대화"}
              contents={"자세히"}
              onClick={() => {
                navigate("/child/chat-log");
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Report;
