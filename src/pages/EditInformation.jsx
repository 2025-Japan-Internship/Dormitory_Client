import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Back from '../assets/back.png';
import Profile from '../assets/profile.png';
import Camera from '../assets/camera.png';
import './EditInformation.css';
import Drop from '../assets/drop.png';

const allRooms = {
  '3층': [
    '301호', '302호', '303호', '304호', '305호', '306호',
    '307호', '308호', '309호', '310호', '311호', '312호',
    '313호', '314호', '315호', '316호', '317호', '318호'
  ],
  '4층': [
    '401호', '402호', '403호', '404호', '405호', '406호',
    '407호', '408호', '410호', '411호', '412호', '413호',
    '414호', '415호', '416호', '417호', '418호'
  ],
  '5층': [
    '501호', '502호', '503호', '504호', '505호', '506호',
    '507호', '508호', '509호', '510호', '511호', '512호',
    '513호', '514호', '515호', '516호', '517호', '518호'
  ],
};

const EditInformation = () => {
  const navigate = useNavigate();

  const [nameOnly, setNameOnly] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [selectedFloor, setSelectedFloor] = useState('4층');
  const [selectedRoom, setSelectedRoom] = useState(allRooms['4층'][0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
    setSelectedRoom(allRooms[floor][0]);
    setIsDropdownOpen(false);
  };

  const currentRooms = useMemo(
    () => allRooms[selectedFloor],
    [selectedFloor]
  );

  const handleRoomItemClick = (room) => {
    setSelectedRoom(room);
    setIsDropdownOpen(false);
  };

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
            src={profileImage || Profile}
            alt="profile"
            className="EditprofileImage"
            referrerPolicy="no-referrer"
          />
          <img
            src={Camera}
            alt="edit"
            className="editIcon"
          />
        </div>
      </div>

      <div className="EditinfoSection">
        <p className="EditinfoLabel">이름</p>
        <input
          type="text"
          defaultValue={nameOnly}
          className="EditinfoBox"
        />
      </div>

      <div className="Editroom-selector-container">
        <span className="EditinfoLabel">호실</span>

        {/* 층 선택 버튼 */}
        <div className="Editfloor-toggle-group">
          {Object.keys(allRooms).map((floor) => (
            <button
              key={floor}
              className={`Editfloor-toggle-button ${
                selectedFloor === floor ? 'selected' : ''
              }`}
              onClick={() => handleFloorChange(floor)}
            >
              {floor}
            </button>
          ))}
        </div>




        {/* 호실 드롭다운 */}
        <div className="Editroom-dropdown-container">
          <div
            className="Editroom-display-box"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedRoom}
            <img
              src={Drop}
              alt="dropdown arrow"
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
                  onClick={() => handleRoomItemClick(room)}
                >
                  {room}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button className="EditsaveButton">수정하기</button>
    </div>
  );
};

export default EditInformation;
