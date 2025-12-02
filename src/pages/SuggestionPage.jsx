import React, { useEffect, useState } from 'react';
import SuggestionCard from './SuggestionCard';
import './SuggestionPage.css';
import { useNavigate } from "react-router-dom";
import Icon_edit from '../assets/icon_edit.png';
import Icon_back from '../assets/icon_back.png';
import { supabase } from "../supabaseClient";

// 작성 시간 표시 함수
export function getTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000); // 초

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function SuggestionPage() {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('/logo192.png'); // 기본 이미지

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // 프로필 이미지 가져오기
        const avatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
        if (avatar) setAvatarUrl(avatar);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchSuggestions = async () => {
      const { data, error } = await supabase
        .from('suggestions')
        .select('id, content, created_at, user_name, roomNum')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) console.error("불러오기 실패:", error);
      else setSuggestions(data);
    };
    fetchSuggestions();
  }, [userId]);

  const handleDelete = async (id) => {
    const { error } = await supabase.from('suggestions').delete().eq('id', id);
    if (error) return alert("삭제 실패");
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="suggestion-page">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={Icon_back} alt="뒤로가기" />
        </button>
        <h1>건의사항</h1>
        <button className="edit-btn" onClick={() => navigate("/suggestion/write")}>
          <img src={Icon_edit} alt="작성" />
        </button>
      </div>

      <div className="suggestion-list">
        {suggestions.length === 0 && <p>작성한 건의사항이 없습니다.</p>}
        {suggestions.map(s => (
          <SuggestionCard
            key={s.id}
            profile={avatarUrl} // auth에서 가져온 사진
            name={`${s.roomNum}호 ${s.user_name}`}
            timeAgo={getTimeAgo(s.created_at)}
            content={s.content}
            onDelete={() => handleDelete(s.id)}
          />
        ))}
      </div>
    </div>
  );
}
