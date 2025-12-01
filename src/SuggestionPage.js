import React from 'react';
import SuggestionCard from './SuggestionCard';
import './SuggestionPage.css';
import { useNavigate } from "react-router-dom";

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
  const handleDelete = (id) => {
    console.log('삭제할 건의사항 id:', id);
    // 나중에 Supabase 삭제 API 연결
  };

  return (
    <div className="suggestion-page">
      <div className="header">
        {/* 뒤로가기 */}
        <button className="back-btn">
            <img src="/icon_back.png" alt="뒤로가기" />
        </button>

        <h1>건의사항</h1>

        {/* 오른쪽 수정 */}
        <button className="edit-btn" onClick={() => navigate("/write")}>
            <img src="/icon_edit.png" alt="수정" />
        </button>
    </div>

      <div className="suggestion-list">
        {dummySuggestions.map(s => (
          <SuggestionCard
            key={s.id}
            profile={s.profile}
            name={s.name}
            timeAgo={s.timeAgo}
            content={s.content}
            onDelete={() => handleDelete(s.id)}
          />
        ))}
      </div>
    </div>
  );
}
