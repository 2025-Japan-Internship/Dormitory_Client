import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SuggestionWritePage.css';
import Icon_Back from '../assets/icon_back.png';
import Icon_Image from '../assets/icon_image.png';
import { supabase } from "../supabaseClient";

export default function SuggestionWritePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleRegister = async () => {
  // 로그인 사용자 정보 가져오기
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.log("사용자 정보 가져오기 실패", error);
    return;
  }
  if (!user) {
    console.log("로그인 필요");
    return;
  }

  // 프로필 정보 가져오기
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('name, roomNum')
    .eq('user_id', user.id)
    .single();

  if (profileError) {
    console.log("프로필 정보 가져오기 실패", profileError);
    return;
  }

  // suggestions 테이블에 등록
  const { data, error: insertError } = await supabase
    .from('suggestions')
    .insert([
      {
        user_id: user.id,
        user_name: profileData.name,
        roomNum: profileData.roomNum,
        content: content,
        created_at: new Date().toISOString(),
      }
    ]);

  if (insertError) {
    console.error("등록 실패:", insertError);
    return;
  }

  console.log("등록 성공:", data);
  navigate(-1); // 이전 페이지로
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
