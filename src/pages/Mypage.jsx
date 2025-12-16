import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Mypage.css";
import Back from '../assets/back.png';
import Arrow from '../assets/arrow.png';
import Profile from '../assets/profile.png';
import Edit from '../assets/icon_edit.png';

const Mypage = () => {
    const navigate = useNavigate();
    const [nameOnly, setNameOnly] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [roomNum, setRoomNum] = useState("");

    useEffect(() => {
    const loadUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
        const fullName = user.user_metadata?.full_name ?? "";
        const parsedName = fullName.includes("_")
            ? fullName.split("_")[1]
            : fullName;

        setNameOnly(parsedName);

        const profilePic =
            user.identities?.[0]?.identity_data?.picture ||
            user.user_metadata?.avatar_url ||
            "";

        setProfileImage(profilePic);
        }
    };

    loadUser();
    }, []);
    useEffect(() => {
        const loadProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
    
        const { data, error } = await supabase
            .from("profiles")
            .select("roomNum")
            .eq("user_id", user.id)
            .single();
    
        if (error) {
            console.error("room 불러오기 실패:", error);
        } else {
            setRoomNum(data.roomNum);
        }
        };
    
        loadProfile();
    }, []);
    
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
    
        if (!error) {
        console.log("로그아웃 완료");
        navigate("/"); 
        } else {
        console.error("로그아웃 실패", error);
        }
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
                    src={profileImage || Profile}
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
                <div className="Mypage-roomBadge"> {roomNum ? `${roomNum}호` : "호실 없음"}</div>
            </div>


            <div className="MyPagescore-box">
                <div className="MyPagescore-wrapper">
                    <div className="Mypage-plus">
                        <div className="Mypage-score">3점</div>
                        <div className="Mypage-label">상점</div>
                    </div>

                    <div className="MyPageLine"></div>

                    <div className="Mypage-plus">
                        <div className="Mypage-score">10점</div>
                        <div className="Mypage-label">벌점</div>
                    </div>

                    <div className="MyPageLine"></div>

                    <div className="Mypage-plus">
                        <div className="Mypage-score">-7점</div>
                        <div className="Mypage-label">총합</div>
                    </div>
                </div>
            </div>

            <div class="Mypage-settings-container">
                <div class="Mypage-section Mypage-basic-settings">
                    <div className="Mypage-basictitle">기본</div>
                    <div class="Mypage-menu-item">
                        <span class="text">나의 건의사항</span>
                        <div
                        className="Mypage-arrow-icon"
                        onClick={() => navigate("/suggestion")}
                        style={{ backgroundImage: `url(${Arrow})` }}
                        />
                    </div>
                    <div class="Mypage-menu-item">
                        <span class="text">기상송 신청하기</span>
                        <div
                        className="Mypage-arrow-icon"
                        onClick={() => navigate("/song")}
                        style={{ backgroundImage: `url(${Arrow})` }}
                        />
                    </div>
                    <div class="Mypage-menu-item">
                        <span class="text">오늘의 급식 확인하기</span>
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
                        <span className='text'>탈퇴하기</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mypage;