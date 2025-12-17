import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Back from '../assets/back.png';
import Profile from '../assets/profile.png';
import Camera from '../assets/camera.png';
import Drop from '../assets/drop.png';
import './EditInformation.css';

const allRooms = {
  '3층': [
    '301호','302호','303호','304호','305호','306호',
    '307호','308호','309호','310호','311호','312호',
    '313호','314호','315호','316호','317호','318호'
  ],
  '4층': [
    '401호','402호','403호','404호','405호','406호',
    '407호','408호','410호','411호','412호','413호',
    '414호','415호','416호','417호','418호'
  ],
  '5층': [
    '501호','502호','503호','504호','505호','506호',
    '507호','508호','509호','510호','511호','512호',
    '513호','514호','515호','516호','517호','518호'
  ],
};

export default function EditInformation() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [userId, setUserId] = useState(null);
  const [nameOnly, setNameOnly] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState('4층');
  const [selectedRoom, setSelectedRoom] = useState(allRooms['4층'][0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentRooms = useMemo(
    () => allRooms[selectedFloor],
    [selectedFloor]
  );

/* ===== 유저 + 프로필 로드 ===== */
useEffect(() => {
  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setUserId(user.id);

    // ===== 이름 =====
    const fullName = user.user_metadata?.full_name ?? "";
    setNameOnly(fullName.includes("_") ? fullName.split("_")[1] : fullName);

    // ===== 구글 기본 프로필 이미지 =====
    const googleAvatar =
      user.user_metadata?.picture ||
      user.identities?.[0]?.identity_data?.picture ||
      null;

    // ===== profiles 테이블 =====
    const { data: profile } = await supabase
      .from("profiles")
      .select("roomNum, avatar_url")
      .eq("user_id", user.id)
      .single();

    if (profile?.roomNum) {
      const floor = profile.roomNum[0] + "층";
      setSelectedFloor(floor);
      setSelectedRoom(profile.roomNum + "호");
    }

    // ⭐ 핵심 로직
    setProfileImage(profile?.avatar_url || googleAvatar);
  };

  loadData();
}, []);


  /* ===== 프로필 이미지 업로드 ===== */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    const ext = file.name.split('.').pop();
    const filePath = `${userId}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error(uploadError);
      alert("이미지 업로드 실패");
      return;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("user_id", userId);

    setProfileImage(publicUrl);
  };

  /* ===== 정보 저장 ===== */
  const handleSave = async () => {
    if (!userId) return;

    await supabase
      .from("profiles")
      .update({
        roomNum: selectedRoom.replace("호", "")
      })
      .eq("user_id", userId);

    navigate(-1);
  };

  return (
    <div className="EditInformationContainer">
      <header className="MypageHeader">
        <div
          className="backButton"
          onClick={() => navigate(-1)}
          style={{ backgroundImage: `url(${Back})` }}
        />
        <h1 className="EditpageTitle">정보 수정</h1>
        <div className="null" />
      </header>

      <div className="EditprofileSection">
        <div className="EditprofileImageWrapper">
          <img
            src={profileImage ?? Profile}
            alt="profile"
            className="EditprofileImage"
            referrerPolicy="no-referrer"
          />

          <img
            src={Camera}
            alt="edit"
            className="editIcon"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div className="EditinfoSection">
        <p className="EditinfoLabel">이름</p>
        <input
          type="text"
          value={nameOnly}
          disabled
          className="EditinfoBox"
        />
      </div>

      <div className="Editroom-selector-container">
        <span className="EditinfoLabel">호실</span>

        <div className="Editfloor-toggle-group">
          {Object.keys(allRooms).map((floor) => (
            <button
              key={floor}
              className={`Editfloor-toggle-button ${
                selectedFloor === floor ? 'selected' : ''
              }`}
              onClick={() => {
                setSelectedFloor(floor);
                setSelectedRoom(allRooms[floor][0]);
              }}
            >
              {floor}
            </button>
          ))}
        </div>

        <div className="Editroom-dropdown-container">
          <div
            className="Editroom-display-box"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedRoom}
            <img
              src={Drop}
              alt="arrow"
              className={`Editdropdown-arrow ${isDropdownOpen ? 'Editopen' : ''}`}
            />
          </div>

          {isDropdownOpen && (
            <ul className="Editroom-options-list">
              {currentRooms.map((room) => (
                <li
                  key={room}
                  className={`Editroom-option-item ${
                    selectedRoom === room ? 'Edithighlighted' : ''
                  }`}
                  onClick={() => {
                    setSelectedRoom(room);
                    setIsDropdownOpen(false);
                  }}
                >
                  {room}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button className="EditsaveButton" onClick={handleSave}>
        수정하기
      </button>
    </div>
  );
}
