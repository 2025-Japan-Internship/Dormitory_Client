import React from 'react';
import SuggestionCard from './SuggestionCard';
import './SuggestionPage.css';
import { useNavigate } from "react-router-dom";

import Icon_edit from '../assets/icon_edit.png';
import Icon_back from '../assets/icon_back.png';

const dummySuggestions = [
  {
    id: 1,
    profile: '/logo192.png',
    name: '444호 김미림',
    timeAgo: '5분전',
    content: '사감쌤 그럼 휴관기간에는 지방생들도 잔류 못하나요?',
  },
  {
    id: 2,
    profile: '/logo192.png',
    name: '444호 김미림',
    timeAgo: '10분전',
    content: '선생님 지금 모르는 친구가 저희 호실로 들어왔는데 와주실 수 있나요?ㅠㅜ',
  },
  {
    id: 3,
    profile: '/logo192.png',
    name: '444호 김미림',
    timeAgo: '10분전',
    content: '선생님 저희 빨래 예약 당일 오전 6시부터 가능하다고 알고있는데 전 날에 하는 친구가 있어서 혹시 제가 잘못알고있는 걸까요?',
  },
  {
    id: 4,
    profile: '/logo192.png',
    name: '444호 김미림',
    timeAgo: '15분전',
    content: '사감쌤 그럼 휴관기간에는 지방생들도 잔류 못하나요?',
  },
  {
    id: 5,
    profile: '/logo192.png',
    name: '444호 김미림',
    timeAgo: '40분전',
    content: '선생님 지금 모르는 친구가 저희 호실로 들어왔는데 와주실 수 있나요?ㅠㅜ',
  },
];

export default function SuggestionPage() {
  const navigate = useNavigate();

  // 건의사항 삭제 함수
  const handleDelete = (id) => {
    console.log('삭제할 건의사항 id:', id);
    // TODO: Supabase 삭제 API 연결
  };

  return (
    <div className="suggestion-page">
      {/* 헤더 */}
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src = {Icon_back} alt="뒤로가기" />
        </button>

        <h1>건의사항</h1>

        <button className="edit-btn" onClick={() => navigate("/suggestion/write")}>
          <img src = {Icon_edit} alt="작성" />
        </button>
      </div>

      {/* 건의사항 리스트 */}
      <div className="suggestion-list">
        {dummySuggestions.map(suggestion => (
          <SuggestionCard
            key={suggestion.id}
            profile={suggestion.profile}
            name={suggestion.name}
            timeAgo={suggestion.timeAgo}
            content={suggestion.content}
            onDelete={() => handleDelete(suggestion.id)}
          />
        ))}
      </div>
    </div>
  );
}
