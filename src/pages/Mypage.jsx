import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Mypage.css";
import Back from '../assets/back.png';
import Arrow from '../assets/arrow.png';
import Profile from '../assets/profile.png';
import Edit from '../assets/icon_edit.png';
import useUserProfile from "../hooks/useUserProfile";



const Mypage = () => {
  const navigate = useNavigate();
  const { profile, loading } = useUserProfile();
  const [nameOnly, setNameOnly] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [bonusPoint, setBonusPoint] = useState(0);
  const [minusPoint, setMinusPoint] = useState(0);

  useEffect(() => {
    const loadUserAndProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("유저 정보 없음", userError);
        return;
      }

      // ===== 유저 메타데이터 =====
      const fullName = user.user_metadata?.full_name ?? "";
      const parsedName = fullName.includes("_")
        ? fullName.split("_")[1]
        : fullName;

      setNameOnly(parsedName);

      // ===== profiles 테이블 =====
      const { data, error } = await supabase
        .from("profiles")
        .select("roomNum, bonus_point, minus_point")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("프로필 불러오기 실패:", error);
        return;
      }

      setRoomNum(data.roomNum);
      setBonusPoint(data.bonus_point ?? 0);
      setMinusPoint(data.minus_point ?? 0);
    };

    loadUserAndProfile();
  }, []);

  
  if (loading) return null;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) navigate("/");
  };

  return (
    <div className="MyPageContainer">
      <header className="MypageHeader">
        <div
          className="Mypage-backButton"
          onClick={() => navigate(-1)}
          style={{ backgroundImage: `url(${Back})` }}
        />
        <h1 className="MyPageTitle">MY</h1>
        <div className="null"></div>
      </header>

      <div className="Mypage-ProfileSection">
        <div className="Mypage-profileImageWrapper">
          <img
            src={profile?.avatarUrl || Profile}
            alt="profile"
            className="Mypage-profileImage"
            referrerPolicy="no-referrer"
            />
          <img
            src={Edit}
            alt="edit"
            className="MypageEditIcon"
            onClick={() => navigate('/edit')}
          />
        </div>

        <p className="Mypage-userNameText">{nameOnly}</p>
        <div className="Mypage-roomBadge">
          {roomNum ? `${roomNum}호` : "호실 없음"}
        </div>
      </div>

      <div className="MyPagescore-box">
        <div className="MyPagescore-wrapper">
          <div className="Mypage-plus">
            <div className="Mypage-score">{bonusPoint}점</div>
            <div className="Mypage-label">상점</div>
          </div>

          <div className="MyPageLine"></div>

          <div className="Mypage-plus">
            <div className="Mypage-score">{minusPoint}점</div>
            <div className="Mypage-label">벌점</div>
          </div>

          <div className="MyPageLine"></div>

          <div className="Mypage-plus">
            <div className="Mypage-score">
              {bonusPoint - minusPoint}점
            </div>
            <div className="Mypage-label">총합</div>
          </div>
        </div>
      </div>

      <div className="Mypage-settings-container">
        <div className="Mypage-section Mypage-basic-settings">
          <div className="Mypage-basictitle">기본</div>

          <div className="Mypage-menu-item">
            <span className="text">나의 건의사항</span>
            <div
              className="Mypage-arrow-icon"
              onClick={() => navigate("/suggestion")}
              style={{ backgroundImage: `url(${Arrow})` }}
            />
          </div>

          <div className="Mypage-menu-item">
            <span className="text">기상송 신청하기</span>
            <div
              className="Mypage-arrow-icon"
              onClick={() => navigate("/song")}
              style={{ backgroundImage: `url(${Arrow})` }}
            />
          </div>

          <div className="Mypage-menu-item">
            <span className="text">오늘의 급식 확인하기</span>
            <div
              className="Mypage-arrow-icon"
              onClick={() => navigate("/meal")}
              style={{ backgroundImage: `url(${Arrow})` }}
            />
          </div>
        </div>

        <div className="Mypage-section Mypage-account-actions">
          <div className="Mypage-menu-item Mypage-single-item">
            <span className="text" onClick={handleLogout}>로그아웃</span>
          </div>
          <div className="Mypage-menu-item Mypage-single-item">
            <span className="text">탈퇴하기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
