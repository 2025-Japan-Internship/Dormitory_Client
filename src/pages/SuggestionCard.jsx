import React from 'react';
import './SuggestionCard.css';
import Icon_remove from '../assets/icon_remove.png';

export default function SuggestionCard({ profile, name, timeAgo, content, onDelete }) {
  return (
    <div className="suggestion-card">
      <div className="card-header">
        <img className="profile-pic" src={profile} alt="profile" />
        <div className="user-info">
          <div className="name">{name}</div>
          <div className="time">{timeAgo}</div>
        </div>
        <button className="delete-btn" onClick={onDelete}>
          <img src = {Icon_remove} alt="뒤로가기" />
        </button>
      </div>
      <div className="card-content">
        {content}
      </div>
    </div>
  );
}
