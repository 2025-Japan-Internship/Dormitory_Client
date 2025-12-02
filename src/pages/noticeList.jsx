import { useNavigate } from "react-router-dom";
import Icon_back from '../assets/icon_back.png';
import {
  Container, Header, BackBtn, Title, ScrollArea, ListBox, NoticeItem,
  ItemRow, NoticeTitle, NoticeDate, NewDot, BottomNav, NavBar, ConfirmButton, EditButton
} from "./noticeList.styles";


// NoticeList 컴포넌트
export default function NoticeList({ notices }) {
  const navigate = useNavigate();

  const noticeList = notices || [
    { id: 1, title: "첫 번째 공지사항", date: "2025-12-02", content: "첫 번째 공지 내용입니다.", isNew: true },
    { id: 2, title: "두 번째 공지사항", date: "2025-12-01", content: "두 번째 공지 내용입니다.", isNew: false },
    { id: 3, title: "세 번째 공지사항", date: "2025-11-30", content: "세 번째 공지 내용입니다.", isNew: false },
  ];

  const handleClick = (id) => {
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

      <ScrollArea>
        <ListBox>
          {noticeList.map((n, idx) => (
            <NoticeItem key={n.id} onClick={() => handleClick(n.id)} isLast={idx === noticeList.length - 1}>
              <ItemRow>
                <NoticeTitle>{n.title}</NoticeTitle>
              </ItemRow>
              <NoticeDate>{n.date}</NoticeDate>
            </NoticeItem>
          ))}
        </ListBox>
      </ScrollArea>

      <BottomNav>
        <NavBar />
        <ConfirmButton>✓</ConfirmButton>
        <EditButton>✎</EditButton>
      </BottomNav>
    </Container>
  );
}
