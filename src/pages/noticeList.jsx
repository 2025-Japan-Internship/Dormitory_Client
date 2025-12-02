import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Icon_back from '../assets/icon_back.png';
export const Container = styled.div`
  width: 393px;
  height: 898px;
  background: #ffffff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background: #ffffff;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const BackBtn = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

export const NoticeItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
`;

export const NoticeTitle = styled.div`
  font-size: 15px;
  color: #333;
`;

export const NoticeDate = styled.p`
  font-size: 13px;
  color: #999;
  margin: 6px 0 0 0;
`;

// NoticeList 컴포넌트
export default function NoticeList({ notices }) {
  const navigate = useNavigate();

  // 더미 데이터
  const noticeList = notices || [
    { id: 1, title: "첫 번째 공지사항", date: "2025-12-02", content: "첫 번째 공지 내용입니다." },
    { id: 2, title: "두 번째 공지사항", date: "2025-12-01", content: "두 번째 공지 내용입니다." },
    { id: 3, title: "세 번째 공지사항", date: "2025-11-30", content: "세 번째 공지 내용입니다." },
  ];

  const handleClick = (id) => {
    navigate(`/notices/${id}`);
  };

  return (
    <Container>
      <Header>
        <BackBtn onClick={() => navigate(-1)}>
          <img src= {Icon_back} alt="뒤로가기" />
        </BackBtn>
        <Title>공지사항</Title>
      </Header>

      {noticeList.map((n) => (
        <NoticeItem key={n.id} onClick={() => handleClick(n.id)}>
          <NoticeTitle>{n.title}</NoticeTitle>
          <NoticeDate>{n.date}</NoticeDate>
        </NoticeItem>
      ))}
    </Container>
  );
}
