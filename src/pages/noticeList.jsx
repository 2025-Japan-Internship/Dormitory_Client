import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Icon_back from '../assets/icon_back.png';
import noticeData from "../data/notice.json"; // JSON 불러오기

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

export default function NoticeList() {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([]);

  const sortedNotices = [...noticeData].sort(
    (a, b) => new Date(b.date) - new Date(a.date) // 최신 순
  );

  useEffect(() => {
    // JSON 데이터 불러오기
    setNoticeList(noticeData);
  }, []);

  const handleClick = (id) => {
    // 클릭 시 상세페이지로 이동
    navigate(`/notices/${id}`);
  };

  return (
    <Container>
      <Header>
        <BackBtn onClick={() => navigate(-1)}>
          <img src={Icon_back} alt="뒤로가기" />
        </BackBtn>
        <Title>공지사항</Title>
      </Header>

      {sortedNotices.map((n) => (
        <NoticeItem key={n.id} onClick={() => handleClick(n.id)}>
          <NoticeTitle>{n.title}</NoticeTitle>
          <NoticeDate>{n.date}</NoticeDate>
        </NoticeItem>
      ))}
    </Container>
  );
}
