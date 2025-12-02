import { useParams, useNavigate } from "react-router-dom";
import Icon_back from '../assets/icon_back.png';
import {
  DetailContainer, DetailHeader, BackBtn, Title,
  DetailContent, DetailTop, DetailDate
} from "./noticeDetail.styles";


// NoticeDetail.jsx
export default function NoticeDetail({ notices }) {
  const { id } = useParams();
  const navigate = useNavigate();

  

  // 더미 데이터
  const noticeList = notices || [
    { id: 1, title: "첫 번째 공지사항", date: "2025-12-02", content: "첫 번째 공지 내용입니다." },
    { id: 2, title: "두 번째 공지사항", date: "2025-12-01", content: "두 번째 공지 내용입니다." },
    { id: 3, title: "세 번째 공지사항", date: "2025-11-30", content: "세 번째 공지 내용입니다." },
  ];

  const notice = noticeList.find((n) => n.id === Number(id));

  if (!notice) return <div>존재하지 않는 공지입니다.</div>;

  return (
    <DetailContainer>
      <DetailHeader>
        <BackBtn onClick={() => navigate(-1)}>
          <img src= {Icon_back} alt="뒤로가기" />
        </BackBtn>
        <Title>공지사항</Title>
      </DetailHeader>
      <DetailContent>
        <DetailTop>
          <h2>{notice.title}</h2>
          <DetailDate>{notice.date}</DetailDate>
        </DetailTop>
        <p>{notice.content}</p>

        {notice.image && (
          <img
            src={notice.image}
            alt={notice.title}
            style={{ width: "100%", marginBottom: "20px", borderRadius: "8px" }}
          />
        )}
      </DetailContent>
    </DetailContainer>
  );
}