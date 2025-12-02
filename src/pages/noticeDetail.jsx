import { useParams, useNavigate } from "react-router-dom";
import Icon_back from '../assets/icon_back.png';

import noticeData from "../data/notice.json"; // JSON 불러오기
import {
  DetailContainer, DetailHeader, BackBtn, Title,
  DetailContent, DetailTop, DetailDate
} from "./noticeDetail.styles";

// NoticeDetail.jsx
export default function NoticeDetail() {
  const { id } = useParams();


  
  const navigate = useNavigate();

  // JSON 데이터에서 해당 id 찾기
  const notice = noticeData.find((n) => n.id === Number(id));

  if (!notice) return <div>존재하지 않는 공지입니다.</div>;

  return (
    <DetailContainer>
      <DetailHeader>
        <BackBtn onClick={() => navigate(-1)}>
          <img src={Icon_back} alt="뒤로가기" />
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