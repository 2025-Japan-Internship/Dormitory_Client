import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router 사용 시
import './SuggestionWritePage.css';

function SuggestionWritePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleRegister = () => {
    // 여기에 Supabase 연동 코드 넣기
    console.log("등록 내용:", content);
    navigate(-1); // 등록 후 이전 페이지로 이동
  };

  return (
    <div className="suggestion-write-page">
      {/* 상단 헤더 */}
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src="/icon_back.png" alt="뒤로가기" />
        </button>
        <h1>건의사항 작성</h1>
        <button className="register-btn" onClick={handleRegister}>
          등록
        </button>
      </div>

      {/* 헤더 밑 회색 한 줄 */}
      <div className="divider"></div>

      {/* 작성 칸 */}
      <textarea
        className="suggestion-input"
        placeholder="건의사항을 작성하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* 화면의 5분의 2 지점 회색 줄 */}
      <div className="divider divider-bottom"></div>

      {/* 사진 첨부 + 키보드 영역 */}
      <div className="bottom-bar">
        <button className="photo-btn">
          <img src="/icon_image.png" alt="사진 첨부" />
        </button>
        {/* 나중에 필요하면 키보드 관련 컴포넌트 */}
      </div>
    </div>
  );
}

export default SuggestionWritePage;
