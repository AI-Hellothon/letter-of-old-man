const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, "0"); // 1~9일을 '01', '02'처럼 출력

  return `${year}-${month}-${day}`;
};

export default getCurrentDate;
