// JSON 파일 import
import noticeData from './notice.json';

// 시간 계산 함수
export const getTimeAgo = (dateString) => {
  const now = new Date();
  const noticeTime = new Date(dateString.replace(/\./g, "-")); // 2025.11.12 -> 2025-11-12
  const diffMs = now - noticeTime;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) return `${diffDay}일전`;
  if (diffHour > 0) return `${diffHour}시간전`;
  if (diffMin > 0) return `${diffMin}분전`;
  return "방금전";
};

// Home 카드용으로 변환
export const sliderCards = noticeData.map((n, idx) => ({
  type: idx === 0 ? "main" : "sub",
  time: getTimeAgo(n.date),
  userName: "관리자", // 실제 사용자 정보 필요하면 로그인 유저 이름 넣기
  title: n.title,
  active: idx === 0,
}));
