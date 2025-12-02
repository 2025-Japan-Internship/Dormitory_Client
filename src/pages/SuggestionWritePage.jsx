import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SuggestionWritePage.css';
import Icon_Back from '../assets/icon_back.png';
import Icon_Image from '../assets/icon_image.png';

export default function SuggestionWritePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleRegister = () => {
    console.log("등록 내용:", content);
    // TODO: Supabase 등록 API 연결
    navigate(-1);
  };

  return (
    <div className="suggestion-write-page">
      {/* 상단 헤더 */}
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Icon_Back} alt="뒤로가기" />
        </button>
        <h1>건의사항 작성</h1>
        <button className="register-btn" onClick={handleRegister}>
          등록
        </button>
      </div>

      <div className="divider"></div>

      {/* 작성 칸 */}
      <textarea
        className="suggestion-input"
        placeholder="건의사항을 작성하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="divider divider-bottom"></div>

      {/* 사진 첨부 + 키보드 영역 */}
      <div className="bottom-bar">
        <button className="photo-btn">
          <img src={Icon_Image} alt="사진 첨부" />
        </button>
      </div>
    </div>
  );
}
